import React from "react";
import { auth } from "./firebase";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Admin from './components/Admin'

function App() {
  // se crea un state para validar que se ha cargado el usuario
  const  [fbUser,setFbUser] = React.useState(false);

  //se crea un efecto para validar si el usuario esta logueado antes de hacer el render
  React.useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if (user) {
        setFbUser(user);
      }else{
        setFbUser(null)
      }
    });
  },[fbUser])
  return (fbUser!==false ) ? (
    <Router>
      <div className="container">

      
      <Navbar  fbUser={fbUser} />
      <Switch>
        <Route path="/login">
        <Login/>  
        </Route>
        
        <Route path="/admin">
          <Admin/>
        </Route>

        <Route exact path="/">
          Inicio...
        </Route>
      </Switch>
      </div>
    </Router>
  ) : 
  (<div className="spinner-grow" role="status">
  <span className="visually-hidden">Loading...</span>
</div>);
}

export default App;
