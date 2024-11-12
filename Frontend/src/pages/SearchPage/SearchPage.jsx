import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import { PlaceholdersAndVanishInput } from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for storing search query
  const navigate = useNavigate();

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      alert("Please enter a valid search query.");
      return;
    }

    // Navigate to the crawling page before starting the API call
    navigate("/crawling");

    try {
      setLoading(true);

      // Make POST request to the backend with the search query
      const resultText = await axios.post("http://localhost:3000/summarize", {
        query: searchQuery, // Pass the search query as a payload
      });

      setLoading(false);

      if (resultText && resultText.data) {
        console.log("Summary:", resultText.data.response);
        console.log("Title:", resultText.data.title);
        console.log("Images:", resultText.data.images);
      }

      // Navigate to the response page with the data and query
      navigate("/response", {
        state: {
          data: resultText.data,
          query: searchQuery, // Pass the search query as state
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
        <div className="search-container flex items-center justify-end relative w-[90vw] max-w-2xl mx-auto">
          <PlaceholdersAndVanishInput
            placeholders={
              loading
                ? ["Loading, please wait..."]
                : ["Type here to search", "Search here..."]
            }
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleInputClick}
            value={searchQuery} // Ensure the input reflects the current state
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="relative -bottom-[280px] left-[286px]">
          <Link to="/saved">
            <div className="bg-white text-black text-3xl w-16 h-16 flex items-center justify-center rounded-full">
              <PiBookmarkSimpleBold />
            </div>
          </Link>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default SearchPage;
