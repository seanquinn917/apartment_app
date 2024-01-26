
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import { useState, useEffect } from 'react';
import SignInSide from './SignInSide';
import HomePage from './HomePage';
import Reviews from './Reviews';



function App() {
  const [apartments, setApartments]=useState([])

  useEffect(()=>{
      fetch("/apartments")
      .then((r)=>r.json())
      .then((data)=>setApartments(data))
  }, [])
  
    
  



  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home apartments={apartments}/>}/>
          </Routes>
          <Routes>
            <Route path='/login' element={<SignInSide/>}/>
          </Routes>
          <Routes>
            <Route path='/Home' element={<HomePage apartments={apartments}/>}/>
          </Routes>
          <Routes>
            <Route path='/Reviews' element={<Reviews apartments={apartments}/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
