import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css'; // Import the CSS file
import { auth } from '../firebaseConfig';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/sign-in'); // Redirect to sign-in page after successful sign-up
    } catch (error) {
      console.error('Sign-up error code:', error.code);
      console.error('Sign-up error message:', error.message);
      setError('Error creating account. Please try again.');
    }
  };
  

  return (
    <div className="container">
      <div className="textSection">
        <h2 className="heading">Join Us Today</h2>
        <p className="description">
          Sign up to get started with our Project Management Service. Manage your team, track progress, and achieve your goals all in one place.
        </p>
        <img 
          src="src/assets/project-management.jpeg" 
          alt="Project Management" 
          className="sideImage" 
        />
      </div>
      <div className="formSection">
        <h2 className="formHeading">Create Account</h2>
        <div className="toggleButtons">
          <button 
            onClick={() => navigate('/sign-in')} 
            className="toggleButton" 
            style={{ backgroundColor: '#ffe6e6' }} // Light pink background for inactive button
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/sign-up')} 
            className="toggleButton"
            style={{ backgroundColor: '#ff5a5f', color: '#fff' }} // Pink background with white text for active button
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSignUp} className="signUpForm">
          <div className="inputGroup">
            <label htmlFor="email" className="inputLabel">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password" className="inputLabel">Password</label>
            <input 
              id="password"
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword" className="inputLabel">Confirm Password</label>
            <input 
              id="confirmPassword"
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="inputField"
              required
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" className="submitButton">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
