import React, {useContext} from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UserContext from "./User-Context";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import './App.css';



function Header(){
    const[tenant, setTenant]=useContext(UserContext)
    const defaultTheme = createTheme();
    const navigate = useNavigate();


    // if(!tenant){
    //     return <h1>loading...</h1>
    // }


    function logOut(e){
        e.preventDefault();
        fetch("/logout",{
          method: "DELETE"
        }).then(()=>{
          setTenant(null)
          navigate('/')})
      }
  
    //   const avatarUrl = tenant.avatar.record.avatar_url;
    //   console.log(tenant.avatar_url)
return(
<ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <AppBar position="relative">
        
          <Toolbar>
            {/* <CameraIcon sx={{ mr: 2 }} /> */}
            <Typography  variant="h6" color="inherit" noWrap>
              {tenant ? `Welcome Home ${tenant.name}`: "Welcome"}
              {/* <img src={tenant.avatar_url} alt="Avatar" /> */}
            </Typography>
          </Toolbar>
          {tenant? <button style={{background: "black", color: "white", fontSize: 15}} onClick={logOut}>Click here to logout</button>: null}
        </AppBar>
        
</ThemeProvider>
    )
}

export default Header;


