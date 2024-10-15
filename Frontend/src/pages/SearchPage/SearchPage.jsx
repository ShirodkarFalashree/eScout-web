import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import { PlaceholdersAndVanishInput } from "../../components/InputBox";
import { useNavigate } from "react-router-dom";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for storing search query

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query as the user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Navigate to the crawling page before starting the API call
    navigate("/crawling");

    try {
      setLoading(true);
      const resultText = await axios.post("http://localhost:3000/summarize");
      setLoading(false);

      if (resultText) {
        console.log(resultText.data.response);
        console.log(resultText);
      }

      // After the data is fetched, navigate to the response page
      navigate("/response", {
        state: {
          data: resultText.data,
          query: searchQuery, // Pass the search query as state
        },
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
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
          {loading ? (
            <PlaceholdersAndVanishInput
              placeholders={["Loading please wait"]}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onClick={handleInputClick}
            />
          ) : (
            <PlaceholdersAndVanishInput
              placeholders={["Type here to search", "Search here.."]}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onClick={handleInputClick}
            />
          )}
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
