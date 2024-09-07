import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ReservationForm.css';  // Make sure to import the CSS file

function ReservationForm() {
    
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_contact: '',
    room_type: 'Single',
    in_date: '',
    out_date: '',
    number_of_rooms: 1
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/reservation', formData)
      .then(() => { 
        navigate('/');
        alert('Room(s) is Booked for Given Date Range & Room Type');
      })
      .catch(error => {
        console.error('Error creating reservation:', error);
        alert('No Room(s) Available for Given Date Range & Room Type');
      });
  };

  return (
    <div className="reservation-form-container">
      <form onSubmit={handleSubmit} className="reservation-form">
        <h1 className="title">Create Reservation</h1>
        <label className="form-label">
          Guest Name:
          <input 
            type="text" 
            name="guest_name" 
            value={formData.guest_name} 
            onChange={handleChange} 
            required 
            className="form-input" 
          />
        </label>
        <label className="form-label">
          Guest Contact:
          <input
          type="text"
          name="guest_contact"
          value={formData.guest_contact}
          onChange={handleChange}
          pattern="\d{4}-\d{7}"
          required
          className="form-input" 
          />
        </label>
        <label className="form-label">
          Room Type:
          <input 
            type="text" 
            name="room_type" 
            value={formData.room_type} 
            onChange={handleChange} 
            required 
            className="form-input" 
          />
        </label>
        <label className="form-label">
          Check-in Date:
          <input 
            type="date" 
            name="in_date" 
            value={formData.in_date} 
            onChange={handleChange} 
            required 
            className="form-input" 
          />
        </label>
        <label className="form-label">
          Check-out Date:
          <input 
            type="date" 
            name="out_date" 
            value={formData.out_date} 
            onChange={handleChange} 
            required 
            className="form-input" 
          />
        </label>
        <label className="form-label">
          Number of Rooms:
          <input 
            type="number" 
            name="number_of_rooms" 
            value={formData.number_of_rooms} 
            onChange={handleChange} 
            min="1" 
            required 
            className="form-input" 
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default ReservationForm;
