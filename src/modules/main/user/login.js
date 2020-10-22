import React, { useEffect, useState } from 'react';
import { Redirect} from "react-router-dom";
import BigButton from "../../buttons/bigbutton/bigbutton.js";
import { API_URL } from "../../../config.json";
import axios from 'axios';


const LogIn = function (params) {
    console.log(params)
    const [logInForm, setLogIn] = useState({});
    const submit = async function(e) {
        console.log(logInForm.logInId)
        e.preventDefault();
        if(logInForm.password && logInForm.logInId) {
            axios.post(`${API_URL}user/login`, {
                loginId: logInForm.logInId,
                password: logInForm.password
            })
            .then((result) => {
                const data = result.data.user
                console.log(data)
                let userData = {
                    userName: data.userName,
                    email: data.email,
                    currency: data.currency || 0,
                    token: data.token
                }
                params.setUser(userData)
            })
            .catch(error => {
                console.log(error)
            })



        }
    }
    const handleChange = function(e) {
        let newValue = logInForm;
        console.log("hej")
        e.preventDefault();
        newValue[e.target.name] = e.target.value;
        setLogIn(newValue)

    }
    if(params.user) {
        return (
            <Redirect to="/user" />
        )
    }
    return (
        <main className="main logIn" >
            <form className="logInform" onSubmit={(e) => submit(e)}>
                <input type="text" name="logInId" required onChange={(e) => handleChange(e)}></input>
                <input type="password" name="password" required onChange={(e) => handleChange(e)}></input>
                <button type="submit">Logga in</button>
            </form>
            <BigButton href="LogIn" classes="accent" name="Bli medlem"/>

         
        </main>
    )
}

export default LogIn;








