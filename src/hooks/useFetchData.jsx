/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useFetchGames = (url, platformUrl = null, gameId = null) => {
    const [games, setGames] = useState([]);
    const [gameDetails, setGameDetails] = useState(null);
    const [platformName, setPlatformName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            setError(null);
            try {
                const responseGames = await fetch(url);
                if (!responseGames.ok) {
                    throw new Error("Il server dei giochi non risponde");
                }
                const dataGames = await responseGames.json();
                setGames(dataGames.results);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [url]);

    useEffect(() => {
        if (gameId) {
            const fetchGameDetails = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=5b73a5ee185f4e5d8d70747cd2c3f2f3`);
                    if (!response.ok) {
                        throw new Error("Errore durante il recupero del gioco");
                    }
                    const data = await response.json();
                    setGameDetails(data);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchGameDetails();
        }
    }, [gameId]);


    useEffect(() => {
        if (platformUrl) {
            const fetchPlatform = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(platformUrl);
                    if (!response.ok) {
                        throw new Error("Il server delle piattaforme non risponde");
                    }
                    const dataPlatform = await response.json();
                    setPlatformName(dataPlatform.name);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchPlatform();
        }
    }, [platformUrl]);

    return { games, gameDetails, platformName, loading, error };
};

export default useFetchGames;
