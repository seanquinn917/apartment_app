import React, { useContext, useState } from "react";
import Button from "@mui/material";
import UserContext from './User-Context';
import { useParams } from "react-router-dom";



function Reviews({apartments, setApartments}){
    const{id}=useParams
    const [tenant, setTenant]=useContext(UserContext)
    const [errors, setErrors]=useState([])
    const [newReviewContent, setNewReviewContent]=useState({
        content:""
    })



    if (tenant === null) {
        return <p>Loading...</p>;
      }
    


console.log(tenant.id)
console.log(apartments[0].reviews)



const reviews = apartments.map((apt)=>{
    const user = apt.reviews.map((u)=>{
        return u.username
    });
    const content = apt.reviews.map((r)=>{
        return r.content
    });

    if(tenant.id === apt.reviews.tenant_id){
        return <li className="review_content">{apt.number}{content} said {user}
        <button></button>
        <button></button></li>
    }else {
        return <li className="review_content">"I live in apt number and {apt.number} and {content}" said {user}
        </li> 
    }
    })
    






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
        tenant_id:tenant.id
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



return(
<span> 
    <h1>Read our Reviews</h1>  
<div>{reviews}</div>
<form onSubmit={addNewReview}>
                <ul>
                <label>We'd love to hear from you!</label>
                <input type="text" name="content" value={newReviewContent.content} onChange={handleReviewFormChange}></input>
                </ul>
                <input type="submit" value="submit"></input>
               </form>
</span> 

)
};


export default Reviews