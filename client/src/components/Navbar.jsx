import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '@mui/material';
import axiosClient from '../axios-client';

const linkOneStyle = {
    textDecoration:'none',
    color:'white',
    padding:'10px'
}
const linkTwoStyle = {
    textDecoration:'none',
    color:'white',
    padding:'10px'
}

const Navbar = () => {

    const {user , token , setToken , setUser} = useStateContext();

    const handleLogout = (e) => {
      e.preventDefault();
      axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
    }

    if(!token){
        return <Navigate to='/login'/>
    }

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PracticeApp {user.name}
          </Typography>
          {token ?
           <Button onClick={handleLogout} variant='contained' >Logout</Button>: 
           <>
            <Link style={linkOneStyle} to='/login'>Login</Link>
            <Link style={linkTwoStyle} to='/register'>Register</Link>
           </>
          }
         
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar