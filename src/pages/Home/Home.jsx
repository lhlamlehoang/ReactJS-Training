import React, { useCallback, useEffect } from "react";
import { Button } from "antd";
import { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Sidebar, SidebarItem} from "../../components/Sidebar";
import { DynamicIcon } from 'lucide-react/dynamic';
import Employee from "../../components/Employee/Employee";
import Equipment from "../../components/Equipment/Equipment";
import Assignment from "../../components/Assignment/Assignment";

const Home = () => {
    const { token, email } = JSON.parse(Cookies.get("loginInfo"));
    const [activeComponent, setActiveComponent] = useState("Employee");
    const navigate = useNavigate();
    
    const handleNavigateMenu = (name) => {
        setActiveComponent(name);
    }
    
    return (
        <div className="flex bg-black-100 w-screen">
            {/* Sidebar */}
            <Sidebar className="sticky top-0 h-screen bg-gray-800 text-white w-64 p-4">
                <SidebarItem 
                    active={activeComponent === "Employee"}
                    name="Employee"
                    icon={<DynamicIcon name="circle-user" size={20}/>}
                    text="Employee Info"
                    onClick={handleNavigateMenu}
                />
                <SidebarItem 
                    active={activeComponent === "Equipment"}
                    name="Equipment"
                    icon={<DynamicIcon name="computer" size={20}/>}
                    text="Equipment"
                    onClick={handleNavigateMenu}
                />
                <SidebarItem 
                    active={activeComponent === "Assignment"}
                    name="Assignment"
                    icon={<DynamicIcon name="book-check" size={20}/>}
                    text="Assignment"
                    onClick={handleNavigateMenu}
                />
            </Sidebar>

            {/* Content Area */}
            <div className="p-5 flex-1 h-screen overflow-auto">
                {activeComponent === "Employee" && <Employee />}
                {activeComponent === "Equipment" && <Equipment />}
                {activeComponent === "Assignment" && <Assignment />}
            </div>
        </div>
    )
}

export default Home;