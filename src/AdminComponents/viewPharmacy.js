import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewPharmacy() {
    const [pharmacy, setPharmacy] = useState([]);

    useEffect(() => {
        fetchPharmacy();
    }, []);

    const fetchPharmacy = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllPharmacies');
            setPharmacy(response.data);
        } catch (error) {
            console.error('Error fetching pharmacy:', error);
        }
    };

    return (
        <div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">View Pharmacy</h2>
                <div className="table-responsive">
                    <table className="table table-striped custom-table">
                        <thead>
                            <tr>
                                <th>Slno</th>
                                <th>pharmacyName</th>
                                <th>shopRegisteredNo.</th>
                                <th>Mobile</th>
                                <th>Password</th>
                                <th>PharmacyImage</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pharmacy.map((pharmacy, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{pharmacy.pharmacyName}</td>
                                    <td>{pharmacy.shopRegNo}</td>
                                    <td>{pharmacy.mobile}</td>
                                    <td>{pharmacy.password}</td>
                                    <td>
                                        <img
                                            className='profile-img'
                                            src={`http://localhost:8091/uploads/${pharmacy.pharmacyImage}`}
                                            alt='Pharmacy profile'
                                            style={{ height: '100px', width: '100px' }}
                                        />
                                    </td>
                                    <td>{pharmacy.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <style>
                {`
                .custom-table {
                    border-collapse: separate;
                    border-spacing: 0 8px;
                    width: 100%;
                }

                .custom-table th,
                .custom-table td {
                    padding: 12px;
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid #dddddd;
                    background-color: #f9f9f9;
                }

                .custom-table th {
                    background-color: #333;
                    color: #fff;
                }

                .custom-table tbody tr:nth-child(odd) {
                    background-color: #f2f2f2;
                }

                .custom-table tbody tr:hover {
                    background-color: #e0e0e0;
                }
                `}
            </style>
        </div>
    );
}
