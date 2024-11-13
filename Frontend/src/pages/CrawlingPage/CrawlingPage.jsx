import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for redirection
import { MultiStepLoader as Loader } from "../../components/multi-step-loader";
import { BackgroundGradientAnimation } from "../../components/Background";

const loadingStates = [
  { text: "Crawling sites" },
  { text: "Scrapping data" },
  { text: "Summarizing the data" },
  { text: "formatting data " },
  
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function for redirection
  const location = useLocation(); // Access the passed data

  useEffect(() => {
    // This logic assumes that the scraping process is already running
    // You will pass a signal to indicate when scraping is done
    const checkScrapingCompletion = async () => {
      try {
        // Simulate an API call to check if scraping has finished
        const result = location.state?.data; // Assuming 'data' is the scraped data passed from the previous page

        if (result) {
          // Scraping completed, stop the loader
          setLoading(false);

          // Navigate to the response page and pass the scraped data
          navigate("/response", { state: { data: result } });
        }
      } catch (error) {
        console.error("Error during scraping:", error);
      }
    };

    // Continuously check the status of scraping (adjust polling interval as needed)
    const intervalId = setInterval(checkScrapingCompletion, 1000); // Check every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [navigate, location.state]);

  return (
    <BackgroundGradientAnimation>
      <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        {loading ? (
          <Loader
            loadingStates={loadingStates}
            loading={loading}
            duration={500}
          />
        ) : (
          <div>Loading Complete. Redirecting...</div> // Optional: add a message while navigating
        )}
      </div>
    </BackgroundGradientAnimation>
  );
}
