const MedicalHistory = () => {
    return (
        <div id="medicalHistorySection" className="tab-content fade-in">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Medical History</h2>
                <div className="space-y-6">
                    {/* <!-- Allergies --> */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-md font-medium text-gray-800">Allergies</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                <i className="fas fa-plus mr-1"></i> Add Allergy
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-center mb-2">
                                <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                <span className="text-sm font-medium">Penicillin - Severe reaction (hives, difficulty breathing)</span>
                            </div>
                            <div className="flex items-center">
                                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                <span className="text-sm font-medium">Sulfa drugs - Mild rash</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!-- Conditions --> */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-md font-medium text-gray-800">Medical Conditions</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                <i className="fas fa-plus mr-1"></i> Add Condition
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium mb-1">Hypertension</p>
                                    <p className="text-xs text-gray-500">Diagnosed: 2018, Controlled with medication</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">Type 2 Diabetes</p>
                                    <p className="text-xs text-gray-500">Diagnosed: 2020, Diet controlled</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!-- Surgeries --> */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-md font-medium text-gray-800">Surgeries</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                <i className="fas fa-plus mr-1"></i> Add Surgery
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                    <i className="fas fa-procedures text-purple-600"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Appendectomy</p>
                                    <p className="text-xs text-gray-500">June 2015, No complications</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* <!-- Family History --> */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-md font-medium text-gray-800">Family History</h3>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800">
                                <i className="fas fa-plus mr-1"></i> Add History
                            </button>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium mb-1">Father</p>
                                    <p className="text-xs text-gray-500">Heart disease (age 65), Hypertension</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1">Mother</p>
                                    <p className="text-xs text-gray-500">Breast cancer (age 58), Osteoporosis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalHistory;