import React, { useState, useEffect, useRef } from 'react';
import { db } from '../Firebase/Firebase'; // No need for storage now!
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import uploadIcon from './images/uploadicon.png'

function AdminServices() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // This will hold the base64 string
  const [services, setServices] = useState([]);
  const [notification, setNotification] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // Reference to the file input

  // Fetch services in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Handle file selection & convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding/updating service
  const handleAddService = async () => {
    if (!title || !description || !image) {
      setNotification('Please fill all fields and select an image.');
      return;
    }

    setLoading(true);
    try {
      if (editingService) {
        // Update existing service
        const serviceRef = doc(db, "services", editingService.id);
        await updateDoc(serviceRef, { title, description, imageUrl: image });

        setNotification('Service updated successfully!');
      } else {
        // Add new service
        await addDoc(collection(db, "services"), { title, description, imageUrl: image });

        setNotification('Service added successfully!');
      }

      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setEditingService(null);
      setShowModal(false);
    } catch (error) {
      setNotification(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEditService = (service) => {
    setTitle(service.title);
    setDescription(service.description);
    setImage(service.imageUrl); // This will be the base64 string
    setEditingService(service);
    setShowModal(true);
  };

  // Handle delete
  const handleDeleteService = async (id) => {
    try {
      await deleteDoc(doc(db, "services", id));
      setNotification('Service deleted successfully!');
    } catch (error) {
      setNotification(error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2 mb-6">Services</h1>

      {/* Notification */}
      {notification && <div className="bg-blue-600 text-white p-3 rounded-lg mb-4">{notification}</div>}

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Form */}
        <div className="w-full lg:w-1/2 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
          <label className="block text-lg font-semibold">Service Title</label>
          <input type="text" className="w-full p-2 border rounded mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label className="block text-lg font-semibold mt-4">Service Description</label>
          <textarea className="w-full p-2 border rounded mt-1" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          <label className="block text-lg font-semibold mt-4">Upload Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded mt-1"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button onClick={handleAddService} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            {loading ? 'Processing...' : editingService ? 'Update Service' : 'Add Service'}
          </button>
        </div>

        {/* Preview */}
        <div className="w-full lg:w-1/3 p-6 flex flex-col items-center">
          <div className="bg-black text-white p-4 shadow-md w-[350px]">
            <img
              src={image ? image : uploadIcon}
              alt="Service"
              className="w-full h-64 object-cover rounded-tl-[100px] rounded-tr-[100px] cursor-pointer"
              onClick={() => fileInputRef.current.click()} // Trigger file input on click
            />
            <p className="text-center italic mt-2">{title || 'Sample Service Title'}</p>
            <p className="mt-4 text-center border-t border-white pt-2">{description || 'Sample Service Description'}</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <ul className="mt-8">
        {services.map((service) => (
          <li key={service.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <img src={service.imageUrl} alt={service.title} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <strong>{service.title}</strong>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEditService(service)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDeleteService(service.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminServices;
