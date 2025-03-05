import axios from "axios";
import React from "react";

export const getAllAssignment = async (page, token, size = 10) => {
    try{
        const response = await axios.get(`http://localhost:8080/assignment?page=${page}`, {
            headers: {
                Authorization:  `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    }
    catch (e){
        throw e;
    }
}