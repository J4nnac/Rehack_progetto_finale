
import useFetchGames from "../../hooks/useFetchData";
import { Link } from "react-router";

export default function DropdownGenre() {
    const initialUrl = "https://api.rawg.io/api/genres?key=5b73a5ee185f4e5d8d70747cd2c3f2f3";

    const { games } = useFetchGames(initialUrl);

    return (
        <div className="dropdown me-3">
            <a className="btn btnDropdown m-0 border-0 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Generi
            </a>
            <ul className="dropdown-menu list-unstyled">
                {games.length > 0 ? (
                    games.map((genre) => (
                        <li className="text-decoration-none" key={genre.id}>
                            <Link className="dropdown-item" to={`/games/${genre.slug}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="dropdown-item">Nessun genere disponibile</p>
                )}
            </ul>
        </div>
    )
}
