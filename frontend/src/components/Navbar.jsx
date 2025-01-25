import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLogin=()=>{
    return localStorage.getItem('token')? true : false;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-slate-900 text-white">
      <img
        className="w-32 md:w-44 lg:w-56"
        src="https://worko.ai/assets/public/workologoai-2@2x.png"
        alt="brand logo"
      />
      {isLogin() ? <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>:""}
    </div>
  );
};

export default Navbar;