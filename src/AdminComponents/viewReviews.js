import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling

const ViewReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8091/api/v1/getAllReviews'); // Replace with your API endpoint
        setUserReviews(response.data); // Assuming API returns an array of user reviews
      } catch (error) {
        setError('Failed to fetch user reviews');
      }
    };

    fetchUserReviews();
  }, []);

  // Function to group reviews by doctorId
  const groupReviewsByDoctor = () => {
    const groupedReviews = {};
    userReviews.forEach((review) => {
      if (!groupedReviews[review.doctorId]) {
        groupedReviews[review.doctorId] = [];
      }
      groupedReviews[review.doctorId].push(review);
    });
    return groupedReviews;
  };

  const groupedReviews = groupReviewsByDoctor();

  // Function to generate alternating table row background colors
  const getRowBackgroundColor = (index) => {
    return index % 2 === 0 ? 'rgba(0, 0, 0, 0.05)' : 'rgba(0, 0, 0, 0.1)';
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">User Reviews</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row className="justify-content-center">
        {Object.keys(groupedReviews).length === 0 ? (
          <Col xs={12} md={8}>
            <p className="text-center">No reviews available.</p>
          </Col>
        ) : (
          Object.keys(groupedReviews).map((doctorId, index) => (
            <Col key={doctorId} xs={12} md={8} className="mb-4">
              <div className="review-table" style={{ backgroundColor: getRowBackgroundColor(index) }}>
                <h3 className="mb-3">Doctor ID: {doctorId}</h3>
                <Table striped bordered hover className="table-fixed">
                  <thead>
                    <tr>
                      <th className="w-25">User ID</th>
                      <th className="w-25">Rating</th>
                      <th className="w-50">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedReviews[doctorId].map((review) => (
                      <tr key={review.reviewId}>
                        <td>{review.userId}</td>
                        <td>{review.rating}</td>
                        <td>{review.review}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ViewReviews;
