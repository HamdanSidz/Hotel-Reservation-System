import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ReservationList.css';

function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/reservation')
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/reservation/${id}`)
      .then(() => setReservations(reservations.filter(reservation => reservation.reservation_id !== id)))
      .catch(error => console.error('Error deleting reservation:', error));
  };

  return (
    <div className="reservation-list-container">
      <h1 className="title">Reservations</h1>

      <Link to="/reservation" className="create-reservation-button">
        Create New Reservation
      </Link>

      <ul className="reservation-list">
        {reservations.map(reservation => (
          <li key={reservation.reservation_id} className="reservation-item">
            <div className="reservation-details">
              <strong>Guest Name:</strong> {reservation.guest_name}<br />
              <strong>Contact:</strong> {reservation.guest_contact}<br />
              <strong>Room Type:</strong> {reservation.room_type}<br />
              <strong>Check-in:</strong> {reservation.in_date}<br />
              <strong>Check-out:</strong> {reservation.out_date}<br />
              <strong>Number of Rooms:</strong> {reservation.number_of_rooms}
            </div>
            <div className="reservation-actions">
              <Link to={`/reservation/update/${reservation.reservation_id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(reservation.reservation_id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
