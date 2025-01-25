import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import ReferralTable from "./ReferralTable";
import ReferralCard from "./ReferralCard";
import ReferralForm from "./ReferralForm"; // Import the form component
import { useNavigate } from "react-router-dom"; // Use useNavigate from react-router-dom v6

const Home = () => {
  const [referrals, setReferrals] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate(); // For navigation after login

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await axios.get("https://worko-assignment.vercel.app/api/referrals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReferrals(response.data.data);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    if (isLoggedIn) {
      fetchReferrals();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 950);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      await axios.put(`https://worko-assignment.vercel.app/api/referrals/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReferrals((prev) =>
        prev.map((referral) =>
          referral._id === id ? { ...referral, status } : referral
        )
      );
    } catch (error) {
      console.error("Error updating referral status:", error);
    }
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleLogin = () => {
    // Redirect to login page or show login form
    navigate("/login");
  };

  const handleSignup = () => {
    // Redirect to signup page or show signup form
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="p-6">
        {!isLoggedIn ? (
          <div>
            <p className="text-center text-xl mb-4">"Welcome, please log in to see the details"</p>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 mx-2"
              >
                Login
              </button>
              <button
                onClick={handleSignup}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 mx-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={openForm}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
              Raise New Referral
            </button>
            {/* Show Grid for Mobile/Tablet, ReferralTable for Desktop */}
            {isMobile ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {referrals.map((referral) => (
                  <ReferralCard
                    key={referral._id}
                    referral={referral}
                    handleStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            ) : (
              <ReferralTable
                referrals={referrals}
                handleStatusChange={handleStatusChange}
              />
            )}
          </>
        )}
      </div>

      {/* Show Referral Form in Modal if showForm is true */}
      {showForm && <ReferralForm closeForm={closeForm} />}
    </div>
  );
};

export default Home;
