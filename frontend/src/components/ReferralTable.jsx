import React from 'react';

const ReferralTable = ({ referrals, handleStatusChange }) => {
  return (
    <table className="table-auto w-full bg-white rounded shadow-md">
      <thead>
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Experience</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
          <th className="px-4 py-2">Resume</th>
        </tr>
      </thead>
      <tbody>
        {referrals.map((referral) => (
          <tr key={referral._id}>
            <td className="border px-4 py-2">{referral.name}</td>
            <td className="border px-4 py-2">{referral.email}</td>
            <td className="border px-4 py-2">{referral.experience} years</td>
            <td className="border px-4 py-2">{referral.status}</td>
            <td className="border px-4 py-2">
              <select
                className="p-2 border rounded"
                value={referral.status}
                onChange={(e) => handleStatusChange(referral._id, e.target.value)}
              >
                <option value="New">New</option>
                <option value="Evaluated">Evaluated</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </td>
            <td className="border px-4 py-2">
              {referral.resume && (
                <a
                  href={referral.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Open Resume
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReferralTable;
