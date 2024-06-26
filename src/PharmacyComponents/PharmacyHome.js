import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PharmacyBg from '../HomeComponents/Images/PharmacyBg.png'; // Adjust the path as needed

const PharmacyHome = () => {
  return (
    <Container fluid className="pharmacy-home-container">
      <Row className="h-100">
        <Col md={6} className="p-0">
          <img src={PharmacyBg} alt="Pharmacy" className="img-fluid w-100 h-100" />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center p-4 text-center pharmacy-home-quote">
          <div className="pharmacy-home-text">
            <h2 className="pharmacy-home-heading">Effortless Medicine Delivery</h2>
            <p className="pharmacy-home-lead">Right When You Need It!</p>
            <hr className="pharmacy-home-separator" />
            <p className="pharmacy-home-description">
              Discover the convenience of getting your medications delivered hassle-free, whenever and wherever you need them. With our seamless service, your health is our priority.
            </p>
          </div>
        </Col>
      </Row>
      <style>
        {`
          html, body, .pharmacy-home-container {
            height: 100%;
            margin: 0;
            overflow: hidden;
          }

          .pharmacy-home-quote {
            background-color: rgba(230, 230, 250, 0.6);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .pharmacy-home-text {
            color: #333;
          }

          .pharmacy-home-heading {
            font-size: 3rem;
            margin-bottom: 0.5rem;
            color: #FF5733; /* Unique color for heading */
            text-shadow: 2px 2px 4px rgba(255, 87, 51, 0.3); /* Text shadow effect */
          }

          .pharmacy-home-lead {
            font-size: 2rem;
            margin-bottom: 1.5rem;
            color: #333;
            font-weight: bold;
            text-transform: uppercase; /* Uppercase for emphasis */
          }

          .pharmacy-home-separator {
            width: 50%;
            margin: 1rem auto;
            border-color: #FF5733; /* Color for separator */
          }

          .pharmacy-home-description {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #555;
            font-style: italic; /* Italicized for emphasis */
          }

          @media (max-width: 767px) {
            .pharmacy-home-heading {
              font-size: 2rem;
            }

            .pharmacy-home-lead {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default PharmacyHome;
