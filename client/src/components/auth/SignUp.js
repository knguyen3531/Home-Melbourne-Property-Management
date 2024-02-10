// SignUp.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory(); // Initialize useHistory hook

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform sign up logic here
      const response = await axios.post('/api/signup', {
        email,
        password,
        name,
        billingAddress,
        phone
      });
      console.log('User signed up successfully:', response.data);
      history.push('/tenant'); // Redirect to Tenant Page on successful sign up
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Billing Address:</label>
          <input type="text" value={billingAddress} onChange={e => setBillingAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
