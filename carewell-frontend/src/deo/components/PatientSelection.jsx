import { useState } from 'react';
import { BASE_URL } from "../../config";

const PatientSelection = ({ setPatient, setTests, patientid, doctorid, setPatientid, setDoctorid }) => {
    const fetchTests = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/test/${patientid}/${doctorid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("deo$token")}`,
                },
            });
            const data = await response.json();
            setTests(data.tests);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleSearch = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/doctor/${doctorid}/patient/${patientid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("deo$token")}`,
                },
            });
            const data = await response.json();
            setPatient(data.data);
            fetchTests();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 max-w-full mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">🔍 Select a Patient</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div>
                    <label htmlFor="patientSearch" className="block text-sm font-medium text-gray-700 mb-1">
                        Patient ID
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="patientSearch"
                            value={patientid}
                            onChange={(e) => setPatientid(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter Patient ID"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-id-card text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="doctorSearch" className="block text-sm font-medium text-gray-700 mb-1">
                        Doctor ID
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            id="doctorSearch"
                            value={doctorid}
                            onChange={(e) => setDoctorid(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter Doctor ID"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user-md text-gray-400"></i>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:justify-end">
                    <button
                        onClick={handleSearch}
                        className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientSelection;
