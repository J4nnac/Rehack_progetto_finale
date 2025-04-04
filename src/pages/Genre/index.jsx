import { useState } from "react";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination";
import Gamecard from "../../components/GameCard";
import { BarLoader } from "react-spinners";
import useFetchGames from "../../hooks/useFetchData";
import DropdownGenre from "../../components/FilterDropdown/dropdownGenre";
import DropdownPlatform from "../../components/FilterDropdown/dropdownPlatform";

import useSortGames from "../../hooks/useSortGames";
import DropdownSort from "../../components/FilterDropdown/dropdownSort";

export default function Genre() {
    const [page, setPage] = useState(1);
    const [sortOption, setSortOption] = useState("date");
    const { genre } = useParams();

    const url = `https://api.rawg.io/api/games?key=5b73a5ee185f4e5d8d70747cd2c3f2f3&genres=${genre}&page_size=24&page=${page}`;
    const { games, loading, error } = useFetchGames(url);
    const sortedGames = useSortGames(games, sortOption);

    return (
        <div className="container-fluid pt-0">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-capitalize text-center homeTitle my-3">{genre}</h1>
                </div>
                <div className="dropdown-container d-flex flex-wrap">
                    <div className="d-flex d-md-none mb-2">
                        <DropdownGenre />
                        <DropdownPlatform /></div>

                    <DropdownSort sortOption={sortOption} setSortOption={setSortOption} />
                </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
                {loading && <BarLoader color="#FF630F" height={4} width={100} />}
                {error && <p>{error}</p>}
            </div>
            <div className="row">
                <div className="game-wrapper">
                    {sortedGames.map((game) => (
                        <Gamecard key={game.id} game={game} />
                    ))}
                </div>
            </div>
            <div className="py-4 w-100 d-flex justify-content-center">
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>
    );
}
