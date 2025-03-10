import React, { useEffect, useRef, useState } from "react";
import ReactLogo from "../../assets/react.svg";
import Cookies from "js-cookie";
import { getEmployeeByEmail, updateEmployee } from "../../services/EmployeeService";
import { Button } from "antd";
import { Save } from "lucide-react";

const Employee = () => {
    const loginInfo = JSON.parse(Cookies.get("loginInfo"));
    const email = loginInfo.email;
    const token = loginInfo.token;
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        gender: 0,
        password: "",
        role: "",
        avatar: ""
      });
    const fileInputRef = useRef(null);
    const [file, setFile] = useState("");

    const getByEmail = async (email) => {
        const response = await getEmployeeByEmail(email, token);
        console.log(response)
        if (response && response.status === 200){
            setUser(response.data);
            setFile(response.data.avatar)
        }
    }

    const handleUploadFile = () => {
        if (fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const update = async (employee, file, token) => {
        const newEmployee = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            gender: employee.gender,
            password: employee.password,
            role: employee.role,
            avatar: employee.avatar
        }
        const response = await updateEmployee(newEmployee, file, token);
        if (response && response.status === 200){
            alert("Employee info updated!");
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

    // When component mounted -> getByEmail
    useEffect(() => {
        getByEmail(email);
    }, []);

    useEffect(() => {
        
    }, [file]);

    // When user updated
    useEffect(() => {
        
    }, [user]); // Runs when `user` state changes

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="bg-gray-700 p-5 border rounded-md h-[600px] w-[500px] text-center">
                <h1 className="text-white font-bold text-[30px] text-center">Employee Info</h1>
                {/* Avatar */}
                <div className="flex h-[30px] justify-center items-center mt-10">
                    <img
                        src={user ? `data:image/png;base64,${file}` : ReactLogo}
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
                {/* Email */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Email</p>
                    <input
                        name="email"
                        className="bg-gray-600 ml-10 w-[300px] text-gray-400 border rounded-md pl-2 cursor-not-allowed"
                        value={email}
                        disabled
                    />
                </div>
                {/* Name */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Name</p>
                    <input
                        name="name"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        value={user ? user.name : ""}
                        onChange={(e) => setUser((prevUser) => ({
                            ...prevUser, name: e.target.value
                        }))}
                    />
                </div>
                {/* Gender */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Gender</p>
                    <select
                        name="gender"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        onChange={(e) => {
                            setUser((prevUser) => ({
                                ...prevUser,
                                gender: e.target.value === "0" ? 0 : 1 
                        }))
                        }}
                        value={user ? user.gender == 0 ? "0" : "1" : ""}
                    >
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>

                    {/* <input
                        name="gender"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        value={user ? user.gender === 0 ? "Male" : "Female": ""}
                        onChange={(e) => setUser((prevUser) => ({
                            ...prevUser, gender: e.target.value
                        }))}
                    /> */}
                </div>
                {/* Password */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Password</p>
                    <input
                        name="password"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2 text-gray-400 cursor-not-allowed"
                        value={user ? user.password : ""}
                        type="password"
                        disabled
                    />
                </div>
                {/* Role */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Role</p>
                    <input
                        name="role"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2 text-gray-400 cursor-not-allowed"
                        value={user ? user.role : ""}
                        disabled
                    />
                </div>
                <div className="flex justify-start ml-20 pl-5 mt-5 w-[600px]">
                    <Button className="bg-gray-200" onClick={() => update(user, file, token)}>
                        <Save />
                        Update Info
                    </Button>
                </div> 
            </div>
        </div>
    )
}

export default Employee;