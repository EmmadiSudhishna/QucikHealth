import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function ProfileCertificateModal({ show, handleClose, onUpdate }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadCertificate = async (filename) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("filename", filename);

        try {
            const response = await axios.post("http://localhost:8091/api/files/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log("Certificate uploaded successfully...");
                return filename;
            } else {
                console.log("Failed to upload the certificate");
                return null;
            }
        } catch (error) {
            console.log("Error uploading the certificate", error);
            return null;
        }
    };

    const handleUpdateCertificate = async (event) => {
        event.preventDefault();
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }
        setLoading(true);
        setError(null);
        const filename = Date.now() + file.name;
        const uploadedFilename = await uploadCertificate(filename);
        if (uploadedFilename) {
            onUpdate(uploadedFilename);
            handleClose();
        } else {
            setError("Failed to upload the certificate. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Certificate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleUpdateCertificate}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose a new certificate</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Uploading...' : 'Update Certificate'}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
