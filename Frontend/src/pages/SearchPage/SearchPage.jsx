import React, { useState, useEffect } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import { PlaceholdersAndVanishInput } from "../../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import axios from "axios";

const SearchPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  let recognition = null;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/v1/history", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setHistory(response.data.history || []);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      handleSubmit(null, transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Speech recognition error. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async (e, query = searchQuery) => {
    if (e) e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a valid search query.");
      return;
    }

    navigate("/crawling");
    try {
      setLoading(true);
      const resultText = await axios.post("http://localhost:3000/summarize", {
        query,
      });

      setLoading(false);
      navigate("/response", {
        state: {
          data: resultText.data,
          query,
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
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-8 py-4 bg-white/10 shadow-md shadow-white/10 text-white z-50 backdrop-blur-3xl">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            eScout
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button className="text-white hover:underline transition" onClick={() => navigate("/about")}>
            About Us
          </button>
          <button className="text-white hover:underline transition" onClick={() => navigate("/how-it-works")}>
            How to use
          </button>
          <button className="text-white hover:underline transition" onClick={() => navigate("/saved")}>
            Saved by You
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white text-2xl">
            {isMenuOpen ? <AiOutlineClose /> : <FiMenu />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-tranparent p-4 flex flex-col space-y-4 md:hidden">
            <button className="text-white hover:underline ml-[278px] text-xl transition" onClick={() => navigate("/about")}>
              About Us
            </button>
            <button className="text-white text-xl ml-[240px] hover:underline transition" onClick={() => navigate("/how-it-works")}>
              How It Works
            </button>
            <button className="text-white text-xl ml-[240px] hover:underline transition" onClick={() => navigate("/saved")}>
              Saved by You
            </button>
          </div>
        )}
      </nav>

      {isListening && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white p-6 rounded-xl text-lg">
          Listening...
        </div>
      )}
      <h1 className="text-white z-50 mt-28  text-[28px] md:text-4xl p-12 text-center">The <span className="font-extrabold">fastest</span>  and <span className="font-extrabold">cleanest</span> <br /> way to browse </h1>
      <div
        className={`outer-div ${
          isClicked ? "h-[calc(80vh)] -bottom-[calc(20vh)] bg-opacity-10" : "h-[calc(81vh)] -bottom-[calc(60vh)] bg-opacity-0"
        } bg-white bg-blur-xl p-4 pt-8 rounded-3xl w-[calc(110vw-30px)] shadow-lg justify-end absolute left-1/2 transform -translate-x-1/2 mb-5 z-10 transition-all duration-500`}
      >
        <div className="search-container flex items-center justify-center space-x-4 relative w-[90vw] max-w-2xl mx-auto">
          <PlaceholdersAndVanishInput
            placeholders={loading ? ["Loading, please wait..."] : ["Type here to search", "Search here..."]}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onClick={handleInputClick}
            value={searchQuery}
            disabled={loading}
          />
          <button onClick={handleVoiceSearch} className="text-white text-2xl">
            <FaMicrophone />
          </button>
        </div>

        {isClicked && (
          <div className="saved-history mt-8 space-y-4 overflow-y-auto max-h-96">
            {history.length > 0 ? (
              history.slice().reverse().map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/response/${item._id}`)}
                  className="p-4 text-lg w-[1080px] mx-auto text-white bg-transparent border-b-2 bg-blur-2xl rounded-t-lg cursor-pointer transition"
                >
                  {item.query}
                </div>
              ))
            ) : (
              <div className="w-[1080px] mx-auto text-center text-gray-500">
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
