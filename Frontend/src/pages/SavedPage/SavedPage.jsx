import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "../../components/Background";
import { AnimatedList } from "../../components/AnimatedList";
import axios from "axios";

const items = [
  <div
    key="1"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    Benefit of yoga
  </div>,
  <div
    key="2"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    Recursion in C++
  </div>,
  <div
    key="3"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    Healthy dal recipe
  </div>,
  <div
    key="7"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    React hooks
  </div>,
  <div
    key="8"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    Test plan for project
  </div>,
  <div
    key="9"
    className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2"
  >
    Java prime number program
  </div>,
  // Add more items as needed
];

const SavedPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("token"); // Check token in localStorage
        console.log("Token found:", token); // Debugging log

        if (!token) {
            console.log("No token found. Redirecting to login.");
            navigate("/login");
            return;
        } else {
            console.log("Token exists. Staying on SavedPage.");
            setLoading(false);
        }

        try {
            // Add the token in the Authorization header
            const historyResponse = await axios.get(
                "http://localhost:5000/api/v1/history",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token here
                    },
                    withCredentials: true,
                }
            );

            if (historyResponse.data.success) {
                setHistory(historyResponse.data.history); // Store history in state
                console.log(historyResponse.data.history);                
            } else {
                console.error("Failed to fetch history");
            }
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || "An error occurred");
            setSuccess(false);
        }
    };

    fetchData();
}, [navigate]);


  // Display nothing while loading to prevent a flicker before redirect
  if (loading) {
    return null; // You can add a loading spinner here if needed
  }

  const handleClick = () => {
    navigate("/response");
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      <BackgroundGradientAnimation>
        <AnimatedList delay={500} className="m-3 z-50">
          {items}
        </AnimatedList>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default SavedPage;
