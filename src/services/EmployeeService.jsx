import axios from "axios";
import { stringify } from "postcss";
import React from "react";

export const getEmployeeByEmail = async (email, token) => {
    try{
        const response = await axios.get(`http://localhost:8080/employee/getByEmail?email=${email}`, 
        {
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

export const getAllEmployee = async (token) => {
    try{
        const response = await axios.get(`http://localhost:8080/employee`, 
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
        return response;
    }
    catch (e) {
        throw e;
    }
}

export const updateEmployee = async (employee, base64String, token) => {
    try {
        const formData = new FormData();
         // Append the employee JSON as a string
        formData.append("employeeJson", JSON.stringify(employee));  

        // Convert Base64 to Blob and append as File
        const byteCharacters = atob(base64String); // Decode Base64
        const byteArrays = [];
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: "image/png" }); // Adjust MIME type if needed
        const file = new File([blob], "avatar.png", { type: "image/png" });

        formData.append("img", file);

        const response = await axios.put(`http://localhost:8080/employee`, 
        formData,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        throw error;
    }
}