import React from "react";
import { auth, db } from "../firebase";
import {withRouter} from "react-router-dom"

const Login = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassowrd] = React.useState("");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(true);

  const login = React.useCallback(async() => {
    try {
        const userCredent  = await auth.signInWithEmailAndPassword(email,password);
        setEmail('');
        setPassowrd('');
        setError(null); 
        console.log('crendeciales',userCredent.user);
        props.history.push('/admin');
    } catch (error) {
        console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Formato de correo invalido");
        setTimeout(() => {
          setError("");
        }, 3000);
      }

      if (error.code === "auth/email-already-in-use") {
        setError("Usuario ya existe, ingrese otro username");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (error.code) {
          console.log(`codigo error: ${error.code} message: ${error.message}`);
      }

      if (error.code==="auth/user-not-found") {
        console.log(`codigo error: ${error.code} message: usuario ${email} no registrado`);
    }
        
    }
  },[email,password,props.history]);

  
  const procesar = (ev) => {
    ev.preventDefault();
    if (!email.trim()) {
      // console.log("Ingrese email");
      setError("Ingrese email");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (!password.trim()) {
      // console.log("Ingrese Password");
      setError("Ingrese Password");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    if (password.length < 6) {
      // console.log("la contrasenia debe ser mayor a 6 caracteres")
      setError("la contrasenia debe ser mayor a 6 caracteres");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    if (esRegistro) {
      registrar();
    }else{
        login();
    }
  };

  const registrar = React.useCallback(async () => {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const userFs = await db
        .collection("usuarios")
        .doc(newUser.user.email)
        .set({ email: newUser.user.email, uid: newUser.user.uid });

        setEmail('');
        setPassowrd('');
        setError(null);
        props.history.push('/admin');

      console.log(newUser.user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Formato de correo invalido");
        setTimeout(() => {
          setError("");
        }, 3000);
      }

      if (error.code === "auth/email-already-in-use") {
        setError("Usuario ya existe, ingrese otro username");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (error.code) {
          console.log(`codigo error: ${error.code} message: ${error.message}`);
      } 
    }
  }, [email, password,props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Login de acceso"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesar}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <input
              type="email"
              placeholder="Ingrese un email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control mb-2"
            />

            <input
              type="password"
              placeholder="Ingrese un password"
              onChange={(e) => setPassowrd(e.target.value)}
              value={password}
              className="form-control mb-2"
            />
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              onClick={() => setEsRegistro(!esRegistro)}
              className="btn btn-info btn-sm btn-block"
              type="button"
            >
              {esRegistro ? "Ya tienes una Cuenta?" : "No tienes cuenta?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Login);
