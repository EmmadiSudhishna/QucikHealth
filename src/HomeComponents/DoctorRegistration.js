import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faMobileAlt, faFilePdf, faHospital, faCalendarAlt, faUserMd, faMapMarkerAlt, faMars, faVenus, faLock, faFileImage, faVenusMars, faUnlockAlt, faMoneyBillAlt, faInfoCircle, faBriefcase, faHospitalAlt } from '@fortawesome/free-solid-svg-icons';
import drsignupimg from './Images/drsignupimg.png'; 
import { FaBriefcase, FaHospital, FaInfoCircle, FaMapMarkerAlt, FaMoneyBillAlt, FaUnlockAlt, FaUser, FaVenusMars } from 'react-icons/fa';

export default function DoctorRegistration() {
    const [doctorName, setDoctorName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [certificate, setCertificate] = useState("");
    const [doctorPic, setDoctorPic] = useState("");
    const [hospitalName, setHospitalName] = useState("");
    const [hospitalLocation, setHospitalLocation] = useState("");
    const [experience, setExperience] = useState(0);
    const [status, setStatus] = useState("");
    const [consultationFee, setConsultationFee] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [gender, setGender] = useState("");
    const [drAcc, setDrAcc] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    const previewImage = (event) => {
        const input = event.target;
        const output = document.getElementById("doctorPic");
        output.src = URL.createObjectURL(input.files[0]);
    }

    const uploadImage = async (filename1) => {
        const formData = new FormData();
        formData.append("file", file1);
        formData.append("filename", filename1);

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
    const uploadDoc = async (filename2) => {
        const formData = new FormData();
        formData.append("file", file2);
        formData.append("filename", filename2);

        try {
            const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("certificates uploaded successfully...");
            } else {
                console.log("Failed to upload the certificates");
            }
        } catch (error) {
            console.log("Error uploading the certificate", error);
        }
    };

    const openSuccessModal = () => {
        setSuccessModalOpen(true);
    };

    const closeSuccessModal = () => {
        setSuccessModalOpen(false);
        navigate('/doctor-login');
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

    const registerDoctor = async () => {
        console.log("in register doc method.");
        let filename1 = Date.now() + doctorPic;
        let filename2 = Date.now() + certificate;

        try {
            let response=await axios.post('http://localhost:8091/api/v1/addDoctor',
            {
                doctorName:doctorName,
                specialization:specialization,
                email:email,
                mobile:mobile,
                certificate:filename2,
                doctorPic:filename1,
                hospitalName:hospitalName,
                hospitalLocation:hospitalLocation,
                experience:experience,
                status:status,
                consultationFee:consultationFee,
                password:password,
                gender:gender,
                drAcc:drAcc
            },{
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            if (response.data) {
                uploadImage(filename1);
                uploadDoc(filename2);
                openSuccessModal(); // Open success modal upon successful registration
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("Registration failed. Please try again.");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        registerDoctor();
    };

    return (
        <div>
            <style>
                {`
                .card {
                    border: 1px solid #ccc;
                    border-radius: 15px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background-color: #BEEAD9;
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
            <div className="container mt-5"><br/><br/><br/><br/><br/>
                <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div className="card-body" style={{ padding: '40px' }}>
                        <div className="row mb-3">
                <div className="col">
                    <p className="text-right">
                        <strong>Existing user? </strong><Link to="/doctor-login"><b>Login</b></Link>
                    </p>
                </div>
            </div>
            <center>
            <div className="col-md-6">
            <img src={drsignupimg} alt="Pharmacy" style={{ maxWidth: '200px', height: 'auto' }} />
        </div>
        </center>
        <h2 className="card-title text-center mb-5">Signup</h2>
                        {errorMessage && (
                            <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                                {errorMessage}
                            </div>
                        )}
                        <form>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faUser} style={{ color: '#007bff' }}/><b>Doctor Name</b></label><br />
                                    <input type='text' placeholder='Enter doctor name' value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faUserMd} style={{ color: '#007bff' }} /><b>Specialization</b></label><br />
                                    <input type='text' placeholder='Enter specialization' value={specialization} onChange={(e) => setSpecialization(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faEnvelope} style={{ color: '#007bff' }}/><b>Email</b></label><br />
                                    <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label> <FontAwesomeIcon icon={faMobileAlt} style={{ color: '#007bff' }}/><b>Mobile</b></label><br />
                                    <input type='text' placeholder='Enter mobile number' value={mobile} onChange={(e) => setMobile(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faFilePdf} style={{ color: '#007bff' }}/><b>Certificate (PDF)</b></label><br />
                                    <input type='file'id='file2' onChange={(e) =>
                                    { 
                                        setFile2(e.target.files[0]);
                                        setCertificate(e.target.files[0].name);
                                    }} 
                                        className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faFileImage} style={{ color: '#007bff' }}/><b>Doctor Picture (Image)</b></label><br />
                                    <input type='file' id='file1' onChange={(e) =>
                                    {
                                        setFile1(e.target.files[0]);
                                        setDoctorPic(e.target.files[0].name);
                                        previewImage(e);
                                    }}
                                        className='form-control' />
                                    <br></br>
                                    <img
                                        id="doctorPic"
                                        className='img-fluid rounded-circle'
                                        width="100px"
                                        height="100px"
                                        alt='Preview image' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faHospitalAlt} style={{ color: '#007bff' }}/><b>Hospital Name</b></label><br />
                                    <input type='text' placeholder='Enter hospital name' value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#007bff' }}/><b>Hospital Location</b></label><br />
                                    <input type='text' placeholder='Enter hospital location' value={hospitalLocation} onChange={(e) => setHospitalLocation(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faBriefcase} style={{ color: '#007bff' }}/><b>Experience</b></label><br />
                                    <input type='number' placeholder='Enter experience' value={experience} onChange={(e) => setExperience(parseInt(e.target.value))} className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faInfoCircle} style={{ color: '#007bff' }}/><b>Status</b></label><br />
                                    <input type='text' placeholder='Enter status' value={status} onChange={(e) => setStatus(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faMoneyBillAlt} style={{ color: '#007bff' }}/> <b>Consultation Fee</b></label><br />
                                    <input type='number' placeholder='Enter consultation fee' value={consultationFee} onChange={(e) => setConsultationFee(parseInt(e.target.value))} className='form-control' />
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }}/><b>Password</b></label><br />
                                    <input type='password' placeholder='Enter password' value={password} onChange={handlePasswordChange} className='form-control' />
                                    <div>Password Strength: {passwordStrength}</div>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faLock} style={{ color: '#007bff' }}/><b>Confirm Password</b></label><br />
                                    <input type='password' placeholder='Confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange} className='form-control' />
                                    {!passwordMatch && <div style={{ color: "red" }}>Passwords do not match</div>}
                                </div>
                            </div>
                            
                            <div className='row mt-3'>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faVenusMars} style={{ color: '#007bff' }}/><b>Gender:</b></label><br />
                                    <input type='radio' id='male' name='gender' value='Male' checked={gender === 'Male'} onChange={() => setGender('Male')} />
                                    <label htmlFor='male' style={{ marginRight: '10px', marginLeft: '5px' }}>Male</label>
                                    <input type='radio' id='female' name='gender' value='Female' checked={gender === 'Female'} onChange={() => setGender('Female')} />
                                    <label htmlFor='female' style={{ marginRight: '10px', marginLeft: '5px' }}>Female</label>
                                </div>
                                <div className='col-sm-6'>
                                    <label><FontAwesomeIcon icon={faUser} style={{ color: '#007bff' }}/><b>Dr Acc</b></label><br />
                                    <input type='text' placeholder='Enter doctor account' value={drAcc} onChange={(e) => setDrAcc(e.target.value)} className='form-control' />
                                </div>
                            </div>
                            <center>
                            <div className='row mt-3'>
                                <div className='col-sm-12'>
                                    <button type='submit' className='btn btn-primary form-control' onClick={handleRegister}>Register Now</button>
                                </div>
                            </div>
                            </center>
                        </form>
                    </div>
                </div>
                </div>
               

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
    

            
    )};
    </div>
    );
}