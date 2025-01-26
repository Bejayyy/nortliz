import './App.css'
import React from "react";
import {Route,createBrowserRouter, createRoutesFromElements,RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import About from './pages/About';
import Contact from './pages/Contact'
import Services from './pages/Services';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<Navbar/>}>
      <Route index element = {<Home/>}/>
      <Route path='portfolio' element = {<Portfolio/>}/>
      <Route path='about' element = {<About/>}/>
      <Route path='contact' element = {<Contact/>}/>
      <Route path='services' element = {<Services/>}/>
    </Route>
    
  )
)

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
