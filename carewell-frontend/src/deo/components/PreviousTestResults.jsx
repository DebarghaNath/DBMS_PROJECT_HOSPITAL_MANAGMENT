import { useState } from "react";

const PreviousTestResults = ({ tests }) => {
    const [selectedTest, setSelectedTest] = useState(null); // State to store the selected test
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

    const openModal = (test) => {
        setSelectedTest(test); // Set the selected test
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setSelectedTest(null); // Clear the selected test
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Previous Test Results</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameters</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests && tests.length > 0 ? (
                            tests.map((test, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{test.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.testdate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {test.parameters
                                            ? test.parameters
                                                  .split("\n")
                                                  .filter((p) => p.trim())
                                                  .map((param) => param.split(" ")[0] || "—")
                                                  .join(", ")
                                            : "No parameters"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                test.status === 'Normal'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                        >
                                            {test.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            onClick={() => openModal(test)} // Open modal on click
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                    No test results available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedTest && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-2xl animate-fade-in">
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">🧪 Test Details</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-red-500 transition"
                                title="Close"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="space-y-3 text-gray-700">
                            <p><span className="font-medium text-gray-900">Test Type:</span> {selectedTest.type}</p>
                            <p><span className="font-medium text-gray-900">Date:</span> {selectedTest.testdate}</p>
                            <p><span className="font-medium text-gray-900">Status:</span> {selectedTest.status}</p>
                            <p><span className="font-medium text-gray-900">Notes:</span> {selectedTest.notes}</p>

                            <div>
                                <p className="font-medium text-gray-900 mb-1">Parameters:</p>
                                <ul className="list-disc list-inside pl-2 space-y-1">
                                    {selectedTest.parameters
                                        ? selectedTest.parameters
                                              .split("\n")
                                              .filter((p) => p.trim())
                                              .map((param, idx) => (
                                                  <li key={idx}>{param}</li>
                                              ))
                                        : <li>No parameters</li>}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 shadow-sm transition duration-200"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PreviousTestResults;
