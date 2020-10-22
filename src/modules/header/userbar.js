import React from 'react';
import { NavLink } from 'react-router-dom';
import "./header.scss";

const UserBar = function() {
    return(
        <div className="userBar">
            <div className="left"></div>
            <div className="center">
                <NavLink to="/">HEJSAN</NavLink></div>
            <div className="logIn">
                <NavLink to="/login/">Logga in</NavLink>
                <NavLink to="/register/">Registera</NavLink>
            </div>
        </div>
    )
}

export default UserBar;