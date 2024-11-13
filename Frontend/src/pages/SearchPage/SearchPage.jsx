import React, { useState, useEffect } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import { PlaceholdersAndVanishInput } from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]); // State to hold saved history
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved history when component mounts
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/v1/history",
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          setHistory(response.data.history || []); // Store fetched history
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleInputClick = () => {
    setIsClicked(true); // Set clicked state to true
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      alert("Please enter a valid search query.");
      return;
    }

    navigate("/crawling");
    try {
      setLoading(true);
      const resultText = await axios.post("http://localhost:3000/summarize", {
        query: searchQuery,
      });

      setLoading(false);
      if (resultText && resultText.data) {
        console.log("Summary:", resultText.data.response);
        console.log("Title:", resultText.data.title);
        console.log("Images:", resultText.data.images);
      }

      navigate("/response", {
        state: {
          data: resultText.data,
          query: searchQuery,
        },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error fetching the summary:", error);
      alert("An error occurred while fetching the summary. Please try again.");
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div
        className={`outer-div ${
          isClicked
            ? "h-[calc(80vh)] -bottom-[calc(20vh)] bg-opacity-10"
            : "h-[calc(81vh)] -bottom-[calc(60vh)] bg-opacity-0"
        }  bg-white bg-blur-xl p-4 pt-8 rounded-3xl w-[calc(110vw-30px)] shadow-lg justify-end absolute left-1/2 transform -translate-x-1/2 mb-5 z-10 transition-all duration-500`}
      >
        {/* Search Input and Bookmark Icon */}
        <div className="search-container flex items-center justify-center space-x-4 relative w-[90vw] max-w-2xl mx-auto">
          <PlaceholdersAndVanishInput
            placeholders={
              loading
                ? ["Loading, please wait..."]
                : ["Type here to search", "Search here..."]
            }
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleInputClick}
            value={searchQuery}
            disabled={loading}
          />
          {/* <Link to="/saved">
            <div className="bg-white text-black text-3xl w-12 h-12 flex items-center justify-center rounded-full shadow-md">
              <PiBookmarkSimpleBold />
            </div>
          </Link> */}
        </div>

        {/* Conditionally Render Saved History */}
        {isClicked && (
          <div className="saved-history mt-8 space-y-4 overflow-y-auto max-h-96">
            {history.length > 0 ? (
              history
                .slice() // Create a shallow copy to avoid mutating the original array
                .reverse() // Reverse the order of items
                .map((item) => (
                  <div
                    key={item._id}
                    onClick={() => navigate(`/response/${item._id}`)}
                    className="p-4 text-lg text-white bg-black/10 border-b-2 bg-blur-2xl rounded-t-lg cursor-pointer transition"
                  >
                    {item.query} {/* Display query as saved item */}
                  </div>
                ))
            ) : (
              <div className="text-center text-gray-500">
                No saved history available.
              </div>
            )}
          </div>
        )}
      </div>
    </BackgroundGradientAnimation>
  );
};

export default SearchPage;
