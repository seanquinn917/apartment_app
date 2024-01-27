import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import React, { useState, useEffect, useContext } from 'react';
import SignIn from './SignIn';
import HomePage from './HomePage';
import Reviews from './Reviews';
import UserContext, { UserProvider } from './User-Context';



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
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/login' element={<SignIn/>}/>
            <Route path='/home' element={<HomePage apartments={apartments}/>}/>
            <Route path='/Reviews' element={<Reviews apartments={apartments} setApartments={setApartments}/>}/>
            <Route path='/Signup' element={<SignIn/>}/>
          </Routes>
          </UserProvider>
        </BrowserRouter>
          
      
    </div>
  );
}

export default App;
