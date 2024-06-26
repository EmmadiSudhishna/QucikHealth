import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserProfile() {
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false); // State to track if the user is editing the profile
    const [formData, setFormData] = useState({}); // State to track form data

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getUserById/${userId}`);
                    console.log("User data:", response.data); // Log the response data
                    setUser(response.data);
                    setFormData(response.data); // Initialize form data with user data
                } else {
                    setErrorMessage("No data found.");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                setErrorMessage("Failed to fetch profile. Please try again.");
            }
        };

        fetchUserProfile();
    }, []);

    const handleEditProfile = () => {
        setIsEditing(true); // Enable editing mode
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem('userId');
            const response = await axios.put(`http://localhost:8091/api/v1/updateUsers/${userId}`, formData);
            console.log("Update response:", response.data);
            setUser(formData); // Update user state with new data
            setIsEditing(false); // Disable editing mode
            setErrorMessage(""); // Clear any previous error message
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("Failed to update profile. Please try again.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.profileContainer}>
                <div style={styles.header}>
                    <h1 style={styles.title}>Profile</h1>
                </div>
                <div style={styles.body}>
                    {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
                    {!isEditing ? (
                        <div>
                            <ul style={styles.listGroup}>
                                <li style={styles.listGroupItem}><strong>Name:</strong> {user.name || 'N/A'}</li>
                                <li style={styles.listGroupItem}><strong>Gender:</strong> {user.gender || 'N/A'}</li>
                                <li style={styles.listGroupItem}><strong>Address:</strong> {user.address || 'N/A'}</li>
                                <li style={styles.listGroupItem}><strong>Email:</strong> {user.email || 'N/A'}</li>
                                <li style={styles.listGroupItem}><strong>Mobile:</strong> {user.mobile || 'N/A'}</li>
                                <li style={styles.listGroupItem}><strong>Emergency Contact:</strong> {user.emergencyContact || 'N/A'}</li>
                            </ul>
                            <div style={styles.buttonContainer}>
                                <button style={styles.editButton} onClick={handleEditProfile}>Edit Profile</button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label>Name:</label>
                                <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Gender:</label>
                                <input type="text" name="gender" value={formData.gender || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Address:</label>
                                <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Email:</label>
                                <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Mobile:</label>
                                <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.formGroup}>
                                <label>Emergency Contact:</label>
                                <input type="text" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleInputChange} style={styles.input} />
                            </div>
                            <div style={styles.buttonContainer}>
                                <button type="submit" style={styles.saveButton}>Save</button>
                                <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                            </div>
                        </form>
                    )}
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
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
        padding: '2rem',
    },
    profileContainer: {
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out',
    },
    header: {
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        padding: '2rem',
        textAlign: 'center',
    },
    title: {
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    body: {
        padding: '2rem',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
    listGroup: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listGroupItem: {
        borderBottom: '1px solid #e3e6f0',
        padding: '0.75rem 1.5rem',
    },
    buttonContainer: {
        textAlign: 'center',
        marginTop: '1rem',
    },
    editButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    saveButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        marginRight: '1rem',
        transition: 'background-color 0.3s ease',
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    formGroup: {
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '0.25rem',
        border: '1px solid #ced4da',
    },
};
