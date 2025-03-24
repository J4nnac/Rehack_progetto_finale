import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedSession = localStorage.getItem('session');
        if (storedSession && !session) {
            setLoading(false);
        }
        else {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return <p>caricamento..</p>
    }

    if (!session) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}