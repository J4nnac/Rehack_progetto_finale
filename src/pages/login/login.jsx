/* eslint-disable no-unused-vars */

import supabase from "../../supabase/client";
import React, { useRef } from "react";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router";




export default function SignIn() {
    const navigate = useNavigate()

    const toast = useRef(null);

    const handleSignIn = async (event) => {
        event.preventDefault();
        const formRegister = event.currentTarget;
        const { email, password } = Object.fromEntries(new FormData(formRegister));

        let { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            formRegister.reset();
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Accesso non riuscito' });



        } else {
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Accesso riuscito' });
            await new Promise((resolve) => setTimeout(resolve,1000))
            navigate(-1);
        }
    }

    return (
        <>
            <div id="card">
                <div id="card-content">
                    <div id="card-title">
                        <h2>Accedi</h2>
                        <div className="underline-title"></div>
                    </div>
                    <Toast ref={toast} />
                    <form onSubmit={handleSignIn} className="form">
                        <label htmlFor="email">&nbsp;Email</label>
                        <input id="email" className="form-content text-white" type="email" name="email" autoComplete="on" required />
                        <div className="form-border"></div>

                        <label htmlFor="password">&nbsp;Password</label>
                        <input id="password" className="form-content text-white" type="password" name="password" required />
                        <div className="form-border"></div>

                        <a className="text-white" href="#">
                            <legend className="text-white" id="forgot-pass">Password dimenticata?</legend>
                        </a>

                        <input id="submit-btn" type="submit" name="submit" value="ACCEDI" />

                        <a onClick={() => navigate('/register')} className="text-white" href="#" id="signup">Non hai un account?</a>

                    </form>
                </div>
            </div>
        </>
    );
}
