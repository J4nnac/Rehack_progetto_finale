/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router";
import { useRef, useState } from "react";
import supabase from "../../../supabase/client";
import { Toast } from "primereact/toast";

export default function GameReviews({ gameDetails, loading, error, session }) {
    const { id } = useParams();
    const toast = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const review = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(review));

        const { error } = await supabase
            .from("reviews")
            .insert([{
                review_title: title,
                review_content: content,
                game_id: id,
                game_name: gameDetails.name,
                profile_username: session.user.user_metadata.username,
            }])
            .select();

        if (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `Errore, recensione non inviata, riprovare.`,
                life: 3000,
            });
        } else {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: `Recensione inviata.`,
                life: 3000,
            });
            setShowModal(false);
        }
    };


    const openModal = () => {
        if (!session) {

            navigate('/login');
            return;
        }
        setShowModal(true);
    };

    return (
        <>
            <div className="row justify-content-center w-100">
                {loading && <p>Caricamento...</p>}
                {error && <p className="caption">{error}</p>}


                {session ? (
                    <button onClick={openModal} className="btn-rev rounded-2">
                        Scrivi una recensione
                    </button>
                ) : (
                        <button onClick={openModal} className="btn-rev rounded-2">
                            Scrivi una recensione
                        </button>
                )}
            </div>


            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4 className="p-0">Scrivi una recensione su: <strong>{gameDetails.name}</strong></h4>
                        <form onSubmit={handleReviewSubmit} className="form p-0">
                            <div className="d-flex align-items-end">
                                <div className="d-flex flex-column w-100">

                                    <input id="title" className="form-content p-2 rounded-top-2" placeholder="Titolo..." type="text" name="title" required />
                                    <div className="form-border"></div>
                                    <textarea
                                        className="p-2 rounded-bottom-2 text-area-review"
                                        name="content"
                                        placeholder="Scrivi qui la tua recensione..."
                                        required
                                    />
                                </div>
                                <button type="submit" className="bg-transparent border-0 send-button">
                                    <i className="bi bi-send-fill fs-5"></i>
                                </button>
                            </div>
                        </form>
                        <button onClick={() => setShowModal(false)} className="close-modal-btn">
                            Chiudi
                        </button>
                    </div>
                </div>
            )}


            {gameDetails.reviews && (
                <div className="reviews-section">
                    <h2>Recensioni</h2>
                    {gameDetails.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <h4>{review.review_title}</h4>
                            <p>{review.review_content}</p>
                            <p><strong>Recensito da:</strong> {review.profile_username}</p>
                        </div>
                    ))}
                </div>
            )}
            <Toast ref={toast} position="bottom-right"/>
        </>
    );
}
