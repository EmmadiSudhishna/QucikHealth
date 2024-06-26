import React from 'react';
import { Link } from 'react-router-dom';
import adminsvg from './Images/adminsvg.svg';
import doctor from './Images/doctor.svg';
import patient from './Images/patient.svg';
import pharmlogo2 from './Images/pharmlogo2.png';

export default function Login() {
  return (
    <div className="container mt-5"><br/><br/><br/><br/><br/><br/>
      <div className="row justify-content-left">
        <div className="col-md-8">
          <h2 className="card-title">Login/Signup</h2>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow text-center">
            <img src={adminsvg} className=" img-fluid card-img-top mx-auto mt-3 rounded" alt="Admin" style={{ width: '80px', height: '80px', objectFit: 'cover' }} /><br/>
            <div className="card-body">
              <h5 className="card-title  justify-content-left">For Admin</h5><br/>
              <p className="card-text">Login as an admin to manage the system.</p><br/><br/><br/>
              <Link to="/admin-login" className="btn btn-warning">Login</Link>

            </div>
          </div>
        </div><br/>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow text-center">
            <img src={doctor} className=" img-fluid card-img-top mx-auto mt-3 rounded" alt="Doctor" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">For Doctor</h5><br/>
              <p className="card-text text-center">Launch your online practice today and connect with your patients anytime, anywhere. Getting started on Quickconsult takes just a few minutes.</p>
              <p style={{ color: '#808080' }}>* If you are not a member Signup Now!</p><br/>
              <Link to="/doctor-signup" className="btn btn-success">Signup</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/doctor-login" className="btn btn-warning ml-2">Login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow text-center">
            <img src={patient} className=" img-fluid card-img-top mx-auto mt-3 rounded" alt="Patient" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">For User</h5>&nbsp;&nbsp;
              <p className="card-text">Login to QuickHealth to consult with your doctors from the safety of your home. Receive instant prescriptions and save more time in the day to focus on your health.</p>
              <p style={{ color: '#808080' }}>* If you are not a member Signup Now!</p>
              <Link to="/user-signup" className="btn btn-success">Signup</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/user-login" className="btn btn-warning ml-2">Login</Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow text-center">
            <img src={pharmlogo2} className="img-fluid card-img-top mx-auto mt-3 rounded" alt="atoz" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">For Pharmacy</h5><br/>
              <p className="card-text">Launch your online practice today and connect with your patients anytime, anywhere. Getting started on Quickconsult takes just a few minutes.</p>
              <p style={{ color: '#808080' }}>* If you are not a member Signup Now!</p><br/>
              <Link to="/pharmacy-signup" className="btn btn-success">Signup</Link>&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/pharmacy-login" className="btn btn-warning ml-2">Login</Link>
            </div>
          </div><br/><br/>
        </div>
      </div>
    </div>
  );
}
