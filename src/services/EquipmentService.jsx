import axios from "axios";
import React from "react";

export const getAllEquipment = async (page, token, size = 10) => {
    try{
        const response = await axios.get(`http://localhost:8080/equipment?page=${page}&size=${size}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response;
    }
    catch (e){
        throw e;
    }
}

export const addEquipment = async (equipment, base64String, token) => {
    try{
        const formData = new FormData();
        formData.append("equipmentJson", JSON.stringify(equipment));

        const byteCharacters = atob(base64String);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++){
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], {type: "image/png"});
        const file = new File([blob], "image.png", {type: "image/png"});

        formData.append("img", file);

        const response = await axios.post(`http://localhost:8080/equipment`, 
            formData,
            {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response;
    } 
    catch (e) {
        throw e;
    }
}

export const editEquipment = async (equipment, base64String, token) => {
    try{
        const formData = new FormData();
        const equipmentJson = JSON.stringify(equipment);
        formData.append("equipmentJson", equipmentJson);

        const byteCharacters = atob(base64String);
        const byteArrays = []; 

        for (let i = 0; i < byteCharacters.length; i++){
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const byteArray = new Uint8Array(byteArrays);
        const blob = new Blob([byteArray], { type: "image/png" });
        const file = new File([blob], "image.png", { type: "image/png" })

        formData.append("img", file);

        const response = await axios.put(`http://localhost:8080/equipment`, formData, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    }
    catch (e) {
        throw e;
    }
}

export const deleteEquipment = async (id, token) => {
    try{
        const response = await axios.delete(`http://localhost:8080/equipment/${id}`, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        return response;
    }
    catch (e) {
        throw e;
    }  
}