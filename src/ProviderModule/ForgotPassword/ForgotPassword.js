import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiUrls from '../../ApiUrls';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrls.FORGOT_PROVIDER_PASSSOWRD}`, { email });
            setMessage(response.data.message);
            setError('');
            setLoading(false);
            navigate('/verify-code', { state: { email } });
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong.');
            setMessage('');
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f9f9f9',
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    maxWidth: 400,
                    width: '100%',
                    backgroundColor: '#ffffff',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h5" component="h1" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                    Forgot Password
                </Typography>
                {message && <Alert severity="success" sx={{ marginBottom: '15px' }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ marginBottom: '15px' }}>{error}</Alert>}
                <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <Box sx={{ position: 'relative', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={loading || !email}
                        sx={{ textTransform: 'none', fontSize: '16px', padding: '10px 0' }}
                    >
                        {loading ? 'Sending Code...' : 'Send Verification Code'}
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
