import { useState, useEffect } from "react";

export default function Sidebar({ activeItem, setActiveItem, navItems, setNavItems }) {
  const [lastLogin, setLastLogin] = useState("");

  const extraItems = [
    { id: "settings-text", label: "Settings", icon: "fas fa-cog" },
    { id: "logout-text", label: "Logout", icon: "fas fa-sign-out-alt" },
  ];

  useEffect(() => {
    setNavItems((prevNavItems) =>
      prevNavItems.map((item) => ({
        ...item,
        active: item.itemid === activeItem, 
      }))
    );
  }, [activeItem]);

  useEffect(() => {
    const storedTime = localStorage.getItem("doctor$lastlogin");
    if (storedTime) {
      const date = new Date(storedTime);
      const now = new Date();

      // Check if the last login was today
      const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

      const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);

      setLastLogin(isToday ? `Today, ${formattedTime}` : formattedTime);
    }
  }, []);

  const handleNavClick = (id, itemid) => {
    setActiveItem(itemid); // Update the active item in the parent component
    setNavItems((prevNavItems) =>
      prevNavItems.map((item) => ({
        ...item,
        active: item.id === id, // Set active to true for the clicked item, false for others
      }))
    );
  };

  return (
    <div id="sidebar" className="sidebar z-20 sidebar-expande text-white flex flex-col">
      {/* Top Logo Bar */}
      <div className="p-5 flex items-center justify-between border-b border-blue-700">
        <div className="flex items-center space-x-3">
          <i className="fas fa-hospital text-2xl mr-3"></i>
          <span id="logo-text" className="text-xl font-bold">CareWell</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-5 flex items-center space-x-3 mt-2">
        <img
          src={localStorage.getItem("doctor$imageurl")}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white object-cover"
        />
        <div id="profile-info">
          <p className="font-semibold">Dr. {localStorage.getItem("doctor$name")}</p>
          <p className="text-xs text-blue-100">Last Login: {lastLogin}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden py-4">
        <div className="px-4 space-y-1">
          {navItems.map(({ id, label, icon, active, itemid }) => (
            <a
              key={id}
              href="#"
              onClick={() => handleNavClick(id, itemid)} // Use the handler to update active state
              className={`flex items-center space-x-3 p-3 rounded-lg text-white ${
                active ? "bg-blue-700/30" : "hover:bg-blue-700/30"
              }`}
            >
              <i className={`${icon} w-6 text-center text-blue-300`} />
              <span id={id}>{label}</span>
            </a>
          ))}
        </div>

        <div className="px-4 mt-8 space-y-1">
          {extraItems.map(({ id, label, icon }) => (
            <a
              key={id}
              href="#"
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-700/30 text-white"
            >
              <i className={`${icon} w-6 text-center text-blue-300`} />
              <span id={id}>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto text-center text-xs text-blue-200 border-t border-blue-700">
        <p>CareWell</p>
        <p className="mt-1">© 2023 All Rights Reserved</p>
      </div>
    </div>
  );
}