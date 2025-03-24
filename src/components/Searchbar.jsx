/* eslint-disable react/prop-types */
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

export default function Searchbar({ onSubmit }) {
    const [input, setInput] = useState('');
    const [isActive, setIsActive] = useState(false);


    const handleIconClick = () => {
        setIsActive((prevState) => !prevState)
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(input);
        } else {
            console.error("onSubmit is not a function");
        }
    }

    return (
        <div className={`wrapper ${isActive ? "searchbar-active" : ""}`}>

            <div className="sidebar">
                <Sidebar/>
            </div>




            <form className={`search-wrapper ${isActive ? "active" : ""}`} onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    type="search"
                    placeholder="Cerca..."
                    aria-label="Search"
                />

  <button type="button" className="search-btn" onClick={handleIconClick}>
                    <i id="search-icon" className="bi bi-search"></i>
                </button>
            </form>

        </div>
    );
}
