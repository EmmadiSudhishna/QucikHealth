import React,{useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faClock, faUser, faMicroscope } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import Dermatologist from '../HomeComponents/Images/Dermatologist.jpg';
import Endocrinologist from '../HomeComponents/Images/Endocrinologist.jpg';
import Neurologist from '../HomeComponents/Images/Neurologist.jpg';
import Psychiatrist from '../HomeComponents/Images/Psychiatrist.jpg';
import Pulmonology from '../HomeComponents/Images/Pulmonology.jpg';
import ENT from '../HomeComponents/Images/ENT.jpg';
import cardiologist from '../HomeComponents/Images/cardiologist.jpg';
import step1 from '../HomeComponents/Images/step1.webp';
import step3 from '../HomeComponents/Images/step3.webp';
import step4 from '../HomeComponents/Images/step4.webp';
import step2 from '../HomeComponents/Images/step2.webp';
import Apollologo from '../HomeComponents/Images/Apollologo.svg';
import atoz from '../HomeComponents/Images/atoz.png';
import appointment from '../HomeComponents/Images/appointment.png';
import Indiamart from '../HomeComponents/Images/Indiamart.jpg';
import Medpluslogo from '../HomeComponents/Images/Medpluslogo.jpg';
import GeneralPhysician from '../HomeComponents/Images/GeneralPhysician.jpg';
import peditrician from '../HomeComponents/Images/peditrician.jpg';
import gastro from '../HomeComponents/Images/gastro.jpg';
import Footer from './Footer';
import FeedbackButton from './FeedbackButton';

function SpecialityCard({ image, title, text }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h5 className="card-text">{text}</h5>
       
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <style>
        {`
          .scroll-container {
            padding: 20px;
          }
          
          .highlight-text {
            background-color: #1976D2;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin-bottom: 20px;
          }
          
          .card-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }
          
          .card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            width: 250px;
            text-align: center;
            transition: transform 0.2s;
          }
          
          .card:hover {
            transform: translateY(-10px);
          }
          
          .card-img {
            width: 100%;
            height: 150px;
            object-fit: cover;
          }
          
          .card-body {
            padding: 15px;
          }
          
          .card-title {
            font-size: 1.2em;
            color: #333;
            margin: 10px 0;
          }
          
          .card-link {
            color: #1976D2;
            font-weight: bold;
            text-decoration: none;
            display: inline-block;
            margin-top: 10px;
          }
          
          .card-link:hover {
            text-decoration: underline;
          }
          

          .image-wrapper {
            display: inline-block;
            text-align: center;
            margin-right: 20px;
            color: white;
          }

          .consult-link {
            color: black;
            text-decoration: none;
            font-weight: bold;
          }

          .step-by-step {
            padding: 20px;
          }
          
          .step-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          
          .step-item {
            margin-bottom: 20px;
          }
          
          .step-description {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .step-description img.step-img {
            max-width: 100px; /* Set a fixed size for the step images */
          }
          
          .step-description p {
            margin: 0;
            line-height: 1.5;
          }
          
          .step-description b {
            font-size: 1.1em;
          }
          
          .alliance-partners .card {
            border: none;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            height: 100%; /* Set a fixed height for the card */
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .alliance-partners .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          alliance-partners .col-md-3 {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .alliance-partners .card-img {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain; /* Ensure the image maintains its aspect ratio */
          }

          .highlight-text {
            background-color: #1976D2;
            color: #fff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            margin-bottom: 20px;
          }

          .card-container .card-text {
            font-size: 16px;
            color: #555; /* Adjust the color as needed */
            line-height: 1.5; /* Adjust line height for better readability */
          }
          
          

         
        `}
      </style>
      <br /><br /><br /><br /><br /><br />


      <div className="scroll-container">
  <h2 className="text-center mb-4 highlight-text">Consult By Specialities</h2>
  <div className="card-container">
    <SpecialityCard 
      image={cardiologist} 
      title="Cardiologist" 
      text="Specialists in heart health." 
       
    />
    <SpecialityCard 
      image={Dermatologist} 
      title="Dermatologist" 
      text="Skin, hair, and nail care experts." 
       
    />
    <SpecialityCard 
      image={Endocrinologist} 
      title="Endocrinologist" 
      text="Hormonal health specialists." 
     
    />
    <SpecialityCard 
      image={Neurologist} 
      title="Neurologist" 
      text="Nervous system disorders experts." 
      
    />
    <SpecialityCard 
      image={Psychiatrist} 
      title="Psychiatrist" 
      text="Mental health specialists." 
     
    />
    <SpecialityCard 
      image={Pulmonology} 
      title="Pulmonology" 
      text="Respiratory health specialists." 
       
    />
    <SpecialityCard 
      image={ENT} 
      title="ENT" 
      text="Ear, nose, and throat specialists." 
       
    />

<SpecialityCard 
      image={GeneralPhysician} 
      title="GeneralPhysician" 
      text="Treat cough, cold, fever, pain and general problems." 
      
    />

<SpecialityCard 
      image={peditrician} 
      title="peditrician" 
      text="Treat infants, children and adolescents." 
      
    />

<SpecialityCard 
      image={gastro} 
      title="gastro" 
      text="Treat stomach, intestine, colon and gallbladder etc. related issues." 
      
    />
  </div>
</div>

      <br /><br /><br />

      {/* Step by step process */}
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Step by step process */}
          <div className="step-by-step">
          <h3 className="text-center mb-4 highlight-text">How to Book an Online Appointment?</h3>
            <ol className="step-list">
              <li className="step-item">
                <div className="step-description text-center">
                  <img src={step1} alt="Step 1" className="step-img img-fluid mb-3" />
                  <p>
                    <b>Create an Account</b><br />
                    Begin by signing up and creating a user profile at QuickHealth.<br />
                    Provide necessary details to facilitate a seamless booking process.
                  </p>
                </div>
              </li>
              <li className="step-item">
                <div className="step-description text-center">
                  <img src={step2} alt="Step 2" className="step-img img-fluid mb-3" />
                  <p>
                    <b>Search for Doctor</b><br />
                    Utilize the platform's search function to find suitable doctors.<br />
                    Filter results based on your location and specific medical requirements.
                  </p>
                </div>
              </li>
              <li className="step-item">
                <div className="step-description text-center">
                  <img src={step3} alt="Step 3" className="step-img img-fluid mb-3" />
                  <p>
                    <b>Select a Doctor</b><br />
                    Review doctor profiles, considering qualifications, specialties, and patient reviews.<br />
                    Choose the healthcare professional that best fits your needs.
                  </p>
                </div>
              </li>
              <li className="step-item">
                <div className="step-description text-center">
                  <img src={step4} alt="Step 4" className="step-img img-fluid mb-3" />
                  <p>
                    <b>Schedule Appointment</b><br />
                    Book your appointment online, selecting either an in-person or virtual consultation based on your preference.<br />
                    Choose a convenient time slot from the available options.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <img src={appointment} alt="Booking" className="img-fluid" />
        </div>
      </div>
    </div><br /><br />

     {/* Our Alliance Partners */}
<div className="alliance-partners">
  <h3 className="text-center mb-4 highlight-text">Our Alliance Partners</h3>
  <div className="container my-5">
    <div className="row align-items-center justify-content-center">
      <div className="col-md-3 col-6 mb-4 d-flex justify-content-center">
        <div className="card">
          <img src={Apollologo} alt="Pharmapollo" className="card-img img-fluid" />
        </div>
      </div>
      <div className="col-md-3 col-6 mb-4 d-flex justify-content-center">
        <div className="card">
          <img src={atoz} alt="atoz" className="card-img img-fluid" />
        </div>
      </div>
      <div className="col-md-3 col-6 mb-4 d-flex justify-content-center">
        <div className="card">
          <img src={Medpluslogo} alt="Medpluslogo" className="card-img img-fluid" />
        </div>
      </div>
      <div className="col-md-3 col-6 mb-4 d-flex justify-content-center">
        <div className="card">
          <img src={Indiamart} alt="Indiamart" className="card-img img-fluid" />
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Why Choose Us? Section */}
      <div className="container my-5">
  <div className="row justify-content-center">
    <div className="col-md-10">
    <h3 className="text-center mb-4 highlight-text">Why Choose Us</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ backgroundColor: '#F48FB1', color: '#fff', width: '100%' }}>
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3" style={{ color: '#FF5722' }} />
              <h5 className="card-title" style={{ color: '#000' }}>Experienced Doctors</h5>
              <p className="card-text" style={{ color: '#000' }}>
              Our platform provides access to highly experienced and qualified doctors from various specialties, ensuring that you receive the highest quality of healthcare tailored to your needs.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ backgroundColor: '#90CAF9', color: '#fff', width: '100%' }}>
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faClock} size="3x" className="mb-3" style={{ color: '#28a745' }} />
              <h5 className="card-title" style={{ color: '#000' }}>Convenient Appointment Booking</h5>
              <p className="card-text" style={{ color: '#000' }}>
                Book appointments seamlessly through our user-friendly platform. Choose from a range of available time slots for both in-person and virtual consultations.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ backgroundColor: '#FFAB91', color: '#fff', width: '100%' }}>
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faUser} size="3x" className="mb-3" style={{ color: '#dc3545' }} />
              <h5 className="card-title" style={{ color: '#000' }}>Personalized Care</h5>
              <p className="card-text" style={{ color: '#000' }}>
                We prioritize personalized care for each patient. Our doctors take the time to understand your concerns and provide tailored treatment plans.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card" style={{ backgroundColor: '#FFE082', color: '#fff', width: '100%' }}>
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faMicroscope} size="3x" className="mb-3" style={{ color: '#000' }} />
              <h5 className="card-title" style={{ color: '#000' }}>Cutting-edge Technology</h5>
              <p className="card-text" style={{ color: '#000' }}>
                Utilizing cutting-edge technology, we ensure efficient and accurate diagnoses, along with innovative treatment solutions to optimize patient outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<FeedbackButton /> 
      <Footer/>
    </div>


  );
}