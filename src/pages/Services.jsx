import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/Firebase'; // Firebase configuration
import { collection, onSnapshot } from 'firebase/firestore';

// Import the landing image from the correct path
import landingImage from '../images/Services-page/picsure.png';

function Services() {
  const [services, setServices] = useState([]);

  // Fetch services from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="relative min-h-screen bg-white">
      <div className="page-1-container flex lg:flex-row h-[90vh]">
     
     <div className="right-page w-full lg:w-1/2 flex justify-center items-center h-full">
      <img 
        src={landingImage} 
        alt="Home About Image" 
        className="max-w-full max-h-full"
        style={{ maxWidth: '650px' }} // Restrict max width
      />
    </div>

    {/* Left Section: Text */}
    <div className="flex-1 p-8 bg-white lg:w-3/4 flex justify-center items-center">
      <div className="text-right">
        <h1 className="text-4xl font-bold text-black"
        style={{ fontFamily: 'Orelega One'  }}>
          I PROVIDE PROFESSIONAL FILMMAKING SERVICES 
          I DELIVER QUALITY IN EVERY PROJECT
        </h1>
        <p className="text-lg text-gray-600 mt-6">
          From film production to event coverage, my services are tailored to meet your unique needs. Whether it’s capturing life’s precious moments, crafting cinematic content, or producing polished corporate videos, I’m dedicated to bringing your vision to life.
        </p>
        <p className="text-lg text-gray-700 mt-6 font-semibold">
          Let’s bring your vision to life.  
        </p>
      </div>
    </div>

  </div>
</section>
      <section className="bg-black text-white py-12 px-8">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase">Services</h2>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 w-4/5 mx-auto">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center p-6">
              <div className="bg-black text-white p-4 shadow-md w-[350px] mx-auto">
                {/* Image with Rounded Top Corners */}
                <div className="w-full h-80 border-4 border-white rounded-t-[50%] overflow-hidden">
                  <img
                    src={service.imageUrl || '/default-image.jpg'}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center bg-white text-black py-2">
                  {service.title || 'Sample Service Title'}
                </p>
                <div className="mt-4 text-center border border-white p-4 bg-black-800">
                  {service.description || 'Sample Service Description'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;
