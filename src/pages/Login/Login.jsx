import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { generateToken } from '../../services/LoginService'

const Login = () => {
    const [user, setUser] = useState({ username: "", password: ""});
    const inputRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const handleInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleLogin = async () => {
        if (!user.username || !user.password){
            alert("Please input username and password!");
            return;
        }
        const response = await generateToken(user);
        if (response && response.status === 200){
            Cookies.set("loginInfo", JSON.stringify(response.data), {expires: 7})
            navigate('/home');
        }
        else{
            alert("Login failed!")
        }
    }




    return (
        <div className="flex justify-center items-center h-screen w-screen bg-black-100">
            <div className="w-1000 bg-gray-700 p-5 border border-gray-500 rounded-md h-[300px] w-[500px]">
                <h1 className="text-white text-[30px] font-bold text-center">Company Sign In</h1>
                <div className="mt-10 grid gap-4 w-500">
                    <div className="flex items-center">
                        <p className="text-white w-24 text-left">Email</p>
                        <input 
                            ref={inputRef}
                            id="emailInput" 
                            name="username"
                            className="text-white bg-gray-500 px-2 py-1 border rounded-md flex-1 w-30" 
                            placeholder="Input your email"
                            onChange={handleInputChange}
                            
                        />
                    </div>
                    <div className="flex items-center">
                        <p className="text-white w-24 text-left">Password</p>
                        <input 
                            id="passwordInput" 
                            name="password"
                            className="text-white bg-gray-500 px-2 py-1 border rounded-md flex-1" 
                            placeholder="Input your password"
                            onChange={handleInputChange}
                        />
                    </div>
                    
                </div>
                <div className="flex justify-start mt-5 ml-20 px-4">
                    <button id="btnLogin" className="bg-gray-300 text-black w-[80px]" onClick={handleLogin}>Sign In</button>  
                </div>
                                

            </div>
        </div>
    )
}

export default Login;