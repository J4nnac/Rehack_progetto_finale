/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useLocation } from "react-router";
import { BarLoader } from "react-spinners";
import Gamecard from "../../components/GameCard";
import Pagination from "../../components/Pagination";
import useFetchGames from "../../hooks/useFetchData";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery();
    const searchQuery = query.get("q") || "";
    const [page, setPage] = useState(1);
    const url = `https://api.rawg.io/api/games?key=5b73a5ee185f4e5d8d70747cd2c3f2f3&search=${searchQuery}&page_size=24&page=${page}`;
    const{ games, loading, error, } = useFetchGames(url)

    return (
        <div className="container-fluid pt-0">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center homeTitle my-3">Risultati per:  "{searchQuery}"</h1>
                </div>
            </div>
            {loading && <BarLoader color="#FF630F" height={4} width={100} />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="row">
                <div className="game-wrapper">
                    {games.length > 0 ? (
                        games.map((game) => <Gamecard key={game.id} game={game} />)
                    ) : (
                        <p>Nessun gioco trovato</p>
                    )}
                </div>
            </div>
            <div className="py-4 w-100 d-flex justify-content-center">
                <Pagination page={page} setPage={setPage} />
            </div>
        </div>
    );
}
