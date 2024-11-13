import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RxBookmarkFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResponsePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResponsePage = () => {
  const [savedQueries, setSavedQueries] = useState(new Set());
  const location = useLocation();
  const response = location.state?.data?.response || "No data available";
  const [formattedSections, setFormattedSections] = useState([]);
  const searchQuery = location.state?.query || "No search query provided";
  const [title, setTitle] = useState("Search Results");
  const [showAllImages, setShowAllImages] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedData = formatResponse(response);
    setFormattedSections(formattedData.sections);
    setTitle(formattedData.title || "Search Results");

    if (formattedData.images && formattedData.images.length > 0) {
      setImages(formattedData.images);
    }
  }, [response]);

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      sessionStorage.setItem("redirectPath", window.location.pathname);
      navigate("/login");
      return;
    }

    const isQuerySaved = savedQueries.has(searchQuery);
    const action = isQuerySaved ? "removed from saved" : "added to saved";

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

    const newSavedQueries = new Set(savedQueries);
    if (isQuerySaved) {
      newSavedQueries.delete(searchQuery);
    } else {
      newSavedQueries.add(searchQuery);
    }
    setSavedQueries(newSavedQueries);

    try {
      const body = { query: searchQuery, response };
      const res = await axios.post("http://localhost:5000/api/v1/history", body, {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("History updated:", res.data.history);
      }
    } catch (error) {
      console.error("Error saving history:", error);
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

    // Robust regex for image URLs
    const imageRegex = /https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif)(\?[^\s]*)?/gi;
    const images = responseText.match(imageRegex) || [];

    return { title, sections: formattedSections, images };
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
            {savedQueries.has(searchQuery) ? (
              <RxBookmarkFilled />
            ) : (
              <PiBookmarkSimpleBold />
            )}
          </div>
        </div>

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
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded"
                    loading="lazy"
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
