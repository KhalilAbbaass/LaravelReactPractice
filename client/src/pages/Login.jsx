import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

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

const Login = () => {

    const {setUser , setToken , token} = useStateContext();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = (e) => {
      e.preventDefault();
      const payload = {
        email:emailRef.current.value,
        password:passwordRef.current.value
      }
     axiosClient.post('/login' , payload)
        .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      }).catch(err => {
        console.log(err)
      })
    }



    if(token){
        return <Navigate to='/'/>
    }

  return (
    <div style={containerDiv}>
    <div style={formDiv}>
        <h1>LoginPage</h1>
        <input ref={emailRef} placeholder='email' type='email' label="Email" variant="outlined" />
        <input ref={passwordRef} placeholder='password' label="Password" type='password' variant="outlined" />
        <Button onClick={handleLogin} variant="contained">Login</Button>
        <h4>Dont Have An Account ?<Link to='/register'>Register</Link></h4>

    </div>
    </div>
  )
}

export default Login