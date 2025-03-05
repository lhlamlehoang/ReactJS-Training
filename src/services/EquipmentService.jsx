import axios from "axios";
import React from "react";

export const getAllEquipment = async (page, token, size = 10) => {
    try{
        const response = await axios.get(`http://localhost:8080/equipment?page=${page}&size=${size}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    }
    catch (e){
        throw e;
    }
}