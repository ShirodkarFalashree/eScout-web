import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RxBookmarkFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResponsePage.css";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Import axios

const ResponsePage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  const response = location.state?.data?.response || "No data available";
  const [formattedSections, setFormattedSections] = useState([]);
  const searchQuery = location.state?.query || "No search query provided";
  const [title, setTitle] = useState("Search Results");
  const [showAllImages, setShowAllImages] = useState(false);

  useEffect(() => {
    const formattedData = formatResponse(response);
    setFormattedSections(formattedData.sections);
    setTitle(formattedData.title || "Search Results");
  }, [response]);

  const handleSaveClick = async () => {
    setIsSaved((prev) => !prev);
    const action = isSaved ? "removed from saved" : "added to saved";
    
    toast(`Document ${action}!`, {
      position: "bottom-right",
      style: {
        backgroundColor: "#ffffffdc",
        color: "black",
        borderRadius: "10px",
      },
      autoClose: 1500,
      closeOnClick: false,
    });

    // Call the addHistory API
    try {
      // const images = staticImages; // Add any relevant images you want to store
      const body = {
        query: searchQuery,
        response: response
        // images: images,
      };

      const res = await axios.post(
        "http://localhost:5000/api/v1/history", // URL to the login route
        body,
        {
          withCredentials: true, // Add this option
        }
      );

      if (res.data.success) {
        console.log("History added:", res.data.history); // Log success
      }
    } catch (error) {
      console.error("Error saving history:", error); // Handle error
      toast.error("Failed to save history!");
    }
  };

  const formatResponse = (responseText) => {
    const sections = responseText.split("\n\n");
    const title = sections[0].split("\n")[0];
    const formattedSections = sections.map((section) => {
      const lines = section.split("\n").filter((line) => line.trim() !== "");
      const sectionTitle = lines[0];
      const content = lines
        .slice(1)
        .map((line) => line.replace(/\*/g, "").trim());
      return { title: sectionTitle, content };
    });
    return { title, sections: formattedSections };
  };

  const staticImages = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1",
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2",
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2",
  ];

  return (
    <div className="bg-[#0f0f0f] flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6">
      <div className="relative bg-white bg-opacity-5 flex items-center h-14 w-full rounded-xl text-xl">
        <p className="w-full text-center">{searchQuery}</p>
        <div
          className="absolute right-4 text-white text-3xl w-10 h-16 flex items-center justify-end rounded-full cursor-pointer"
          onClick={handleSaveClick}
        >
          {isSaved ? <RxBookmarkFilled /> : <PiBookmarkSimpleBold />}
        </div>
      </div>

      {/* Static Images Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {staticImages
            .slice(0, showAllImages ? staticImages.length : 4)
            .map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Static Image ${index + 1}`}
                className="w-full h-auto rounded"
              />
            ))}
        </div>

        {staticImages.length > 4 && (
          <button
            onClick={() => setShowAllImages(!showAllImages)}
            className="mt-2 text-blue-500 hover:underline"
          >
            {showAllImages ? "Show less images" : "Show all images"}
          </button>
        )}
      </div>

      {/* Display the API response in a formatted way */}
      <div className="flex flex-col gap-6">
        {formattedSections.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <ul className="ml-6 list-disc text-sm">
              {section.content.map((line, idx) => (
                <li key={idx}>
                  <TextGenerateEffect words={line.trim()} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default ResponsePage;
