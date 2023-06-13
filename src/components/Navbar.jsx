import React from "react"
import {NavLink,Link} from "react-router-dom"
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Navbar = (props)=>{

    const cerrarSesion = ()=>{
        console.log(props);
        auth.signOut().then(()=>{
            props.history.push('/login')
        });
    }


    return(
        <div className="navbar navbar-dak bg-dark">
            <Link className="navbar-brand" to="/">AUTH</Link>
            <div>
                <div className="d-flex">
                    <NavLink className="btn btn-dark mr-2" to="/" exact activeClassName="active">Inicio</NavLink>
                    {  
                    (props.fbUser!== null) ? (<NavLink className="btn btn-dark mr-2" to="/admin" >Admin</NavLink>)
                    : null
                    }
                    {
                    props.fbUser !==null ? 
                    (<button 
                        onClick={()=>{cerrarSesion()}}
                     className="btn  btn-dark" type="button">Cerrar Sesion</button>)
                    :(<NavLink className="btn btn-dark mr-2" to="/login" >Login</NavLink>)}
                </div>
                
            </div>
        </div>
    );
}

export default withRouter(Navbar)