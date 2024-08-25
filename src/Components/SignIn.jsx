import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary
import './SignIn.css'; // Import the CSS file
import ImageSign from '../assets/project-management.jpeg';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();

    // Validate the email format (basic validation)
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/ManagementPage'); // Redirect to the ManagementPage after successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="textSection">
        <h2 className="heading">User Account</h2>
        <p className="description">
          Sign in to manage your tasks, projects, and track your progress of your work.
        </p>
        <img 
          src={ImageSign} 
          alt="Logo" 
          className="sideImage" 
        />
      </div>
      <div className="formSection">
        <h2 className="formHeading">Sign In</h2>
        <div className="toggleButtons">
          <button 
            onClick={() => navigate('/sign-in')} 
            className="toggleButton" 
            style={{ backgroundColor: '#ff5a5f', color: '#fff' }} // Pink background with white text for active button
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/sign-up')} 
            className="toggleButton" 
            style={{ backgroundColor: '#f0f0f0' }} // Light gray background for inactive button
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSignIn} className="signInForm">
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
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" className="submitButton">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
