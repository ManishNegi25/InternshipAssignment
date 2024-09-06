import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Availability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('15:00');
  const [duration, setDuration] = useState(30);
  const navigate = useNavigate();

  const handleDateChange = (date) => setSelectedDate(date);

  const handleAddAvailability = () => {
    const start = moment(selectedDate).set({
      hour: parseInt(startTime.split(':')[0], 10),
      minute: parseInt(startTime.split(':')[1], 10),
    }).toISOString();

    const end = moment(selectedDate).set({
      hour: parseInt(endTime.split(':')[0], 10),
      minute: parseInt(endTime.split(':')[1], 10),
    }).toISOString();

    const newAvailability = { start, end, duration };

    axios
      .post('http://localhost:5000/api/availability', newAvailability, {
        headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` },
      })
      .then(() => {
        alert('Availability added successfully!');
        navigate('/userdashboard');
      })
      .catch((error) => {
        console.error('Error adding availability:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500 p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Set Your Availability</h2>
        <Calendar onChange={handleDateChange} value={selectedDate} className="w-full mb-6 border rounded-lg" />

        <div className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
              min="15"
            />
          </div>
        </div>

        <button
          onClick={handleAddAvailability}
          className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition duration-200"
        >
          Add Availability
        </button>
      </div>
    </div>
  );
};

export default Availability;
