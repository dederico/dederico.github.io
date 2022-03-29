import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import PropTypes from 'prop-types';
import devflix from '../assets/1x/devflix.png';
import { Link } from 'react-router-dom';
import './NavbarComponent.scss'
import axios from 'axios';

const NavbarComponent = ({ setShows }) => {
    const [search, setSearch] = useState('');

    const getShows = async () => {
        if (search.length < 2) return alert("Fill the input correctly")
        const SEARCH_SHOWS = `http://api.tvmaze.com/search/shows?q=${search}`;
        const { data } = await axios.get(SEARCH_SHOWS);
        setShows(data)
    }
    return (
        <div>
            <Navbar color="faded" dark style={{ backgroundColor: "#787878" }}>
                <NavbarBrand id="logo" className="navbar-brand">
                    <Link to="/">
                        <img
                            style={{
                                height: '40px'
                            }} src={devflix} className="logo" alt="logo" /></Link>
                </NavbarBrand>

                <input
                    onChange={(e) => { setSearch(e.target.value) }}
                    id="navbar-search"
                    type="text"
                    placeholder="What are you searching for?"
                    style={{
                        width: '60%'
                    }}>

                </input>
                <button

                    onClick={getShows} style={{
                        borderRadius: "18px",
                        color: 'white',
                        backgroundColor: '#4f4d4d'
                    }} type="button">Find!</button>

            </Navbar>
        </div>
    );
}

export default NavbarComponent;
NavbarComponent.propTypes = {
    setShows: PropTypes.func.isRequired

}
// NavbarToggler.propTypes = {
//     type: PropTypes.string,
//     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//     // pass in custom element to use
// }