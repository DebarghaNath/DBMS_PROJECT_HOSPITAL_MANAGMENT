const Sidebar = () => {
    return (
        <div id="sidebar" className="flex flex-col justify-between bg-[#1a202c] text-white h-full shadow-lg w-[18%]">
            <div>
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center">
                    <i className="fas fa-hospital text-2xl text-primary mr-3"></i>
                    <span className="logo-text font-bold text-xl">CareWell</span>
                </div>
                <button id="toggleSidebar" className="text-gray-400 hover:text-white">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <nav className="mt-6">
                <div className="px-4 mb-6">
                    <div className="flex items-center bg-primary/20 p-2 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                            {/* <span>DO</span> */}
                            <img className="rounded-full" src={localStorage.getItem("deo$imageurl")} alt="DO" />
                        </div>
                        <div className="ml-3 nav-text">
                            <p className="text-sm font-medium">{localStorage.getItem("deo$name")}</p>
                            <p className="text-xs text-gray-400">Data Entry Operator</p>
                            {/* <p className="text-xs text-gray-400">operator@carewell.com</p> */}
                        </div>
                    </div>
                </div>
                <div className="px-2">
                    <a href="#" data-tab="dashboard" className="nav-item flex items-center p-3 rounded-lg mb-1 hover:bg-gray-700/50 text-white bg-gray-700/50">
                        <i className="fas fa-tachometer-alt mr-3"></i>
                        <span className="nav-text">Dashboard</span>
                    </a>
                    {/* <a href="#" data-tab="test-results" className="nav-item flex items-center p-3 rounded-lg mb-1 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                        <i className="fas fa-flask mr-3"></i>
                        <span className="nav-text">Test Results</span>
                    </a> */}
                    <a href="#" data-tab="patients" className="nav-item flex items-center p-3 rounded-lg mb-1 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                        <i className="fas fa-user-injured mr-3"></i>
                        <span className="nav-text">Patients</span>
                    </a>
                    <a href="#" data-tab="appointments" className="nav-item flex items-center p-3 rounded-lg mb-1 hover:bg-gray-700/50 text-gray-300 hover:text-white">
                        <i className="fas fa-calendar-check mr-3"></i>
                        <span className="nav-text">Appointments</span>
                    </a>
                </div>
            </nav>
            </div>
            <div className="w-full p-4 border-t border-gray-700">
                <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white">
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    <span className="nav-text">Logout</span>
                </a>
            </div>
        </div>
    );
};

export default Sidebar;