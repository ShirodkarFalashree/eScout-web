import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleHistory = () => {
    const { historyId } = useParams(); // Get the historyId from the URL
    const navigate = useNavigate();
    const [historyItem, setHistoryItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
                    setHistoryItem(response.data.history);
                } else {
                    console.error("Failed to fetch the history item");
                }
            } catch (error) {
                console.error(error);
                setError(error.response?.data?.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchHistoryItem();
    }, [historyId, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="m-3">
            <h1 className="text-2xl">Search Query: {historyItem.query}</h1>
            <p className="mt-4">{historyItem.response}</p>
        </div>
    );
};

export default SingleHistory;
