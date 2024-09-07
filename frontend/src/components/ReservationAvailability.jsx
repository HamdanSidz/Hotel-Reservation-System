import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ReservationAvailability.css'; // Importing CSS

function AvailabilityChecker() {
  const [formData, setFormData] = useState({
    room_type: '',
    in_date: '',
    out_date: '',
    number_of_rooms: 1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheck = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/reservation/availability', formData)
      .then(() => alert('Room(s) is/are Available for Given Date Range & Room Type'))
      .catch(error => {
        console.error('Error checking reservation:', error);
        alert('No Room(s) Available for Given Date Range & Room Type');
      });
  };

  return (
    
    <div className="availability-checker-container">
      
      <h1 className="title">Check Room Availability</h1>

      <form onSubmit={handleCheck} className="form">
        <label>
          Room Type:
          <input type="text" name="room_type" value={formData.room_type} onChange={handleChange} required />
        </label>
        <label>
          Check-in Date:
          <input type="date" name="in_date" value={formData.in_date} onChange={handleChange} required />
        </label>
        <label>
          Check-out Date:
          <input type="date" name="out_date" value={formData.out_date} onChange={handleChange} required />
        </label>
        <label>
          Number of Rooms:
          <input type="number" name="number_of_rooms" value={formData.number_of_rooms} onChange={handleChange} min="1" required />
        </label>
        <button type="submit" className="button">Check Availability</button>
      </form>

      <Link to="/reservation" className="button">Book Your Reservation</Link>



    </div>
  );
}

export default AvailabilityChecker;
