
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import { useState, useEffect } from 'react';



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
      </BrowserRouter>
    </div>
  );
}

export default App;
