import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "./User-Context";
import { Button } from "@mui/material";
import { List } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


function AptDetail({apartments, setApartments}){
    const {id}=useParams()
    const [tenant, setTenant]=useContext(UserContext)
    const apartment = apartments.find((apt)=>apt.id ===parseInt(id))
    const[errors, setErrors]=useState([])
    const [showForm, setShowForm]=useState(false)
    const [newReviewContent, setNewReviewContent]=useState({
        content:""
    })
    const defaultTheme = createTheme();
    const[updateReviewContent, setUpdateReviewContent]=useState({
        reviewId: null,
        content:"",
      })
      
    
    if(!apartment){
        return <h1>loading...</h1>
    }
console.log(tenant)
    
function handleReviewFormChange(e){
    e.preventDefault()
    setNewReviewContent({
        ...newReviewContent,
        [e.target.name]:e.target.value
     })

}

   
    function addNewReview(e){
        e.preventDefault();
        setErrors([])
        fetch('/reviews',{
            method:"POST",
            headers:{
                "content-type":"application/JSON"
            },
            body:JSON.stringify({
                content:newReviewContent.content,
                tenant_id:tenant.id,
                apartment_id:apartment.id
            })
        })
        .then((r)=>{
            if(r.ok){
                r.json()
                .then((newReview)=>{
                    console.log(newReview)
                    const updatedApartments = [...apartments]
                    const targetApartment=updatedApartments.find((r)=>r.id ===parseInt(id))
                    targetApartment.reviews.push(newReview)
                    setApartments(updatedApartments)
                })
            }else {
                r.json().then((err)=>{
                    console.log(err)
                    setErrors([err.exception])
                })
            }
        })
        
        }
        


    function deleteReview(reviewId){
        fetch(`/reviews/${reviewId}`, {
          method: "DELETE",
        })
          .then((r) => {
            if (r.status === 204) {
              // Deletion was successful, no content to parse
              return null;
            } else {
              // Parse the response as JSON
              return r.json();
            }
          })
          .then((deletedReview) => {
            if (deletedReview === null) {
              // Deletion was successful, handle accordingly
              // e.g., remove the deleted review from the movies array
              const updatedApartments = apartments.map((apt) => {
                const updatedReviews = apt.reviews.filter(
                  (review) => review.id !== reviewId
                );
                return {
                  ...apt,
                  reviews: updatedReviews,
                };
              });
              setApartments(updatedApartments);
            } else {
              // Handle the response as JSON in case of an error or unexpected response
              // ...
              console.log("oops")
            }
          });
        }



        function updateReviewFormChange(e, reviewId) {
            e.preventDefault();
            setUpdateReviewContent({
              ...updateReviewContent,
              reviewId: reviewId,
              content: e.target.value,
            });
          }
          

        function updateReview(reviewId, e){
            e.preventDefault()
            console.log("click")
            e.preventDefault();
             console.log(reviewId)
            fetch(`/reviews/${reviewId}`,{
              method: "PATCH",
              headers:{
                "Content-type":"application/json"
              },
              body:JSON.stringify({
                content:updateReviewContent.content,
                apartment_id:apartment.id,
                tenant_id:tenant.id,
              })
            })
            .then((r)=>r.json())
            .then((newContent)=>{
              const updatedApartments = [...apartments]
              const targetApartment = updatedApartments.find((r)=>r.id === parseInt(id))
              targetApartment.reviews = targetApartment.reviews.map((review)=>{
                if(review.id === reviewId){
                  return newContent;
                } else {
                  return review;
                }
              })
              setApartments(updatedApartments)
              setShowForm(!showForm)
            })
          }







        const lease = apartment.leases.map((lease)=>{
            return lease.id
        })

 const errorList = errors.map((err, index)=>{
  <li key= {index}>{err}</li>
})





  const reviews = apartment.reviews.map((review)=>{
    if(tenant.id===review.tenant_id){
        return (
            <List className="review" key={review.id}>
                "{review.content}" said {tenant.username}
                <Button onClick={()=>deleteReview(review.id)}>Delete Review</Button>
                <Button onClick={()=>{
            setUpdateReviewContent((prevContent) => ({
              ...prevContent,
              reviewId: review.id,
            }));
            setShowForm(!showForm)}}>Edit</Button>
            </List>
        );
    } else {
        return <List className="review" key={review.id}>
            "{review.content}" 
        </List>
    }
  })

    

    if (tenant === null) {
        return <p>Loading...</p>;
      }

    return(
        <div>
            <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            
            <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Livadia Realty
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Apt {apartment.number} 
            </Typography>
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            {reviews}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              
              {}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
          </ThemeProvider>
            
            {showForm? (
               <form onSubmit={(e)=>updateReview(updateReviewContent.reviewId, e)}>
            <label>change your mind {tenant.name}?</label>
            <input type="text" name="content" value={updateReviewContent.content}  onChange={(e)=>updateReviewFormChange(e, updateReviewContent.reviewId)}></input>
            <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 5 }}
              >
                Submit
              </Button>
            {/* <input type="submit" value="submit"></input> */}
            </form>
            ) : null}
           {lease[0] === tenant.lease_id ?
            <form onSubmit={addNewReview}>
                <ul>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Is this your home? We'd love to hear from you!
                    {errorList}
                </Typography>
                <input type="text" name="content" value={newReviewContent.content} onChange={handleReviewFormChange}></input>
                </ul>
                
              
                <Button
                type="submit"
                // fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Typography>{errors}</Typography>
               </form> : null}
               
               
        </div>

    )
};


export default AptDetail;