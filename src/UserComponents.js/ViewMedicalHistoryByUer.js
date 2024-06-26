import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

export default function ViewMedicalHistoryByUser() {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editingRecord, setEditingRecord] = useState(null); // Track the record being edited
    const [showEditModal, setShowEditModal] = useState(false); // Track the edit modal state
    const { userId } = useParams();

    useEffect(() => {
        // Fetch medical history data from the API
        const fetchMedicalHistory = async () => {
            try {
                setErrorMessage(''); // Clear any previous error message
                const response = await axios.get(`http://localhost:8091/api/v1/medical-history/${userId}`);
                setMedicalHistory(response.data);
            } catch (error) {
                console.error('Error fetching medical history:', error);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    setErrorMessage(error.response.data.message || 'An error occurred while fetching medical history.');
                } else {
                    setErrorMessage('An error occurred while fetching medical history.');
                }
            }
        };

        fetchMedicalHistory();
    }, [userId]);

    const handlePrescriptionClick = () => {
        // Add your logic here for handling prescription button click
        toast.info('Prescription feature coming soon!');
    };

    const handleDeleteClick = async (medicalId) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`http://localhost:8091/api/v1/deleteMedicalHistory/${medicalId}`);
                setMedicalHistory(medicalHistory.filter(record => record.medicalId !== medicalId));
                toast.success('Record deleted successfully!');
            } catch (error) {
                console.error('Error deleting record:', error);
                setErrorMessage('An error occurred while deleting the record.');
            }
        }
    };

    const handleEditClick = (record) => {
        setEditingRecord(record);
        setShowEditModal(true); // Show the edit modal
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditingRecord({ ...editingRecord, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8091/api/v1/updateMedicalHistory/${editingRecord.medicalId}`, editingRecord);
            setMedicalHistory(medicalHistory.map(record => (record.medicalId === editingRecord.medicalId ? editingRecord : record)));
            toast.success('Record updated successfully!');
            setShowEditModal(false); // Close the modal
            setEditingRecord(null); // Reset the editing state
        } catch (error) {
            console.error('Error updating record:', error);
            setErrorMessage('An error occurred while updating the record.');
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer />

            <div style={styles.modalOverlay}>
                <div style={styles.modal}>
                    <div style={styles.modalHeader}>
                        <h2 style={styles.title}><b>Medical History</b></h2>
                        <button onClick={() => window.history.back()} style={styles.closeButton}>X</button>
                    </div>
                    <div style={styles.modalBody}>
                        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                       
                        <div className="row">
                            {medicalHistory.map((record) => (
                                <div className="col-md-12 mb-4" key={record.medicalId}>
                                    <div className="card">
                                        <div className="card-header" style={{ backgroundColor: '#C0C0C0' }}>
                                            <h5 className="card-title">Medical Record</h5>
                                            <div className="float-right">
                                                <button className="btn btn-info me-2" onClick={() => handleEditClick(record)}>Edit</button>
                                                <button className="btn btn-danger" onClick={() => handleDeleteClick(record.medicalId)}>Delete</button>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ backgroundColor: '#F7E7CE' }}>
                                            <p className="card-text"><strong>Allergy:</strong> {record.allergy}</p>
                                            <p className="card-text"><strong>Medical History:</strong> {record.medicalHistory}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Medical Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingRecord && (
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-3" controlId="formAllergy">
                                <Form.Label>Allergy</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="allergy"
                                    value={editingRecord.allergy}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formMedicalHistory">
                                <Form.Label>Medical History</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="medicalHistory"
                                    value={editingRecord.medicalHistory}
                                    onChange={handleFormChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                            <Button variant="secondary" className="ms-2" onClick={() => setShowEditModal(false)}>
                                Cancel
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: '1rem',
        width: '60%', // Reduced width
        padding: '2rem',
        position: 'relative',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.5rem',
        cursor: 'pointer',
    },
    title: {
        fontWeight: 700,
        color: '#333',
        marginBottom: '1rem',
    },
    modalBody: {
        padding: '2rem',
    },
};
