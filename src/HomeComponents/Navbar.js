import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Images/Logo.png';
import doc5 from './Images/doc5.svg';

function Navbar() {
  return (
    <div>
      <style>
        {`
          .custom-navbar {
            background-color: #98FF98; /* Feel good color (coral) */
          }

          .navbar-nav .nav-link {
            font-family: 'Jersey 25 Charted'; /* Default font */
          }

          .navbar-logo {
            max-width: 120px;
            max-height: 120px;
            border-radius: 50%;
          }

          .navbar-nav {
            margin-left: auto; /* Pushes all items to the right */
          }

          .navbar-nav .nav-item {
            margin-right: 10px; /* Adjust margin between items */
          }

          .navbar-nav .login-button .btn {
            font-size: 18px;
          }
        `}
      </style>
      <nav className="navbar navbar-expand-lg bg-custom navbar-custom fixed-top custom-navbar">
        <div className="container-fluid">
          
          <Link className="navbar-brand" to="/">
            <img src={doc5} alt="Quick Health Logo" className="navbar-logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link home-link" to="/">
                  <h5><strong>Home  | </strong></h5> 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link about-link" to="/about">
                  <h5><strong>About  |  </strong></h5> 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link contact-link" to="/contact">
                  <h5><strong>Contact  | </strong></h5> 
                </Link>
              </li>&nbsp;
              <li className="nav-item login-button">
                <Link to="/login">
                  <button className="btn btn-warning">LOGIN</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
