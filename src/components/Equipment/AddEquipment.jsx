import { useState } from "react"
import ReactLogo from "../../assets/react.svg";
import { Button, Modal } from "antd";
import { Save } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { addEquipment } from "../../services/EquipmentService";
import { useRef } from "react";
import { editEquipment } from "../../services/EquipmentService";

const AddEquipment = ({item, isOpen, onClose}) => {
    if (!isOpen) return null;
    
    const token = JSON.parse(Cookies.get("loginInfo")).token;
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: "",
        status: 0,
        type: ""
    });
    const [file, setFile] = useState("");

    const handleAdd = async (equipment, base64String, token) => {
        const response = await addEquipment(equipment, base64String, token);
        if (response && response.status === 201){
            alert("New equipment added!");
            setFormData({
                id: 0,
                name: "",
                description: "",
                image: "",
                status: 0,
                type: ""
            });
            setFile("");
            onClose();
        }
    }

    const handleEdit = async () => {
        const newEquipment = {
            id: formData.id,
            name: formData.name,
            description: formData.description,
            status: formData.status,
            type: formData.type
        }
        const response = await editEquipment(newEquipment, file, token);
        if (response && response.status === 200){
            alert("Equipment edited!");
            onClose();
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file); // Convert file to Base64
            reader.onload = () => resolve(reader.result); // Resolve with Base64 string
            reader.onerror = (error) => reject(error);
        });
    };

    const handleUploadFile = () => {
        if (fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    useEffect(() => {

    }, [formData]);

    useEffect(() => {

    }, [file]);
    
    useEffect(() => {
        setFormData(item);
        setFile(item.image);
    }, [item]);

    return (
        <div className="flex items-center justify-center h-[1200px] w-[1200px]">
            <Modal styles={{content: {backgroundColor: "#1f2937"}, header: {backgroundColor: "#1f2937"}}}open={isOpen} onCancel={onClose} footer={null}>
                <div className="bg-gray-800 text-white">
                    <h1 className="text-center text-[30px]">Add new equipment</h1>
                    {/* Avatar */}
                    <div className="flex h-[30px] justify-center items-center mt-10">
                        <img
                            src= {file ? `data:image;base64,${file}` : ReactLogo}
                            alt=""
                            className="w-20 h-20 cursor-pointer hover:opacity-70 border rounded-full"
                            onClick={handleUploadFile}
                        />
                    </div>
                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const base64String = await convertToBase64(file);
                                setFile(base64String.replace(/^data:image\/\w+;base64,/, ""));
                            }
                        }}
                    />
                    {/* Name */}
                    <div className="flex ml-5 mt-10 w-[500px]">
                        <p className="w-[80px] text-left">Name</p>
                        <input
                            name="name"
                            className="bg-gray-600 text-white ml-5 w-[300px] border rounded-md pl-2"
                            value={formData.name}
                            onChange={(e) => setFormData((prevEquipment) => ({
                                ...prevEquipment,
                                name: e.target.value
                            }))}
                        />
                    </div>
                    {/* Description */}
                    <div className="flex ml-5 mt-10 w-[500px]">
                        <p className="w-[80px] text-left">Description</p>
                        <input
                            name="description"
                            className="bg-gray-600 ml-5 w-[300px] text-white border rounded-md pl-2"
                            value={formData.description}
                            onChange={(e) => setFormData((prevEquipment) => ({
                                ...prevEquipment,
                                description: e.target.value
                            }))}
                        />
                    </div>
                    {/* Type */}
                    <div className="flex ml-5 mt-10 w-[500px]">
                        <p className="w-[80px] text-left">Type</p>
                        <input
                            name="type"
                            className="bg-gray-600 ml-5 w-[300px] text-white border rounded-md pl-2"
                            value={formData.type}
                            onChange={(e) => setFormData((prevEquipment) => ({
                                ...prevEquipment,
                                type: e.target.value
                            }))}
                        />
                    </div>

                    <div className="flex justify-start ml-20 pl-10 mt-5 w-[700px]">
                        <Button className="bg-gray-200" onClick={() => {
                            if (item){
                                handleEdit();
                                return;
                            }
                            handleAdd(formData, file, token)}
                        }>
                            <Save />
                            Save
                        </Button>
                    </div> 
                </div>
            </Modal>
        </div>
    );
}

export default AddEquipment;