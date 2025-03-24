/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../supabase/client";


export default function SessionContextProvider({ children }) {
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(() => {
        const storedSession = localStorage.getItem('session');
        if (storedSession) {
            setSession(JSON.parse(storedSession));
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                    localStorage.removeItem('session');
                } else if (session) {
                    setSession(session)
                    localStorage.setItem('session',JSON.stringify(session));
                }
            })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();

    }, [session])

    return (
        <SessionContext.Provider value={{ session, user}}>
            {children}
        </SessionContext.Provider>
    )
}