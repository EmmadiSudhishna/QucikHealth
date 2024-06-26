import React, { useState } from 'react';
import {  Navigate, useNavigate } from 'react-router-dom';
import mainbg10 from './Images/mainbg10.png'; // Import your admin image here
import axios from 'axios';

export default function DoctorLogin({ setLoginState }) {
  const [mobile, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate(); // Hook for programmatic navigation

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/api/v1/userLogin', {
        mobile: mobile,
        password: password
      });

      if (response.status === 200 && response.data) {
        sessionStorage.setItem('userId', response.data.userId);
        setLoginState("User");
        Navigate('/user/userhome'); // Navigate to admin home page
        alert('Login successfull');
      } else {
        alert('Incorrect username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login validation error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="container mt-5"><br/><br/><br/><br/><br/><br/><br/>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="">
            <div className="row">
              {/* Left side for the image */}
              <div className="col-md-6">
                <img src={mainbg10} className="card-img" alt="Doctor" />
              </div>
              {/* Right side for login fields */}
              <div className="col-md-6">
                <div className="card-body"><br/><br/><br/>
                  <h4 className="card-title"><strong>User Login</strong></h4><br/>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label"><b>Mobile:</b></label>
                      <input type="text" className="form-control" id="mobile" value={mobile} onChange={handleUsernameChange} required/>
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
