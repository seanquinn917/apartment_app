import React, { useContext } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
// import Link from '@mui/material/Link';
import UserContext from "./User-Context";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';


function AptCard({id, number, apartments, setApartments}){
    const[tenant, setTenant]=useContext(UserContext)
    const navigate=useNavigate()


const cards = [1];

    return(

      // <div>
      //   <hi>{number}</hi>
      //   <Link to={`/apartments/${id}`}>More details</Link>
      // </div>

        <div>



          
         <Container  sx={{ py: 8 }} maxWidth="md">
           {/* End hero unit */}
           <Grid container spacing={4}>
             {cards.map((card) => (
               <Grid item key={card} xs={12} sm={6} md={4}>
                 <Card  
                   sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                 >
                   <CardMedia
                     component="div"
                     sx={{
                       // 16:9
                       pt: '56.25%',
                     }}
                     image="https://images.unsplash.com/photo-1692695090736-669a4180c71b?q=80&w=1036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                   />
                   <CardContent sx={{ flexGrow: 1 }}>
                     <Typography gutterBottom variant="h5" component="h2">
                       
                     </Typography>
                     <Typography variant="h5" align="center" color="text.secondary" paragraph>
                       Apt {number} of The Crescent at Astoria
                     </Typography>
                   </CardContent>
                   <CardActions>
                     {/* <Button size="small" onClick={(e)=> navigate(`/apartments/${id}`)}>View More</Button> */}
                     <Link to={`/apartments/${id}`}>View More</Link>
                     {/* <Button size="small">Edit</Button> */}
                   </CardActions>
                 </Card>
               </Grid>
             ))}
           </Grid>
         </Container>




        </div>
        
    )
}


export default AptCard