import { useState } from "react";

export default function SearchFilter({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("All Status");

    const handleSearch = () => {
        onSearch({ searchTerm, status });
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow p-6 mb-6 bg-medical-pattern relative">
                <div className="absolute inset-0 bg-blue-800/30 rounded-xl"></div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-white mb-4">Find Patient Records</h2>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="relative flex-1 md:mr-4">
                            <input
                                type="text"
                                placeholder="Search patients by name, ID, or condition..."
                                className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
                        </div>
                        <div className="flex space-x-2">
                            <select
                                className="border-0 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow text-sm"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>All Status</option>
                                <option>Normal</option>
                                <option>High</option>
                                <option>Emergency</option>
                            </select>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center shadow"
                                onClick={handleSearch}
                            >
                                <i className="fas fa-filter mr-2"></i> Filter
                            </button>
                            <button
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center shadow"
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatus("All Status");
                                    handleSearch();
                                }}
                            >
                                <i className="fas fa-sliders-h mr-2"></i> Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}