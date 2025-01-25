import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaPlusCircle } from 'react-icons/fa'; // importing icons

const ReferralCard = ({ referral, handleStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(referral.status);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'New':
        return <FaPlusCircle className="text-blue-500" />;
      case 'Evaluated':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'Hired':
        return <FaCheckCircle className="text-green-500" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaPlusCircle className="text-gray-500" />;
    }
  };

  const handleStatusUpdate = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    handleStatusChange(referral._id, newStatus); // assuming you have a function to handle status change
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-5 transition duration-300 ease-in-out transform group hover:shadow-[rgba(0,_0,_0,_0.15)_0px_15px_25px,_rgba(0,_0,_0,_0.05)_0px_5px_10px,_#16a34a35_0px_15px_25px]">
      <div className="flex justify-between items-start mb-2">
        <h6 className="text-xl font-semibold">{referral.name}</h6>
        <select
          value={selectedStatus}
          onChange={handleStatusUpdate}
          className="py-1 px-2 border rounded border-gray-300 text-gray-700 cursor-pointer"
        >
          <option value="New">New</option>
          <option value="Evaluated">Evaluated</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <p className="text-gray-500 text-sm mb-1">{referral.email}</p>
      <p className="text-gray-600 text-sm mb-2">Experience: {referral.experience} years</p>
      
      {/* Status Icon and Text */}
      <div className="flex items-center mb-3">
        <span className="mr-2">Status:</span>
        {getStatusIcon(selectedStatus)} {/* Status Icon */}
        <span className="ml-2 text-sm font-medium">{selectedStatus}</span> {/* Status Text */}
      </div>

      <div className="mt-2">
        <a
          href={referral.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
            View Resume
          </button>
        </a>
      </div>
    </div>
  );
};

export default ReferralCard;
