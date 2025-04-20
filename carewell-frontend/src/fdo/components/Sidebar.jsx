import { useState } from "react";
import { useImperativeHandle, forwardRef } from "react";
 function Sidebar(props,ref) {
    const menuItems = [
        { id: 1, name: "Dashboard", icon: "fas fa-tachometer-alt", hrefLink: "/fdo/dashboard" },
        { id: 2, name: "Room Management", icon: "fas fa-procedures", hrefLink: "/fdo/rooms" },
        { id: 3, name: "Patient Registration", icon: "fas fa-user-plus", hrefLink: "/fdo/register" },
        { id: 4, name: "Book An Appointment", icon: "fas fa-calendar-check", hrefLink: "/fdo/appointments", notification: true },
        { id: 5, name: "Admit-Discharge", icon: "fas fa-file-medical", hrefLink: "/fdo/tests" },
        { id: 6, name: "Test Scheduling", icon: "fas fa-flask", hrefLink: "/fdo/discharge" },
        // { id: 7, name: "Notifications", icon: "fas fa-bell", hrefLink: "/fdo/notifications" },
        // { id: 8, name: "Settings", icon: "fas fa-cog", hrefLink: "/fdo/settings" }
    ];

    const newClass=props.mobileButton?"active":""

    return (
        <div className={`bg-[#fff] w-[260px] outline outline-[#e0e0e0] flex flex-col  ${newClass}`} id="sidebar" ref={ref} >
            <div onClick={props.buttonClick}className="logo-container">
                <a href="#" className="logo">
                    <i className="fas fa-hospital-alt logo-icon"></i>
                    <span className="logo-text">CareWell</span>
                </a>
            </div>

            <div className="user-profile">
                <div className="user-avatar">
                    <img
                        src={localStorage.getItem("fdo$imageurl")}
                        alt="User"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                    />
                    <span className="user-status"></span>
                </div>
                <div className="user-info">
                    <h4>{localStorage.getItem("fdo$name")}</h4>
                    <p>Front Desk Operator</p>
                </div>
            </div>

            {/* Menu */}
            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href='#'
                        className={`menu-item ${props.activeItem === item.id ? "active" : ""}`}
                        onClick={() => props.setActiveItem(item.id)}
                    >
                        <i className={item.icon}></i>
                        <span>{item.name}</span>
                        {item.notification && <span className="notification-dot"></span>}
                    </a>
                ))}
            </div>

            {/* Footer */}
            <div className="sidebar-footer">
                <div className="help-title">Need Help?</div>
                <div className="help-text">Contact IT Support at ext. 4357 or support@carewell.org</div>
            </div>
        </div>
    );
}
export default forwardRef(Sidebar);