import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PharmacyPrescriptionView = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [groupedPrescriptions, setGroupedPrescriptions] = useState({});
  const [error, setError] = useState(null);
  const [sentAppointments, setSentAppointments] = useState([]);

  useEffect(() => {
    const pharmacyId = sessionStorage.getItem('pharmacyId'); // Assuming pharmacyId is stored in session
    if (!pharmacyId) {
      setError('Pharmacy ID not found in session');
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8091/api/v1/prescriptions/${pharmacyId}`);
        setPrescriptions(response.data);
      } catch (error) {
        setError('Failed to fetch prescriptions');
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    if (prescriptions.length > 0) {
      const grouped = prescriptions.reduce((acc, prescription) => {
        const { appointmentId } = prescription;
        if (!acc[appointmentId]) {
          acc[appointmentId] = [];
        }
        acc[appointmentId].push(prescription);
        return acc;
      }, {});
      setGroupedPrescriptions(grouped);
    }
  }, [prescriptions]);

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleConfirmTransfer = (appointmentId) => {
    notifySuccess(`Prescriptions for appointment ${appointmentId} sent to pharmacy`);
    setSentAppointments([...sentAppointments, appointmentId]);
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4 text-center">Prescriptions</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <div className="row">
          {Object.keys(groupedPrescriptions).map((appointmentId) => (
            <div key={appointmentId} className="col-md-12 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title">Appointment ID: {appointmentId}</h5>
                  {groupedPrescriptions[appointmentId].map((prescription) => (
                    <div key={prescription.prescriptionId}>
                      <p className="card-text"><strong>Prescription:</strong> {prescription.prescription}</p>
                      {/* Add other prescription details as needed */}
                    </div>
                  ))}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleConfirmTransfer(appointmentId)}
                    disabled={sentAppointments.includes(appointmentId)}
                  >
                    {sentAppointments.includes(appointmentId) ? 'Shipped' : 'Confirm Transfer'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          .container {
            background: #f5f7fa;
            padding: 20px;
            border-radius: 8px;
          }
          .card {
            border-radius: 15px;
            background: #ffffff;
            padding: 20px;
            transition: transform 0.3s, box-shadow 0.3s;
            border: 1px solid #e0e0e0;
          }
          .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          .card-title {
            color: #343a40;
            font-size: 1.5rem;
            margin-bottom: 15px;
            font-weight: bold;
            text-align: center;
          }
          .card-text {
            color: #495057;
            margin-bottom: 10px;
            font-size: 1rem;
          }
          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            color: #fff;
            font-weight: bold;
            border-radius: 30px;
            transition: background-color 0.3s, border-color 0.3s;
          }
          .btn-primary:hover {
            background-color: #0056b3;
            border-color: #0056b3;
          }
          .btn-primary:disabled {
            background-color: #6c757d;
            border-color: #6c757d;
          }
        `}
      </style>
    </div>
  );
};

export default PharmacyPrescriptionView;
