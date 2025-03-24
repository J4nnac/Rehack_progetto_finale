/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const GameVideos = ({ gameId }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameVideos = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/games/${gameId}/movies`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    setVideos(data.results);
                } else {
                    setError("No videos available");
                }
            } catch (error) {
                setError("Error fetching videos");
            } finally {
                setLoading(false);
            }
        };

        fetchGameVideos();
    }, [gameId]);

    if (loading) return <div>Caricamento video...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="video-container mt-4">
            <h3>Guarda il trailer del gioco:</h3>
            {videos.length > 0 ? (
                <video controls width="100%" height="auto">
                    <source src={videos[0].data.max} type="video/mp4" />
                    Il tuo browser non supporta il tag video.
                </video>
            ) : (
                <p>No trailer available</p>
            )}
        </div>
    );
};

export default GameVideos;
