import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function ViewUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8091/api/v1/getAllUsers');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div>
           
            <div className="container mt-5">
                <h2 className="text-center mb-4">View Users</h2>
                <div className="table-responsive">
                    <table className="table table-striped custom-table">
                        <thead>
                            <tr>
                               <th>Slno</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Address</th>
                                <th>EmergencyContact</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.mobile}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.address}</td>
                                    <td>{user.emergencyContact}</td>
                                    
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
