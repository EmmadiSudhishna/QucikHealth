// src/FeedbackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeedbackButton() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/user-login');
  };

  return (
    <div>
      <style>
        {`
          .feedback-button {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: #1976D2;
            color: white;
            padding: 8px 16px;
            border-radius: 6px 0 0 6px;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s;
            z-index: 1000;
          }

          .feedback-button:hover {
            background-color: #0d47a1;
          }
        `}
      </style>

      <div className="feedback-button" onClick={handleButtonClick}>
        Feedback
      </div>
    </div>
  );
}
