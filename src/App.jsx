import './App.css';
import React, { useState } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import AdminNavbar from './Admin-side/layouts/AdminNavbar';
import AdminDashboard from './Admin-side/AdminDashboard';
import AdminLogin from './Admin-side/AdminLogin';
import Bookings from './Admin-side/Bookings';
import AdminGallery from './Admin-side/AdminGallery';
import AdminServices from './Admin-side/AdminServices';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true); // Set login state to true on successful login
  };

  const logoutHandler = () => {
    setIsLoggedIn(false); // Set login state to false on logout
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='portfolio' element={<Portfolio />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='services' element={<Services />} />
        </Route>

        <Route path='/admin'>
          <Route index element={isLoggedIn ? <Navigate to='/admin/dashboard' /> : <AdminLogin loginHandler={loginHandler} />} />
          
          <Route element={isLoggedIn ? <AdminNavbar onLogout={logoutHandler} /> : <Navigate to='/admin' />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='gallery' element={<AdminGallery />} />
            <Route path='services' element={<AdminServices />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
