import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ViewSchedule() {
    const [doctorId, setDoctorId] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editingSchedule, setEditingSchedule] = useState(null); // Track the schedule being edited
    const [showModal, setShowModal] = useState(false); // Track the modal state

    useEffect(() => {
        const doctorId = sessionStorage.getItem('doctorId'); // Fetch doctorId as a string
        if (doctorId) {
            setDoctorId(doctorId);
            fetchSchedulesByDoctorId(doctorId);
        }
    }, []);

    const fetchSchedulesByDoctorId = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/getSchedulesByDoctorId/${doctorId}`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setErrorMessage('Failed to fetch schedules. Please try again.');
        }
    };

    const deleteSchedule = async (scheduleId) => {
        try {
            const response = await axios.delete(`http://localhost:8091/api/v1/deleteSchedule/${scheduleId}`);
            if (response.status === 200) {
                setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleId));
                toast.success('Schedule deleted successfully!');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setErrorMessage('Failed to delete schedule. Please try again.');
        }
    };

    const updateSchedule = async (scheduleId, updatedSchedule) => {
        try {
            const response = await axios.put(`http://localhost:8091/api/v1/updateSchedule/${scheduleId}`, updatedSchedule);
            if (response.status === 200) {
                fetchSchedulesByDoctorId(doctorId);
                toast.success('Schedule updated successfully!');
                setShowModal(false); // Close the modal
                setEditingSchedule(null); // Reset the editing state
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
            setErrorMessage('Failed to update schedule. Please try again.');
        }
    };

    const handleEditClick = (schedule) => {
        setEditingSchedule(schedule);
        setShowModal(true); // Show the modal
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditingSchedule({ ...editingSchedule, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateSchedule(editingSchedule.scheduleId, editingSchedule);
    };

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">View Schedules</h3>
            <div>
                <h5>Doctor ID: {doctorId}</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-striped custom-table">
                    <thead>
                        <tr>
                            <th>Sl. No.</th>
                            <th>Day</th>
                            <th>Timings</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={schedule.scheduleId}>
                                <td>{index + 1}</td>
                                <td>{schedule.day}</td>
                                <td>{schedule.timings}</td>
                                <td>{schedule.status}</td>
                                <td className="text-center">
                                    <button className="btn btn-info ms-2" onClick={() => handleEditClick(schedule)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger ms-2" onClick={() => deleteSchedule(schedule.scheduleId)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingSchedule && (
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="formDay">
                                <Form.Label>Day</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="day"
                                    value={editingSchedule.day}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTimings">
                                <Form.Label>Timings</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="timings"
                                    value={editingSchedule.timings}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formStatus">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="status"
                                    value={editingSchedule.status}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                            <Button variant="secondary" className="ms-2" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>

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
            {errorMessage && (
                <div style={{ marginBottom: "20px", color: "red", textAlign: "center" }}>
                    {errorMessage}
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
