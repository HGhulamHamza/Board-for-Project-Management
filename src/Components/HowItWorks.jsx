// src/pages/HowItWorks.jsx
import React from 'react';
import './HowItWorks.css'; // Create this CSS file for styling
import videoFile from '../assets/HowItWorks.mp4'; // Import video file

const HowItWorks = () => {
    return (
        <div className="how-it-works-container">
            <header className="how-it-works-header">
                <h1>How It Works</h1>
                <p>Learn how our project management system can help you and your team manage tasks efficiently.</p>
            </header>
            <div className="video-container">
                <video controls width="600" height="400">
                    <source src={videoFile} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default HowItWorks;
