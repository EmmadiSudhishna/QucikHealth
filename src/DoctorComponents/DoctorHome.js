import React from 'react';
import doctor1 from '../HomeComponents/Images/doctor1.png';

const DoctorHome = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.textContainer}>
          <h2 style={styles.heading}>Welcome, Doctor!</h2>
          <p style={styles.lead}>Your Patients Await</p>
          <hr style={styles.separator} />
          <p style={styles.paragraph}>
            As a dedicated healer, you hold the power to change lives. Manage your patients and tasks with ease from this central hub.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundImage: `url(${doctor1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    zIndex: -1,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  textContainer: {
    color: 'white',
    padding: '20px',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  lead: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  separator: {
    width: '50%',
    margin: '1rem auto',
    borderColor: 'white',
  },
  paragraph: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default DoctorHome;
