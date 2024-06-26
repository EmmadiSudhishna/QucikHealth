import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainbg10 from './Images/mainbg10.png'; // Import your admin image here
import axios from 'axios';

export default function DoctorLogin({ setLoginState }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleUsernameChange = (e) => {
    setMobile(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8091/api/v1/doctorLogin', {
        mobile: mobile,
        password: password
      });

      if (response.status === 200 && response.data) {
        const { doctorId, status } = response.data;

        if (status === 'Active') {
          sessionStorage.setItem('doctorId', doctorId); // Storing the doctorId in session
          setLoginState("Doctor");
          navigate('/doctor/doctorhome'); // Navigate to doctor home page
          alert('Login successful');
        } else {
          alert('Doctor is inactive. Please contact administrator.');
        }
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
                <div className="card-body"><br/><br/>
                  <h4 className="card-title"><b>Doctor Login</b></h4><br/>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="mobile" className="form-label"><strong>Mobile:</strong></label>
                      <input type="text" className="form-control" id="mobile" value={mobile} onChange={handleUsernameChange} required />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label"><strong>Password:</strong></label>
                      <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-info">Login</button>
                    </div>
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
