// client/src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login as loginUser } from '../../utils/auth'; // Import the login function
import './LoginStyles.css';
import { useAuth } from '../../utils/AuthContext';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting login form with:', email, password); // Logging form input values
        const response = await loginUser({ email, password });
        console.log('Login response:', response); // Logging login response
        if (response.success) {
            console.log('Login successful!'); // Logging success message
            login(response.user); // Update auth context with logged in user
            history.push('/dashboard');
        } else {
            console.error('Login failed:', response.message); // Logging error message
            // Handle login failure (show error message)
            alert(response.message); // Placeholder for error handling
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
