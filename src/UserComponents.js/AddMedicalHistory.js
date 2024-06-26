import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMedicalHistory() {
    const [formData, setFormData] = useState({
        allergy: '',
        medicalHistory: '',
        userId: '',
    });

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Retrieve userId from session storage when component mounts
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            setFormData((prevData) => ({
                ...prevData,
                userId: userId,
            }));
        } else {
            console.error('User ID not found in session storage');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8091/api/v1/createMedicalHistory', formData);
            console.log(response);  // Debugging line to check response

            if (response.status === 200) {
                toast.success('Medical history added successfully!', {
                    position: 'top-right', // Correct usage of position
                    autoClose: 3000,
                });
                setModalVisible(false); // Close the modal on success
            } else {
                console.error('Error adding medical history:', response.statusText);
                toast.error('Error adding medical history.', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Error adding medical history:', error.message);
            toast.error('Error adding medical history.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };

    return (
        <div style={styles.container}>
            <ToastContainer />
            <button onClick={() => setModalVisible(true)} style={styles.addButton}>Add</button>

            {modalVisible && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <div style={styles.modalHeader}>
                            <h2 style={styles.title}><b>Medical History Form</b></h2>
                            <button onClick={() => setModalVisible(false)} style={styles.closeButton}>X</button>
                        </div>
                        <div style={styles.modalBody}>
                            <form onSubmit={handleSubmit}>
                                <div style={styles.formGroup}>
                                    <label htmlFor="userId" style={styles.formLabel}><b>User Id</b></label>
                                    <input
                                        type="text"
                                        id="userId"
                                        name="userId"
                                        value={formData.userId}
                                        readOnly
                                        style={styles.formControl}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label htmlFor="allergy" style={styles.formLabel}><b>Allergy</b></label>
                                    <input
                                        type="text"
                                        id="allergy"
                                        name="allergy"
                                        value={formData.allergy}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter any known allergies"
                                        style={styles.formControl}
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label htmlFor="medicalHistory" style={styles.formLabel}><b>Medical History</b></label>
                                    <input
                                        type="text"
                                        id="medicalHistory"
                                        name="medicalHistory"
                                        value={formData.medicalHistory}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your medical history"
                                        style={styles.formControl}
                                    />
                                </div>
                                <button type="submit" style={styles.submitButton}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        marginTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
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
        maxWidth: '800px',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    formGroup: {
        marginBottom: '1rem',
    },
    formLabel: {
        fontWeight: 500,
        color: '#555',
        display: 'block',
        marginBottom: '0.5rem',
    },
    formControl: {
        width: '100%',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
    },
    submitButton: {
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        color: 'white',
        cursor: 'pointer',
        width: '100%',
    },
};
