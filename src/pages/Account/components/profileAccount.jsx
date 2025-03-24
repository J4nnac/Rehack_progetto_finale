import { useContext, useEffect, useState } from "react";
import SessionContext from "../../../context/SessionContext";
import supabase from "../../../supabase/client";
import AvatarUpload from "./avatar";

export default function ProfileAccount() {
    const { session } = useContext(SessionContext);
    const [loading , setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("username, first_name, last_name, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    setError("Error loading profile. Please try again later.");
                    console.error(error.message);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            } catch (error) {
                setError("Error loading profile. Please try again later.");
                console.error(error.message);
            }
            setLoading(false);
        };

        if (session) {
            getProfile();
        }
    }, [session]);

    async function updateProfile(field, value) {
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url,
            updated_at: new Date(),
        };

        updates[field] = value;

        try {
            const { error } = await supabase.from("profiles").upsert(updates);

            if (error) {
                setError("Error updating profile. Please try again later.");
                console.error(error.message);
            } else {
                if (field === "username") setUsername(value);
                if (field === "first_name") setFirstName(value);
                if (field === "last_name") setLastName(value);
            }
        } catch (error) {
            setError("Error updating profile. Please try again later.");
            console.error("Error updating profile:", error.message);
        } finally {
            setLoading(false);
        }
    }


    function handleAvatarUpload(avatarUrl) {
        setAvatarUrl(avatarUrl);
        updateProfile("avatar_url", avatarUrl);
    }

    return (
        <div className="profile-container">
            <form className="d-flex row form-widget justify-content-center gap-5 pt-3">
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Avatar */}
                <div className="col-12 d-flex form-group align-items-center justify-content-center avatar-section">
                    <img
                        src={avatar_url || '/public/profile-default.png'}
                        alt="Avatar"
                        className="rounded rounded-pill me-2"
                        style={{ height: 70, width: 70 }}
                    />
                    <AvatarUpload onUpload={handleAvatarUpload} />
                </div>

                {/* Email */}
                <div className="col-12 col-md-4 d-flex form-group align-items-center">
                    <label htmlFor="email" className="w-25">Email: </label>
                    <input
                        id="email"
                        type="text"
                        value={session.user.email}
                        disabled
                        className="form-control text-main py-3 bg-transparent ms-2 custom-input"
                    />
                </div>

                {/* Username */}
                <div className="col-12 col-md-4 d-flex form-group align-items-center">
                    <label htmlFor="username" className="w-25">Username:</label>
                    <div className="d-flex align-items-center w-100">
                        <input
                            id="username"
                            type="text"
                            value={username || ""}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control text-main bg-transparent py-3 ms-2 custom-input w-100"
                        />
                        <button
                            type="button"
                            className="btn btn-custom ms-2 w-25"
                            onClick={() => updateProfile("username", username)}
                            disabled={loading}
                        >
                            Salva
                        </button>
                    </div>
                </div>

                {/* First Name */}
                <div className="col-12 col-md-4 d-flex form-group align-items-center">
                    <label htmlFor="first_name" className="w-25">Nome:</label>
                    <div className="d-flex align-items-center w-100">
                        <input
                            id="first_name"
                            type="text"
                            value={first_name || ""}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="form-control text-main bg-transparent py-3 ms-2 custom-input w-100"
                        />
                        <button
                            type="button"
                            className="btn btn-custom ms-2 w-25"
                            onClick={() => updateProfile("first_name", first_name)}
                            disabled={loading}
                        >
                            Salva
                        </button>
                    </div>
                </div>

                {/* Last Name */}
                <div className="col-12 col-md-4 d-flex form-group align-items-center">
                    <label htmlFor="last_name" className="w-25">Cognome:</label>
                    <div className="d-flex align-items-center w-100">
                        <input
                            id="last_name"
                            type="text"
                            value={last_name || ""}
                            onChange={(e) => setLastName(e.target.value)}
                            className="form-control text-main bg-transparent py-3 ms-2 custom-input w-100"
                        />
                        <button
                            type="button"
                            className="btn btn-custom ms-2 w-25"
                            onClick={() => updateProfile("last_name", last_name)}
                            disabled={loading}
                        >
                            Salva
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
