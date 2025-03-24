/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import supabase from "../../../supabase/client";
import { formatDate } from "../../../utils/formatDate";
import SessionContext from "../../../context/SessionContext";

export default function Reviews({ user }) {
    const { session } = useContext(SessionContext);
    const [reviews, setReviews] = useState([]);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (!user) return;

        let ignore = false;

        async function getProfile() {
            const { data, error } = await supabase
                .from("profiles")
                .select("username, avatar_url")
                .eq("id", user.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setAvatarUrl(data.avatar_url);
                }
            }
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [user]);

    const readRev = async () => {
        let { data: reviews, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("profile_id", session.user.id);
        if (error) {
            console.log(error);
        } else {
            setReviews(reviews);
        }
    };

    useEffect(() => {
        if (session) {
            readRev();
        }
    }, [session]);



    const deleteReview = async (reviewId) => {
        try {
            const { error } = await supabase
                .from("reviews")
                .delete()
                .eq("id", reviewId);

            if (error) {
                console.error("Errore nella cancellazione della recensione:", error.message);
                alert("Si è verificato un errore durante la cancellazione della recensione.");
            } else {
                setReviews(reviews.filter((review) => review.id !== reviewId));
            }
        } catch (error) {
            console.error("Errore nella cancellazione della recensione:", error.message);
            alert("Si è verificato un errore durante la cancellazione della recensione.");
        }
    };

    return (
        <div>
            {reviews.length === 0 && <p>Non ci sono recensioni al momento.</p>}
            <div className="container-fluid d-flex flex-column align-items-center mt-4">
                {reviews &&
                    reviews.map((review) => (
                        <div className="row p-2 rounded-2 w-100 c-reviews mt-2" key={review.id}>
                            <div className="col-12 col-md-2 d-flex align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={avatar_url || '/public/profile-default.png'}
                                        alt="Avatar"
                                        className="rounded rounded-pill avatar image"
                                        style={{ height: 70, width: 70 }}
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-8 card-review">
                                <h5 className="mb-2 pb-2 pt-1">{review.game_name}</h5>
                                <div className="mt-2">
                                    <h3 className="text-uppercase">{review.review_title}</h3>
                                    <p className="">{review.review_content}</p>
                                    <small className="">Aggiunta il: {formatDate(review.created_at)}</small>
                                </div>
                            </div>

                            <div className="col-12 col-md-2 d-flex align-items-center justify-content-end">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteReview(review.id)}
                                >
                                    Elimina
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
