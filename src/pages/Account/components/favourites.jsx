import { useContext } from "react";
import FavContext from "../../../context/FavContext";
import { Link } from "react-router";

export default function Favourites() {
    const context = useContext(FavContext);

    if (!context) {
        return <p>Errore nel caricamento del contesto.</p>;
    }

    const { fav, loading, error } = context;

    if (loading) {
        return <p>Caricamento preferiti...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    if (fav.length === 0) {
        return <p>Non ci sono giochi preferiti al momento.</p>

    }

    return (
        <div className="container d-flex justify-content-center mt-4">
            <div className="row w-100">
                {fav.map((game) => (
                    <div className="col-12 col-md-3 mb-4" key={game.game_id}>
                        <Link className="fav-text-card" to={`/game/${game.game_id}`}>
                            <div>
                                <img className="card-img-top rounded-2" src={game.game_image} alt={game.game_name} />
                                <div className="d-flex align-items-center justify-content-between pt-2 px-1">
                                    <h5 className="m-0">{game.game_name}</h5>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
