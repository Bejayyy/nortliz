import React, { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database'; // Import the correct database functions
import contactImage from "../images/Contact-page/image.png";

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    package: '',
    eventDate: '',
    comments: '',
    status: 'pending' // Default status is 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");

    // Initialize the database and reference
    const db = getDatabase();  // Get the database instance
    const formDataRef = ref(db, 'contacts'); // Create a reference to 'contacts' node

    // Save form data to Firebase Realtime Database
    push(formDataRef, formData)  // Push form data to the database
      .then(() => {
        console.log('Data saved successfully');
        // Show a success alert
        window.alert("Form submitted successfully!");

        // Optionally, reset the form after submission
        setFormData({
          name: '',
          email: '',
          address: '',
          phone: '',
          package: '',
          eventDate: '',
          comments: '',
          status: 'pending' // Reset status to 'pending' after submission
        });
      })
      .catch((error) => {
        console.error('Error saving data: ', error);
      });
  };

  return (
    <div className="bg-white relative">
      {/* Top Header Section */}
      <div className="flex justify-end px-5 py-10 relative w-full ">
        <div className="max-w-full sm:max-w-[60%] w-full">
          <h1 className="text-xl font-bold leading-tight text-right sm:text-center pr-5" style={{ fontFamily: 'Rozha One' }}>
            We’d love to hear from you! Whether you're looking for high-quality filmmaking services, have questions, or want to collaborate on your next project, we're here to assist.
          </h1>
        </div>
      </div>

      {/* Main Section with Form on the Left and Image + Contact Information on the Right */}
      <div className="relative flex flex-col lg:flex-row justify-center items-start gap-10 px-5 lg:px-10">
        {/* Form Section */}
        <div className="bg-black text-white w-full lg:w-[780px] h-auto p-6 sm:p-10 rounded-tl-[100px] sm:rounded-tl-[270px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] shadow-lg relative z-[10] mt-[80px]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center" style={{ fontFamily: 'Rozha One' }}>
            Book Now!
          </h2>
          <p className="text-center text-gray-300 mt-2 sm:px-10 px-5" style={{ fontFamily: 'Rozha One', fontSize: '20px' }}>
            Feel free to send us your inquiries or project details using the form below, and we'll get back to you as soon as possible!
          </p>

          <form onSubmit={handleSubmit} className="mt-6 font-[Cormorant_Garamond] text-lg">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16">
              <div className="form-field">
                <label className="block mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                  required
                />
              </div>
              <div className="form-field">
                <label className="block mb-1">Email Address:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                  required
                />
              </div>
            </div>

            {/* Address & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="form-field">
                <label className="block mb-1">Personal Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                />
              </div>
              <div className="form-field">
                <label className="block mb-1">Contact Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                />
              </div>
            </div>

            {/* Package & Event Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="form-field">
                <label className="block mb-1">Desired Package:</label>
                <input
                  type="text"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                />
              </div>
              <div className="form-field">
                <label className="block mb-1">Event Date:</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full p-5 h-15 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
                />
              </div>
            </div>

            {/* Additional Comments */}
            <div className="form-field mt-4">
              <label className="block mb-1">Additional Comments:</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                style={{ height: "220px" }}
                className="w-full p-5 bg-black border border-white rounded-md focus:outline-none focus:border-[#FEAD5F]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-10 text-center">
              <button
                type="submit"
                style={{ backgroundColor: "white", color: "black", fontFamily: 'Rozha One', fontSize: '20px' }}
                className="w-35 font-bold px-6 py-3 rounded-md transition"
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7a140")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Image and Contact Information */}
        <div className="flex flex-col w-full lg:w-auto">
          {/* Image Section */}
          <div className="relative flex justify-center gap-10 px-5 mb-10">
            <div className=" w-full h-full">
              <img src={contactImage} alt="Contact Image" className="w-full h-full object-cover " />
            </div>
          </div>

          {/* Contact Information Box */}
          <div className="contact-info w-full lg:w-auto">
            <div className="bg-white text-black p-7 border-2 border-black shadow-lg h-[450px]">
              <h3 className="text-2xl font-bold text-center mb-4" style={{ fontFamily: "Rozha One", fontSize: '35px' }}>
                Contact Information
              </h3>
              <p
                className="text-center text-gray-600 relative top-[-20px]"
                style={{ fontFamily: "Cormorant Garamond", fontSize: '25px' }}
              >
                Say something to start a live chat!
              </p>
              <ul className="mt-6 flex flex-col gap-10" style={{ fontFamily: "Tienne", fontSize: '25px' }}>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2 w-5 h-5"></i> 0939 740 7513
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 w-5 h-5"></i> norlitzbato@gmail.com
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2 w-5 h-5"></i> Cebu City, Philippines
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
