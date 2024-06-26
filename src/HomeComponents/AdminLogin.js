import React, { useState } from 'react';
import {  Navigate, useNavigate } from 'react-router-dom';
import Image1 from './Images/Image1.png'; // Import your admin image here
import axios from 'axios';

export default function AdminLogin({ setLoginState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/api/v1/adminLogin', {
        userName: username,
        password: password
      });

      if (response.data === true) {
        setLoginState("Admin");
        navigate('/admin/adminhome'); // Navigate to admin home page
        alert('Login successful');
      } else {
        alert('Incorrect username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login validation error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="container mt-5"><br/><br/><br/>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="">
            <div className="row">
              {/* Left side for the image */}
              <div className="col-md-6">
                <img src={Image1} className="card-img" alt="Admin" />
              </div>
              {/* Right side for login fields */}
              <div className="col-md-6">
                <div className="card-body"><br/><br/><br/><br/><br/><br/><br/>
                  <h4 className="card-title"><strong>Admin Login</strong></h4><br/>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label"><b>Username:</b></label>
                      <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label"><b>Password:</b></label>
                      <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <center>
                      <button type="submit" className="btn btn-info">Login</button>
                    </center>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
