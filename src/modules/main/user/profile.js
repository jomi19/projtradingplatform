import React, { useEffect, useState } from 'react';
import { Redirect} from "react-router-dom";
import BigButton from "../../buttons/bigbutton/bigbutton.js";
import { API_URL } from "../../../config.json";
import axios from 'axios';


const Main = function(props) {
    return (
        <div>
        {props.user.currency}
        insert: <form ><input ></input></form>
        <BigButton href="LogIn" classes="accent" name="Bli medlem"/>

        </div>

    )
}


export default Main;