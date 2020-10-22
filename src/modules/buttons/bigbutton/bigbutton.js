import React from 'react';
import { NavLink } from 'react-router-dom';
import "./style.scss";

const BigButton = function(props) {
    let classes = `bigButton ${props.classes || ""}`
    /**
     * 
     */
    return (
        <NavLink className={classes} to={props.href}>{props.name}</NavLink>
    )
}

export default BigButton;