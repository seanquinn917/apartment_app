import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import React, { useState, useEffect, useContext } from 'react';
import SignIn from './SignIn';
import HomePage from './HomePage';
import UserContext, { UserProvider } from './User-Context';
import AptDetail from './AptDetail';
import LeaseDetail from './LeaseDetail';
import Header from './Header';
import SignUp from './SignUp';
import NewLease from './NewLease';

function App() {
  const[apartments, setApartments]=useState([])
  
 



  useEffect(()=>{
      fetch("/apartments")
      .then((r)=>r.json())
      .then((data)=>setApartments(data))
  }, [])
  
    
  



  return (
    <div className="App">
      <BrowserRouter>
      <UserProvider>
        <Header/>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='/home' element={<HomePage setApartments={setApartments} apartments={apartments}/>}/>
            <Route path='/apartments/:id' element={<AptDetail apartments={apartments} setApartments={setApartments}/>}/>
            <Route path='/leases/:id' element={<LeaseDetail apartments={apartments} setApartments={setApartments}/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/leases' element={<NewLease/>}/>
          </Routes>
          </UserProvider>
        </BrowserRouter>
          
      
    </div>
  );
}

export default App;
