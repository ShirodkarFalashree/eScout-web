import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "../../components/Background";
import { AnimatedList } from "../../components/AnimatedList";
import axios from "axios";

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
        navigate("/login");
        return;
      }

      try {
        const historyResponse = await axios.get(
          "http://localhost:5000/api/v1/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (historyResponse.data.success) {
          setHistory(historyResponse.data.history);
          console.log(historyResponse.data.history);
          
        } else {
          console.error("Failed to fetch history");
        }
      } catch (error) {
        console.error(error);
        setError(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Display nothing while loading to prevent a flicker before redirect
  if (loading) {
    return null; // You can add a loading spinner here if needed
  }

  // Function to handle click and navigate to response detail
  const handleItemClick = (id) => {
    navigate(`/response/${id}`); // Adjust the path according to your routing
  };

  return (
    <div className="m-3 z-50 max-h-full overflow-y-auto">
      <BackgroundGradientAnimation className="h-full overflow-y-auto">
        <AnimatedList delay={500}>
          {history.map((item) => (
            <div
              key={item._id}
              className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-50 mx-2 cursor-pointer"
              onClick={() => handleItemClick(item._id)} // Navigate to the specific response
            >
              {item.query} {/* Display the query as the title */}
            </div>
          ))}
        </AnimatedList>
      </BackgroundGradientAnimation>
    </div>
  );
};

export default SavedPage;
