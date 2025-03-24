/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import supabase from "../../../supabase/client";
import { formatDate } from "../../../utils/formatDate";
import SessionContext from "../../../context/SessionContext";

export default function Review({ game_id }) {
    const { user } = useContext(SessionContext);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    const readRev = async () => {
        try {
            const { data: reviews, error } = await supabase
                .from("reviews")
                .select("*, profiles(username, avatar_url)")
                .eq("game_id", game_id);
            if (error) throw error;
            setReviews(reviews);
        } catch (error) {
            console.error("Errore nel caricamento delle recensioni:", error);
            setError("Errore nel caricare le recensioni");
        }
    };

    useEffect(() => {
        if (game_id) readRev();
    }, [game_id]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {reviews.length === 0 && !error && <p>Non ci sono recensioni al momento.</p>}

            <div className="container-fluid mt-4">
                <div className="row">
                    {reviews && reviews.map((review) => (
                        <div className="col-12 col-md-4" key={review.id}>
                            <div className="mb-4">
                                <div className="p-4 rounded-4 c-reviews">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={review.profiles.avatar_url || '/public/profile-default.png'}
                                            alt="Avatar"
                                            className="rounded rounded-pill avatar image"
                                            style={{ height: 70, width: 70 }}
                                        />
                                        <div className="ms-3">
                                            <h5 className="">{review.profiles.username || "Anonimo"}</h5>
                                        </div>
                                    </div>
                                    <h3 className="mt-3">{review.review_title}</h3>
                                    <p>{review.review_content}</p>
                                    <hr />
                                    <small>{formatDate(review.created_at)}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
