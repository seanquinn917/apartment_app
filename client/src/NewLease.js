import React, { useContext, useEffect, useState } from "react";
import UserContext from "./User-Context";
import { List } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button } from "@mui/material";



function NewLease(){
    const[tenant, setTenant]=useContext(UserContext)
    const[leases, setLeases]=useState([])
    const[errors, setErrors]=useState([])
    const[newLeaseForm, setNewLeaseForm]=useState({
        rent: "",
        content: "",
        apartment_id:""
    })

    useEffect(()=>{
        fetch('/leases')
        .then((r)=>r.json())
        .then((data)=>setLeases(data))
    },[])

    function handleLeaseFormChange(e){
        e.preventDefault()
        setNewLeaseForm({
            ...newLeaseForm,
            [e.target.name]:e.target.value
        })
    }

    function addNewLease(e){
        e.preventDefault()
        setErrors([])
        if(!newLeaseForm.rent || !newLeaseForm.content || !newLeaseForm.apartment_id){
            setErrors(["Input field cannot blank!"])
            return;
        }
        fetch('/leases',{
            method:"POST",
            headers:{
                "content-type":"application/JSON"
            },
            body:JSON.stringify({
                content:newLeaseForm.content,
                rent:newLeaseForm.rent,
                apartment_id:newLeaseForm.apartment_id
            })
        }).then((r)=>{
            if(r.ok){
                r.json()
                .then((newLease)=>{
                    setLeases([...leases, newLease])
                })
            }else{
                r.json()
                .then((err)=>{
                    console.log(err)
                    setErrors([err.exception])
                })
            }
        })
    }
   

    const leaseInfo = leases.map((l)=>{
        return <List style={{listStyleType:'none'}}>{l.content}, Rent amount:{l.rent}, for Apartment ID: {l.apartment_id}</List>
    })
    const errorList = errors.map((err, index)=>{
        <li key= {index}>{err}</li>
     })
     
    return(
    <Container>
        <form onSubmit={addNewLease}>
                <ul>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Add New Lease
                    {errorList}
                </Typography>
                <label>Content</label>
                <input type="text" name="content" value={newLeaseForm.content} onChange={handleLeaseFormChange}></input>
                <label>Rent Amount</label>
                <input type="text" name="rent" value={newLeaseForm.rent} onChange={handleLeaseFormChange}></input>
                <label>Apartment Id</label>
                <input type="text" name="apartment_id" value={newLeaseForm.apartment_id} onChange={handleLeaseFormChange}></input>
                
                
                
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
               </form>
           {leaseInfo} 
           
    </Container>

    )
};



export default NewLease