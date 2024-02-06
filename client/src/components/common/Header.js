import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/" className={styles.navLink}>Home</Link>
        <Link to="/about" className={styles.navLink}>About</Link>
        {/* Add more links as needed */}
      </nav>
    </header>
  );
}

export default Header;
