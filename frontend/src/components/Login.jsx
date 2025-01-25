import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const lowerCaseEmail = email.toLowerCase();
    try {
      const response = await axios.post("https://worko-assignment.vercel.app/api/login", {
        email:lowerCaseEmail,
        password},
        { withCredentials: true }
      );
  
      console.log("😇 login response here ", response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      if (error.response.data.message=="user not found"){
        alert("User not found please signup");
        navigate("/Signup");
      } else if (error.response.data.message=="Invalid email or password"){
        alert("Invalid email or password");
      } else {
        alert("An error occurred while logging in. Please try again.");
      }
    }
  };
  

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
    </>
    
  );
};

export default Login;
