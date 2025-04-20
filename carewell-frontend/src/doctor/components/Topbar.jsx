export default function Topbar(){
    return <>
       <header className="bg-white sticky-bottom absolute top-0 right-0 w-full z-50 shadow-sm p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
                    <div className="relative">
                        <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                            Active Session
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <button className="p-2 rounded-full hover:bg-gray-100 relative">
                            <i className="fas fa-bell text-gray-600"></i>
                            <span className="notification-badge bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
                        </button>
                    </div>
                    <div className="relative">
                        <button className="p-2 rounded-full hover:bg-gray-100 relative">
                            <i className="fas fa-question-circle text-gray-600"></i>
                        </button>
                    </div>
                    <div className="relative">
                        <button className="flex items-center space-x-2 focus:outline-none">
                            <div className="text-right hidden md:block">
                                <span className="text-gray-700 font-medium block">Dr. {localStorage.getItem("doctor$name")}</span>
                                {/* <span className="text-xs text-gray-500">Cardiologist</span> */}
                            </div>
                            <img src={localStorage.getItem("doctor$imageurl")} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-blue-500" />
                        </button>
                    </div>
                </div>
            </header>
    </>
}