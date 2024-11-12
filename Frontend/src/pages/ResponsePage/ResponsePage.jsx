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
  const [images, setImages] = useState([]); // New state for images

  useEffect(() => {
    const formattedData = formatResponse(response);
    setFormattedSections(formattedData.sections);
    setTitle(formattedData.title || "Search Results");

    // Check if images are present and set them
    if (formattedData.images && formattedData.images.length > 0) {
      setImages(formattedData.images);
    }
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
      const body = {
        query: searchQuery,
        response: response
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

    // Assuming images are included in the response, you can extract them
    const images = responseText.match(/https?:\/\/[^\s]+(?:jpg|jpeg|png|gif)/g) || []; // Regex to find image URLs

    return { title, sections: formattedSections, images }; // Include images in the return object
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
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

      {/* Related Images Section */}
      {images.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {images
              .slice(0, showAllImages ? images.length : 4)
              .map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`} // Corrected alt syntax
                  className="w-full h-auto rounded"
                />
              ))}
          </div>

          {images.length > 4 && (
            <button
              onClick={() => setShowAllImages(!showAllImages)}
              className="mt-2 text-blue-500 hover:underline"
            >
              {showAllImages ? "Show less images" : "Show all images"}
            </button>
          )}
        </div>
      )}

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
    </div>
  );
};

export default ResponsePage;
