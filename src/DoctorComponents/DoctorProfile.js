import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenusMars, faEdit, faStethoscope, faEnvelope, faPhone, faCertificate, faBriefcase, faMoneyBill, faLock, faHospital, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ProfilePictureModal from './ProfilePictureModal';
import ProfileCertificateModal from './ProfileCertificateModal';

export default function DoctorProfile() {
    const [doctor, setDoctor] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            try {
                const doctorId = JSON.parse(sessionStorage.getItem('doctorId'));
                if (doctorId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getDoctorById/${doctorId}`);
                    setDoctor(response.data);
                } else {
                    setErrorMessage("No doctor data found.");
                }
            } catch (error) {
                console.error("Error fetching doctor profile:", error);
                setErrorMessage("Failed to fetch doctor profile. Please try again.");
            }
        };

        fetchDoctorProfile();
    }, []);

    const handleEditProfile = () => {
        navigate("/doctor/edit-profile", { state: { doctor: doctor } });
    };

    const handleUpdateProfilePicture = async (newDoctorPic) => {
        try {
            const updatedDoctor = { ...doctor, doctorPic: newDoctorPic };
            const response = await axios.put(`http://localhost:8091/api/v1/updateDoctors/${doctor.doctorId}`, updatedDoctor);

            if (response.status === 200) {
                setDoctor(updatedDoctor);
                sessionStorage.setItem('doctor', JSON.stringify(updatedDoctor));
            } else {
                console.error("Failed to update profile picture");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    const handleUpdateCertificate = async (newCertificate) => {
        try {
            const updatedDoctor = { ...doctor, certificate: newCertificate };
            const response = await axios.put(`http://localhost:8091/api/v1/updateDoctors/${doctor.doctorId}`, updatedDoctor);

            if (response.status === 200) {
                setDoctor(updatedDoctor);
                sessionStorage.setItem('doctor', JSON.stringify(updatedDoctor));
            } else {
                console.error("Failed to update certificate");
            }
        } catch (error) {
            console.error("Error updating certificate:", error);
        }
    };

    const labelStyle = { display: 'block', margin: '10px 0', fontSize: '1.1rem' };
    const colors = {
        name: '#007bff',
        gender: '#17a2b8',
        specialization: '#28a745',
        email: '#ffc107',
        mobile: '#dc3545',
        certificate: '#6f42c1',
        experience: '#fd7e14',
        hospitalLocation: '#20c997',
        hospitalName: '#343a40',
        consultationFee: '#6610f2',
        password: '#e83e8c',
        doctorAcc: '#ff5733',
    };

    return (
        <div className='container mt-5'>
            <div className='profile-header text-center'>
                {doctor.doctorPic && (
                    <img
                        className='profile-img'
                        src={`http://localhost:8091/uploads/${doctor.doctorPic}`}
                        alt='Doctor profile'
                        onClick={() => setShowProfilePictureModal(true)}
                    />
                )}
                <h2 className='profile-name'>{doctor.doctorName}</h2>
                <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: '#007bff', cursor: 'pointer' }}
                    onClick={() => setShowProfilePictureModal(true)}
                />
                {errorMessage && <p style={{ color: '#dc3545' }}>{errorMessage}</p>}
            </div>

            <div className='profile-details mt-4'>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faVenusMars} style={{ color: colors.gender, marginRight: '5px' }} />
                    <span><strong>Gender:</strong> {doctor.gender}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faStethoscope} style={{ color: colors.specialization, marginRight: '5px' }} />
                    <span><strong>Specialization:</strong> {doctor.specialization}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: colors.email, marginRight: '5px' }} />
                    <span><strong>Email:</strong> {doctor.email}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faPhone} style={{ color: colors.mobile, marginRight: '5px' }} />
                    <span><strong>Mobile:</strong> {doctor.mobile}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faCertificate} style={{ color: colors.certificate, marginRight: '5px' }} />
                    <span>
                        <strong>Certificates:</strong>
                        <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setShowCertificateModal(true)}>
                            {doctor.certificate}
                        </span>
                    </span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faBriefcase} style={{ color: colors.experience, marginRight: '5px' }} />
                    <span><strong>Experience:</strong> {doctor.experience}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: colors.hospitalLocation, marginRight: '5px' }} />
                    <span><strong>Hospital Location:</strong> {doctor.hospitalLocation}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faHospital} style={{ color: colors.hospitalName, marginRight: '5px' }} />
                    <span><strong>Hospital Name:</strong> {doctor.hospitalName}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faMoneyBill} style={{ color: colors.consultationFee, marginRight: '5px' }} />
                    <span><strong>Consultation Fee:</strong> {doctor.consultationFee}</span>
                </div>
                {/*<div className='detail-item'>
                    <FontAwesomeIcon icon={faLock} style={{ color: colors.password, marginRight: '5px' }} />
                    <span><strong>Password:</strong> {doctor.password}</span>
            </div>*/}
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faUser} style={{ color: colors.doctorAcc, marginRight: '5px' }} />
                    <span><strong>Doctor Account Number:</strong> {doctor.drAcc}</span>
                </div>
            </div>

            <div className='text-center'>
                <center>
                <button
                    className='btn btn-primary mt-3'
                    style={{ backgroundColor: '#007bff', border: 'none', borderRadius: '5px', padding: '10px 20px', color: 'white' }}
                    onClick={handleEditProfile}
                >
                    Edit Profile
                </button></center><br/>
                <style>
                    {`
                    .profile-header {
                        margin-bottom: 20px;
                    }
                    
                    .profile-img {
                        width: 180px;
                        height: 180px;
                        object-fit: cover;
                        border-radius: 50%;
                        border: 4px solid #006400;
                        cursor: pointer;
                    }
                    
                    .profile-name {
                        margin-top: 15px;
                        font-size: 1.5rem;
                        color: #007bff;
                    }
                    
                    .profile-details {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 20px;
                    }
                    
                    .detail-item {
                        flex:   30%;
                        font-size: 1.1rem;
                        margin-bottom: 10px;
                    }
                    
                    .detail-item span {
                        display: inline-block;
                    }
                    
                    `}
                </style>
            </div>

            <ProfilePictureModal
                show={showProfilePictureModal}
                handleClose={() => setShowProfilePictureModal(false)}
                onUpdate={handleUpdateProfilePicture}
            />
            <ProfileCertificateModal
                show={showCertificateModal}
                handleClose={() => setShowCertificateModal(false)}
                onUpdate={handleUpdateCertificate}
            />
        </div>
        
    );
}
