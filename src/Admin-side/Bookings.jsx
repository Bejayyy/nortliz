import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database'; // Import remove for deleting a booking

const Bookings = () => {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const [dropdownVisible, setDropdownVisible] = useState(null); // State to control the visibility of the dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Track whether the sidebar is open

  const itemsPerPage = 5;

  // Fetch the data from Firebase
  useEffect(() => {
    const db = getDatabase();
    const formDataRef = ref(db, 'contacts'); // Reference to 'contacts' node

    // Get data once from Firebase
    onValue(formDataRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = [];
      for (let key in data) {
        formattedData.push({ ...data[key], id: key }); // Add the key (id) to the data
      }
      setFormData(formattedData);
      setFilteredData(formattedData); // Initially, show all data
    });
  }, []);

  // Search handler to filter data based on the search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = formData.filter((data) =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      data.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Sorting handler for sorting data based on a column
  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'); // Toggle sort direction
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to update the status in Firebase
  const handleStatusChange = (id, newStatus) => {
    const db = getDatabase();
    const statusRef = ref(db, 'contacts/' + id); // Reference to the specific booking

    update(statusRef, { status: newStatus })
      .then(() => {
        console.log('Status updated successfully');
        const updatedData = filteredData.map((data) => {
          if (data.id === id) {
            return { ...data, status: newStatus };
          }
          return data;
        });
        setFilteredData(updatedData); // Update local state with new status
      })
      .catch((error) => {
        console.error('Error updating status: ', error);
      });
  };

  // Function to remove a booking from Firebase
  const handleRemoveBooking = (id) => {
    const db = getDatabase();
    const bookingRef = ref(db, 'contacts/' + id); // Reference to the specific booking to remove

    // Remove the booking from Firebase
    remove(bookingRef)
      .then(() => {
        console.log('Booking removed successfully');
        // Update local state to reflect the removed booking
        const updatedData = filteredData.filter((data) => data.id !== id);
        setFilteredData(updatedData);
        setFormData(updatedData); // Update the formData as well
      })
      .catch((error) => {
        console.error('Error removing booking: ', error);
      });
  };

  // Function to toggle dropdown visibility on hover
  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index); // Show/hide the dropdown for the hovered row
  };

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6 lg:mt-0 mt-10"> {/* Added conditional margin-top for mobile */}
      <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2">Bookings</h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="p-2 border border-gray-400 text-white rounded-lg focus:outline-none focus:border-[#000000]"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Responsive Table with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-black text-white">
              <tr>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('phone')}>Phone</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('package')}>Package</th>
                <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('eventDate')}>Event Date</th>
                <th className="py-3 px-6 text-left">Comments</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data, index) => (
                <tr key={data.id} onMouseEnter={() => toggleDropdown(index)} onMouseLeave={() => toggleDropdown(null)} className="hover:bg-gray-200">
                  <td className="py-3 px-6">{data.name}</td>
                  <td className="py-3 px-6">{data.email}</td>
                  <td className="py-3 px-6">{data.phone}</td>
                  <td className="py-3 px-6">{data.package}</td>
                  <td className="py-3 px-6">{data.eventDate}</td>
                  <td className="py-3 px-6">{data.comments}</td>
                  <td className="py-3 px-6">{data.status}</td>
                  <td className="py-3 px-6">
                    <button
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-black text-white shadow-sm px-4 py-2 bg-gray-700 hover:bg-gray-600"
                    >
                      Actions
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownVisible === index && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                      >
                        <div className="py-1">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            onClick={() => handleStatusChange(data.id, 'pending')}
                          >
                            Set to Pending
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            onClick={() => handleStatusChange(data.id, 'confirmed')}
                          >
                            Set to Confirmed
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            onClick={() => handleStatusChange(data.id, 'cancelled')}
                          >
                            Set to Cancelled
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-red-600"
                            role="menuitem"
                            onClick={() => handleRemoveBooking(data.id)} // Remove booking
                          >
                            Remove Booking
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center py-4">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <span className="px-4 py-2 text-black">
            Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
          </span>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-600"
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
