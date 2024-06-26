import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import pharmsignup from './Images/pharmsignup.avif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function PharmacyRegistration() {
    const [pharmacyName, setPharmacyName] = useState("");
    const [shopRegNo, setShopRegNo] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [location, setLocation] = useState("");
    const [pharmacyImage, setPharmacyImage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("pharmacyImagePreview");
        output.src = URL.createObjectURL(input.files[0]);
    };

    const uploadImage = async (filename) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", filename);

        try {
            const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Image uploaded successfully...");
            } else {
                console.log("Failed to upload the image");
            }
        } catch (error) {
            console.log("Error uploading the image", error);
        }
    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate('/pharmacy-login');
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

    const registerPharmacy = async () => {
        let filename = Date.now() + pharmacyImage;

        try {
            let response = await axios.post('http://localhost:8091/api/v1/addPharmacy', {
                pharmacyName: pharmacyName,
                shopRegNo: shopRegNo,
                email: email,
                mobile: mobile,
                password: password,
                location: location,
                pharmacyImage: filename
            });

            if (response.data) {
                await uploadImage(filename);
                openSuccessModal();
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        registerPharmacy();
    };

    return (
        <div>
            <style>
                {`
                .card {
                    border: 1px solid #ccc;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background-color: #E3D9EC;
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
            <div className="container mt-5"><br /><br /><br /><br /><br />
                <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="card-body">
                        <div className="row mb-3">
                            <div className="col">
                                <p className="text-right">
                                    <strong>Existing user? </strong><Link to="/pharmacy-login"><b>Login</b></Link>
                                </p>
                            </div>
                        </div>
                        <center>
                            <div className="col-md-6">
                                <img src={pharmsignup} alt="Pharmacy" style={{ maxWidth: '200px', height: 'auto' }} />
                            </div>
                        </center>
                        <h2 className="card-title text-center mb-5">Signup</h2>
                        {errorMessage && (
                            <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleRegister}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="pharmacyName" className="form-label"><b>Pharmacy Name</b></label>
                                    <input type="text" className="form-control" id="pharmacyName" value={pharmacyName} onChange={(e) => setPharmacyName(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="shopRegNo" className="form-label"><b>Shop Registered Number</b></label>
                                    <input type="text" className="form-control" id="shopRegNo" value={shopRegNo} onChange={(e) => setShopRegNo(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label"><b>Email</b></label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="mobile" className="form-label"><b>Mobile</b></label>
                                    <input type="text" className="form-control" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">
                                        <FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }} /><b>Password</b>
                                    </label>
                                    <input type='password' className='form-control' id='password' value={password} onChange={handlePasswordChange} required />
                                    <div>Password Strength: {passwordStrength}</div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        <FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }} /><b>Confirm Password</b>
                                    </label>
                                    <input type='password' className='form-control' id='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                                    {!passwordMatch && <div style={{ color: "red" }}>Passwords do not match</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="pharmacyImage" className="form-label"><b>Pharmacy Image</b></label>
                                    <input type="file" className="form-control" id="pharmacyImageInput" onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        setPharmacyImage(e.target.files[0].name);
                                        previewImage(e);
                                    }} required />
                                    <br />
                                    <img
                                        id="pharmacyImagePreview"
                                        className='img-fluid rounded-circle'
                                        width="100px"
                                        height="100px"
                                        alt='Preview image' />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="location" className="form-label"><b>Location</b></label>
                                    <input type="text" className="form-control" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                                </div>
                            </div>
                            <center>
                                <div className="col-md-8">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </center>
                        </form>
                        {successModalOpen && (
                            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body text-center">
                                            <div style={{ fontSize: '64px', color: 'green' }}>
                                                <i className="bi bi-check-circle-fill"></i>
                                            </div>
                                            <h5 className="modal-title mb-3">Registered Successfully!</h5>
                                            <button type="button" className="btn btn-info" onClick={closeSuccessModal}>OK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
