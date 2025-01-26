import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Added Outlet for nested routes
import logo from '../images/Nav-bar/logo.png';
import Footer from './Footer';

function Navbar() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-black shadow-md fixed top-0 w-full z-50 ">
        <div className="container mx-auto px-4 flex items-center justify-between py-4 ">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Noritz Bat Films Logo"
              className="h-14"
            />
          </div>
          
          {/* Navigation Links */}
          <ul className="flex space-x-4 items-center">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                  ? "text-[#FEAD5F] font-semibold no-underline"  // Active state
                  : "text-[#F8F8F8] hover:text-[#FEAD5F] font-semibold no-underline" 
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-[#FEAD5F] font-semibold no-underline"  // Active state
                    : "text-[#F8F8F8] hover:text-[#FEAD5F] font-semibold no-underline"  // Default state
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services" 
                className={({ isActive }) => 
                  isActive 
                ? "text-[#FEAD5F] font-semibold no-underline"  // Active state
                : "text-[#F8F8F8] hover:text-[#FEAD5F] font-semibold no-underline" 
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/portfolio" 
                className={({ isActive }) => 
                  isActive 
                ? "text-[#FEAD5F] font-semibold no-underline"  // Active state
                : "text-[#F8F8F8] hover:text-[#FEAD5F] font-semibold no-underline" 
                }
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  isActive 
                ? "text-[#FEAD5F] font-semibold no-underline"  // Active state
                : "text-[#F8F8F8] hover:text-[#FEAD5F] font-semibold no-underline" 
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-20">
        <Outlet />
      </div>
      <Footer /> 
    </>
  );
}

export default Navbar;
