
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import supabase from "../../supabase/client";
import Tabs from "./components/tabs";

export default function Account() {
    const { user } = useContext(SessionContext);
    const [username, setUsername] = useState(null);
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
                    setUsername(data.username);
                    setAvatarUrl(data.avatar_url);
                }
            }
        }

        getProfile();


        return () => {
            ignore = true;
        };
    }, [user]);


    if (!user) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className="container c-account py-5">
            <div className="row">
                <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                    <div>
                        <img
                            src={avatar_url || '/public/profile-default.png'}
                            alt="Avatar"
                            className="rounded rounded-pill avatar image"
                            style={{ height: 200, width: 200 }}
                        />
                    </div>
                    <h2 className="pt-3">{username}</h2>
                </div>
                <Tabs user={user} />
            </div>
        </div>
    );
}
