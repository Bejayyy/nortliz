import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminGallery() {
  const [images, setImages] = useState([]); // Array to hold multiple images
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false); // To manage loading state

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/path-to-fetch-categories.php');
        
        if (Array.isArray(response.data)) {
          setCategories(response.data); // Set categories if data is an array
        } else {
          console.error('Categories data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      setImages((prevImages) => [...prevImages, file.name]); // Add only the file name to the images state
    });
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const formData = new FormData();
    // For image uploading, append the actual file objects
    const files = event.target.files;
    Array.from(files).forEach((file) => {
      formData.append('images[]', file);
    });
    formData.append('category_id', selectedCategory);

    try {
      const response = await axios.post('/path-to-upload-image.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Images added successfully!');
      setImages([]);
      setSelectedCategory('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error adding the images.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) {
      alert('Please enter a category name');
      return;
    }

    try {
      const response = await axios.post('/path-to-add-category.php', {
        category_name: newCategory,
      });

      if (response.status === 200) {
        alert('New category added successfully!');
        setNewCategory('');
        fetchCategories(); // Refresh the category list
      }
    } catch (error) {
      console.error('Error adding new category:', error);
      alert('There was an error adding the category.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2 mb-6">Gallery</h1>
      <div className="flex gap-8">
        {/* Left: Form */}
        <div className="w-1/2 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Gallery Image</h2>
          <form onSubmit={handleSubmit}>
            <label className="block text-lg font-semibold">Select Category</label>
            <select
              className="w-full p-2 border rounded mt-1"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">Select a Category</option>
              {categories && Array.isArray(categories) && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>

            {/* Option to add a new category */}
            <div className="mt-4">
              <label className="block text-lg font-semibold">Add New Category</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category name"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="mt-2 py-2 px-4 bg-green-500 text-white rounded-md"
              >
                Add Category
              </button>
            </div>

            <label className="block text-lg font-semibold mt-4">Upload Images</label>
            <input
              type="file"
              className="w-full p-2 border rounded mt-1"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
            />

            {/* List of selected images */}
            {images.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Selected Images</h3>
                <ul className="list-disc pl-5 mt-2">
                  {images.map((image, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{image}</span>
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="text-red-500 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Add Images'}
            </button>
          </form>
        </div>

        {/* Right: Display List of Images (If needed) */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4">Current Images in Gallery</h2>
          {/* Here you can display uploaded images from the backend if available */}
        </div>
      </div>
    </div>
  );
}

export default AdminGallery;
