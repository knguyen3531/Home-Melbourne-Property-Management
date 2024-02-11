// Header.js

import React from 'react';
import Nav from './Nav'; // Assuming Nav is your navigation component
import logoImage from '../../Assets/Photo/LOGO.webp'; // Updated import path
import styles from './Header.module.css'; // Import the CSS module

function Header() {
  return (
    <header className={styles.header}> {/* Apply the class from the CSS module */}
      <img src={logoImage} alt="Home Melbourne Logo" className={styles.logo} /> {/* Apply the class from the CSS module */}
      <Nav />
    </header>
  );
}

export default Header;
