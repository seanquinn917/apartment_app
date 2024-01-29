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
import { useContext } from 'react';
import UserContext from './User-Context';
import { useNavigate } from 'react-router-dom';
import AptCard from './AptCard';

// function Copyright() {




//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const cards = [1];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function HomePage({apartments, setApartments}) {
  const[tenant, setTenant]=useContext(UserContext)
  const navigate=useNavigate()
    const apt_number = apartments.map((apt)=>{
        return apt.number
    })
    
console.log(tenant)
    function logOut(e){
      e.preventDefault();
      fetch("/logout",{
        method: "DELETE"
      }).then(()=>{
        setTenant(null)
        navigate('/')})
    }

    const id = apartments.map((apt)=>{
      return apt.id
    })

    if (tenant === null) {
      return <p>Loading...</p>;
    }


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
      
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            Home Page / welcome back {tenant.name}
            
          </Typography>
        </Toolbar>
      </AppBar>




      <main>
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
              <Button variant="contained">Check Out Your Lease</Button>
              </a>
              {}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
       
        {apartments.map((apt)=>{
          return <AptCard 
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
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}