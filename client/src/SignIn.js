import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserContext from './User-Context';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { List } from '@mui/material';



function Copyright(props) {
const [errors, setErrors] = useState([]);

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const[tenant, setTenant]=useContext(UserContext)
  const[username, setUserName]= useState("")
  const[password, setPassword]=useState('')
  const[errors, setErrors]=useState([])

  const navigate=useNavigate()

if(tenant){
  navigate('/home', {replace:true})
}

function onLogin(e) {
    e.preventDefault();
    setErrors([])
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
         r.json().then((tenant) => {
          setTenant(tenant);
          navigate("/home", {replace: true});
        })
        } else {
          r.json().then((err) => setErrors(err.error));;
        }
      })
  }

 

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1705471162553-d8e200c4cbaa?q=80&w=1245&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Livadia Realty 
            </Typography>
            <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type='text'
                id="username"
                label="UserName"
                value={username}
                autoFocus
                onChange={(e)=>setUserName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type='text'
                label="Password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
              <ul>
                {errors.map((err) => (
                   <List key={err}>{err}</List>
                       ))}
              </ul>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                <Button onClick={(e)=>navigate('/signup', {replace:true})}>Dont Have an account? click here to sign Up</Button>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}