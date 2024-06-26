import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ViewDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllDoctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const updateStatus = async (doctorId, currentStatus) => {
        try {
            const updatedStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
            const response = await axios.put(`http://localhost:8091/api/v1/doctors/${doctorId}/updateStatus`, null, {
                params: { newStatus: updatedStatus }
            });
    
            if (response.status === 200) {
                const updatedDoctors = doctors.map((doctor) => {
                    if (doctor.doctorId === doctorId) {
                        return { ...doctor, status: updatedStatus };
                    }
                    return doctor;
                });
                setDoctors(updatedDoctors);
            } else {
                console.error('Failed to update status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    

    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">View Doctors</h2>
                <div className="table-responsive">
                    <table className="table table-striped custom-table">
                        <thead>
                            <tr>
                                <th>Slno</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>DoctorPic</th>
                                <th>Hospital Name</th>
                                <th>Hospital Location</th>
                                <th>Consultation Fee</th>
                                <th>Doctor Account</th>
                                <th>Status</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{doctor.doctorName}</td>
                                    <td>{doctor.gender}</td>
                                    <td>{doctor.mobile}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.password}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.experience}</td>
                                    <td>
                                        <img
                                            className='profile-img'
                                            src={`http://localhost:8091/uploads/${doctor.doctorPic}`}
                                            alt='doctorPic'
                                            style={{ height: '100px', width: '100px' }}
                                        />
                                    </td>
                                    <td>{doctor.hospitalName}</td>
                                    <td>{doctor.hospitalLocation}</td>
                                    <td>{doctor.consultationFee}</td>
                                    <td>{doctor.drAcc}</td>
                                    <td>{doctor.status}</td>
                                    <td>
                                        <button
                                            className={`btn ${doctor.status === 'Active' ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => updateStatus(doctor.doctorId, doctor.status)}
                                        >
                                            {doctor.status === 'Active' ? 'Inactive' : 'Active'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>
                {`
                .custom-table {
                    border-collapse: separate;
                    border-spacing: 0 8px;
                    width: 100%;
                }

                .custom-table th,
                .custom-table td {
                    padding: 12px;
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid #dddddd;
                    background-color: #f9f9f9;
                }

                .custom-table th {
                    background-color: #333;
                    color: #fff;
                }

                .custom-table tbody tr:nth-child(odd) {
                    background-color: #f2f2f2;
                }

                .custom-table tbody tr:hover {
                    background-color: #e0e0e0;
                }
                `}
            </style>
        </div>
    );
}
