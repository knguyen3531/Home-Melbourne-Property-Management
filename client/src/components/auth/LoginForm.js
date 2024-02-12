// client/src/components/auth/LoginForm.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import './LoginStyles.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const auth = useAuth(); // useAuth hook to access the login function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await auth.login(email, password); // Call the login function from the context
            if (response.success) {
                history.push('/dashboard');
            } else {
                alert(response.message);
            }
        } catch (error) {
            // Handle the error if login fails
            alert(error.message);
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
