import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const formDiv = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    gap:'15px',
    backgroundColor:'#B6D0E2',
    padding:'5rem'
    }
    
    const containerDiv = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        padding:'10px',
        height:'100vh',
      }

const Register = () => {

    const {token} = useStateContext();
    if(token){
        return <Navigate to='/'/>
    }

  return (
    <div style={containerDiv}>
    <div style={formDiv}>
        <h1>RegisterPage</h1>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" type='password' variant="outlined" />
        <Button variant="contained">Register</Button>
        <h4>AlreadyHave An Account ?<Link to='/login'>Login</Link></h4>

    </div>
    </div>
  )
}

export default Register