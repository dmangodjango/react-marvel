import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import marvelLogo from "../../../assets/marvel-logo.jpg";

import NavigationCSS from "./Navigation.module.css";

const Navigation = () => {
    return (
        <>
            <nav className={`${NavigationCSS.navContainer} sticky-top`}>
                <div className={`${NavigationCSS.logoContainer}`}>
                    <img src={marvelLogo} alt="marvel logo"/>
                </div>
                <div className={`${NavigationCSS.menuContainer}`}>
                    <Menu/>
                </div>
            </nav>
            
        </>
    )
}

const Menu = () => {
    return(
        <ul>
            <li><Link className="no-link-style" to="/characters">Characters</Link></li>
            <li><Link className="no-link-style" to="#">Comics</Link></li>
            <li><Link className="no-link-style" to="/creators">Creators</Link></li>
            <li><Link className="no-link-style" to="#">Events</Link></li>
            <li><Link className="no-link-style" to="#">Series</Link></li>
            <li><Link className="no-link-style" to="#">Stories</Link></li>
        </ul>
    )
}

export default Navigation
