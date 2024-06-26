import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faPhone, faLock, faMapMarkerAlt, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ProfileImageModal from './ProfileImageModal'; // Ensure this import is correct

export default function PharmacyProfile() {
    const [pharmacy, setPharmacy] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPharmacyProfile = async () => {
            try {
                const pharmacyId = JSON.parse(sessionStorage.getItem('pharmacyId'));
                if (pharmacyId) {
                    const response = await axios.get(`http://localhost:8091/api/v1/getPharmacyById/${pharmacyId}`);
                    setPharmacy(response.data);
                } else {
                    setErrorMessage("No pharmacy data found.");
                }
            } catch (error) {
                console.error("Error fetching pharmacy profile:", error);
                setErrorMessage("Failed to fetch pharmacy profile. Please try again.");
            }
        };

        fetchPharmacyProfile();
    }, []);

    const handleEditProfile = () => {
        navigate("/pharmacy/edit-profile", { state: { pharmacy: pharmacy } });
    };

    const handleUpdateProfilePicture = async (newPharmacyImage) => {
        try {
            const updatedPharmacy = { ...pharmacy, pharmacyImage: newPharmacyImage };
            const response = await axios.put(`http://localhost:8091/api/v1/updatePharmacy/${pharmacy.pharmacyId}`, updatedPharmacy);

            if (response.status === 200) {
                setPharmacy(updatedPharmacy);
                sessionStorage.setItem('pharmacy', JSON.stringify(updatedPharmacy));
            } else {
                console.error("Failed to update profile picture");
            }
        } catch (error) {
            console.error("Error updating profile picture:", error);
        }
    };

    const labelStyle = { display: 'block', margin: '10px 0', fontSize: '1.1rem' };
    const colors = {
        name: '#007bff',
        shopRegNo: '#17a2b8',
        location: '#28a745',
        mobile: '#dc3545',
        password: '#e83e8c',
        pharmacyImage: '#6f42c1',
    };

    return (
        <div className='container mt-5'>
            <div className='profile-header text-center'>
                {pharmacy.pharmacyImage && (
                    <img
                        className='profile-img'
                        src={`http://localhost:8091/uploads/${pharmacy.pharmacyImage}`}
                        alt='Pharmacy profile'
                        onClick={() => setShowProfilePictureModal(true)}
                    />
                )}
                <h2 className='profile-name'>{pharmacy.pharmacyName}</h2>
                <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: '#007bff', cursor: 'pointer' }}
                    onClick={() => setShowProfilePictureModal(true)}
                />
                {errorMessage && <p style={{ color: '#dc3545' }}>{errorMessage}</p>}
            </div>

            <div className='profile-details mt-4'>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faCertificate} style={{ color: colors.shopRegNo, marginRight: '5px' }} />
                    <span><strong>Shop Reg No:</strong> {pharmacy.shopRegNo}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: colors.location, marginRight: '5px' }} />
                    <span><strong>Location:</strong> {pharmacy.location}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faPhone} style={{ color: colors.mobile, marginRight: '5px' }} />
                    <span><strong>Mobile:</strong> {pharmacy.mobile}</span>
                </div>
                <div className='detail-item'>
                    <FontAwesomeIcon icon={faLock} style={{ color: colors.password, marginRight: '5px' }} />
                    <span><strong>Password:</strong> {pharmacy.password}</span>
                </div>
            </div>

            <div className='text-center'>
                <button
                    className='btn btn-primary mt-3'
                    style={{ backgroundColor: '#007bff', border: 'none', borderRadius: '5px', padding: '10px 20px', color: 'white' }}
                    onClick={handleEditProfile}
                >
                    Edit Profile
                </button>
            </div>

            <ProfileImageModal 
                show={showProfilePictureModal} 
                handleClose={() => setShowProfilePictureModal(false)} 
                onUpdate={handleUpdateProfilePicture} 
            />

            <style>
              {`
                .profile-header {
                  margin-bottom: 20px;
              }
              
              .profile-img {
                  width: 180px;
                  height: 180px;
                  object-fit: cover;
                  border-radius: 50%;
                  border: 5px solid #28a745;
                  cursor: pointer;
              }
              
              .profile-name {
                  margin-top: 15px;
                  font-size: 1.5rem;
                  color: #007bff;
              }
              
              .profile-details {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  gap: 20px;
              }
              
              .detail-item {
                  flex: 1 1 20%;
                  font-size: 1.1rem;
                  margin-bottom: 10px;
              }
              
              .detail-item span {
                  display: inline-block;
              }
              
              `}
            </style>
        </div>
    );
}
