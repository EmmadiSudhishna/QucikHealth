import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrescriptionBottleAlt, faStar, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import prescription from '../HomeComponents/Images/prescription.jpg';
import reviewImage from '../HomeComponents/Images/review.jpg';

const ViewAppointments = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showPharmacyDropdown, setShowPharmacyDropdown] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found in session');
        }
        const response = await fetch(`http://localhost:8091/api/v1/appointments/user/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAppointments();
  }, []);

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('http://localhost:8091/api/v1/getAllPharmacies');
      setPharmacies(response.data);
    } catch (error) {
      console.error('Error fetching pharmacies', error);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handlePharmacyChange = (event) => {
    setSelectedPharmacy(event.target.value);
  };

  const handleViewPrescription = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:8091/api/v1/prescriptions/appointments/${appointmentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch prescriptions');
      }
      const data = await response.json();
      setPrescriptions(data);
      setSelectedAppointmentId(appointmentId);
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPrescriptions([]);
    setShowPharmacyDropdown(false);
  };

  const togglePharmacyDropdown = () => {
    setShowPharmacyDropdown(!showPharmacyDropdown);
  };

  const handleGiveFeedback = async (doctorId, reviewData) => {
    try {
      const userId = sessionStorage.getItem('userId');
      const { rating, review } = reviewData;
      const response = await fetch('http://localhost:8091/api/v1/addReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctorId,
          userId: userId,
          rating: rating,
          review: review,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      toast.success('Feedback submitted successfully');
      handleCloseFeedbackModal();
      fetchUserReviews(doctorId); // Fetch reviews again after submitting new review
    } catch (error) {
      toast.error('Failed to submit feedback');
      setError(error.message);
    }
  };

  const handleSaveReview = (doctorId) => {
    if (rating === 0 || !reviewText) {
      toast.error('Please provide both rating and review');
      return;
    }

    const reviewData = {
      rating: rating,
      review: reviewText,
    };

    handleGiveFeedback(doctorId, reviewData);
  };

  const handleTransferPrescription = async () => {
    try {
      const prescriptionDetails = prescriptions.map(p => p.prescription);
      const requestBody = {
        prescriptions: prescriptionDetails,
        appointmentId: selectedAppointmentId
      };
      const response = await axios.post(`http://localhost:8091/api/v1/prescriptions/transfer/${selectedPharmacy}`, requestBody);
      if (response.status === 200) {
        toast.success("Prescription sent to Pharmacy successfully!");
        handleCloseModal();
      } else {
        toast.error("Failed to transfer prescription");
      }
    } catch (error) {
      toast.error("An error occurred while transferring prescription");
    }
  };

  const fetchUserReviews = async (doctorId) => {
    try {
      const userId = sessionStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8091/api/v1/userReviews/${userId}`);
      if (response.status === 200) {
        // Filter reviews by doctorId
        const filteredReviews = response.data.filter(review => review.doctorId === doctorId);
        setReviews(filteredReviews);
        setError(null); // Clear any previous error
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
      setError('Failed to fetch reviews');
    }
  };

  const handleViewReviews = async (doctorId) => {
    setSelectedDoctorId(doctorId);
    try {
      await fetchUserReviews(doctorId); // Call the function here
      setShowReviewsModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseReviewsModal = () => {
    setShowReviewsModal(false);
    setSelectedReview(null);
  };

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setRating(review.rating); // Initialize rating and review in the modal form
    setReviewText(review.review);
    setShowFeedbackModal(true);
  };

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/v1/deleteReview/${reviewId}`);
      if (response.status === 200) {
        setReviews(reviews.filter(review => review.reviewId !== reviewId));
        toast.success('Review deleted successfully!');
      } else {
        console.error('Failed to delete review. Status:', response.status);
        toast.error('Failed to delete review. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting review:', error.message);
      toast.error(`Failed to delete review. Error: ${error.message}`);
    }
  };

  const updateReview = async () => {
    if (!selectedReview || !reviewText) {
      toast.error('Please provide both rating and review');
      return;
    }

    const reviewData = {
      reviewId: selectedReview.reviewId,
      rating: rating,
      review: reviewText,
    };

    try {
      const response = await axios.put(`http://localhost:8091/api/v1/updateReviews/${reviewData.reviewId}`, reviewData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Review updated successfully!');
        fetchUserReviews(selectedDoctorId); // Fetch reviews again after updating
        handleCloseFeedbackModal(); // Close the modal after successful update
      } else {
        toast.error('Failed to update review. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update review. Please try again.');
      console.error('Error updating review:', error);
    }
  };

  // Function to close the feedback modal
  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedReview(null); // Reset selected review
    setRating(0); // Reset rating
    setReviewText(''); // Reset review text
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Appointments History</h2>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <Row>
          {appointments.map((appointment) => (
            <Col key={appointment.appointmentId} md={4} className="mb-4">
              <div className="card custom-card shadow-sm border-0 h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title mb-3">Appointment ID: {appointment.appointmentId}</h5>
                  <p className="card-text"><strong>Doctor:</strong> {appointment.doctorId}</p>
                  <p className="card-text"><strong>Book Date:</strong> {appointment.bookDate}</p>
                  <p className="card-text"><strong>Appointment Date:</strong> {appointment.appointmentDate}</p>
                  <p className="card-text"><strong>Status:</strong> {appointment.appointmentStatus}</p>
                  <p className="card-text"><strong>Time:</strong> {appointment.appointmentTime}</p>
                  <p className="card-text"><strong>Symptoms:</strong> {appointment.symptoms}</p>
                  <p className="card-text"><strong>Weight:</strong> {appointment.weight}</p>
                  <p className="card-text"><strong>Age:</strong> {appointment.age}</p>
                  <div className="d-flex justify-content-end mt-auto">
                    <Button variant="link" onClick={() => {
                      setSelectedDoctorId(appointment.doctorId);
                      setShowFeedbackModal(true);
                    }}>
                      <FontAwesomeIcon icon={faStar} size="lg" className="text-danger" />
                    </Button>
                    <Button variant="link" onClick={() => handleViewReviews(appointment.doctorId)}>
                      <FontAwesomeIcon icon={faEye} size="lg" className="text-primary" />
                    </Button>
                    <button
                      className="btn btn-warning mt-auto align-self-end ml-2"
                      onClick={() => handleViewPrescription(appointment.appointmentId)}
                    >
                      View Prescription
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showFeedbackModal} onHide={handleCloseFeedbackModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedReview ? 'Edit Review' : 'Give Feedback'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={reviewImage} alt="Review" style={{ height: 'auto', maxWidth: '90%', maxHeight: '400px' }} /><br />
          <div className="form-group">
            <label>Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Review:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="form-control"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedbackModal}>Close</Button>
          <Button variant="primary" onClick={selectedReview ? updateReview : () => handleSaveReview(selectedDoctorId)}>
            {selectedReview ? 'Update Review' : 'Save Review'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReviewsModal} onHide={handleCloseReviewsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.reviewId} className="review-card mb-3 p-3">
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Review:</strong> {review.review}</p>
                <div className="d-flex justify-content-end">
                  <Button variant="link" onClick={() => handleEditReview(review)}>
                    <FontAwesomeIcon icon={faEdit} className="text-warning" />
                  </Button>
                  <Button variant="link" onClick={() => deleteReview(review.reviewId)}>
                    <FontAwesomeIcon icon={faTrash} className="text-danger" />
                  </Button>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewsModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Details</Modal.Title>
        </Modal.Header>
        <img src={prescription} alt="Prescription" style={{ height: 'auto', maxWidth: '100%', maxHeight: '400px' }} /><br />
        <Modal.Body>
          {prescriptions.length > 0 ? (
            <div>
              {prescriptions.map((prescription) => (
                <div key={prescription._id} className="prescription-card mb-3 p-3">
                  <p><strong>Prescription:</strong> {prescription.prescription}</p>
                  <hr />
                </div>
              ))}
              {showPharmacyDropdown && (
                <form>
                  <label htmlFor="pharmacy"><strong>Choose a pharmacy:</strong></label>
                  <select id="pharmacy" value={selectedPharmacy} onChange={handlePharmacyChange}>
                    <option value="" disabled style={{ color: 'gray' }}>Select a pharmacy</option>
                    {pharmacies.map((pharmacy) => (
                      <option key={pharmacy.pharmacyId} value={pharmacy.pharmacyId}>
                        {pharmacy.pharmacyName}
                      </option>
                    ))}
                  </select>
                </form>
              )}
            </div>
          ) : (
            <p>No prescriptions available for this appointment.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="link" onClick={togglePharmacyDropdown}>
            <FontAwesomeIcon icon={faPrescriptionBottleAlt} size="2x" className="text-primary" />
          </Button>
          {showPharmacyDropdown && (
            <Button variant="primary" onClick={handleTransferPrescription}>
              Send to Pharmacy
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <ToastContainer />

      <style>
        {`
          .container {
            background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
            padding: 20px;
            border-radius: 8px;
          }
          .custom-card {
            border-radius: 15px;
            background: linear-gradient(135deg, #ffffff, #f8f9fa);
            padding: 20px;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .custom-card:hover {
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
          .btn-warning {
            background-color: #ffcc00;
            border-color: #ffcc00;
            color: #fff;
            font-weight: bold;
            border-radius: 30px;
          }
          .btn-warning:hover {
            background-color: #e6b800;
            border-color: #e6b800;
          }
          .alert {
            margin-top: 20px;
          }
          .prescription-card {
            background: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .review-card {
            background: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </Container>
  );
};

export default ViewAppointments;
