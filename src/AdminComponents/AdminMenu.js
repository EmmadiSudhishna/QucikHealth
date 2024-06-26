import React from 'react';
import { Link } from 'react-router-dom';
import doc5 from '../HomeComponents/Images/doc5.svg';

export default function AdminMenu() {
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
                    <Link className="nav-link" to="/admin/adminhome"><b><h6>Home</h6></b></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewDoctors"><b><h6>View Doctors</h6></b></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewUsers"><b><h6>View Users</h6></b></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewPharmacy"><b><h6>View Pharmacy</h6></b></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewAppointments"><b><h6>View Appointments</h6></b></Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/viewReviews"><b><h6>View Reviews</h6></b></Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/logout"><b><h6>Logout</h6></b></Link>
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
