import React from "react";
import Button from "@mui/material";



function Reviews({apartments}){

const reviews = apartments.map((apt)=>{
    const user = apt.reviews.map((u)=>{
        return u.username
    })
    const content = apt.reviews.map((r)=>{
        return r.content
    })
    return <li className="review_content">"{content}" said {user}</li>
})




return(
<span> 
    <h1>Read our Reviews</h1>  
<div>{reviews}</div>
</span> 

)
};


export default Reviews