import { useState, useEffect } from "react";

// Funzione per ordinare i giochi
const useSortGames = (games, sortOption) => {
    const [sortedGames, setSortedGames] = useState([]);

    useEffect(() => {
        const sort = () => {
            let sorted = [...games];
            switch (sortOption) {
                case "date":
                    sorted.sort((a, b) => new Date(b.released) - new Date(a.released)); // Ordinato per data di rilascio
                    break;
                case "relevance":
                    sorted.sort((a, b) => b.rating - a.rating); // Ordinato per valutazione (rilevanza)
                    break;
                case "name":
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "popularity":
                    sorted.sort((a, b) => b.popularity - a.popularity);
                    break;
                case "score":
                    sorted.sort((a, b) => b.score - a.score);
                    break;
                default:
                    break;
            }
            setSortedGames(sorted);
        };

        if (games.length > 0) {
            sort();
        }
    }, [games, sortOption]);

    return sortedGames;
};

export default useSortGames;
