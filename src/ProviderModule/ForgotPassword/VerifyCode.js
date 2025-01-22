import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import apiUrls from '../../ApiUrls';

const VerifyCode = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiUrls.VERIFY_CODE}`, { email, code });
            setMessage(response.data.message);
            setError('');
            navigate('/reset-password', { state: { email } });
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
            setMessage('');
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
                label="Verification Code"
                fullWidth
                margin="normal"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Verify Code
            </Button>
        </div>
    );
};

export default VerifyCode;
