import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function ProfileImageModal({ show, handleClose, onUpdate }) {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const uploadImage = async (filename) => {
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
                console.log("Image uploaded successfully...");
                return filename;
            } else {
                console.log("Failed to upload the image");
                return null;
            }
        } catch (error) {
            console.log("Error uploading the image", error);
            return null;
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        if (!file) {
            setError("Please select a file before submitting.");
            return;
        }
        setUploading(true);
        const filename = `${Date.now()}_${file.name}`;
        const uploadedFilename = await uploadImage(filename);
        setUploading(false);
        if (uploadedFilename) {
            onUpdate(uploadedFilename);
            handleClose();
        } else {
            setError("Failed to upload image. Please try again.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose a new profile picture</Form.Label>
                        <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Button variant="primary" type="submit" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Edit Picture'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
