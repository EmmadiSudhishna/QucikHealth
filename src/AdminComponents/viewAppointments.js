import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewAppointments() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllAppointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    // Function to group appointments by appointmentId
    const groupAppointmentsByAppointmentId = () => {
        const groupedAppointments = {};
        appointments.forEach((appointment) => {
            if (!groupedAppointments[appointment.appointmentId]) {
                groupedAppointments[appointment.appointmentId] = [];
            }
            groupedAppointments[appointment.appointmentId].push(appointment);
        });
        return groupedAppointments;
    };

    const groupedAppointments = groupAppointmentsByAppointmentId();

    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">View Appointments</h2>
                {Object.keys(groupedAppointments).map((appointmentId, index) => (
                    <div key={appointmentId} className="mb-4">
                        <h4>Appointment ID: {appointmentId}</h4>
                        <div className="table-responsive">
                            <table className="table table-striped custom-table">
                                <thead>
                                    <tr>
                                        <th>Slno</th>
                                        <th>UserId</th>
                                        <th>DoctorId</th>
                                        <th>BookDate</th>
                                        <th>AppointmentDate</th>
                                        <th>AppointmentStatus</th>
                                        <th>AppointmentTime</th>
                                        <th>Symptoms</th>
                                        <th>Weight</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedAppointments[appointmentId].map((appointment, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{appointment.userId}</td>
                                            <td>{appointment.doctorId}</td>
                                            <td>{appointment.bookDate}</td>
                                            <td>{appointment.appointmentDate}</td>
                                            <td>{appointment.appointmentStatus}</td>
                                            <td>{appointment.appointmentTime}</td>
                                            <td>{appointment.symptoms}</td>
                                            <td>{appointment.weight}</td>
                                            <td>{appointment.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
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
