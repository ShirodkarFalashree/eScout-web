import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleHistory = () => {
    const { historyId } = useParams();
    const navigate = useNavigate();
    const [historyItem, setHistoryItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [images, setImages] = useState([]);
    const [formattedSections, setFormattedSections] = useState([]);
    const [showAllImages, setShowAllImages] = useState(false);

    useEffect(() => {
        const fetchHistoryItem = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/history/${historyId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    const { images, content, title } = response.data.history;
                    setHistoryItem(response.data.history);
                    setImages(images || []);
                    setFormattedSections([{ title, content: content || [] }]);
                } else {
                    console.error("Failed to fetch the history item");
                }
            } catch (error) {
                console.error("Error fetching history item:", error);
                setError(error.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryItem();
    }, [historyId, navigate]);

    // Function to format the response into an array of points
    const formatResponse = (response) => {
        return response.split('*').filter(point => point.trim() !== '').map(point => point.trim());
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Format the response dynamically
    const formattedResponse = formatResponse(historyItem?.response || "");

    return (
        <div className="bg-[#0f0f0f] min-h-screen">
            <div className="bg-[#0f0f0f] flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6">
                <div className="relative bg-white bg-opacity-5 flex items-center h-14 w-full rounded-xl text-xl">
                    <p className="w-full text-center">{historyItem?.query}</p>
                </div>

                <div>
                    {/* Render each point in a new paragraph */}
                    {formattedResponse.map((point, index) => (
                        <p key={index} className="mt-4 text-xl">{point}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleHistory;
