import React, { useEffect, useState } from "react";
import { getAllEquipment } from "../../services/EquipmentService";
import Cookies from "js-cookie";
import { Button } from "antd";
import { Plus } from "lucide-react";

const Equipment = () => {
    const [equipments, setEquipments] = useState([]);
    const token = JSON.parse(Cookies.get("loginInfo")).token;

    const getAll = async (page, token) => {
        const response = await getAllEquipment(page, token);
        setEquipments(response.data.items);
    }

    useEffect(() => {
        getAll(0, token);
    }, []);

    useEffect(() => {

    }, [equipments]);


    return (
        <div className="flex flex-col justify-start h-full w-full ml-10">
            <Button className="flex bg-gray-200 w-[120px]">
                <Plus size={18} />
                Add new 
            </Button>

            {/* table of equipments */}
            <table className="table mt-5">
                <thead className="bg-gray-800">
                    <tr className="border border-gray-400">
                        <th className="px-6 py-2 text-left w-[300px]">Name</th>
                        <th className="px-6 py-2 text-left w-[800px]">Description</th>
                        <th className="px-2 py-2 text-left">Type</th>
                        <th className="px-2 py-2 text-left">Image</th>
                        <th className="px-2 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(equipments) && equipments.length > 0 ? 
                            equipments.map((e) => (
                                <tr key={e.id} className="border-b border-gray-400">
                                    <td className="px-6 py-2 text-left">{e.name}</td>
                                    <td className="px-6 py-2 text-left">{e.description}</td>
                                    <td className="px-2 py-2 text-left">{e.type}</td>
                                    <td className="px-2 py-2 text-left"><img className="w-[50px] h-[50px] border rounded-md" src={e.image ? `data:image/png;base64,${e.image}` : ""} alt=""/></td>
                                    <td className="px-2 py-2 text-left">{e.status === 1 ? "Available" : "Not available"}</td>
                                </tr>
                            )) 


                        : 
                        <td colSpan="5" className="py-2 text-center">No equipments available!</td>}
                </tbody>
            </table>
            
            
        </div>
    )
}

export default Equipment;