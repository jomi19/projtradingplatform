import React from 'react';
import "./header.scss";
import UserBar from './userbar';

const Header = function() {
    return(
        <header className="header">
            <UserBar/>
            Main header
        </header>
    )
}

export default Header;