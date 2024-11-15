import React, { useState, useEffect } from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RxBookmarkFilled } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from "jspdf";
import "react-toastify/dist/ReactToastify.css";
import "./ResponsePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaDownload } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

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
      const res = await axios.post(
        "http://localhost:5000/api/v1/history",
        body,
        {
          withCredentials: true,
        }
      );

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

    const imageRegex = /https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|gif)(\?[^\s]*)?/gi;
    const images = responseText.match(imageRegex) || [];

    return { title, sections: formattedSections, images };
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
  
    // Title
    doc.text(title, 10, 10);
    
    let yPosition = 20;  // Start position for the text on the first page
    
    // Ensure a consistent line height (you can adjust this as needed)
    const lineHeight = 10;
  
    formattedSections.forEach((section, index) => {
      doc.setFontSize(14);
      
      // Add section title
      doc.text(section.title, 10, yPosition);
      yPosition += lineHeight;  // Move to the next line
  
      doc.setFontSize(12);
      section.content.forEach((line, idx) => {
        // Wrap the text if it's too long
        const wrappedLines = doc.splitTextToSize(line, 180);  // Max width of 180 units
  
        wrappedLines.forEach((wrappedLine) => {
          // Check if the text exceeds the page height
          if (yPosition + lineHeight > doc.internal.pageSize.height) {
            doc.addPage(); // Add a new page if necessary
            yPosition = 10; // Reset yPosition for the new page
          }
          
          doc.text(wrappedLine, 20, yPosition); // Add the wrapped line to the PDF
          yPosition += lineHeight;  // Move the yPosition down for the next line
        });
      });
  
      yPosition += lineHeight; // Add some space after each section
    });
  
    // Format the title to avoid invalid characters in filenames
    const formattedTitle = searchQuery.replace(/[\\\/:*?"<>|]/g, '_');
    
    // Save the generated PDF
    doc.save(`${formattedTitle}.pdf`);
  };
  
  const exportToWord = () => {
    const content = formattedSections
      .map((section) => `${section.title}\n${section.content.join("\n")}\n`)
      .join("\n");
  
    const blob = new Blob([content], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    // Replace spaces with underscores and remove invalid characters
    const formattedTitle = searchQuery.replace(/[\\\/:*?"<>|]/g, '_').replace(/\s+/g, '_'); // Replace spaces with underscores
    link.href = url;
    link.download = `${formattedTitle}.docx`;
    link.click();
  };

  const exportToTXT = () => {
    const content = formattedSections
      .map((section) => `${section.title}\n${section.content.join("\n")}\n`)
      .join("\n");
  
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    // Replace spaces with underscores and remove invalid characters
    const formattedTitle = searchQuery.replace(/[\\\/:*?"<>|]/g, '_').replace(/\s+/g, '_'); // Replace spaces with underscores
    link.href = url;
    link.download = `${formattedTitle}.txt`;
    link.click();
  };
  

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="bg-[#0f0f0f] flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6">
        <div className="relative bg-white bg-opacity-5 flex items-center h-14 w-full rounded-xl text-xl">
          <div className="flex gap-4 ml-4 text-2xl ">
           { isDialogOpen ?  <IoClose
              onClick={toggleDialog}
              className="cursor-pointer "
            /> :<FaDownload
              onClick={toggleDialog}
              className="cursor-pointer   "
            />}

            {isDialogOpen && (
              <div className="absolute top-16 left-0 bg-black shadow-1xl  shadow-black text-black  p-4 rounded shadow-lg z-50">
                <button
                  onClick={exportToPDF}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 w-full"
                >
                  Export as PDF
                </button>
               
                <button
                  onClick={exportToTXT}
                  className="bg-yellow-400 text-white px-4 py-2 hover:bg-yellow-500  rounded  w-full"
                >
                  Export as TXT
                </button>
              </div>
            )}

          </div>
          <p className="w-full text-center mr-10">{searchQuery}</p>
          <div
            className="absolute right-4 text-white text-3xl w-10 h-16 flex items-center justify-end rounded-full cursor-pointer"
            onClick={handleSaveClick}
          >
            {savedQueries.has(searchQuery) ? (
              <>
                <RxBookmarkFilled />
              </>
            ) : (
              <>
                <PiBookmarkSimpleBold />
              </>
            )}
          </div>
          {/* .. */}
        </div>

        {/* <div className="flex gap-4 mb-6 text-3xl  ">
          <FaDownload />
        </div> */}

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
