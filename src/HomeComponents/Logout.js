import React, { useState, useEffect } from 'react';

const LogoutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use effect to trigger fade-in animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container text-center py-5">
      <style>
        {`
          .logout-container {
            background-color: #f8f9fa;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
          }

          .logout-container.fade-in {
            opacity: 1;
            transform: translateY(0);
          }

          .heading {
            background: linear-gradient(to right, #0f4c75, #00c6fb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: zoomInOut 2s ease infinite;
          }

          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>
      <div className="row">
        <div className={`col-md-8 offset-md-2 logout-container ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="display-4 heading"><strong>Logged Out Successfully!</strong></h2>
          <p className="lead">You have been successfully logged out.</p>
          {/*<Link to="/login" className="btn btn-primary mt-3">Login Again</Link>*/}
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
