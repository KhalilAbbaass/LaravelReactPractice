import React, { useRef } from 'react'
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

const Register = () => {

  const {setUser , setToken , token} = useStateContext();

  
  const nameRef  = useRef();
  const emailRef  = useRef();
  const passwordRef  = useRef();

  const handleRegister = (e) => {
    e.preventDefault();
    const payload = {
      name:nameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
    }
    console.log(payload)
    axiosClient.post('/signup', payload)
    .then(({data}) =>{
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
        <h1>RegisterPage</h1>
        <input ref={nameRef} placeholder='name' type ='text' label="Name" variant="outlined" />
        <input ref={emailRef} placeholder='email' type ='email' label="Email" variant="outlined" />
        <input ref={passwordRef} placeholder='password'  label="Password" type='password' variant="outlined" />
        <Button onClick={handleRegister} variant="contained">Register</Button>
        <h4>AlreadyHave An Account ?<Link to='/login'>Login</Link></h4>

    </div>
    </div>
  )
}

export default Register