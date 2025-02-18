import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State to manage selected time frame (week, month, or year)
  const [timeFrame, setTimeFrame] = useState('month');

  // Fetch contacts data from Firebase
  useEffect(() => {
    const db = getDatabase();
    const contactsRef = ref(db, 'contacts'); // Reference to 'contacts' node

    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = [];
      for (let key in data) {
        formattedData.push({ ...data[key], id: key }); // Add the key (id) to the data
      }
      setContacts(formattedData);
      setFilteredContacts(formattedData);
    });
  }, []);

  // Function to calculate bookings count per time frame (week, month, year)
  const getBookingCounts = (timeFrame) => {
    const currentDate = new Date();
    let groupedBookings = { labels: [], bookings: [] };
  
    // Only process contacts if they exist and have a valid 'inquiryDate'
    const groupedData = contacts.reduce((acc, contact) => {
      const date = new Date(contact.inquiryDate);
      if (isNaN(date)) {
        return acc; // Skip invalid dates
      }
  
      let groupLabel;
  
      // Group by the selected time frame (week, month, or year)
      switch (timeFrame) {
        case 'week':
          groupLabel = `${date.getFullYear()}-W${Math.ceil((date.getDate() - date.getDay()) / 7)}`;
          break;
        case 'month':
          groupLabel = `${date.getMonth() + 1}/${date.getFullYear()}`;
          break;
        case 'year':
          groupLabel = `${date.getFullYear()}`;
          break;
        default:
          groupLabel = `${date.getFullYear()}-W${Math.ceil((date.getDate() - date.getDay()) / 7)}`;
      }
  
      if (!acc[groupLabel]) {
        acc[groupLabel] = 0;
      }
      acc[groupLabel]++;
      return acc;
    }, {});
  
    // Ensure that labels and bookings are populated with valid data
    for (let label in groupedData) {
      groupedBookings.labels.push(label);
      groupedBookings.bookings.push(groupedData[label]);
    }
  
    // Handle empty data or NaN
    if (groupedBookings.bookings.length === 0 || groupedBookings.labels.length === 0) {
      groupedBookings = { labels: ['No Data'], bookings: [0] };
    }
  
    return groupedBookings;
  };
  
  // Data for the chart based on selected time frame
  const bookingCounts = getBookingCounts(timeFrame);

  const chartData = {
    labels: bookingCounts.labels,
    datasets: [
      {
        label: 'Bookings',
        data: bookingCounts.bookings,
        fill: false,  // No fill under the line
        borderColor: '#FFFFFF',  // White line color
        tension: 0.1,  // Slight curve
        borderWidth: 2,  // Line thickness
      },
    ],
  };
  
  // Chart options for minimalist black-and-white design
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',  // White legend text
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Dark tooltip background
        titleColor: '#FFFFFF',  // White tooltip title
        bodyColor: '#FFFFFF',  // White tooltip body
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FFFFFF',  // White x-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Light white grid lines
        },
      },
      y: {
        ticks: {
          color: '#FFFFFF',  // White y-axis labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',  // Light white grid lines
        },
      },
    },
  };
  

  // Total, Pending, and Confirmed Bookings
  const totalBookings = contacts.length;
  const pendingBookings = contacts.filter((contact) => contact.status === 'pending').length;
  const confirmedBookings = contacts.filter((contact) => contact.status === 'confirmed').length;

  // Handle Time Frame Change
  const handleTimeFrameChange = (e) => {
    setTimeFrame(e.target.value);
  };

  return (
    <div className="space-y-6 mt-10 lg:mt-0"> {/* Added margin-top for mobile */}
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-gray-300 pb-2">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-black p-6 rounded-lg shadow-md flex">
          {/* Left section for the icon */}
          <div className="flex items-center space-x-3">
            <i className="fas fa-calendar-alt text-4xl text-white"></i> {/* Calendar for Total Bookings */}
          </div>

          {/* Centered section for title and number */}
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Total Bookings</h2>
              <p className="text-4xl font-bold text-white">{totalBookings}</p> {/* Centered number */}
            </div>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg shadow-md flex">
          {/* Left section for the icon */}
          <div className="flex items-center space-x-3">
            <i className="fas fa-clock text-4xl text-white"></i> {/* Clock for Pending Bookings */}
          </div>

          {/* Centered section for title and number */}
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Pending Bookings</h2>
              <p className="text-4xl font-bold text-white">{pendingBookings}</p> {/* Centered number */}
            </div>
          </div>
        </div>

        <div className="bg-black p-6 rounded-lg shadow-md flex">
          {/* Left section for the icon */}
          <div className="flex items-center space-x-3">
            <i className="fas fa-check-circle text-4xl text-white"></i> {/* Check-circle for Confirmed Bookings */}
          </div>

          {/* Centered section for title and number */}
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">Confirmed Bookings</h2>
              <p className="text-4xl font-bold text-white">{confirmedBookings}</p> {/* Centered number */}
            </div>
          </div>
        </div>
      </div>

      {/* Time Frame Filter */}
      <div className="mb-3 text-right">
        <select
          value={timeFrame}
          onChange={handleTimeFrameChange}
          className="p-2 border  border-gray-400 rounded-lg focus:outline-none focus:border-[#000000]"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Booking Trends Chart */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;
