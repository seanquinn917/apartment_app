import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import React, { useState, useEffect, useContext } from 'react';
import SignIn from './SignIn';
import HomePage from './HomePage';
import Reviews from './Reviews';
import UserContext, { UserProvider } from './User-Context';
import AptDetail from './AptDetail';
import LeaseDetail from './LeaseDetail';
import Header from './Header';

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
            <Route path='/Reviews' element={<Reviews apartments={apartments} setApartments={setApartments}/>}/>
            <Route path='/Signup' element={<SignIn/>}/>
            <Route path='/apartments/:id' element={<AptDetail apartments={apartments} setApartments={setApartments}/>}/>
            <Route path='/leases/:id' element={<LeaseDetail apartments={apartments} setApartments={setApartments}/>}/>
          </Routes>
          </UserProvider>
        </BrowserRouter>
          
      
    </div>
  );
}

export default App;
