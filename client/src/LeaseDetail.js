import React, { useContext } from "react";
import UserContext from "./User-Context";
import { useParams } from "react-router-dom";



function LeaseDetail({apartments, setApartments}){
    const {id}=useParams()
    const[tenant, setTenant]=useContext(UserContext)
    
    if(!tenant){
        return <h1>loading...</h1>
    }

    
    



    return (
        <div>

        </div>
    )
};

export default LeaseDetail