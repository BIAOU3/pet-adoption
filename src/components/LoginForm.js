import React, { useState } from 'react';
import '../css/LoginForm.css';

const LoginForm = ({ onNavigate, onUserLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(credentials.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === credentials.email && user.password === credentials.password);
  
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      onUserLoggedIn(user.email, user.avatar);
      onNavigate('home');
    } else {
      setErrorMessage('Email or password is incorrect.');
    }
  };
  

  return (
    <div className="login-form-container">
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p className="register-prompt">
        Not a member? <span onClick={() => onNavigate('register')}>Click here to register</span>
      </p>
    </div>
  );
};

export default LoginForm;
