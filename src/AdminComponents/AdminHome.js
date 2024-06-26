import React from 'react';
import Adminhome from '../HomeComponents/Images/Adminhome.jpg';
export default function AdminHome() {
  return (
    <div style={styles.container}><br/><br/>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Hello, Admin!</h1>
        <p style={styles.message}>Welcome to the Admin Home page. This is where you can manage your admin tasks.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    height: '100vh',
    width:'100%',
    backgroundImage: `url(${Adminhome})`, // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden',
    zIndex: -1,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: 'white',
    width: '80%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '5px',
  },
  message: {
    fontSize: '1.2em',
  },
};
