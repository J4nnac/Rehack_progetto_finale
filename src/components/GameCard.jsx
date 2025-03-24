/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router";
export default function Gamecard({ game }) {
    const [hidden, setHidden] = useState(true);
    const genres = game.genres.map((genre) => genre.name).join(', ')
    return (
        <Link to={`/game/${game.id}`} className="card text-decoration-none mb-3">
        <article
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}>

            <img className="card-img-top" src={game.background_image} alt={game.name} />
            <div className="d-flex flex-column card-body justify-content-between">
                <h3 className="text-white fs-4">{game.name}</h3>
                <div className="d-flex card-text">
                    <small className="m-0 rounded-2 text-white bgc-grey pe-3 ps-2"><i className="bi bi-stars me-2"></i>{game.rating}/{game.rating_top}</small>
                    <small className="rounded-2 text-white bgc-grey mb-0 ms-4 pe-3 ps-2"><i className="bi bi-hearts me-2"></i>{game.added}</small>
                    {!hidden &&
                        <div className="container-fluid card-extra-content">
                            <div className="d-flex justify-content-between">
                                <small className="m-0 p-0 text-white">Genere</small>
                                <small className="m-0 p-0 text-white">{genres}</small>
                            </div>
                            <hr className="text-white" />
                            <div className="d-flex justify-content-between">
                                <small className="m-0 p-0 text-white">Rilascio</small>
                                <small className="m-0 p-0 text-white">{game.released}</small>
                            </div>
                            <hr className="text-white" />
                        </div>}
                </div>

            </div>

        </article>
        </Link>
    )
}