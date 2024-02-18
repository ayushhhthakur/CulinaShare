import React from 'react'
import './App.css'
import Recepies from './components/Recepies'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddRecipe from './components/AddRecipe';

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Recepies />}></Route>
          <Route path="/addrecipe" element={<AddRecipe />}></Route>
        </Routes>
    </Router>
  )
}

export default App
