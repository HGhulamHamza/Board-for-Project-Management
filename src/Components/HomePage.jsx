import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const Homepage = () => {
    return (
        <div className="homepage-container">
            <nav className="navbar">
                <div className="logo">Project Management</div>
                <div className="nav-links">
                    <a href="#about">About Us</a>
                    <a href="#home">Home Page</a>
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/sign-up" className="signup-btn">Sign Up</Link>
                </div>
            </nav>
            <header className="hero-section">
                <div className="hero-text">
                    <h1>Efficient Project Management for Your Team</h1>
                    <p>Manage your tasks effortlessly, track progress, and collaborate with your team using our intuitive project management system.</p>
                    <div className="hero-buttons">
                        <a href="#about" className="btn about-btn">About Us</a>
                        <a href="#howitworks" className="btn how-btn">How It Works</a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="src/assets/home.jpeg" alt="Project Management" />
                </div>
                <div className="pink-background"></div>
            </header>
        </div>
    );
}

export default Homepage;
