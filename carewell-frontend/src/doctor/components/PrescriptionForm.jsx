const PrescriptionForm = ({newClass}) => {
    return (
        <div id="prescription-form" className={`bg-white rounded-xl shadow mt-6 overflow-hidden ${newClass}`}>
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="font-semibold text-lg">New Prescription</h2>
                <button  className="text-gray-500 hover:text-red-600">
                    <i className="fas fa-times"></i>
                </button>
            </div>
            <div className="p-6">
                <form id="new-prescription">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Medication Name*</label>
                            <div className="relative">
                                <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                <button type="button" className="absolute right-3 top-2 text-blue-600">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Dosage*</label>
                            <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 500mg" required />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Frequency*</label>
                            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select frequency</option>
                                <option>Once daily</option>
                                <option>Twice daily</option>
                                <option>Three times daily</option>
                                <option>Four times daily</option>
                                <option>As needed</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Duration*</label>
                            <input type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., 7 days" required />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-gray-700 mb-2">Instructions</label>
                        <textarea className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Additional instructions..."></textarea>
                    </div>
                    <div className="mt-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                            <span className="ml-2 text-gray-700">Send prescription to pharmacy</span>
                        </label>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={()=>{setShowPrescription(false)}} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                            <i className="fas fa-save mr-2"></i> Save Prescription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PrescriptionForm;