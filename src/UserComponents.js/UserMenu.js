import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import doc5 from '../HomeComponents/Images/doc5.svg';

export default function UserMenu() {
  const [showSchedulesDropdown, setShowSchedulesDropdown] = useState(false);
  const [showAppointmentsDropdown, setShowAppointmentsDropdown] = useState(false);
  const [showMedicalHistoryDropdown, setShowMedicalHistoryDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showBankAccountDropdown, setShowBankAccountDropdown] = useState(false);
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);


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

  const handleMedicalHistoryMouseEnter = () => {
    setShowMedicalHistoryDropdown(true);
  };

  const handleMedicalHistoryMouseLeave = () => {
    setShowMedicalHistoryDropdown(false);
  };

  const handleProfileMouseEnter = () => {
    setShowProfileDropdown(true);
  };

  const handleProfileMouseLeave = () => {
    setShowProfileDropdown(false);
  };

  const handleBankAccountMouseEnter = () => {
    setShowBankAccountDropdown(true);
  };

  const handleBankAccountMouseLeave = () => {
    setShowBankAccountDropdown(false);
  };

 
  const userId = sessionStorage.getItem('userId');

  return (
    <div>
      <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#98FB98', padding: '15px 0' }}>
        <div className="container-fluid">
          <div className="row w-100 align-items-center">
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <Link className="navbar-brand" to="/">
                <img src={doc5} alt="Quick Health Logo" className="navbar-logo" />
              </Link>
            </div>
            <div className="col-md-10">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-center" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" style={{ cursor: 'pointer', color: '#333' }} to="/user/userhome"><b><h6>Home</h6></b></Link>
                  </li>

                  <li className={`nav-item dropdown ${showProfileDropdown ? 'show' : ''}`} onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
                    <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownProfile" role="button" aria-expanded={showProfileDropdown}>
                      <b><h6>Profile</h6></b>
                    </div>
                    <ul className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownProfile" style={{ color: '#800080' }}>
                      <li><Link className="dropdown-item" style={{ cursor: 'pointer' }} to="/user/viewprofile">View Profile</Link></li>
                    </ul>
                  </li>
                  <li className={`nav-item dropdown ${showMedicalHistoryDropdown ? 'show' : ''}`} onMouseEnter={handleMedicalHistoryMouseEnter} onMouseLeave={handleMedicalHistoryMouseLeave}>
                    <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownMedicalHistory" role="button" aria-expanded={showMedicalHistoryDropdown}>
                      <b><h6>MedicalHistory</h6></b>
                    </div>
                    <ul className={`dropdown-menu ${showMedicalHistoryDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownMedicalHistory">
                      <li><Link className="dropdown-item" to="/user/addmedicalhistory">Add MedicalHistory</Link></li>
                      <li><Link className="dropdown-item" to={`/user/viewmedicalhistory/${userId}`}>View MedicalHistory</Link></li>
                    </ul>
                  </li>

                  <li className={`nav-item dropdown ${showBankAccountDropdown ? 'show' : ''}`} onMouseEnter={handleBankAccountMouseEnter} onMouseLeave={handleBankAccountMouseLeave}>
                    <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownBankAccount" role="button" aria-expanded={showBankAccountDropdown}>
                      <b><h6>Accounts</h6></b>
                    </div>
                    <ul className={`dropdown-menu ${showBankAccountDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownBankAccount" style={{ color: '#800080' }}>
                      <li><Link className="dropdown-item" style={{ cursor: 'pointer' }} to="/user/addbankaccount">AddBankAccount </Link></li>
                    </ul>
                  </li>

                  <li className={`nav-item dropdown ${showAppointmentsDropdown ? 'show' : ''}`} onMouseEnter={handleAppointmentsMouseEnter} onMouseLeave={handleAppointmentsMouseLeave}>
                    <div className="nav-link" style={{ cursor: 'pointer', color: '#333' }} id="navbarDropdownAppointments" role="button" aria-expanded={showAppointmentsDropdown}>
                      <b><h6>Appointments</h6></b>
                    </div>
                    <ul className={`dropdown-menu ${showAppointmentsDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdownAppointments" style={{ color: '#800080' }}>
                      <li><Link className="dropdown-item" to={`/user/userappointments/${userId}`}>View Appointment History</Link></li>
                    </ul>
                  </li>

                

                  <li className="nav-item">
                    <Link className="nav-link" to="/user/logout"><b><h6>Logout</h6></b></Link>
                  </li>
                </ul>
              </div>
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
        `}
      </style>
    </div>
  );
}
