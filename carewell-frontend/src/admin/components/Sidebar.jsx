export default function Sidebar(props) {
    const menuItems = [
      { key: "Dashboard", label: "Dashboard", icon: "fas fa-tachometer-alt" },
      { key: "User", label: "User Management", icon: "fas fa-users" },
      { key: "Patient", label: "Patients", icon: "fas fa-procedures" },
      { key: "Doctor", label: "Doctors", icon: "fas fa-user-md" },
      { key: "Appointment", label: "Appointments", icon: "fas fa-calendar-check" },
    //   { key: "Lab", label: "Laboratories", icon: "fas fa-flask" },
    //   { key: "Billing", label: "Billing", icon: "fas fa-file-invoice-dollar" },
    //   { key: "Setting", label: "Settings", icon: "fas fa-cog" },
    ];
  
    const handleClick = (key) => {
      props.setIsActive((vals) => {
        const updated = {};
        for (const item of menuItems) {
          updated[item.key] = item.key === key;
        }
        return updated;
      });
    };
  
    return (
      <div className="sidebar w-64 fixed h-full hidden md:block">
        <div className="p-4 flex items-center justify-between border-b border-blue-700">
          <div className="flex items-center">
            <i className="fas fa-hospital text-2xl ml-3"></i>
            <span className="ml-3 text-xl font-bold">CareWell Admin</span>
          </div>
          <button className="md:hidden text-white" id="sidebarToggle">
            <i className="fas fa-times"></i>
          </button>
        </div>
  
        <div className="p-4 flex items-center space-x-3 border-b border-blue-700">
          <img
            src={localStorage.getItem("admin$imageurl")}
            className="h-12 w-12 rounded-full border-2 border-white"
            alt="User"
          />
          <div>
            <p className="text-white font-medium">{localStorage.getItem("admin$name")}</p>
            <p className="text-blue-200 text-sm">{localStorage.getItem("admin$role").toUpperCase()}</p>
          </div>
        </div>
  
        <nav className="p-4">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href="#"
              className={`block py-2 px-3 mb-2 rounded sidebar-item ${
                props.isActive[item.key] ? "active" : ""
              }`}
              data-page={item.key.toLowerCase()}
              onClick={() => handleClick(item.key)}
            >
              <i className={`${item.icon} mr-2`}></i> {item.label}
            </a>
          ))}
        </nav>
      </div>
    );
  }
  