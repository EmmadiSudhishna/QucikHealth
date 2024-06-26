import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Alert } from 'react-bootstrap';

const ViewUserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const doctorId = JSON.parse(sessionStorage.getItem('doctorId'));
        if (doctorId) {
          const response = await axios.get(`http://localhost:8091/api/v1/reviews/doctor/${doctorId}`);
          setReviews(response.data);
        } else {
          setError('Doctor ID not found in session storage.');
        }
      } catch (error) {
        setError('Failed to fetch reviews.');
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="background">
      <Container className="mt-5">
        <h2 className="mb-4 text-center">User Reviews</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {reviews.length > 0 ? (
          <div className="table-responsive">
            <Table className="table table-striped table-bordered table-hover custom-table">
              <thead>
                <tr>
                  <th>Review ID</th>
                  <th>User ID</th>
                  <th>Doctor ID</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.reviewId}>
                    <td>{review.reviewId}</td>
                    <td>{review.userId}</td>
                    <td>{review.doctorId}</td>
                    <td>{review.rating}</td>
                    <td>{review.review}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
      </Container>
      <style>
        {`
          .background {
            background-color: #f0f8ff;
            min-height: 100vh;
            padding: 20px 0;
          }

          .table-responsive {
            margin: auto;
            max-width: 90%;
          }

          .custom-table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .custom-table th,
          .custom-table td {
            vertical-align: middle;
            text-align: center;
            padding: 12px;
            border: 1px solid #dddddd;
          }

          .custom-table thead th {
            background-color: #343a40;
            color: #fff;
            font-weight: bold;
          }

          .custom-table tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
          }

          .custom-table tbody tr:nth-child(even) {
            background-color: #f1f1f1;
          }

          .custom-table tbody tr:hover {
            background-color: #e0e0e0;
          }

          .text-center {
            margin-bottom: 20px;
            color: #333;
          }

          .alert-danger {
            text-align: center;
          }

        
        `}
      </style>
    </div>
  );
};

export default ViewUserReviews;
