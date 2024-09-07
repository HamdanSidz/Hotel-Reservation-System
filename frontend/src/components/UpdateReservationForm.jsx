import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ReservationForm.css';  // Reuse the styles from the create form

function UpdateReservationForm() {
  const { id } = useParams();  // Get the reservation ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    room_type: '',
    in_date: '',
    out_date: '',
    number_of_rooms: 1
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/reservation/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching reservation:', error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/api/reservation/${id}`, formData)
      .then(() => {
        alert('Reservation updated successfully!');
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating reservation:', error);
        alert('Failed to update reservation.');
      });
  };

  return (
    <div className='reservation-form-container'>
      <form onSubmit={handleSubmit} className="reservation-form">
        <h1>Update Reservation</h1>
        <label className="form-label">
          Room Type:
          <input type="text" name="room_type" value={formData.room_type} onChange={handleChange} className="form-input" required />
        </label>
        <label className="form-label">
          Check-in Date:
          <input type="date" name="in_date" value={formData.in_date} onChange={handleChange} className="form-input" required />
        </label>
        <label  className="form-label">
          Check-out Date:
          <input type="date" name="out_date" value={formData.out_date} onChange={handleChange} className="form-input" required />
        </label>
        <label  className="form-label">
          Number of Rooms:
          <input type="number" name="number_of_rooms" value={formData.number_of_rooms} onChange={handleChange} min="1" className="form-input" required />
        </label>
        <button type="submit" className="button">Update Reservation</button>
      </form>
    </div>
  );
}

export default UpdateReservationForm;
