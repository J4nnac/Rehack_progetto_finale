/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Searchbar from "./Searchbar";
import supabase from "../supabase/client";
import SessionContext from "../context/SessionContext";

export default function Navbar() {
    const { session, user } = useContext(SessionContext);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
    }

    useEffect(() => {
        if (user) {
            const getProfile = async () => {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("avatar_url")
                    .eq("id", user.id)
                    .single();
                if (error) {
                    console.warn(error.message);
                } else {
                    setAvatarUrl(data.avatar_url);
                }
            };
            getProfile();
        }


        const handleScroll = () => {

            if (window.scrollY > 50) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };


        window.addEventListener("scroll", handleScroll);


        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [user]);

    const handleSearchSubmit = (query) => {
        if (!query) return;
        setSearchQuery(query);
        navigate(`/search?q=${query}`);
    };

    return (
        <nav className={`container-fluid navbar navbar-expand-lg p-0 fixed-top ${isSticky ? 'navbar-sticky' : ''}`}>
            <div className="row align-items-center justify-content-between w-100">
                <div className="col-3 d-flex justify-content-start">
                    <Link to="/" className="text-decoration-none d-flex align-items-center text-uppercase big-title ps-3  sidebarTitle"><i className="bi bi-controller me-2"></i><small className="d-none d-md-flex  fs-4">ReHacktor</small></Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                    <Searchbar onSubmit={handleSearchSubmit} />
                </div>
                <div className="col-3 d-flex dropdown justify-content-end p-0">
                    <a className="btn btnDropdown dropdown-toggle bg-transparent m-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {user ? (
                            <div>
                                <img
                                    src={avatar_url || '/public/profile-default.png'}
                                    alt="Avatar"
                                    className="rounded rounded-pill avatar image"
                                    style={{ height: 70, width: 70 }}
                                />
                            </div>
                        ) : (
                            <div>
                                <img
                                    src='/public/profile-default.png'
                                    alt="Avatar"
                                    className="rounded rounded-pill avatar image"
                                    style={{ height: 70, width: 70 }}
                                />
                            </div>
                        )}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end list-unstyled border-0">
                        {!session ? (
                            <>
                                <li>
                                    <Link className="dropdown-item" to="/login">Accedi</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/register">Registrati</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link className="dropdown-item" to="/account">Account</Link>
                                </li>
                                <li>
                                    <button onClick={signOut} className="dropdown-item" href="#">Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
