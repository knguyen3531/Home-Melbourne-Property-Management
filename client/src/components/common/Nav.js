import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './nav.css';
import { useAuth } from '../../utils/AuthContext';

function Nav() {
    const { user, logout } = useAuth();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const history = useHistory();

    const handleLogout = () => {
        setShowLogoutConfirmation(true);
    };

    const confirmLogout = () => {
        logout();
        setShowLogoutConfirmation(false);
        history.push('/');
    };

    const cancelLogout = () => {
        setShowLogoutConfirmation(false);
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout} style={{ marginLeft: "20px", background: "none", border: "none", color: "#757575", cursor: "pointer" }}>Logout</button>
                    {showLogoutConfirmation && (
                        <div style={{ marginTop: "10px" }}>
                            <p>Are you sure you want to logout?</p>
                            <button onClick={confirmLogout}>Yes</button>
                            <button onClick={cancelLogout} style={{ marginLeft: "10px" }}>No</button>
                        </div>
                    )}
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}

export default Nav;
