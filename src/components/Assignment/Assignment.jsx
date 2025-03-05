import { Button } from "antd";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllAssignment } from "../../services/AssignmentService";
import Cookies from "js-cookie";
import moment from "moment";

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);
    const token = JSON.parse(Cookies.get("loginInfo")).token;

    const getAll = async (page, token) => {
        const response = await getAllAssignment(page, token);
        setAssignments(response.data.items);
    }

    useEffect(() => {
        getAll(0, token);
    }, [])

    useEffect(() => {

    }, [assignments]);


    return (
        <div className="flex flex-col h-full w-full ml-10">
            <Button className="flex bg-gray-200 w-[120px]">
                <Plus/>
                Assign
            </Button>

            {/* table of assignments */}
            <table className="table mt-5">
                <thead className="bg-gray-800">
                    <tr className="border border-gray-400">
                        <th className="w-[200px] px-4 py-2 text-left">Email</th>
                        <th className="w-[200px] px-4 py-2 text-left">Name</th>
                        <th className="w-[200px] px-4 py-2 text-left">Equipment</th>
                        <th className="w-[200px] px-4 py-2 text-left">Start date</th>
                        <th className="w-[200px] px-4 py-2 text-left">End date</th>
                        <th className="w-[100px] px-4 py-2 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(assignments) && assignments.length > 0 ? 
                        assignments.map(a => (
                            <tr key={a.id} className="border-b border-gray-400">
                                <td className="px-4 py-2 text-left">{a.employee.email}</td>
                                <td className="px-4 py-2 text-left">{a.employee.name}</td>
                                <td className="px-4 py-2 text-left">{a.equipment.name}</td>
                                <td className="px-4 py-2 text-left">{moment(a.startDate).format("yyyy-MM-DD HH:mm")}</td>
                                <td className="px-4 py-2 text-left">{moment(a.endDate).format("yyyy-MM-DD HH:mm")}</td>
                                <td className="px-4 py-2 text-left">{a.status === 1 ? "Assigned" : "Expired"}</td>
                            </tr>
                        ))
                    
                        : <td colSpan="5" className="py-2 text-center">No assignments found!</td> }
                </tbody>
            </table>
        </div>
    )
}

export default Assignment;