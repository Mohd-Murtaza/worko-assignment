import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Login */}
        <Route path="/login" element={<Login />} />

        {/* Route for Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Route for Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
