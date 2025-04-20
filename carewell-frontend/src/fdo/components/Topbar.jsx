import {useState,useEffect} from "react"
import { useImperativeHandle, forwardRef } from "react";
import { BASE_URL } from "../../config"

 function Topbar(props,ref){
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const handleLogout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/authorization/logout`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("fdo$token")}`, 
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Logout API error:", errorData.error || "Unknown error");
            } else {
                console.log("Logout time updated successfully");
            }
        } catch (err) {
            console.error("Error calling logout API:", err.message);
        }
    
        localStorage.removeItem("fdo$token");
        localStorage.removeItem("fdo$name");
        localStorage.removeItem("fdo$email");
        localStorage.removeItem("fdo$role");
        localStorage.removeItem("fdo$userid");
        localStorage.removeItem("fdo$mobile");
        localStorage.removeItem("fdo$imageurl");
        window.location.href = "/staff-login";
    };
    return <>
    
     <div className="top-bar" ref={ref}>
        <div className="page-title">
            <button onClick={props.buttonClick} className="mobile-menu-btn" id="mobileMenuBtn">
                <i className="fas fa-bars"></i>
            </button>
            <h1>Front Desk Operator Dashboard</h1>
        </div>
        
        <div className="top-actions">
            <button className="notification-btn">
                <i className="fas fa-bell"></i>
                <span className="notification-dot"></span>
            </button>
            <button 
                className="user-btn"
                onClick={() => {setIsDropDownOpen(!isDropDownOpen)}}
            >
                <span className="user-name">{localStorage.getItem("fdo$name")}</span>
                <img src={localStorage.getItem("fdo$imageurl")} alt="User" className="user-btn-avatar" />
            </button>
            {isDropDownOpen && (
                <div className="absolute right-1 top-16 w-32 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
                    <button
                        onClick={() => alert("Profile Clicked")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => alert("Settings Clicked")}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                    >
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600 font-medium"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    </div>
    </>
}
export default forwardRef(Topbar);