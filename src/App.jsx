import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import ManagementPage from './Components/ManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/ManagementPage" element={<ManagementPage />} />
      </Routes>
    </Router>
  );
}

export default App;
