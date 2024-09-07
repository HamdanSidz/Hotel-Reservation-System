import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Import your CSS

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <main>
      
        <Outlet />

      </main>

      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">Hotel Management</a>
        <ul className="navbar-links">
          <li><a href="/">Reservations</a></li>
          <li><a href="/reservation">MakeReservation</a></li>
          <li><a href="/availability">CheckAvailability</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; 2024 Hotel Management. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Layout;
