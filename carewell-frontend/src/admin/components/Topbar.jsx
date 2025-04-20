import { BASE_URL } from "../../config"

export default function Topbar(){
    const handleLogout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/authorization/logout`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("admin$token")}`, 
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
    
        localStorage.removeItem("admin$token");
        localStorage.removeItem("admin$name");
        localStorage.removeItem("admin$email");
        localStorage.removeItem("admin$role");
        localStorage.removeItem("admin$userid");
        localStorage.removeItem("admin$mobile");
        localStorage.removeItem("admin$imageurl");
        window.location.href = "/staff-login";
    };
    return <>
     <header className="bg-white shadow-sm py-4 px-6 ml-1 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center">
                    <button className="md:hidden text-gray-600 mr-4" id="mobileSidebarToggle">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h2 className="text-xl font-semibold text-gray-800" id="pageTitle">User Management</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="text-gray-600 hover:text-gray-900">
                            <i className="fas fa-bell text-xl"></i>
                            <span className="notification-badge">3</span>
                        </button>
                    </div>
                    <div className="dropdown relative">
                        <button className="flex items-center space-x-2">
                            <img src={localStorage.getItem("admin$imageurl")} className="h-8 w-8 rounded-full" alt="User"/>
                            <span className="hidden md:inline text-gray-700">{localStorage.getItem("admin$name")}</span>
                            <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                        </button>
                        <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><i className="fas fa-user mr-2"></i> Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><i className="fas fa-cog mr-2"></i> Settings</a>
                            <div className="border-t border-gray-100"></div>
                            <button 
                                onClick={handleLogout} 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            ><i className="fas fa-sign-out-alt mr-2"></i> Logout</button>
                        </div>
                    </div>
                </div>
            </header>
    </>
}