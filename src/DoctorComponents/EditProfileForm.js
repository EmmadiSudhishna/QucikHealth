import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenusMars, faBriefcase, faEnvelope, faPhone, faCertificate, faMoneyBill, faLock, faHospital, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProfileForm({  }) {
    const location = useLocation();
    const { doctor } = location.state || {};
    const navigate = useNavigate();
    const [editedDoctor, setEditedDoctor] = useState(doctor || {
        doctorName: "",
        specialization: "",
        email: "",
        mobile: "",
        hospitalName: "",
        hospitalLocation: "",
        experience: "",
        status: "",
        consultationFee: "",
        password: "",
        gender: "",
        drAcc: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDoctor({ ...editedDoctor, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost:8091/api/v1/updateDoctors/${doctor.doctorId}`, editedDoctor);
            if (response.status === 200) {
                toast.success("Profile updated successfully");
                // Delay navigation to ensure the toast is shown
                setTimeout(() => {
                    navigate("/doctor/viewProfile");
                }, 2000);
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
        }
    };

    return (
        <div className='container mt-5'>
            <ToastContainer />
            <div className='row'>
                <div className='col-sm-6 mx-auto'>
                    <div className='card'>
                        <div className='card-body'>
                            <h3>Edit Profile</h3>
                            <form onSubmit={handleSubmit}>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faUser} /> Doctor Name</label><br />
                                        <input type='text' name='doctorName' value={editedDoctor.doctorName} onChange={handleChange} className='form-control' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faBriefcase} /> Specialization</label><br />
                                        <input type='text' name='specialization' value={editedDoctor.specialization} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faEnvelope} /> Email</label><br />
                                        <input type='email' name='email' value={editedDoctor.email} onChange={handleChange} className='form-control' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faPhone} /> Mobile</label><br />
                                        <input type='text' name='mobile' value={editedDoctor.mobile} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faHospital} /> Hospital Name</label><br />
                                        <input type='text' name='hospitalName' value={editedDoctor.hospitalName} onChange={handleChange} className='form-control' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faMapMarkerAlt} /> Hospital Location</label><br />
                                        <input type='text' name='hospitalLocation' value={editedDoctor.hospitalLocation} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faBriefcase} /> Experience</label><br />
                                        <input type='number' name='experience' value={editedDoctor.experience} onChange={handleChange} className='form-control' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faUser} /> Status</label><br />
                                        <input type='text' name='status' value={editedDoctor.status} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faMoneyBill} /> Consultation Fee</label><br />
                                        <input type='number' name='consultationFee' value={editedDoctor.consultationFee} onChange={handleChange} className='form-control' />
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faLock} /> Password</label><br />
                                        <input type='password' name='password' value={editedDoctor.password} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faVenusMars} /> Gender</label><br />
                                        <input type='radio' id='male' name='gender' value='Male' checked={editedDoctor.gender === 'Male'} onChange={handleChange} />
                                        <label htmlFor='male' style={{ marginRight: '10px', marginLeft: '5px' }}>Male</label>
                                        <input type='radio' id='female' name='gender' value='Female' checked={editedDoctor.gender === 'Female'} onChange={handleChange} />
                                        <label htmlFor='female' style={{ marginRight: '10px', marginLeft: '5px' }}>Female</label>
                                    </div>
                                    <div className='col-sm-6'>
                                        <label><FontAwesomeIcon icon={faCertificate} /> Doctor Account</label><br />
                                        <input type='text' name='drAcc' value={editedDoctor.drAcc} onChange={handleChange} className='form-control' />
                                    </div>
                                </div>
                                <div className='row mt-3'>
                                    <div className='col-sm-12'>
                                        <button type='submit' className='btn btn-primary form-control '>Update Profile</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
