import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="aboutus-container">
            <div className="aboutus-images">
                <div className="image-group">
                    <img src="src/assets/efficient.jpg" alt="Efficient Collaboration" className="image-large" />
                    <img src="src/assets/task.jpeg" alt="Task Management" className="image-small" />
                </div>
                <div className="image-single">
                    <img src="src/assets/pro.jpeg" alt="Progress Tracking" className="image-medium" />
                </div>
            </div>
            <div className="aboutus-text">
                <h2>A Bit About Us</h2>
                <p>We are committed to providing a seamless and efficient project management experience to our users. Our platform is designed to help teams collaborate, track progress, and achieve their goals with ease.</p>
                <a href="#explore" className="btn explore-btn">Explore More</a>
            </div>
        </div>
    );
}

export default AboutUs;
