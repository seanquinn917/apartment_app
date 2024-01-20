import React, { useDeferredValue } from "react";
import { useEffect, useState } from "react";



function Home({apartments}){
console.log(apartments)

// const apartmentSheet = apartments.map((apt)=>{
//     return <li className="Apt Item">{apt.id}</li>
// })
const tenants = apartments.map((apt)=>{
    const user = apt.tenants.map((t)=>{
        return t.name
    })
    return <li>{apt.id},{user}</li>
})

console.log(tenants)
// console.log(apartmentSheet)

    return(
        <div>
            <h1>Welcome Home</h1>
            <ul>{tenants}</ul>
        </div>
    )
}



export default Home;