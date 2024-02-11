// client/src/components/common/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import { useAuth } from '../../utils/AuthContext';

function Nav() {
    const { currentUser, logout } = useAuth();

    return (
        <nav>
            <Link to="/">Home</Link>
            {currentUser ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={logout} style={{ marginLeft: "20px", background: "none", border: "none", color: "#757575", cursor: "pointer" }}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}

export default Nav;
