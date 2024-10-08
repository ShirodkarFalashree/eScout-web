import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RxBookmarkFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './ResponsePage.css';
import { useLocation } from 'react-router-dom';

const ResponsePage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  const response = location.state?.data?.response || "No data available";
  const [formattedSections, setFormattedSections] = useState([]);
  const [title, setTitle] = useState("Search Results"); // Default title if not provided in the response
  const [showAllImages, setShowAllImages] = useState(false); // State to manage visibility of all images

  useEffect(() => {
    const formattedData = formatResponse(response);
    setFormattedSections(formattedData.sections);
    setTitle(formattedData.title || "Search Results"); // Use the first section's title if available
  }, [response]);

  const handleSaveClick = () => {
    setIsSaved((prev) => !prev);
    toast(isSaved ? "Document removed from saved!" : "Document added to saved!", {
      position: "bottom-right",
      style: { backgroundColor: '#ffffffdc', color: 'black', borderRadius: '10px' },
      autoClose: 1500, // Automatically close after 1.5 seconds
      closeOnClick: false,
    });
  };

  // Format the response based on sections and bullet points
  const formatResponse = (responseText) => {
    const sections = responseText.split('\n\n'); // Split by empty lines to get sections
    const title = sections[0].split('\n')[0]; // Extract the title from the first section
    const formattedSections = sections.map(section => {
      const lines = section.split('\n').filter(line => line.trim() !== ''); // Split by line breaks and remove empty lines
      const sectionTitle = lines[0]; // The first line will be the title or header of the section
      const content = lines.slice(1).map(line => line.replace(/\*/g, '').trim()); // Remove all asterisks and trim spaces
      return { title: sectionTitle, content };
    });
    return { title, sections: formattedSections };
  };

  // Static object of images
  const staticImages = [
    "https://via.placeholder.com/150", // Placeholder image 1
    "https://via.placeholder.com/150", // Placeholder image 1
    "https://via.placeholder.com/150", // Placeholder image 1
    "https://via.placeholder.com/150", // Placeholder image 1
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1", // Placeholder image 2
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1", // Placeholder image 2
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1", // Placeholder image 2
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1", // Placeholder image 2
    "https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+1", // Placeholder image 2
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2", // Placeholder image 3
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2", // Placeholder image 3
  ];

  return (
    <div className="bg-[#0f0f0f] flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6">
      <div className="relative bg-white bg-opacity-5 flex items-center h-14 w-full rounded-xl text-xl">
        <p className="w-full text-center">{title}</p> {/* Dynamic Title */}
        <div
          className="absolute right-4 text-white text-3xl w-1 h-16 flex items-center justify-end rounded-full cursor-pointer"
          onClick={handleSaveClick}
        >
          {isSaved ? <RxBookmarkFilled /> : <PiBookmarkSimpleBold />}
        </div>
      </div>

      {/* Static Images Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Related Images</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
  {staticImages.slice(0, showAllImages ? staticImages.length : 4).map((image, index) => (
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
            {/* Display the section title */}
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            {/* Display the section content */}
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
