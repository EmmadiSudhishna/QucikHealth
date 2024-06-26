// src/DoctorReview.js
import React, { useState } from 'react';
import axios from 'axios';

export default function DoctorReview() {
  const [doctorName, setDoctorName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleDoctorNameChange = (e) => {
    setDoctorName(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send review data to the server
      const response = await axios.post('http://localhost:8091/api/v1/addReview', {
        doctorName: doctorName,
        rating: rating,
        comment: comment
      });

      // Handle response, e.g., show success message to user
      console.log(response.data);
    } catch (error) {
      // Handle error, e.g., show error message to user
      console.error('Error submitting doctor review:', error);
    }
  };

  return (
    <div>
      <h2>Doctor Review Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="doctorName">Doctor Name:</label>
          <input type="text" id="doctorName" value={doctorName} onChange={handleDoctorNameChange} required />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select id="rating" value={rating} onChange={handleRatingChange} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea id="comment" value={comment} onChange={handleCommentChange} required />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
