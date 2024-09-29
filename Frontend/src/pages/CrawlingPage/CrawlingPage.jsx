import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { MultiStepLoader as Loader } from "../../components/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { BackgroundGradientAnimation } from "../../components/Background";

const loadingStates = [
  { text: "Verywell Health" },
  { text: "Yoga Journal" },
  { text: "Healthline" },
  { text: "Mayo Clinic" },
  { text: "WebMD" },
  { text: "Yoga International" },
  { text: "Medical News Today" },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function for redirection

  useEffect(() => {
    // Calculate the total duration of the loader animation
    const totalDuration = loadingStates.length * 500; // 500 is the duration per step

    // Set a timeout to redirect after the first loop of the loader completes
    const timeoutId = setTimeout(() => {
      setLoading(false); // Stop the loading if necessary
      navigate("/response"); // Redirect to the response page
    }, totalDuration);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <BackgroundGradientAnimation>
      <div className="w-full h-[60vh] flex items-center justify-center">
        {/* Core Loader Modal */}
        <Loader
          loadingStates={loadingStates}
          loading={loading}
          duration={500}
        />
      </div>
    </BackgroundGradientAnimation>
  );
}
