import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import apiUrls from '../../ApiUrls';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const { email } = location.state || {};

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${apiUrls.RESET_PROVIDER_PASSSOWRD}`, { email, new_password: newPassword });
            setMessage(response.data.message);
            setError('');
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
                label="New Password"
                type="password"
                fullWidth
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Reset Password
            </Button>
        </div>
    );
};

export default ResetPassword;
