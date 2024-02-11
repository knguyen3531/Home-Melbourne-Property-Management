// Nav.js

import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Add this line to import the CSS

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Listing</Link>
      <Link to="/login">Login</Link> {/* Add this line */}
      {/* Add more links as needed */}
    </nav>
  );
}

export default Nav;
