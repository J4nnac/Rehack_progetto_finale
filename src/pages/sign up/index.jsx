/* eslint-disable no-unused-vars */
import supabase from "../../supabase/client";
import React, { useRef } from "react";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router";




export default function Signup() {
    const navigate = useNavigate()

    const toast = useRef(null);

    const handleSignUp = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password, username } = Object.fromEntries(new FormData(formRegister));


        let { error } = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    username
                }
            }
        });

        if (error) {
            formRegister.reset();
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Registrazione non riuscita' });
        } else {
            formRegister.reset();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Registrato' });
            await new Promise((resolve) => setTimeout(resolve, 1000))
            navigate("/");

        }
    }

    return (
        <>
            <div id="card">
                <div id="card-content">
                    <div id="card-title">
                        <h2>Registrati</h2>
                        <div className="underline-title"></div>
                    </div>
                    <Toast ref={toast} />
                    <form onSubmit={handleSignUp} className="form">
                        <label htmlFor="username">&nbsp;Username</label>
                        <input id="username" className="form-content text-white" type="text" name="username" required />
                        <div className="form-border"></div>
                        <label htmlFor="email">&nbsp;Email</label>
                        <input id="email" className="form-content text-white" type="email" name="email" autoComplete="on" required />
                        <div className="form-border"></div>
                        <label htmlFor="password">&nbsp;Password</label>
                        <input id="password" className="form-content text-white" type="password" name="password" required />
                        <div className="form-border"></div>
                        <input id="submit-btn" type="submit" name="submit" value="REGISTRATI" />
                    </form>
                </div>
            </div>
        </>
    );
}
