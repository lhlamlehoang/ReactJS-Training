import React, { createContext, useContext, useState } from "react"
import reactLogo from '../assets/react.svg'
import { ChevronFirst, MoreVertical } from "lucide-react"
import { DynamicIcon } from "lucide-react/dynamic";

const SideBarContext = createContext();
export const Sidebar = ({children}) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <div>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-gray-700 border-r shadow-sm">
                    <div className="p-6 pb-2 flex justify-between items-center">
                        <img
                            src={reactLogo}
                            alt=""
                            className="w-10 cursor-pointer"
                            onClick={handleExpand}
                        />
                        {/* <button className="p-1 rounded-lg br-gray-50 hover:br-gray-100 m-2" onClick={handleExpand}>
                            <DynamicIcon name="menu"/>
                        </button>  */}
                    </div>

                    <SideBarContext.Provider value={{expanded}}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SideBarContext.Provider>


                    {/* User info */}

                    {/* <div className="border-t flex p-3">
                        <img
                            src=""
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />
                        <div className="flex justify-between items-center w-52 ml-3">
                            <div className="leading-4">
                                <h4 className="font-semibold">Lam</h4>
                                <span className="text-xs text-white">Lammmm</span>
                            </div>
                            <MoreVertical size={20}/>
                        </div>
                    </div> */}
                </nav>
            </aside>
        </div>
    )

}

export const SidebarItem = ({name, icon, text, active, onClick}) => {
    const {expanded} = useContext(SideBarContext);
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors 
                        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-300 text-white"}`} onClick={() => onClick(name)}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ?  "w-40 ml-3" : "w-0"}`}>{text}</span>
        </li>
    )
}
