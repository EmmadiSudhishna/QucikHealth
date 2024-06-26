import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import doc5 from '../HomeComponents/Images/doc5.svg';

export default function AdminMenu() {
    const [pharmacy, setPharmacy] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPharmacyData = async () => {
            try {
                const pharmacyId = JSON.parse(sessionStorage.getItem('pharmacyId'));
                if (pharmacyId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getPharmacyById/${pharmacyId}`);
                    setPharmacy(response.data);
                }
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
            }
        };

        fetchPharmacyData();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-sm" style={{ backgroundColor: '#98FB98', padding: '20px 0' }}>
                <div className="container-fluid">
                    <div className="row w-100 align-items-center">
                        <div className="col-md-2 d-flex justify-content-center align-items-center">
                            <Link className="navbar-brand" to="/">
                                <img src={doc5} alt="Quick Health Logo" className="navbar-logo" />
                            </Link>
                        </div>
                        <div className="col-md-10 d-flex justify-content-center">
                            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/pharmacy/pharmacyhome"><b><h6>Home</h6></b></Link>
                                    </li>
                                    {/*<li className="nav-item">
                                        <Link className="nav-link" to="/pharmacy/profile"><b><h6>Profile</h6></b></Link>
    </li>*/}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/pharmacy/viewprescriptions"><b><h6>View Prescriptions</h6></b></Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/pharmacy/logout"><b><h6>Logout</h6></b></Link>
                                    </li> 

                                </ul>
                                <div className="col-md-6 d-flex justify-content-end">
                            {pharmacy.pharmacyImage && (
                                <img
                                    src={`http://localhost:8091/uploads/${pharmacy.pharmacyImage}`}
                                    alt="Pharmacy Profile"
                                    className="navbar-profile-img"
                                    onClick={() => navigate("/pharmacy/profile")}
                                />
                            )}
                        </div>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
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
                        margin: 0 5px;
                    }
                    .navbar-profile-img {
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                        border-radius: 50%;
                        cursor: pointer;
                        border: 2px solid #28a745;
                    }
                `}
            </style>
        </div>
    );
}
