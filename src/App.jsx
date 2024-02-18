import React from 'react'
import './App.css'
import Recepies from './components/Recepies'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddRecipe from './components/AddRecipe';
import Favourites from './components/Favourites';
import About from './components/About';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Recepies />} />
          <Route path="/recipes/:id" element={<RecipeDetails/>} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/favoutites" element={<Favourites />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  )
}

export default App
