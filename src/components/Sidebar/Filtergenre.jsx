import { useState } from "react";
import useFetchGames from "../../hooks/useFetchData";
import { Link } from "react-router";

export default function FilterGenre() {
    const initialUrl = "https://api.rawg.io/api/genres?key=5b73a5ee185f4e5d8d70747cd2c3f2f3";
    const { games } = useFetchGames(initialUrl);
    const [ showMore, setShowMore ] = useState(false);

    const showed = showMore ? games : games.slice(0, 0);

    return (
        <div className="">
            <ul>
                {showed.length > 0 ? (
                    showed.map((genre) => (
                        <li className="" key={genre.id}>
                            <Link className="text-decoration-none text-white" to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))
                ) : (
                    <p className="d-none">Nessun genere disponibile</p>
                )}
            </ul>

            {games.length > 3 && (
                <button className="buttonSide" onClick={() => setShowMore(!showMore)}>
                    {showMore
                        ? <p>Nascondi<i className="bi bi-caret-up-fill m-1"></i></p>
                        : <p>Generi<i className="bi bi-caret-down-fill m-1"></i></p>}
                </button>
            )}
        </div>
    )
}