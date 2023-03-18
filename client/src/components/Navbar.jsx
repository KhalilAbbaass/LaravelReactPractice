import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

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

    const {user , token} = useStateContext();

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
          <Link style={linkOneStyle} to='/login'>Login</Link>
          <Link style={linkTwoStyle} to='/register'>Register</Link>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar