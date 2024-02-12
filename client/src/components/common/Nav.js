import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './nav.css';
import { useAuth } from '../../utils/AuthContext';

function Nav() {
    const { user, logout } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login'); // Redirect to login page immediately after logout
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout} style={{ marginLeft: "20px", background: "none", border: "none", color: "#757575", cursor: "pointer" }}>Logout</button>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </nav>
    );
}

export default Nav;
