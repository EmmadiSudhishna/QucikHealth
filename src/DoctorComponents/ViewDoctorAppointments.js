import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPhone, faHistory, faPrescription } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import AddPrescription from './AddPrescription'; // Ensure you have the AddPrescription component

export default function ViewDoctorAppointments() {
  const { doctorId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setErrorMessage('');
      const doctorIdInt = sessionStorage.getItem('doctorId');
      const url = `http://localhost:8091/api/v1/appointments/doctor/${doctorIdInt}`;
      const response = await axios.get(url);
      const appointmentsWithUserDetails = await Promise.all(
        response.data.map(async (appointment) => {
          const userResponse = await axios.get(`http://localhost:8091/api/v1/getUserById/${appointment.userId}`);
          return { ...appointment, user: userResponse.data };
        })
      );
      setAppointments(appointmentsWithUserDetails);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while fetching appointments.");
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/v1/deleteAppointment/${appointmentId}`);
      if (response.status === 200) {
        setAppointments(appointments.filter(appointment => appointment.appointmentId !== appointmentId));
        toast.success('Doctor appointment deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setErrorMessage('Failed to delete appointment. Please try again.');
    }
  };

  const handleShowModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const filteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayDate = new Date(today);

    appointments.forEach(appointment => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const appointmentStatus = appointment.appointmentStatus.toLowerCase();

        if (appointmentDate.toDateString() === todayDate.toDateString()) {
            appointment.appointmentStatus = 'active';
        } else if (appointmentDate > todayDate) {
            appointment.appointmentStatus = 'pending';
        } else {
            appointment.appointmentStatus = 'completed';
        }
    });

    return appointments.filter(appointment => {
        switch (activeTab) {
            case 'active':
                return appointment.appointmentStatus === 'active';
            case 'future':
                return appointment.appointmentStatus === 'pending';
            case 'history':
                return appointment.appointmentStatus === 'completed' || appointment.appointmentStatus === 'onprogress';
            default:
                return false;
        }
    });
};

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-4"> {doctorId}</h2><br/><br/>
      {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
                Active Applications
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'future' ? 'active' : ''}`} onClick={() => setActiveTab('future')}>
                Future Appointments
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                History
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'active' ? 'show active' : ''}`}>
              <Table appointments={filteredAppointments()} deleteAppointment={deleteAppointment} showCallButton={true} handleShowModal={handleShowModal} />
            </div>
            <div className={`tab-pane fade ${activeTab === 'future' ? 'show active' : ''}`}>
              <Table appointments={filteredAppointments()} deleteAppointment={deleteAppointment} handleShowModal={handleShowModal} />
            </div>
            <div className={`tab-pane fade ${activeTab === 'history' ? 'show active' : ''}`}>
              <Table appointments={filteredAppointments()} deleteAppointment={deleteAppointment} showDeleteButton={true} handleShowModal={handleShowModal} />
            </div>
          </div>
        </div>
      </div>
       {selectedAppointmentId && (
         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
           <Modal.Header closeButton>
             <Modal.Title>Add Prescription</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <AddPrescription appointmentId={selectedAppointmentId} />
           </Modal.Body>
         </Modal>
       )}
    </div>
  );
}

function Table({ appointments, deleteAppointment, showCallButton, showDeleteButton, handleShowModal }) {
  const handlePhoneCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Appointment ID</th>
            <th>User ID</th>
            <th>Appointment Date</th>
            <th>Appointment Status</th>
            <th>Appointment Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.userId}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentStatus}</td>
              <td>{appointment.appointmentTime}</td>
              <td>
                <Link to={`/UserComponents/ViewMedicalHistory/${appointment.userId}`} className="btn btn-primary" style={{ marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faHistory} />
                </Link>&nbsp;
                <button className="btn btn-secondary" style={{ marginLeft: '10px' }} onClick={() => handleShowModal(appointment.appointmentId)}>
                  <FontAwesomeIcon icon={faPrescription} />
                </button>&nbsp;
                {showDeleteButton && (
                  <button className="btn btn-danger" onClick={() => deleteAppointment(appointment.appointmentId)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}&nbsp;
                {showCallButton && (
                  <button className="btn btn-info" onClick={() => handlePhoneCall(appointment.user.mobile)}>
                    <FontAwesomeIcon icon={faPhone} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
