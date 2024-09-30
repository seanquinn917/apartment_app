import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState } from 'react';
import UserContext from './User-Context';
import { useNavigate } from 'react-router-dom';
import AptCard from './AptCard';
import SignIn from './SignIn';
import './App.css';


const cards = [1];


const defaultTheme = createTheme();

export default function HomePage({apartments, setApartments}) {
  const[tenant, setTenant]=useContext(UserContext)
  const [newApartmentNumber, setNewApartmentNumber]=useState({
    number:""
  })
  const[errors, setErrors]=useState([])
 
  const navigate=useNavigate()

 
  

  if(apartments===null){
    return <p>Loading...</p>
  }
 
  
   
      
  if(tenant === null) {
    return <SignIn/>
  }
    
    
console.log(tenant.role)
    function addNewApartment(e){
      e.preventDefault()
      console.log("click")
      setErrors([])
      if(tenant.role === "user"){
        setErrors(["Not Authorized!"])
        return;
      }
      if(!newApartmentNumber.number){
        console.log('newApartmentNumber.number is falsy:', newApartmentNumber.number);
        setErrors(["Input field cannot be blank!"])
        return;
      }if (newApartmentNumber.number === null) {
        console.log('newApartmentNumber.number is null:', newApartmentNumber.number);
        setErrors(["Content must be at least 3 characters long."]);
        return;
      }
      fetch('/apartments',{
        method: "POST",
        headers: {
          "content-type":"application/JSON"
        },
        body: JSON.stringify({
          number:newApartmentNumber.number
        })
      })
      .then((r)=>{
        if(r.ok){
            r.json()
            .then((newApartment)=>{
                setApartments([...apartments, newApartment])
                setNewApartmentNumber({number: " "})
            })
        }else {
            r.json().then((err)=>{
              console.log(err)
                setErrors([err.errors])
                
            })
        }
    })
    
    }

    function apartmentFormChange(e){
      setNewApartmentNumber({
        ...newApartmentNumber,
        [e.target.name]:e.target.value
      })
    }

  const apt_number = apartments.map((apt)=>{
      return apt.number
  })

  const id = apartments.map((apt)=>{
    return apt.id
  })

  const errorList = errors.map((err, index)=>{
    return <li style={{ listStyleType: 'none' }} key= {index}>{err}</li>
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main className='boxes'>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Livadia Realty
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Welcome to our small and distinctive five unit building in the heart of Astoria.  Feel free to read reviews from past tenants and if you're a resident, provide your own.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <a href={"/leases/" + tenant.lease_id}>
              <Button variant="contained">Check Out Your Lease {tenant.name}</Button>
              
              </a>
              
              {tenant.role === "admin" ? 
              <a href={'/leases'}>
              <Button variant="outlined">Create a new Lease</Button>
              </a> : null }
            </Stack>
          </Container>
          <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
          {tenant.role==="admin"? <Typography variant="h5" align="center" color="text.secondary" paragraph>
        <form onSubmit={addNewApartment}>Add a new apartment Number here
        <input type="text" name="number" value={newApartmentNumber.number} onChange={apartmentFormChange}></input>
        <Button
                type="submit"
                // fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
      </form>
        {errorList} 
        </Typography> : null}
        </Stack>
        </Box>
       
        {apartments.map((apt)=>{
          return  <AptCard 
          key={apt.id}
          apartments={apartments}
          setApartments={setApartments}
          id={apt.id}
          number={apt.number}
          />
        })}
        
      </main>
        
      
    
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}