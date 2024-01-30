import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "./User-Context";
import { Button } from "@mui/material";

function AptDetail({apartments, setApartments}){
    const {id}=useParams()
    const [tenant, setTenant]=useContext(UserContext)
    const apartment = apartments.find((apt)=>apt.id ===parseInt(id))
    const[errors, setErrors]=useState([])
    const [newReviewContent, setNewReviewContent]=useState({
        content:""
    })
    
    if(!apartment){
        return <h1>loading...</h1>
    }

    
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

        const lease = apartment.leases.map((lease)=>{
            return lease.id
        })
        console.log(lease[0])
        console.log(tenant.lease_id)
  const reviews = apartment.reviews.map((review)=>{
    if(tenant.id===review.tenant_id){
        return (
            <li className="review" key={review.id}>
                "{review.content}" said {review.username}
                <Button onClick={()=>deleteReview(review.id)}>Delete Review</Button>
            </li>
        );
    } else {
        return <li className="review" key={review.id}>
            "{review.content}" 
        </li>
    }
  })

  

    if (tenant === null) {
        return <p>Loading...</p>;
      }

    return(
        <div>
            <ul>
                {reviews}
            </ul>
            {apartment.number}
           {lease[0] === tenant.lease_id ?
            <form onSubmit={addNewReview}>
                <ul>
                <label>We'd love to hear from you!</label>
                <input type="text" name="content" value={newReviewContent.content} onChange={handleReviewFormChange}></input>
                </ul>
                <input type="submit" value="submit"></input>
               </form> : null}
               
        </div>

    )
};


export default AptDetail;