import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';
import Efficient from '../assets/efficient.jpg';
import Task from '../assets/task.jpeg';
import Pro from '../assets/pro.jpeg';

const AboutUs = () => {
    const navigate = useNavigate(); // Hook from React Router

    const handleExploreClick = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className="aboutus-container">
            <div className="aboutus-images">
                <div className="image-group">
                    <img src={Efficient} alt="Efficient Collaboration" className="image-large" />
                    <img src={Task} alt="Task Management" className="image-small" />
                </div>
                <div className="image-single">
                    <img src={Pro} alt="Progress Tracking" className="image-medium" />
                </div>
            </div>
            <div className="aboutus-text">
                <h2>A Bit About Us</h2>
                <p>We are committed to providing a seamless and efficient project management experience to our users. Our platform is designed to help teams collaborate, track progress, and achieve their goals with ease.</p>
                <a href="#explore" className="btn explore-btn" onClick={handleExploreClick}>Explore More</a>
            </div>
        </div>
    );
}

export default AboutUs;
