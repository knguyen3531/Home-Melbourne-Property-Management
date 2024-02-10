import React, { useState } from 'react';
import './LoginStyles.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isLogin, setIsLogin] = useState(false); // Indicates whether it's login or sign-up form

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    console.log('Form submitted:', { email, password, name, billingAddress, phone });
  };

  const toggleForm = () => {
    setIsLogin(prevIsLogin => !prevIsLogin);
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {!isLogin && (
          <>
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
          </>
        )}
        <div className="form-group">
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </div>
      </form>
      <div className="toggle-button">
        <button onClick={toggleForm}>
          {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
