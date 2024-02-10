import React, { useState, useContext }  from "react";
import {  useNavigate } from "react-router-dom";
import UserContext from "./User-Context";
import { List } from '@mui/material';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import Link from '@mui/material/Link';


function SignUp(){
    const[tenant, setTenant]=useContext(UserContext)
    const[username, setUserName]=useState("")
    const[password, setPassword]=useState("")
    const[passwordConfirmation, setPasswordConfirmation]=useState('')
    const[name, setName]=useState('')
    const[age, setAge]=useState('')
    const[errors, setErrors]=useState([])
    const[image, setImage]=useState(null)
    const[lease_id, setLease_id]=useState('')
    const[isImage, setIsImage]=useState(false)
    const navigate=useNavigate()
    const defaultTheme = createTheme();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      };


      
     
      
      // const newTenant={
      //     username,
      //     age,
      //     name,
      //     password,
      //     password_confirmation: passwordConfirmation,
      //     lease_id,
      //     image:image
      // }
      
      

    function handleSubmit(e){
      e.preventDefault();
      setErrors([]);
      if(!image) {
        setIsImage(true)
      }else {
        const formData = new FormData();
        formData.append('username', username)
        formData.append('name', name)
        formData.append('age', age)
        formData.append('password', password)
        formData.append('password_confirmation', passwordConfirmation)
        formData.append('lease_id', lease_id)
        formData.append('image', image)
        console.log(formData)
        fetch('/signup',{
            method: "POST",
            body: formData,
        }).then((r)=> {
            if(r.ok){
                r.json()
            .then((tenant)=>setTenant(tenant))
            .then(()=>navigate('/home'))
        } else {
            r.json().then((err)=>setErrors(err.errors))
        }
        })
      }
    }
   

    return(
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>

       
            <Typography component="h1" variant="h5">
              Sign Up Here
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
            <TextField
            label= "Create a username"
            type="text"
            id="username"
            value={username}
            onChange={(e)=>setUserName(e.target.value)}
             />
           </Grid> 
           <Grid item xs={12} sm={6}>
            <TextField
            label="Create a password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            </Grid> 
            <Grid item xs={12} sm={6}>
            <TextField
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            </Grid> 

            <Grid item xs={12} sm={6}>
            <TextField
            label="How old are you?"
            type="text"
            id="age"
            value={age}
            onChange={(e)=>setAge(e.target.value)}
            />
            </Grid> 

            <Grid item xs={12} sm={6}>
            <TextField
             label="Your name"
            type="text"
            id="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            </Grid> 

            <Grid item xs={12} sm={6}>
            <TextField
            label="LeaseID"
            type="text"
            id="lease_id"
            value={lease_id}
            onChange={(e)=>setLease_id(e.target.value)}
            />
             </Grid> 
             
            <Grid item xs={12} sm={6}>
            
            <label style={{fontSize:"large"}}htmlFor="image">Choose your Avatar</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(e)=>setImage(e.target.files[0])}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <div className="Form Control">
                <Button type="submit">Signup</Button>
            </div>
            
            </Grid>
            </Grid>
            
            </Box>
        <ul>
        {errors.map((err) => (
          <List key={err}>{err}</List>
        ))}
        </ul>
        <Link href="/login" variant="body2">
                    {"ALready Signed up? Click here to login"}
            </Link>
        </Container>
    </ThemeProvider>
    )
}


export default SignUp