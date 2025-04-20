const TopNavigation = () => {
    return (
        <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <div className="flex items-center md:hidden">
                <button className="text-gray-500 focus:outline-none">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 focus:outline-none">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="text-gray-500 focus:outline-none">
                    <i className="fas fa-envelope"></i>
                </button>
            </div>
        </div>
    );
};

export default TopNavigation;