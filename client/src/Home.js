import React, { useDeferredValue } from "react";
import { useEffect, useState } from "react";



function Home({apartments}){

    
const tenants = apartments.map((apt)=>{
    const user = apt.tenants.map((t)=>{
        return t.name
    })
    return <li key={apt.id}>{apt.id}, {user}</li>
})




    return(
        <div>
            <h1>Welcome Home</h1>
            <ul>{tenants}</ul>
        </div>
    )
}



export default Home;