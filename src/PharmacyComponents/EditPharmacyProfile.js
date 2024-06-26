import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditPharmacyProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pharmacy } = location.state;
    const [formData, setFormData] = useState(pharmacy);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8091/api/v1/updatePharmacy/${formData.pharmacyId}`, formData);
            if (response.status === 200) {
                navigate("/pharmacy/profile");
            } else {
                console.error("Failed to update pharmacy profile");
            }
        } catch (error) {
            console.error("Error updating pharmacy profile:", error);
        }
    };

    return (
        <div className='container mt-5'>
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h2>Edit Pharmacy Profile</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor='pharmacyName'>Name</label>
                                    <input type='text' className='form-control' id='pharmacyName' name='pharmacyName' value={formData.pharmacyName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor='shopRegNo'>Shop Reg No</label>
                                    <input type='text' className='form-control' id='shopRegNo' name='shopRegNo' value={formData.shopRegNo} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor='location'>Location</label>
                                    <input type='text' className='form-control' id='location' name='location' value={formData.location} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor='mobile'>Mobile</label>
                                    <input type='text' className='form-control' id='mobile' name='mobile' value={formData.mobile} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' className='form-control' id='password' name='password' value={formData.password} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className='text-center'>
                            <button type='submit' className='btn btn-primary me-2'>Save Changes</button>
                            <button type='button' className='btn btn-secondary' onClick={() => navigate("/pharmacy/profile")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
