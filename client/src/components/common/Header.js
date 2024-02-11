// Header.js
import React from 'react';
import Nav from './Nav';
import logoImage from '../../Assets/Photo/LOGO.webp';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <img src={logoImage} alt="Home Melbourne Logo" className={styles.logo} />
      <Nav />
    </header>
  );
}

export default Header;
