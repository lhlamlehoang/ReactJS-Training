import React, { useEffect, useState } from "react";
import { getAllEquipment, deleteEquipment } from "../../services/EquipmentService";
import Cookies from "js-cookie";
import { Button } from "antd";
import { Plus } from "lucide-react";
import AddEquipment from "./AddEquipment";
import { DynamicIcon } from "lucide-react/dynamic";

const Equipment = () => {
    const [equipments, setEquipments] = useState([]);
    const token = JSON.parse(Cookies.get("loginInfo")).token;
    const [isModalOpen, setModalOpen] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentElements, setCurrentElements] = useState(0);

    const getAll = async (page, token) => {
        const response = await getAllEquipment(page, token);
        if (response && response.status === 200){
            setEquipments(response.data.items);
            setTotalPages(response.data.totalPages);  
            setCurrentElements(response.data.currentElements);
        }
    }

    useEffect(() => {
        getAll(page - 1, token);
    }, []);

    const handleModalClose = () => {
        setModalOpen(false);
        getAll(page - 1, token);
    }

    useEffect(() => {

    }, [equipments]);

    const handleContextMenu = (event, equipment) => {
        event.preventDefault();

        setContextMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            item: equipment
        });
    }

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    }

    const handleEdit = async (item) => {
        setItem(item);
        setModalOpen(true);
    }

    const handleDelete = async (id) => {
        const response = await deleteEquipment(id, token);
        console.log(response);
        if (response && response.status === 200){
            alert("Equipment has been deleted!");
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
            <div className="flex flex-col justify-start h-full w-full ml-10">
                <Button className="flex bg-gray-200 w-[120px]" onClick={() => setModalOpen(true)}>
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
                                    <tr 
                                        key={e.id} 
                                        className={`border-b border-gray-400 hover:bg-gray-700 w-[50px] h-[50px] ${e.status === 0 ? "bg-gray-500" : ""}`}
                                        onContextMenu={(event) => handleContextMenu(event, e)}
                                    >
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
            {equipments.length > 0 ? 
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                handleGoToPage(e.target.value)
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
            

            <AddEquipment item={item} isOpen={isModalOpen} onClose={() => handleModalClose()}>

            </AddEquipment>
        </div>
        
    )
}

export default Equipment;