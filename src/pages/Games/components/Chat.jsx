/* eslint-disable react/prop-types */

import { Toast } from "primereact/toast";
import supabase from "../../../supabase/client";
import { useRef, useState } from "react";
import RealtimeChat from "./Realtimechat";
import { useNavigate } from "react-router";

export default function Chat({ gameDetails, session }) {
    const toast = useRef(null);
    const textareaRef = useRef(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        setMessage(e.target.value);
    };

    async function MessageSubmit(event) {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));


        if (!session) {
            navigate('/login');
            return;
        }

        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from("messages")
                .insert([{
                    profile_id: session.user.id,
                    profile_username: session.user.user_metadata.username,
                    game_id: gameDetails.id,
                    content: message,
                }])
                .select();

            if (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Messaggio non inviato' });
            } else {
                inputMessage.reset();
                setMessage("");
                if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                }
            }
        }
    }

    return (
        <div className="d-flex flex-column p-2 w-100">
            <h4 className="px-2">Live Chat</h4>
            <div className="chat-box">
                <RealtimeChat gameDetails={gameDetails} />
            </div>

            {session ? (
                <div className="message-input">
                    <form onSubmit={MessageSubmit} className="">
                        <textarea
                            className="p-2 text-area"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            placeholder="Invia un messaggio"
                            ref={textareaRef}
                        />
                        <button type="submit" className="d-flex align-items-end bg-transparent border-0 send-button">
                            <i className="bi bi-send-fill fs-5"></i>
                        </button>
                    </form>
                </div>
            ) : (
                    <div className="message-input">
                        <form onSubmit={MessageSubmit} onClick={() => navigate('/login')} className="">
                            <textarea
                                className="p-2 text-area"
                                name="message"
                                value={message}
                                onChange={handleChange}
                                placeholder="Accedi per interagire con la chat"
                                ref={textareaRef}
                            />
                            <button type="submit" className="d-flex align-items-end bg-transparent border-0 send-button">
                            <i className="bi bi-send-fill fs-5"></i>
                        </button>
                        </form>
                    </div>
            )}
            <Toast ref={toast} />
        </div>
    );
}
