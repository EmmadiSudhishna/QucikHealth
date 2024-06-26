import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

export default function ViewMedicalHistory() {
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
   
   
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

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8091/api/v1/getUserById/${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setErrorMessage('An error occurred while fetching user details.');
            }
        };

        fetchMedicalHistory();
        fetchUserDetails();
    }, [userId]);

    

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
                        <h3>User Details</h3>
                        <div style={styles.userDetailsContainer}>
                            <div style={styles.userDetailItem}>
                                <strong>Name:</strong> {userDetails.name}
                            </div>
                            <div style={styles.userDetailItem}>
                                <strong>Gender:</strong> {userDetails.gender}
                            </div>
                            <div style={styles.userDetailItem}>
                                <strong>Mobile:</strong> {userDetails.mobile}
                            </div>
                            <div style={styles.userDetailItem}>
                                <strong>Email:</strong> {userDetails.email}
                            </div>
                           {/* <div style={styles.userDetailItem}>
                                <strong>Address:</strong> {userDetails.address}
                            </div>
                            <div style={styles.userDetailItem}>
                                <strong>Emergency Contact:</strong> {userDetails.emergencyContact}
    </div>*/}
                        </div>
                        {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
                        <h3>Medical History</h3>
                        <div className="row">
                            {medicalHistory.map((record) => (
                                <div className="col-md-12 mb-4" key={record.medicalId}>
                                    <div className="card">
                                        <div className="card-header" style={{ backgroundColor: '#C0C0C0' }}>
                                            <h5 className="card-title">Medical Record</h5>
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
    userDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: '1rem',
    },
    userDetailItem: {
        marginRight: '1rem', // Adjust as needed
        marginBottom: '0.5rem', // Adjust as needed
        flexBasis: 'calc(50% - 1rem)', // Adjust as needed
    },
    prescriptionButton: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.3rem',
        cursor: 'pointer',
        marginTop: '1rem',
    },
};

