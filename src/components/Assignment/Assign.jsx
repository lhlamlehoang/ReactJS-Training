import React from "react";
import Cookies from "js-cookie";
import { Button, Calendar, Dropdown, Modal } from "antd";
import { Save } from "lucide-react";
import { getAllEmployee } from "../../services/EmployeeService";
import { getAllEquipment } from "../../services/EquipmentService";
import { assignToUser, updateAssignment } from "../../services/AssignmentService";
import { useState } from "react";
import { useEffect } from "react";
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";

const Assign = ({ item, isEdit, isOpen, onClose }) => {
    if(!isOpen) return null;

    const token = JSON.parse(Cookies.get("loginInfo")).token;
    const [employees, setEmployees] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        employeeId: 0,
        equipmentId: 0,
        startDate: "",
        endDate: ""
    })


    const getEmployees = async () => {
        const response = await getAllEmployee(token);
        if (response && response.status === 200){
            setEmployees(response.data);
        }
    }

    const getEquipments = async (page, token, size) => {
        const response = await getAllEquipment(page, token, size);
        if (response && response.status === 200){
            setEquipments(response.data.items);
        }
    }

    useEffect(() => {
        
    }, [employees, equipments, formData]);

    useEffect(() => {
        if (isEdit){
            setFormData({
                id: item.id,
                employeeId: item.employee.id,
                equipmentId: item.equipment.id,
                startDate: item.startDate,
                endDate: item.endDate
            });
        }
    }, [item]);

    useEffect(() => {
        if (isOpen){
            getEmployees();
            getEquipments(0, token, 100);
        }
    }, [isOpen]);

    const handleAssign = async (formData, token) => {
        if (formData.employeeId === 0 || formData.equipmentId === 0 || formData.startDate === "" || formData.endDate === ""){
            alert("Please input correct info!")
            return;
        }

        const response = await assignToUser(formData, token);
        if (response && response.status === 201){
            alert("Assigned to user!")
            onClose();
        }
    }

    const handleEdit = async (item, token) => {
        const response = await updateAssignment(item, token);
        if (response && response.status === 200){
            alert("Assignment edited!")
            onClose();
        }
    }

    useEffect(() => {
        
    }, [formData]);

    return (
        <div className="flex items-center justify-center h-[1200px] w-[1200px]">
            <Modal styles={{content: {backgroundColor: "#1f2937"}, header: {backgroundColor: "#1f2937"}}}open={isOpen} onCancel={onClose} footer={null}>
                <div className="bg-gray-800 text-white">
                    <h1 className="text-center text-[30px]">Assign to employee</h1>

                    <div className="flex ml-5 mt-10 w-[500px]">
                        <label htmlFor="dropdownEmployee" className="w-[80px] text-left">Employee</label>
                        <select 
                            id="dropdownEmployee"
                            onChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                employeeId: e.target.value
                            }))}
                            className="bg-gray-600 ml-5 w-[300px] border rounded-md pl-2"
                            value={isEdit && formData.employeeId !== 0 ? formData.employeeId : "default"}
                        >
                            {/* {formData.employee ? <option value={formData.employee.id}>{formData.employee.name}</option> : } */}
                            <option value="default">Select an employee</option>
                            {Array.isArray(employees) && employees.length > 0 ? 
                                employees.map((e) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))
                            : <p></p>
                            }
                        </select>
                    </div>

                    <div className="flex ml-5 mt-10 w-[500px]">
                        <label htmlFor="dropdownEquipment" className="w-[80px] text-left">Equipment</label>
                        <select 
                            id="dropdownEquipment"
                            onChange={(e) => setFormData((prevData) => ({
                                ...prevData,
                                equipmentId: e.target.value
                            }))}
                            className="bg-gray-600 ml-5 w-[300px] border rounded-md pl-2"
                            value={isEdit && formData.equipmentId !== 0 ? formData.equipmentId : "default"}
                        >
                            <option value="default">Select an equipment</option>
                            {Array.isArray(equipments) && equipments.length > 0 ? 
                                equipments.map((e) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))
                            : <p></p>
                            }
                        </select>
                    </div>
                    
                    {/* Start date */}
                    <div className="flex ml-5 mt-10 w-[500px]">
                        <p className="w-[80px] text-left">Start date</p>
                            <DatePicker
                                className="ml-5 bg-gray-700 text-white rounded-md border border-gray-500 hover:bg-gray-500"
                                styles={{
                                input: { 
                                    color: "white",
                                    backgroundColor: "#1f2937" 
                                },
                                placeholder: {
                                    color: "#fff", // Placeholder color (gray-400)
                                },
                                }}
                                showTime
                                onChange={(value) => setFormData((prevData) => ({
                                    ...prevData,
                                    startDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss")
                                }))}
                                value={isEdit && formData.startDate !== "" ? dayjs(formData.startDate) : undefined}
                            />
                    </div>

                    {/* End date */}
                    <div className="flex ml-5 mt-10 w-[500px]">
                        <p className="w-[80px] text-left">End date</p>
                            <DatePicker
                                className="ml-5 bg-gray-700 text-white rounded-md border border-gray-500 hover:bg-gray-500"
                                styles={{
                                input: { 
                                    color: "white",
                                    backgroundColor: "#1f2937" 
                                },
                                placeholder: {
                                    color: "#fff", // Placeholder color (gray-400)
                                },
                                }}
                                showTime
                                onChange={(value) => setFormData((prevData) => ({
                                    ...prevData,
                                    endDate: dayjs(value).format("YYYY-MM-DDTHH:mm:ss")
                                }))}
                                value={isEdit && formData.endDate !== "" ? dayjs(formData.endDate) : undefined}
                            />
                    </div>

                    <div className="flex justify-start ml-20 pl-10 mt-5 w-[700px]">
                        <Button className="bg-gray-200" onClick={() => {
                            if (isEdit){
                                handleEdit(formData, token);
                                return;
                            }
                            handleAssign(formData, token);
                        }}>
                            <Save />
                            Save
                        </Button>
                    </div> 
                </div>
            </Modal>
        </div>
    );
}

export default Assign;