import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(10); // 10 seconds for the countdown

    useEffect(() => {
        // Start the timer
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    navigate('/'); // Redirect to home page when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 3000);

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [navigate]);

    return (
        <div className='main-confirmation'>
            <div className="confirmation-container">
                <div className="confirmation-section">
                    <h2>Email Sent Successfully!</h2>
                    <p>Thank you for reaching out. Your account will be created after approval from our team.</p>
                    <p>You will receive a confirmation email once your account has been approved.</p>
                    <p>This page will disappear automatically in {timeRemaining} seconds.</p>
                    <button onClick={() => navigate('/')} className='btn btn-primary'>Back to Home</button>
                </div>
            </div>
        </div>
    );
}
