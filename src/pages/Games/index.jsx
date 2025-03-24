/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router";
import useFetchGames from "../../hooks/useFetchData";
import SessionContext from "../../context/SessionContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Chat from "./components/Chat";
import GameReviews from "./components/GameReviews";
import supabase from "../../supabase/client";
import Review from "./components/review";
import ScreenShots from "./components/screenshot";

export default function Games() {
    const { session } = useContext(SessionContext);
    const { id } = useParams();
    const url = `https://api.rawg.io/api/games?key=5b73a5ee185f4e5d8d70747cd2c3f2f3`;
    const { gameDetails, loading, error } = useFetchGames(url, null, id);
    // const [isDescriptionExpanded] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const descriptionRef = useRef(null);
    const [fav, setFav] = useState([]);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            readFav();
        }
    }, [session]);

    const isFavorite = () => {
        if (gameDetails) {
            return fav.find((el) => +el.game_id === gameDetails.id);
        }
    };

    const readFav = async () => {
        if (session) {
            let { data: favourites, error } = await supabase
                .from("favourites")
                .select("*")
                .eq("profile_id", session.user.id);
            if (!error) setFav(favourites);
        }
    };

    const addToFav = async (game) => {
        const { error } = await supabase
            .from('favourites')
            .insert([{
                profile_id: session.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image
            }])
            .select();
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Errore di inserimento' });
        } else {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `${gameDetails.name} aggiunto ai preferiti` });
            readFav();
        }
    };


    const AddToFavorites = () => {
        if (!session) {
            navigate('/login');
            return;
        }


        addToFav(gameDetails);
    };



    const removeFav = async (game) => {
        const { error } = await supabase
            .from("favourites")
            .delete()
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id);
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Errore di inserimento' });
        } else {
            toast.current.show({ severity: 'success', summary: 'Success', detail: `${gameDetails.name} rimosso dai preferiti` });
            readFav();
        }
    };

    const RemoveFromFavorites = () => {
        if (!session) {
            navigate('/login');
            return;
        }


        removeFav(gameDetails);
    };

    const toggleExpand = () => {
        setIsExpanded(prevState => !prevState);
    }

    if (loading) return <div>Caricamento...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!gameDetails) return <div>Gioco non trovato!</div>;

    const backgroundImageStyle = {
        backgroundImage: `url(${gameDetails.background_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: -300,
        left: 0,
        right: 0,
        zIndex: -1,
    };


    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        padding: '50px',
        marginTop: '300px',
    };


    const releaseDate = gameDetails.released
        ? new Date(gameDetails.released).toLocaleDateString('it-IT')
        : "Data non disponibile";

    return (
        <div className="container-fluid" style={{ position: 'relative' }}>
            <div style={backgroundImageStyle}></div>
            <div className="row justify-content-center p-0" style={contentStyle}>
                <div className="col-12 col-lg-5 d-md-flex d-none align-items-center detail-img">
                    <img className="rounded-4 img-fluid" src={gameDetails.background_image} alt={gameDetails.name} />
                </div>
                <div className="col-12 col-lg-5 d-flex flex-column align-items-center rounded-4 test">
                    <div className="d-flex align-items-center">
                        <h1 className="m-0 p-3">{gameDetails.name}</h1>
                    </div>



                    <div className="d-flex bg-dettagli justify-content-center p-2 rounded-5 w-75 gap-2 mt-4">
                        {gameDetails.platforms?.slice(0, 3).map((platform) => {
                            const platformName = platform.platform.name.toLowerCase();
                            let iconClass = "";
                            switch (true) {
                                case /playstation/i.test(platformName):
                                    iconClass = "bi bi-playstation";
                                    break;
                                case /xbox/i.test(platformName):
                                    iconClass = "bi bi-xbox";
                                    break;
                                case /nintendo/i.test(platformName):
                                    iconClass = "bi bi-nintendo-switch";
                                    break;
                                case /pc/i.test(platformName):
                                    iconClass = "bi bi-windows";
                                    break;
                                case /mac/i.test(platformName):
                                    iconClass = "bi bi-apple";
                                    break;
                                case /android/i.test(platformName):
                                    iconClass = "bi bi-android2";
                                    break;
                                default:
                                    iconClass = "bi bi-question-circle";
                            }

                            return (
                                <i
                                    key={platform.platform.id}
                                    className={`${iconClass} fs-1`}
                                    title={platform.platform.name}
                                >
                                </i>
                            );
                        })}
                    </div>

                    <div className="d-flex justify-content-center align-items-center p-2 w-100 mt-4">
                        <p className="mb-0 py-2 text-main bg-dettagli px-2 me-2 rounded-2"><strong>Valutazione:</strong> {gameDetails.rating}</p>
                        {session ? (
                            !isFavorite() ? (
                                <div className="">
                                    <button onClick={AddToFavorites} className="d-flex bg-dettagli align-items-center border-0 px-2 py-0 rounded-2">
                                        <i className={`bi fs-4 bi-suit-heart`}></i>
                                        <p className="m-0 p-2 text-main">Aggiungi ai preferiti</p>
                                    </button>

                                </div>
                            ) : (
                                    <div className=" ">
                                        <button onClick={RemoveFromFavorites} className="d-flex bg-dettagli align-items-center border-0 px-2 py-0 rounded-2">
                                        <i className={`bi fs-4 bi-suit-heart-fill`}></i>
                                        <p className="m-0 p-2 text-main">Rimuovi dai preferiti</p>
                                    </button>
                                </div>
                            )
                        ) : (

                            <div className="py-2">
                                    <button onClick={() => navigate('/login')} className="d-flex bg-dettagli align-items-center border-0 px-2 py-0 rounded-2">
                                    <i className={`bi fs-4 bi-suit-heart`}></i>
                                    <p className="m-0 p-2 text-main">Aggiungi ai preferiti</p>
                                </button>

                            </div>
                        )}


                    </div>


                    <div className="d-flex align-items-center justify-content-center w-100  p-2">
                        <div className="w-100">
                            <GameReviews gameDetails={gameDetails} session={session} />
                        </div>
                    </div>

                </div>

                <div className="d-flex row justify-content-around about-container mt-5">
                    <div className="col-12 col-md-4">
                                <Chat gameDetails={gameDetails} session={session} />
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-column justify-content-center py-2">
                        {gameDetails.publishers && (
                            <p className="p-1 rounded-2"><strong>Produttore:</strong> {gameDetails.publishers.map(publisher => publisher.name).join(', ')}</p>
                        )}
                        {gameDetails.developers && (
                            <p className="p-1 rounded-2"><strong>Sviluppatore:</strong> {gameDetails.developers.map(developer => developer.name).join(', ')}</p>
                        )}
                        <p className="p-1 rounded-2"><strong>Genere:</strong> {gameDetails.genres.map(genre => genre.name).join(', ')}</p>
                        <p className="p-1 rounded-2"><strong>Data di rilascio:</strong> {releaseDate}</p>
                        {gameDetails.tags && (
                            <div className="d-flex align-items-end">
                                <p className="p-1 rounded-2">
                                    <strong>Tags: </strong>

                                    {isExpanded
                                        ? gameDetails.tags.map(tag => tag.name).join(', ')
                                        : gameDetails.tags.slice(0, 5).map(tag => tag.name).join(', ')}
                                </p>

                                {gameDetails.tags.length > 5 && (
                                    <button
                                        onClick={toggleExpand}
                                        className="bg-transparent border-0 text-white mb-3"
                                    >
                                        {isExpanded ? '...' : '...'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                </div>

                <div className=" mt-5">
                    <h3 className="mb-4">Immagini del gioco</h3>
                    <ScreenShots id={id} />
                </div>
                <div className="description mt-5" ref={descriptionRef}>
                    <h3>Descrizione</h3>
                    <p>{gameDetails.description_raw || "Descrizione non disponibile"}</p>
                </div>
                <div>
                    <div className="d-flex align-items-center mt-3">
                        <h3 className="mb-0">Recensioni</h3>
                        <GameReviews gameDetails={gameDetails} session={session} />
                    </div>
                    <Review game_id={gameDetails.id} />
                </div>
            </div>

            <Toast ref={toast} />
        </div>
    );
}
