import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import doc5 from '../HomeComponents/Images/doc5.svg';

export default function DoctorMenu() {
  const [doctorPic, setDoctorPic] = useState(null);
  const navigate = useNavigate();
  const [showSchedulesDropdown, setShowSchedulesDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
  const [showReviewsDropdown, setShowReviewsDropdown] = useState(false); // State for reviews dropdown

  useEffect(() => {
    const fetchDoctorPic = async () => {
      try {
        const doctorId = JSON.parse(sessionStorage.getItem('doctorId'));
        if (doctorId) {
          const response = await axios.get(`http://localhost:8091/api/v1/getDoctorById/${doctorId}`);
          setDoctorPic(response.data.doctorPic);
        } else {
          console.error("No doctor ID found in session storage.");
        }
      } catch (error) {
        console.error("Error fetching doctor picture:", error);
      }
    };

    fetchDoctorPic();
  }, []);

  const handleProfileClick = () => {
    navigate("/doctor/viewprofile");
  };

  const handleSchedulesMouseEnter = () => {
    setShowSchedulesDropdown(true);
  };

  const handleSchedulesMouseLeave = () => {
    setShowSchedulesDropdown(false);
  };

  const handleAppointmentsMouseEnter = () => {
    setShowAppointmentsDropdown(true);
  };

  const handleAppointmentsMouseLeave = () => {
    setShowAppointmentsDropdown(false);
  };

  const handleReviewsMouseEnter = () => {
    setShowReviewsDropdown(true);
  };

  const handleReviewsMouseLeave = () => {
    setShowReviewsDropdown(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#98FB98', padding: '15px 0' }}>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="container-fluid">
          <div className="row w-100 align-items-center">
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <Link className="navbar-brand" to="/">
                <img src={doc5} alt="Quick Health Logo" className="navbar-logo" />
              </Link>
            </div>

            <div className="col-md-8">
              <div className="d-flex justify-content-center">
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" style={{ cursor: 'pointer', color: '#333' }} to="/doctor/doctorhome">
                        <b><h6>Home</h6></b>
                      </Link>
                    </li>

                    <li className={`nav-item dropdown ${showSchedulesDropdown ? 'show' : ''}`} onMouseEnter={handleSchedulesMouseEnter} onMouseLeave={handleSchedulesMouseLeave}>
                      <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownSchedules" role="button" aria-expanded={showSchedulesDropdown}>
                        <b><h6>Schedules</h6></b>
                      </div>
                      <ul className={`dropdown-menu ${showSchedulesDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownSchedules">
                        <li><Link className="dropdown-item" to="/doctor/addschedule">Add Schedule</Link></li>
                        <li><Link className="dropdown-item" to="/doctor/viewschedules">View Schedules</Link></li>
                      </ul>
                    </li>

                    <li className={`nav-item dropdown ${showAppointmentsDropdown ? 'show' : ''}`} onMouseEnter={handleAppointmentsMouseEnter} onMouseLeave={handleAppointmentsMouseLeave}>
                      <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownAppointments" role="button" aria-expanded={showAppointmentsDropdown}>
                        <b><h6>Appointments</h6></b>
                      </div>
                      <ul className={`dropdown-menu ${showAppointmentsDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownAppointments">
                        <li><Link className="dropdown-item" to="/doctor/viewappointments">View Appointments</Link></li>
                      </ul>
                    </li>

                    {/* Reviews Dropdown */}
                    <li className={`nav-item dropdown ${showReviewsDropdown ? 'show' : ''}`} onMouseEnter={handleReviewsMouseEnter} onMouseLeave={handleReviewsMouseLeave}>
                      <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownReviews" role="button" aria-expanded={showReviewsDropdown}>
                        <b><h6>Reviews</h6></b>
                      </div>
                      <ul className={`dropdown-menu ${showReviewsDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownReviews">
                        <li><Link className="dropdown-item" to="/doctor/viewreviews">View Reviews</Link></li>
                      </ul>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/doctor/logout">
                        <b><h6>Logout</h6></b>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-2 d-flex justify-content-center align-items-center">
              {doctorPic ? (
                <div className="tooltip-container">
                  <img
                    src={`http://localhost:8091/uploads/${doctorPic}`}
                    alt="Doctor profile"
                    className="rounded-circle profile-img"
                    style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={handleProfileClick}
                  />
                  <span className="tooltip-text">Profile</span>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <style>
        {`
          .navbar-logo {
            max-width: 100px;
            max-height: 100px;
            border-radius: 50%;
          }
          .navbar-nav .nav-item {
            margin: 0 10px;
          }

          .profile-img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            cursor: pointer;
            border: 4px solid #006400;
          }

          .tooltip-container {
            position: relative;
            display: inline-block;
          }
          
          .tooltip-container .tooltip-text {
            visibility: hidden;
            width: 120px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.3s;
          }
          
          .tooltip-container:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}
