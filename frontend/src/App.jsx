import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';
import Layout from './components/Layout';
import AvailabilityChecker from './components/ReservationAvailability';
import Contact from './components/Contact';
import UpdateReservationForm from './components/UpdateReservationForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ReservationList />} />
          <Route path="/reservation" element={<ReservationForm />} />
          <Route path="/availability" element={<AvailabilityChecker />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/reservation/update/:id" element={<UpdateReservationForm />} />  

        </Route>
      </Routes>
    </Router>
  );
}


export default App
