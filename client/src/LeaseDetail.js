import React, { useContext, useState } from "react";
import UserContext from "./User-Context";
import { useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


function LeaseDetail({apartments, setApartments}){
    const {id}=useParams()
    const[tenant, setTenant]=useContext(UserContext)
    

    if(!tenant){
        return <h1>loading...</h1>
    }

    
   
    // const apartment = apartments.map((apt)=>{
    //     if( apt.id === tenant.apartment_id){
    //         return apt
    //     } else if (apartment.length >0){
    //         const apartmentNumber = apartment[0].number;
    //         return apartmentNumber
    //     } 
    //         return null
    //     })
        
    
    // console.log(apartment)
    
    // if(apartment.length >0){
    //     const apartmentNumber = apartment[0].number;
    //     return apartmentNumber
       
    // } 

    // if(!apartment){
    //     return <h1>Loading...</h1>
    // }
    const defaultTheme = createTheme();
    
    return (
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        
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
              Livadia Realty Terms
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Tenant {tenant.name}, hereby signs this lease that states: {tenant.lease_content}.
              Access to this website is granted via the username created: {tenant.username} and will expire if lease is not renewed.  
              Tenant agrees to pay the dollar amoutn of {tenant.rent} US dollars on the first of every month.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <a href={"/leases/" + tenant.lease_id}>
              {/* <Button variant="contained">Check Out Your Lease</Button> */}
              </a>
              {}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        </ThemeProvider>
        
    )
};

export default LeaseDetail