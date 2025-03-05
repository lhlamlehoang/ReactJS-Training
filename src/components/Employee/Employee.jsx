import React, { useEffect, useState } from "react";
import ReactLogo from "../../assets/react.svg"
import Cookies from "js-cookie";
import { getEmployeeByEmail } from "../../services/EmployeeService";

const Employee = () => {
    const loginInfo = JSON.parse(Cookies.get("loginInfo"));
    const email = loginInfo.email;
    const token = loginInfo.token;
    const [user, setUser] = useState(null);

    const getByEmail = async () => {
        const response = await getEmployeeByEmail(email, token);
        console.log(response)
        if (response && response.status === 200){
            setUser(response.data);
        }
    }

    // When component mounted -> getByEmail
    useEffect(() => {
        getByEmail();
    }, []);

    // When user updated
    useEffect(() => {
        console.log("Updated user:", user);
    }, [user]); // Runs when `user` state changes

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="bg-gray-700 p-5 border rounded-md h-[600px] w-[500px] text-center">
                <h1 className="text-white font-bold text-[30px] text-center">Employee Info</h1>
                {/* Avatar */}
                <div className="flex h-[30px] justify-center items-center mt-10">
                    <img
                        src={user ? `data:image/png;base64,${user.avatar}` : ReactLogo}
                        alt=""
                        className="w-20 h-20 cursor-pointer hover:opacity-70 border rounded-full"
                    />
                </div>
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
                    />
                </div>
                {/* Gender */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Gender</p>
                    <input
                        name="gender"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        value={user ? user.gender === 0 ? "Male" : "Female": ""}
                    />
                </div>
                {/* Password */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Password</p>
                    <input
                        name="password"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        value={user ? user.password : ""}
                        type="password"
                    />
                </div>
                {/* Role */}
                <div className="flex ml-5 mt-10 w-[500px]">
                    <p className="w-[40px] text-left">Role</p>
                    <input
                        name="role"
                        className="bg-gray-600 ml-10 w-[300px] text-white border rounded-md pl-2"
                        value={user ? user.role : ""}
                    />
                </div>
            </div>
        </div>
    )
}

export default Employee;