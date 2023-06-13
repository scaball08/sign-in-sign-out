import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Admin = (props) => {

    const [user,setUser] = React.useState(null);

    React.useEffect(()=>{
        if(auth.currentUser){
            console.log('Existe Usuario');
            setUser(auth.currentUser);
        }else{
            console.log('No Existe Usuario');
            props.history.push('/login');
        }


    },[props.history,user])
    return (
        <div>
            <h2>Ruta Protegida</h2>
        </div>
    )
}

export default withRouter(Admin)
