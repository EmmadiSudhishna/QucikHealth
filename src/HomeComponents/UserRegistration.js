import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appointment from './Images/appointment.png'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMobileAlt, faLock, faMapMarkerAlt, faPhoneAlt, faVenusMars } from '@fortawesome/free-solid-svg-icons';

export default function UserRegistration() {
    const navigate = useNavigate(); // useNavigate hook instead of useHistory
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        mobile: '',
        email: '',
        address: '',
        emergencyContact: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePasswordStrength = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLongEnough) {
            setPasswordStrength('Strong');
        } else if (hasUpperCase && hasLowerCase && hasNumber && isLongEnough) {
            setPasswordStrength('Moderate');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePasswordStrength(newPassword);
        setPasswordMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        setPasswordMatch(newConfirmPassword === password);
    };

    const [successModalOpen, setSuccessModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatch) {
            alert("Passwords do not match.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8091/api/v1/addUser', { ...formData, password });
            
            if (response.status === 200) {
                // User added successfully, open success modal
                setSuccessModalOpen(true);
            } else {
                // Handle error, maybe show error message to the user
                console.error('Error adding user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error.message);
        }
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate('/user-login');
    };

    return (
        <div className="container mt-5"><br/><br/><br/><br/><br/><br/><br/>
            <style>
                {`
                .card {
                    border: 1px solid #ccc;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background-color: #C6E2CB;
                }
                
                .card-body {
                    padding: 40px;
                }
                
                .form-label {
                    font-weight: bold;
                    color: #333;
                }
                
                .btn-primary {
                    width: 150px;
                    background-color: #007bff;
                    border-color: #007bff;
                }
                
                .btn-primary:hover {
                    background-color: #0056b3;
                    border-color: #0056b3;
                }
                `}
            </style>
            <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col">
                            <p className="text-right">
                                <strong>Existing user? </strong><Link to="/user-login"><b>Login</b></Link>
                            </p>
                        </div>
                    </div>
                    <center>
                        <div className="col-md-6">
                            <img src={appointment} alt="Pharmacy" style={{ maxWidth: '200px', height: 'auto' }} />
                        </div>
                    </center>
                    <h2 className="card-title text-center mb-5">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    <FontAwesomeIcon icon={faUser} style={{ color: '#007bff' }} /> <b>User Name</b>
                                </label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">
                                    <FontAwesomeIcon icon={faVenusMars} style={{ color: '#007bff' }} /> <b>Gender</b>
                                </label><br />
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={handleChange} required />
                                    <label className="form-check-label" htmlFor="male">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="gender" id="female" value="Female" onChange={handleChange} required />
                                    <label className="form-check-label" htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">
                                    <FontAwesomeIcon icon={faEnvelope} style={{ color: '#007bff' }}/> <b>Email</b>
                                </label>
                                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="mobile" className="form-label">
                                    <FontAwesomeIcon icon={faMobileAlt} style={{ color: '#007bff' }}/> <b>Mobile</b>
                                </label>
                                <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">
                                    <FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }}/><b>Password</b>
                                </label>
                                <input type='password' className='form-control' id='password' value={password} onChange={handlePasswordChange} required />
                                <div>Password Strength: {passwordStrength}</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="confirmPassword" className="form-label">
                                    <FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }}/><b>Confirm Password</b>
                                </label>
                                <input type='password' className='form-control' id='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                                {!passwordMatch && <div style={{ color: "red" }}>Passwords do not match</div>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#007bff' }} /> <b>Address</b>
                                </label>
                                <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="emergencyContact" className="form-label">
                                    <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#007bff' }} /> <b>Emergency Contact</b>
                                </label>
                                <input type="text" className="form-control" id="emergencyContact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <center>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </center>
                        </div>
                    </form>
                </div>
            </div>
           
<br/><br/>


            {successModalOpen && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <div style={{ fontSize: '64px', color: 'green' }}>
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <h5 className="modal-title mb-3">Registered Successfully!</h5>
                                <button type="button" className="btn btn-info" onClick={handleCloseSuccessModal}>OK</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
