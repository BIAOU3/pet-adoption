import React, { useState } from 'react';
import '../css/RegisterForm.css';

const RegisterForm = ({ onNavigate }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    onNavigate('login');
  };

  return (
    <div className="register-form-container">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">SIGN UP</button>
        <div className="login-prompt">
          Already have an account?
          <span onClick={() => onNavigate('login')}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
