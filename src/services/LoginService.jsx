import React from "react";
import Cookies from 'js-cookie';
import axios from "axios";

const generateToken = (user) => {

    try{
        const response = axios.post("http://localhost:8080/auth/generateToken", 
            {
                username: user.username,
                password: user.password
            }
        );
        console.log(response);
        return response;
    }
    catch (e) {
        console.log(e);
    }
}

export { generateToken };