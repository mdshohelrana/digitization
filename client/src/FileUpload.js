import React, { useState } from 'react';
import axios from 'axios';

function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.size > 50 * 1024 * 1024) { // 50 MB
            setErrorMessage('File size should not exceed 50MB.');
            setFile(null);
        } else {
            setErrorMessage('');
            setFile(selectedFile);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("response:===", response);
            setSuccessMessage('File uploaded successfully!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error uploading file. Please try again.');
            setSuccessMessage('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default FileUpload;
