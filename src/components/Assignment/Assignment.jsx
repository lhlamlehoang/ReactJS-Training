import { Button } from "antd";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllAssignment, deleteAssignment } from "../../services/AssignmentService";
import Cookies from "js-cookie";
import moment from "moment";
import Assign from "./Assign";
import { DynamicIcon } from "lucide-react/dynamic";

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);
    const token = JSON.parse(Cookies.get("loginInfo")).token;
    const [isModalOpen, setModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [item, setItem] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentElements, setCurrentElements] = useState(0);

    const getAll = async (page, token) => {
        const response = await getAllAssignment(page, token);
        if (response && response.status === 200){
            setAssignments(response.data.items);
            setTotalPages(response.data.totalPages);
            setCurrentElements(response.data.currentElements);
        }
    }

    useEffect(() => {
        getAll(page - 1, token);
    }, [])

    useEffect(() => {

    }, [assignments]);

    const handleModalClose = () => {
        setModalOpen(false);
        getAll(page - 1, token);
    }

    const handleContextMenu = (event, assignment) => {
        event.preventDefault();

        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            item: assignment
        });
    }

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    }

    const handleEdit = async (item) => {
        setItem(item);
        setEdit(true);
        setModalOpen(true);
    }

    const handleDelete = async (id) => {
        const response = await deleteAssignment(id, token);
        if (response && response.status === 200){
            alert(response.data);
            getAll(page - 1, token);
            if (currentElements === 1 && page > 1){
                handleGoToPage(page - 1);
            }
        }
    }

    const handleGoToPage = (p) => {
        setPage(p);
        getAll(p - 1, token);    
    }


    return (
        <div className="flex flex-col min-h-[900px]" onClick={() => handleCloseContextMenu()}>
            <div className="flex flex-col h-full w-full ml-10">
                <Button className="flex bg-gray-200 w-[120px]" onClick={() => {setModalOpen(true), setEdit(false)}}>
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
                                <tr key={a.id} className="border-b border-gray-400 hover:bg-gray-700 w-[50px] h-[50px]" onContextMenu={(event) => handleContextMenu(event, a)}>
                                    <td className="px-4 py-2 text-left">{a.employee.email}</td>
                                    <td className="px-4 py-2 text-left">{a.employee.name}</td>
                                    <td className="px-4 py-2 text-left">{a.equipment.name}</td>
                                    <td className="px-4 py-2 text-left">{moment(a.startDate).format("yyyy-MM-DD HH:mm:ss")}</td>
                                    <td className="px-4 py-2 text-left">{moment(a.endDate).format("yyyy-MM-DD HH:mm:ss")}</td>
                                    <td className="px-4 py-2 text-left">{a.status === 1 ? "Assigned" : "Expired"}</td>
                                </tr>
                            ))
                        
                            : <td colSpan="5" className="py-2 text-center">No assignments found!</td> }
                    </tbody>
                </table>

                {/* Context menu */}
                {contextMenu?.visible && (
                    <ul className="absolute bg-gray-800 text-white border rounded-md shadow-md w-[100px]" 
                        style={{ top: contextMenu.y, left: contextMenu.x}}
                    >
                        <li className="px-4 py-2 text-left w-[98px] cursor-pointer hover:bg-gray-600 rounded-md" onClick={() => handleEdit(contextMenu.item)}>Edit</li>
                        <li className="px-4 py-2 text-left w-[98px] cursor-pointer hover:bg-gray-600 rounded-md" onClick={() => handleDelete(contextMenu.item.id)}>Delete</li>
                    </ul>
                )
                }
            </div>

            {/* Pagination */}
            {assignments.length > 0 ? 
                <div className="flex justify-center items-center gap-2 mt-auto">
                    {/* Previous Button */}
                    <Button 
                        className={`px-3 py-1 bg-gray-200 h-[25px] border rounded-md`}
                        onClick={() => handleGoToPage(page-1)}
                        disabled={page === 1}
                    >
                        <DynamicIcon name="arrow-left"/>
                    </Button>

                    {/* Page Number */}
                    <input
                        className="bg-gray-700 m-2 w-[50px] text-center"
                        type="text"
                        value={page}
                        onChange={(e) => setPage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                let p = e.target.value;
                                if (p > totalPages) p = totalPages;
                                if (p < 1) p = 1;
                                handleGoToPage(p)
                            }
                        }}
                    />

                    {/* Next Button */}
                    <Button 
                        className={`px-3 py-1 bg-gray-200 h-[25px] border rounded-md`}
                        onClick={() => handleGoToPage(page+1)}
                        disabled={page === totalPages}
                    >
                        <DynamicIcon name="arrow-right"/>
                    </Button>
                </div>
            : <div></div>}

            <Assign item={item} isEdit={isEdit} isOpen={isModalOpen} onClose={() => handleModalClose()}>

            </Assign>
        </div>
    )
}

export default Assignment;