import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for eye toggle
import Navbar from './Navbar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordValidation(password)) {
      alert('Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.');
      return;
    }

    const lowerCaseEmail = email.toLowerCase();

    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        name,
        email: lowerCaseEmail,
        password,
      });

      if (response.data.success) {
        alert('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        alert(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-96" onSubmit={handleSignup}>
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <small className="text-red-600 mt-1 block">
            Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.
          </small>
          {/* Eye icon for toggling password visibility */}
          <div 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;
