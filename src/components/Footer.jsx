import React from 'react';
import { NavLink } from 'react-router-dom'; // To link to other pages
import logo from '../images/Nav-bar/logo.png'; // Replace with your footer logo

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-14"
          />
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://facebook.com" className="text-[#FEAD5F] hover:text-[#F8F8F8]" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f text-2xl"></i>
          </a>
          <a href="https://twitter.com" className="text-[#FEAD5F] hover:text-[#F8F8F8]" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://linkedin.com" className="text-[#FEAD5F] hover:text-[#F8F8F8]" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in text-2xl"></i>
          </a>
          <a href="https://instagram.com" className="text-[#FEAD5F] hover:text-[#F8F8F8]" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? "text-[#FEAD5F] font-semibold" : "text-[#F8F8F8] hover:text-[#FEAD5F]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => 
              isActive ? "text-[#FEAD5F] font-semibold" : "text-[#F8F8F8] hover:text-[#FEAD5F]"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => 
              isActive ? "text-[#FEAD5F] font-semibold" : "text-[#F8F8F8] hover:text-[#FEAD5F]"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/portfolio"
            className={({ isActive }) => 
              isActive ? "text-[#FEAD5F] font-semibold" : "text-[#F8F8F8] hover:text-[#FEAD5F]"
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => 
              isActive ? "text-[#FEAD5F] font-semibold" : "text-[#F8F8F8] hover:text-[#FEAD5F]"
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
