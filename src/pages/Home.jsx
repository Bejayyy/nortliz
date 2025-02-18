import React, { useEffect, useState } from 'react';
import svgBackground from '../images/Home-page/unsplash_HdKQ06-VXG4.svg';
import svgHomeAboutImg from '../images/Home-page/profileimage.png';
import offer1 from '../images/Home-page/offer1.svg';
import offer2 from '../images/Home-page/offer2.svg';
import offer3 from '../images/Home-page/offer3.svg';
import { NavLink } from 'react-router-dom';
import { db } from '../Firebase/Firebase'; // Firebase configuration
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import servicesBG from'../images/Home-page/serviceBgto.png';


function Home() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch services from Firestore (Same logic as Services.jsx but limiting to 3 latest)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const fetchedServices = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Sort by `createdAt` descending (if exists), otherwise show the first 3
      const sortedServices = fetchedServices.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setServices(sortedServices.slice(0, 3));
    });

    return () => unsubscribe();
  }, []);

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
      <section className="About-me w-full flex" style={{padding: '50px 0' }}>
        <div className="container mx-auto px-4 flex items-center">
          {/* Left Panel for Image */}
          <div className="left-panel w-full md:w-1/2 pr-4">
            <img 
              src={svgHomeAboutImg} 
              alt="Home About Image" 
              className="mx-auto" 
              style={{ width: '100%', maxWidth: '500px'  }} // Adjust the maxWidth as needed
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

      <section className='p-3 mt-5 '>
        <h2 className="text-4xl text-center p-10 font-semibold items-center" style={{ fontFamily: 'Rozha One, sans-serif' }}>
          What I Offer
        </h2>
        <div className="section3-container flex items-center justify-center gap-4  w-full h-72 px-10 mt-9">
          <div className="div1 flex flex-col items-center w-3/12">
            <img src={offer1} alt="" className="w-full h-60 object-cover" />
            <p className="mt-2 font-semibold"
            style={{fontFamily: 'Patua One'}}>Event Videography</p>
          </div>
          <div className="div2 flex flex-col items-center w-4/12">
            <img src={offer2} alt="" className="w-full h-72 object-cover" />
            <p className="mt-2 font-semibold"
            style={{fontFamily: 'Patua One'}}
            >Filmmaking</p>
          </div>
          <div className="div3 flex flex-col items-center w-3/12">
            <img src={offer3} alt="" className="w-full h-60 object-cover" />
            <p className="mt-2 font-semibold"
            style={{fontFamily: 'Patua One'}}>Photography</p>
          </div>
        </div>
        
      </section>

      {/* Latest Services Section */}
      <section 
  className="text-white py-12 px-8 bg-cover bg-center bg-no-repeat flex flex-col items-center mt-20"
  style={{ backgroundImage: `url(${servicesBG})` }}
>
  <h2 className="text-5xl font-bold text-center mb-8 uppercase text-white tracking-widest mt-6"
   style={{ fontFamily: 'Rozha One, sans-serif' }}
  >Services</h2>

  <div className="grid sm:grid-cols-1 md:grid-cols-3 w-4/5 gap-x-32 gap-y-24 place-items-center">
    {services.map((service) => (
      <div key={service.id} className="flex flex-col items-center p-6 ">
        <div className="text-white  w-[320px] shadow-xl">
          {/* Circular Image */}
          <div className="w-full h-80 border-4 border-white rounded-t-[50%] overflow-hidden  ">
            <img
              src={service.imageUrl || '/default-image.jpg'}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center bg-white text-black py-2 font-semibold">
            {service.title || 'Sample Service Title'}
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Button to Navigate to Full Services Page */}
  <div className="text-center mt-12">
    <button 
      onClick={() => navigate('/services')}
      className="bg-white text-black px-6 py-3 rounded-md shadow-xl font-semibold hover:bg-gray-300 transition duration-300"
    >
      See Packages
    </button>
  </div>
</section>


    </>
  );
}

export default Home;
