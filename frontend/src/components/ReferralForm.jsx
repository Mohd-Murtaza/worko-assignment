import React, { useState } from 'react';
import axios from 'axios';

const ReferralForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    resume: '',
    status: 'pending',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { name, email, experience, resume, status } = formData;

    if (!name || !email || !experience || !resume) {
      setError('All fields are required!');
      setLoading(false);
      return;
    }

    // Check if the resume URL contains "drive.google.com"
    if (!resume.includes('drive.google.com')) {
      setError('Please provide a valid Google Drive URL for the resume.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to submit a referral.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        'https://worko-assignment.vercel.app/api/referrals',
        { name, email, experience, resume, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        {withCredentials: true}
      );

      if (response.data) {
        alert('Referral successfully created!');
        closeForm(); 
      }
    } catch (error) {
      setError('Error creating referral. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[80%]">
        <h2 className="text-xl font-semibold mb-4">Raise New Referral</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter referral name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter referral email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="experience">
              Experience (years)
            </label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter experience in years"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="resume">
              Resume URL
            </label>
            <input
              type="text"
              id="resume"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Paste your Google Drive resume URL"
              required
            />
            <small className="text-yellow-500">
              Please provide a Google Drive URL (e.g., https://drive.google.com/...).
            </small>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`bg-green-500 text-white px-4 py-2 rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Referral'}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralForm;
