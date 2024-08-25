import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './HomePage.css';
import Hero from '../assets/home.jpeg';
// Import videoFile if needed
// import videoFile from '../assets/HowItWorks.mp4';

const Homepage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
    const [showVideo, setShowVideo] = useState(false); // Initialize state for video visibility

    const handleAboutClick = () => {
        navigate('/AboutUs'); // Navigate to AboutUs page
    }
    const handleHowItWorksClick = () => {
        navigate('/HowItWorks');
    }

    return (
        <div className="homepage-container">
            <nav className="navbar">
                <div className="logo">Project Management</div>
                <div className="nav-links">
                    <a href="#about" onClick={handleAboutClick}>About Us</a>
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/sign-up" className="signup-btn">Sign Up</Link>
                </div>
            </nav>
            <header className="hero-section">
                <div className="hero-text">
                    <h1>Efficient Project Management for Your Team</h1>
                    <p>Manage your tasks effortlessly, track progress, and collaborate with your team using our intuitive project management system.</p>
                    <div className="hero-buttons">
                        <a href="#about" className="btn about-btn" onClick={handleAboutClick}>About Us</a>
                        <a href="#howitworks" className="btn how-btn" onClick={handleHowItWorksClick}>How It Works</a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={Hero} alt="Project Management" />
                </div>
                <div className="pink-background"></div>
            </header>
            
            {showVideo && (
                <div className="video-container">
                    <video controls width="600" height="400">
                        <source src={videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
}

export default Homepage;
