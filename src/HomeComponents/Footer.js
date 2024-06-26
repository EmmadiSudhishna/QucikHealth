import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import AppStoreBadge from '../HomeComponents/Images/apstore2.png';  // Update with the correct path
import PlayStoreBadge from '../HomeComponents/Images/Google.webp';
import doc5 from '../HomeComponents/Images/doc5.svg';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#B0E0E6 ', color: '#000', padding: '20px 0' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 text-center">
          
            <img src={doc5} alt="Developer" className="rounded-circle" style={{ width: '80px', marginBottom: '10px', borderRadius: '50%' }} />
  </div>
          <div className="col-md-3">
            <h5>Doctor Signup</h5>
            <Link to="/doctor-signup" style={{ color: '#000', textDecoration: 'none' }}>Apply Here</Link>
          </div>
          <div className="col-md-3">
            <h5>Company</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="/About" style={{ color: '#000', textDecoration: 'none' }}>About Us</Link></li>
              <li><Link to="/Contact" style={{ color: '#000', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Services</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>Tele Consultation</Link></li>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>Second Opinion</Link></li>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>Specialities</Link></li>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>Health Wallet</Link></li>
            </ul>
          </div>
        </div><br/>
        <div className="row mt-3">
          <div className="col-md-3">
            <h5>Resources</h5>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>Health Resources</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Support</h5>
            <p><FontAwesomeIcon icon={faEnvelope} /> support@quickhealth.com</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@quickhealth.com</p>
          </div>
          <div className="col-md-3 text-center">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <img src={AppStoreBadge} alt="Download on the App Store" style={{ width: '150px', marginBottom: '10px' }} />
            </a>&nbsp;
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img src={PlayStoreBadge} alt="Get it on Google Play" style={{ width: '150px', marginBottom: '10px' }} />
            </a>
          </div>
          <div className="col-md-3 text-center">
            <div className="d-flex justify-content-center">
              <a href="https://www.linkedin.com" style={{ color: '#000', marginRight: '10px' }}><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
              <a href="https://www.facebook.com" style={{ color: '#000', marginRight: '10px' }}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              <a href="https://www.instagram.com" style={{ color: '#000', marginRight: '10px' }}><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
              <a href="https://www.twitter.com" style={{ color: '#000', marginRight: '10px' }}><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
            </div>
          </div>
        </div><hr/>
        <div className="row mt-3">
          <div className="col-md-12 text-center">
            <p class="float-start">© 2021 QuickHealth LLP.</p>
            <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>TERMS</Link></li>
              <li><Link to="" style={{ color: '#000', textDecoration: 'none' }}>PRIVACY</Link></li>
             
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
