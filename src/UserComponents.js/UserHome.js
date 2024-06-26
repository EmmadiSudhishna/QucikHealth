import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentImage from '../HomeComponents/Images/AppointmentImage.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faCreditCard } from '@fortawesome/free-solid-svg-icons';


export default function UserHome() {
    const [specializations, setSpecializations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorSchedules, setDoctorSchedules] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState({
        appointmentDate: '',
        appointmentTime: '',
        symptoms: '',
        weight: '',
        age: '',
        consultationFee: '',
        paymentDate: '',
        toAccount: '',
        cvv: '',
        cardType: '',
        expiryDate: '',
        cardNo: '',
    });
    const [userBankAccount, setUserBankAccount] = useState(null);
    const userId = sessionStorage.getItem('userId'); // Ensure userId is an integer
    const [paymentDetails, setPaymentDetails] = useState({
        paymentDate: '',
        toAccount: '',
        cardNo: '',
        cardType: '',
        expiryDate: '',
        cvv: '',
        consultationFee: '',
    });

    useEffect(() => {
        fetchSpecializations();
        fetchLocations();
        fetchUserBankAccount();
    }, []);
    

    const fetchSpecializations = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllSpecializations');
            setSpecializations(response.data);
        } catch (error) {
            console.error('Error fetching specializations:', error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllLocations');
            setLocations(response.data);
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };

    const fetchUserBankAccount = async () => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/accounts/user/${userId}`);
            setUserBankAccount(response.data); // Ensure this matches the expected response structure
        } catch (error) {
            console.error('Error fetching user bank account:', error.response || error.message || error);
            toast.error('Failed to fetch user bank account');
        }
    };

    const handleSpecializationChange = (event) => {
        setSelectedSpecialization(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/getDoctorsBySpecializationAndLocation/${selectedSpecialization}/${selectedLocation}`);
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const addPayment = async (doctorId, amount) => {
        const paymentData = {
            doctorId: doctorId,
            userId: userId,
            amount: amount,
            fromAccount: userBankAccount.cardNo, // Assuming fromAccount is the user's card number
            toAccount: paymentDetails.toAccount,
            paymentDate: paymentDetails.paymentDate,
        };
        try {
            const response = await axios.post('http://localhost:8091/api/v1/addPayment', paymentData);
            toast.success('Payment added successfully!');
        } catch (error) {
            console.error('Error adding payment:', error);
            toast.error('Failed to add payment');
        }
    };

    const fetchDoctorSchedules = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/getSchedulesByDoctorId/${doctorId}`);
            setDoctorSchedules(response.data);
        } catch (error) {
            console.error('Error fetching doctor schedules:', error);
        }
    };

    const deductConsultationFee = async (amount) => {
        const newBalance = userBankAccount.balAmt - amount;
        try {
            const response = await axios.put(`http://localhost:8091/api/v1/updateBankAccount/${userBankAccount.id}`, {
                ...userBankAccount,
                balAmt: newBalance
            });
            console.log(response.data); // Log the response for debugging
            toast.success('updated BankAccount successful!');
            fetchUserBankAccount(); // Refresh the user's bank account details after the update
        } catch (error) {
            console.error('Error updating bank account balance:', error);
            toast.error('Failed to update bank account balance');
        }
    };

    const handleBookAppointment = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:8091/api/v1/getDoctorById/${doctorId}`);
            const doctor = response.data;
            setSelectedDoctor(doctor);
            await fetchDoctorSchedules(doctorId);

            if (userBankAccount) {
                setPaymentDetails({
                    ...paymentDetails,
                    toAccount: doctor.drAcc,
                    cardNo: userBankAccount.cardNo,
                    cardType: userBankAccount.cardType,
                    expiryDate: userBankAccount.expiryDate,
                    cvv: userBankAccount.cvv,
                    consultationFee: doctor.consultationFee
                });

                setAppointmentDetails({
                    ...appointmentDetails,
                    consultationFee: doctor.consultationFee,
                    toAccount: doctor.drAcc,
                    cardNo: userBankAccount.cardNo,
                    cardType: userBankAccount.cardType,
                    expiryDate: userBankAccount.expiryDate,
                    cvv: userBankAccount.cvv
                });

                toggleModal();
            } else {
                console.error('User bank account details not loaded');
                toast.error('User bank account details not loaded');
            }
        } catch (error) {
            console.error('Error fetching doctor details:', error.response || error.message || error);
            toast.error('Failed to fetch doctor details');
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAppointmentDetails({ ...appointmentDetails, [name]: value });
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date().toISOString().split('T')[0];
        const appointmentDate = appointmentDetails.appointmentDate;

        let appointmentStatus;
        if (appointmentDate === currentDate) {
            appointmentStatus = 'Scheduled'; // Today's appointments are scheduled
        } else if (appointmentDate > currentDate) {
            appointmentStatus = 'Pending'; // Future appointments are pending initially
        } else {
            appointmentStatus = 'Completed'; // Past appointments are completed
        }

        const appointment = {
            ...appointmentDetails,
            userId: userId,
            doctorId: selectedDoctor.doctorId,
            appointmentStatus: appointmentStatus,
            bookDate: new Date().toISOString().split('T')[0],
        };

        try {
            await axios.post('http://localhost:8091/api/v1/addAppointment', appointment);
            await addPayment(selectedDoctor.doctorId, selectedDoctor.consultationFee); // Add payment after booking appointment
            await deductConsultationFee(selectedDoctor.consultationFee); // Deduct consultation fee from

            // Add payment after booking appointment
            await deductConsultationFee(selectedDoctor.consultationFee); // Deduct consultation fee from user's balance
            toast.success('Appointment added successfully!');
            toggleModal();
        } catch (error) {
            console.error('Error booking appointment:', error);
            toast.error('Failed to book appointment');
        }
    };

    const dayColors = {
        Monday: '#007bff',
        Tuesday: '#28a745',
        Wednesday: '#ffc107',
        Thursday: '#dc3545',
        Friday: '#6610f2',
        Saturday: '#17a2b8',
        Sunday: '#fd7e14',
    };

    // Inside the map function for doctorSchedules



    return (

        <div style={styles.container}>
            <img src={AppointmentImage} alt="Header" style={styles.headerImage} />
            <br />
            <div style={{ ...styles.searchContainer, maxWidth: '1000px', margin: '0 auto' }}>
                <div style={styles.searchField}>
                    <h3 style={styles.subHeading}>Find a Doctor Specialization</h3>
                    <select style={styles.dropdown} value={selectedSpecialization} onChange={handleSpecializationChange}>
                        <option value="">Select Specialization</option>
                        {specializations.map((spec, index) => (
                            <option key={index} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>
                <div style={styles.searchField}>
                    <h3 style={styles.subHeading}>Select Location</h3>
                    <select style={styles.dropdown} value={selectedLocation} onChange={handleLocationChange}>
                        <option value="">Select Location</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <br />
                    <button style={styles.searchButton} onClick={handleSearch}>Search</button>
                </div>
            </div>

            <div style={styles.doctorList}>
                {doctors.map((doctor) => (
                    <div key={doctor.doctorId} style={styles.card}>
                        <div style={styles.imageContainer}>
                            <img className="rounded-img" style={{ ...styles.doctorImage, width: '150px' }} src={`http://localhost:8091/uploads/${doctor.doctorPic}`} alt={doctor.doctorName} />
                        </div>
                        <div style={styles.cardContent}>
                            <h3>{doctor.doctorName}</h3>
                            <p><strong>Specialization:</strong> {doctor.specialization}</p>
                            <p><strong>Hospital:</strong> {doctor.hospitalName}</p>
                            <button style={styles.bookButton} onClick={() => handleBookAppointment(doctor.doctorId)}>Book Appointment</button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div style={styles.modalBackdrop}>
                    <div style={styles.modal}>
                        <h2>{selectedDoctor && `${selectedDoctor.doctorName}'s Schedules`}</h2>
                        <ul style={styles.scheduleList}>
                            {doctorSchedules.map((schedule) => (
                                <li key={schedule.scheduleId} style={styles.scheduleItem}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                            <div style={{ ...styles.status, backgroundColor: dayColors[schedule.day], marginRight: '10px' }}>
                                                {schedule.day}
                                            </div>
                                            <div style={{ ...styles.scheduleTime, marginRight: '10px' }}>
                                                <FontAwesomeIcon icon={faClock} style={styles.icon} /> {schedule.timings}
                                            </div>
                                            <div style={{ ...styles.status, backgroundColor: schedule.status ? '#28a745' : '#ffc107', padding: '5px 10px', borderRadius: '4px' }}>
                                                {String(schedule.status)}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <h3><FontAwesomeIcon icon={faCalendarAlt} />&nbsp;Book Appointment</h3>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <input type="date" name="appointmentDate" value={appointmentDetails.appointmentDate} onChange={handleInputChange} style={styles.input} required />
                                <input type="time" name="appointmentTime" value={appointmentDetails.appointmentTime} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="text" name="symptoms" placeholder="Symptoms" value={appointmentDetails.symptoms} onChange={handleInputChange} style={styles.input} required />
                                <input type="number" name="weight" placeholder="Weight" value={appointmentDetails.weight} onChange={handleInputChange} style={styles.input} required /><br />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="number" name="age" placeholder="Age" value={appointmentDetails.age} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <hr style={styles.separator} />
                            <h3><FontAwesomeIcon icon={faCreditCard} />&nbsp;Payment Details</h3>
                            <div style={styles.formGroup}>
                                <input type="date" name="paymentDate" value={paymentDetails.paymentDate} onChange={handleInputChange} style={styles.input} required />
                                <input type="text" name="toAccount" placeholder="To Account" value={paymentDetails.toAccount} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="text" name="cardNo" placeholder="Card Number" value={paymentDetails.cardNo} onChange={handleInputChange} style={styles.input} required />
                                <input type="text" name="cardType" placeholder="Card Type" value={paymentDetails.cardType} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={paymentDetails.expiryDate} onChange={handleInputChange} style={styles.input} required />
                                <input type="number" name="cvv" placeholder="CVV" value={paymentDetails.cvv} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <div style={styles.formGroup}>
                                <input type="number" name="consultationFee" placeholder="Consultation Fee" value={paymentDetails.consultationFee} onChange={handleInputChange} style={styles.input} required />
                            </div>
                            <button type="submit" style={styles.submitButton}>Book</button>
                        </form>
                        <button onClick={toggleModal} style={styles.closeButton}>Close</button>
                    </div>
                </div>
            )}
            <ToastContainer limit={2} />
        </div>
    );
}




const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '8px',
    },
    searchField: {
        flex: '1',
        textAlign: 'center',
        margin: '0 10px',
    },
    subHeading: {
        marginBottom: '10px',
        color: '#333',
    },
    dropdown: {
        width: '80%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    searchButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
    doctorList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '20px', // Add margin at the bottom
    },

    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        margin: '10px',
        padding: '10px',
        maxWidth: '300px', 
        width: '100%', 
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        position: 'relative', 
    },


    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
    },

    doctorImage: {
        borderRadius: '5%',
        width: '150px',
        height: '150px', 
        objectFit: 'contain', 
        alignSelf: 'center', 
    },
    cardContent: {
        textAlign: 'center',
        flexGrow: 1, 
    },

    bookButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        alignSelf: 'flex-end', 
    },
    modalBackdrop: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '600px',
        maxHeight: '90%',
        width: '90%',
        overflowY: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        flex: '1',
        marginRight: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        marginTop: '10px',
    },
    closeButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
    separator: {
        margin: '20px 0',
    },

    headerImage: {
        display: 'block', 
        margin: '0 auto', // Centers the image horizontally
        width: '1200px', // Set a specific width
        maxWidth: '100%', // Ensures the image doesn't exceed the container width
        maxHeight: '200px', // Adjust the maximum height as needed
    },


    scheduleList: {
        listStyle: 'none',
        padding: '0',
    },
    scheduleItem: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
    },
    scheduleDay: {
        flex: '1',
        fontWeight: 'bold',
        marginRight: '10px',
    },
    scheduleTime: {
        flex: '1',
        marginRight: '10px',
    },
    icon: {
        marginRight: '5px',
    },
    status: {
        padding: '5px 10px',
        borderRadius: '4px',
        color: '#fff',
    },
};
