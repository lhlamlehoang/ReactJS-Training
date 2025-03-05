import axios from "axios";
import React from "react";

export const getEmployeeByEmail = async (email, token) => {
    try{
        const response = await axios.get(`http://localhost:8080/employee/getByEmail?email=${email}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    }
    catch(e) {
        // console.log(e);
        throw e;
    }
}