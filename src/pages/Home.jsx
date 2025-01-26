import React from 'react';
import svgBackground from '../images/Home-page/unsplash_HdKQ06-VXG4.svg';
import svgHomeAboutImg from '../images/Home-page/home-about.svg';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* Section with background image */}
      <section 
        className='h-screen bg-cover bg-center flex justify-start items-start w-full relative px-5 py-20'
        style={{
          backgroundImage: `url(${svgBackground})`,
        }}
      >
        <div className="title">
          <h1 className='text-white text-4xl md:text-5xl lg:text-4xl ' style={{ fontFamily: 'Rozha One, sans-serif' }}>
            We Film Your Stories
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section className="About-me w-full flex" style={{ backgroundColor: '#f0f0f0', padding: '50px 0' }}>
        <div className="container mx-auto px-4 flex items-center">
          {/* Left Panel for Image */}
          <div className="left-panel w-full md:w-1/2 pr-4">
            <img 
              src={svgHomeAboutImg} 
              alt="Home About Image" 
              className="mx-auto" 
              style={{ width: '100%', maxWidth: '500px' }} // Adjust the maxWidth as needed
            />
          </div>
          <div className="right-panel w-full md:w-1/2 pl-4 pr-4 md:pl-8 md:pr-8">
            <h2 className="text-4xl text-center md:text-left font-semibold" style={{ fontFamily: 'Rozha One, sans-serif' }}>
              About Me
            </h2>
            <p className="mt-6 text-center md:text-left text-lg text-gray-700">
              Norlitz Bato is a Cebu-based filmmaker with over 6 years of experience, specializing in high-quality event shooting and editing. From weddings to corporate projects, he delivers visually stunning and compelling productions.
            </p>

            <NavLink to="about">
            <div className="bg-black text-white py-2 px-6 rounded-lg text-center mt-6 mx-auto md:mx-0 hover:bg-gray-800 cursor-pointer" style={{ width: 'fit-content' }}>
              Read More
            </div>
            </NavLink>
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;
