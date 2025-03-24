/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function ScreenShots({ id }) {
    const [screenshots, setScreenShots] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchScreenShot = async () => {
            const url = `https://api.rawg.io/api/games/${id}/screenshots?key=5b73a5ee185f4e5d8d70747cd2c3f2f3`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Errore nel caricamento degli screenshot");
                const json = await response.json();
                setScreenShots(json.results || []);
            } catch (error) {
                console.error(`Errore nel recupero degli screenshot: ${error}`);
            }
        };
        fetchScreenShot();
    }, [id]);


    const displayedScreenshots = screenshots.slice(0, 4);

    if (!displayedScreenshots.length) return <p>Caricamento degli screenshot...</p>;

    return (
        <div className="container-fluid">

            <div className="d-flex flex-wrap gap-3">
                {displayedScreenshots.map((shot, index) => (
                    <div key={index} className="card bg-transparent border-0">
                        <img
                            className="border-0 rounded-3"
                            src={shot.image}
                            alt={`ScreenShot ${index + 1}`}
                            onClick={() => setSelectedImage(shot.image)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                ))}
            </div>


            {selectedImage && (
                <div
                    className="modal-overlay-screenshot"
                    onClick={() => setSelectedImage(null)}

                >
                    <div className="modal-content-screenshot">

                        <img
                            src={selectedImage}
                            alt="Screenshot del gioco"
                            className="img-fluid img-modal-screenshot"

                        />
                    </div>
                </div>
            )}
        </div>
    );
}
