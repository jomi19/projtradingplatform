import React, { useEffect, useState } from 'react';
import { Redirect, NavLink, Route} from "react-router-dom";
import BigButton from "../../buttons/bigbutton/bigbutton.js";
import { API_URL } from "../../../config.json";
import axios from 'axios';
import Admin from "./admin.js";
import Depot from "./depot.js";
import "./style.scss";
import Main from "./profile.js";



const UserMenu = function(props) {
    console.log(props)
    return (
       <nav className="userProfileMenu">
           <ul>{props.children}</ul>
       </nav> 
    )
}

const NavItem = function(props) {
    return (
        <li className="nav-item">
            <NavLink to={props.href} className="nav-button" >{props.text}</NavLink>
        </li>  
    )
}


const User = function (params) {
    const user = params.user
    const [input, setInput] = useState({});
    const [update, setUpdate] = useState(false)
    const submit = async function(e) {
        e.preventDefault();

    }
    const handleChange = function(e) {
        let newValue = input;

        e.preventDefault();
        newValue[e.target.name] = e.target.value;
        setInput(newValue)
        console.log(newValue)

    }

    const insert = function(e) {
        e.preventDefault();
        console.log(user)
        axios.post(`${API_URL}user/insert`, {
            userName: user.userName,
            email: user.email,
            amount: input.insert
        },{
            headers: {
                "x-access-token": user.token
            }
        }
        )
        .then((result) => {
            setUpdate(true)
            console.log(result)
            user.currency = result.data.currency
            params.setUser(user)
        })
        .catch(error => {
            console.log(error)
        })

        console.log("insert")
    }

    useEffect(() => { 
        console.log(user)
        if(update) {
            setUpdate(false)
        }
    })


    if(!params.user) {
        return (
            <Redirect to="/login" />
        )
    }
    return (
        <main className="main logIn" >
            <UserMenu>
                <NavItem href="/user" text="Användare" />
                <NavItem href="/user/depot" text="Depå" />
                <NavItem href="/user/admin" text="Admin" />
            </UserMenu>
            <Route exact path="/user" render={() => <Main user={user} setUser={params.setUser} />} />
            <Route exact path="/user/admin" render={() => <Admin user={user} setUser={params.setUser} />} />
            <Route exact path="/user/depot" render={() => <Depot user={user} setUser={params.setUser} />} />

         
        </main>
    )
}

export default User;


