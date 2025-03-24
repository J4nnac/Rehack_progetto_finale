/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import supabase from "../../../supabase/client";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

export default function RealtimeChat({ gameDetails }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);


    function scrollSmoothToBottom() {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }


    const getInitialMessages = async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", gameDetails.id)
            .order("created_at", { ascending: true });

        if (error) {
            setError(error.message);
            setLoadingInitial(false);
            return;
        }
        setMessages(messages);
        setLoadingInitial(false);
    };

    useEffect(() => {
        if (gameDetails) {
            getInitialMessages();
        }

        const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [gameDetails]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    return (
        <div className="chat-container" ref={messageRef} style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {loadingInitial && <progress className="loading-progress"></progress>}
            {error && <article className="error-message">{error}</article>}

            {messages.length === 0 && !loadingInitial && !error && (
                <p className="p-2">Non ci sono ancora messaggi...</p>
            )}

            {messages.map((message) => (
                <div key={message.id} className="d-flex align-items-center p-2 message-item">
                    <small className="mb-3 me-2 time-text">{dayjs(message.created_at).format('kk:mm')}</small>
                    <p className="me-1">{message.profile_username}:</p>
                    <p className="">{message.content}</p>
                </div>
            ))}
        </div>
    );
}
