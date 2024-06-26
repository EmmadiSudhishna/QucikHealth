import React from 'react';


const NotFoundPage = () => {
  return (
    <div className="container text-center py-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 not-found-container" style={styles.container}>
          <h1 className="display-1" style={styles.heading}>404</h1>
          <h2 className="display-4" style={styles.subHeading}>Page Not Found</h2>
          <p className="lead" style={styles.text}>Oops! The page you are looking for could not be found.</p>
          
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '30px',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#dc3545',
  },
  subHeading: {
    color: '#343a40',
  },
  text: {
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
};

export default NotFoundPage;
