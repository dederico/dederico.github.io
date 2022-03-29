import React from 'react';
// import { Routes } from 'react-router-dom';
import logo from '../assets/1x/movie.png';

function Landing() {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <br />
                    <br />
                    <input
                        className="input-landing"
                        placeholder="What are you looking for?"
                    >
                    </input>
                    <br />
                    <button>Find</button>
                    <br />
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Help!
        </a>
                </header>
            </div>
        </>
    )
}
export default Landing