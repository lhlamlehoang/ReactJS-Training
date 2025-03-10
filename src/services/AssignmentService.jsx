import axios from "axios";
import React from "react";

export const getAllAssignment = async (page, token, size = 10) => {
    try{
        const response = await axios.get(`http://localhost:8080/assignment?page=${page}`, {
            headers: {
                Authorization:  `Bearer ${token}`
            }
        });
        return response;
    }
    catch (e){
        throw e;
    }
}

export const assignToUser = async (formData, token) => {
    try{
        const body = {
            employee:{
                id: formData.employeeId
            },
            equipment:{
                id: formData.equipmentId
            },
            status: 1,
            startDate: formData.startDate,
            endDate: formData.endDate
        }
        const response = await axios.post(`http://localhost:8080/assignment`, body, {
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

export const updateAssignment = async (item, token) => {
    try {
        const body = {
            id: item.id,
            employee:{
                id: item.employeeId
            },
            equipment:{
                id: item.equipmentId
            },
            status: item.status,
            startDate: item.startDate,
            endDate: item.endDate
        }
        const response = await axios.put(`http://localhost:8080/assignment`, body, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    }   
    catch (e){
        throw e;
    }
}

export const deleteAssignment = async (id, token) => {
    try{
        const response = await axios.delete(`http://localhost:8080/assignment/${id}`, {
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