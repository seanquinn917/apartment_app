import React from "react";
import { useEffect, useState } from "react";



function Home(){
const [apartments, setApartments]=useState([])

useEffect(()=>{
    fetch("/apartments")
    .then((r)=>r.json())
    .then((data)=>console.log(data.message))
}, [])

    console.log(apartments)

    return(
        <div>
            Welcome Home
        </div>
    )
}



export default Home;