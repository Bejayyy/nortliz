import React from 'react';
import svgAboutImg from '../images/About-page/about-cover.svg';
import aboutDescription from '../images/About-page/about-description.svg'
import org1 from '../images/About-page/org1.svg'
import org2 from '../images/About-page/org2.svg'
import org3 from '../images/About-page/org3.svg'
import org4 from '../images/About-page/org4.svg'
function About() {
  return (
    <>
      {/* First Section */}
      <section className="relative min-h-screen bg-gray-100">
        <div className="page-1-container flex flex-col lg:flex-row min-h-screen">
          
          {/* Left Section: Text */}
          <div className="left-page w-full lg:w-[40%] flex justify-center items-center px-4 lg:px-8">
            <p 
              className="text-center lg:text-left text-4xl md:text-6xl lg:text-6xl font-serif ml-10" 
              style={{ fontFamily: 'Rozha One, sans-serif' }}
            >
              I CREATE FILMS THAT TELL STORIES, I CAPTURE MOMENTS THAT LAST FOREVER
            </p>
          </div>
          
          {/* Right Section: Image */}
          <div className="right-page w-full lg:w-[60%] flex justify-center items-center mt-8 lg:mt-0">
            <img 
              src={svgAboutImg} 
              alt="Home About Image" 
              className="max-w-full max-h-full" 
              style={{ maxWidth: '700px' }}
            />
          </div>
        </div>
      </section>

      {/* Second Section (Description) */}
      <section className=" bg-gray-100 flex py-12">
        <div className="about-description container mx-auto px-4">
          <div className="description-container flex items-center space-x-8">
            {/* Image Section */}
            <div className="img">
              <img 
                src={aboutDescription} 
                alt="Home About Image" 
                className="max-w-full max-h-full" 
                style={{ maxWidth: '400px' }}
              />
            </div>
            
            {/* Text Section */}
            <p 
              className="text-left text-xl  lg:text-2xl font-serif ml-10" 
              style={{ fontFamily: 'Rozha One, sans-serif' }}
            >
              Norlitz Bato is a highly skilled filmmaker based in Cebu City, Philippines, with over six years of experience in editing and event shooting. He has built a strong reputation for delivering high-quality, visually striking productions that consistently exceed client expectations. His diverse portfolio includes weddings, debuts, corporate videos, and creative projects, showcasing his versatility and expertise in storytelling. Known for his dedication to his craft and keen attention to detail, Norlitz has earned recognition in the industry and the trust of his clients through his exceptional filmmaking and editing skills.
            </p>
          </div>
        </div>
      </section>
      {/* Third Section (Founder) */}
      <section className="bg-[#181818] min-h-screen py-10">
      <div className="founder-container max-w-7xl mx-auto">
        <p
          className="text-white text-xl lg:text-4xl font-serif ml-5 lg:ml-10 mt-5 lg:mt-10"
          style={{ fontFamily: "Rozha One, sans-serif" }}
        >
          Norlitz Bato is
        </p>
        <p
          className="text-white text-xl lg:text-4xl font-serif ml-5 lg:ml-10 mt-2 lg:mt-4"
          style={{ fontFamily: "Rozha One, sans-serif" }}
        >
          Also the Founder of:
        </p>

        <div className="organizations grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4 lg:px-0">
          {/* Organization 1 */}
          <div className="organizations1 bg-white rounded-2xl shadow-lg p-4">
            <div className="img flex justify-center">
              <img
                src={org1}
                alt="SidlawTV"
                className="max-w-full max-h-full rounded-full"
              />
            </div>
            <div className="text mt-4">
              <p className="text-sm text-gray-800">
                SidlawTV is a film streaming site that offers a selection of movies and TV shows to users through the internet. The site provides a platform to watch movies and TV shows online, either on a computer or other compatible device.
              </p>
            </div>
          </div>

          {/* Organization 2 */}
          <div className="organizations2 bg-white rounded-2xl shadow-lg p-4">
            <div className="img flex justify-center">
              <img
                src={org2}
                alt="Norlitz Bato Films"
                className="max-w-full max-h-full rounded-full"
              />
            </div>
            <div className="text mt-4">
              <p className="text-sm text-gray-800">
                Norlitz Bato Films is a photo and video event production company. The company provides professional and high-quality services for various types of events, such as weddings, parties, corporate events, and more.
              </p>
            </div>
          </div>

          {/* Organization 3 */}
          <div className="organizations3 bg-white rounded-2xl shadow-lg p-4">
            <div className="img flex justify-center">
              <img
                src={org3}
                alt="Sidlaw Entertainment"
                className="max-w-full max-h-full rounded-full"
              />
            </div>
            <div className="text mt-4">
              <p className="text-sm text-gray-800">
                Sidlaw Entertainment is a talent management company that specializes in representing film industry professionals such as actors, directors, writers, and producers.
              </p>
            </div>
          </div>

          {/* Organization 4 */}
          <div className="organizations4 bg-white rounded-2xl shadow-lg p-4">
            <div className="img flex justify-center">
              <img
                src={org4}
                alt="Project Bisdak Films"
                className="max-w-full max-h-full rounded-full"
              />
            </div>
            <div className="text mt-4">
              <p className="text-sm text-gray-800">
                Project Bisdak Films is a film production company that specializes in creating and producing films. The company is dedicated to developing and producing high-quality films that entertain, educate, and inspire audiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}

export default About;
