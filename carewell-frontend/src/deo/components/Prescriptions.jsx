import { useState } from "react";
import PreviousPrescriptions from "./PreviousPrescriptions";
import { BASE_URL } from "../../config";
import Toast from "./Toast";

const Prescriptions = ({ doctorid, patientid, patient }) => {
  // Form state without route
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    medicinename: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
    startdate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Submit prescription
  const handleSave = async () => {
    const payload = { ...form };
    try {
      const res = await fetch(
        `${BASE_URL}/api/doctor/${doctorid}/patient/${patientid}/prescription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("deo$token")}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.err || "Failed to add prescription");
      }
      // Reset form
      setForm({ medicinename: "", dosage: "", frequency: "", duration: "", notes: "", startdate: "" });
      //   alert("Prescription added successfully!");
      setToast({
        type: 'success',
        title: 'Prescription Added',
        message: `Successful`,
      });
    } catch (error) {
      console.error("Error adding prescription:", error.message);
      alert("Error adding prescription. Please try again.");
    }
  };

  return (
    <div id="prescriptionsSection" className="tab-content fade-in">
    {toast && <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Add Prescription</h2>
          <button
            id="savePrescriptionBtn"
            onClick={handleSave}
            className="flex items-center text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-200"
          >
            <i className="fas fa-plus mr-2"></i> Save Prescription
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="medicinename" className="block text-sm font-medium text-gray-700 mb-1">
              Medication Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="medicinename"
                value={form.medicinename}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Medication name"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-pills text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
              Dosage
            </label>
            <div className="relative">
              <input
                type="text"
                id="dosage"
                value={form.dosage}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. 500mg"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-prescription-bottle-alt text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              id="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">Select Frequency</option>
              <option value="once">Once daily</option>
              <option value="twice">Twice daily</option>
              <option value="thrice">Three times daily</option>
              <option value="qid">Four times daily</option>
              <option value="prn">As needed</option>
              <option value="hs">At bedtime</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <div className="relative">
              <input
                type="text"
                id="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. 7 days"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-calendar-day text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Special Instructions
            </label>
            <div className="relative">
              <input
                type="text"
                id="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Take with food"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-info-circle text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="startdate" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="startdate"
              value={form.startdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Previous Prescriptions */}
      <PreviousPrescriptions patient={patient} />
    </div>
  );
};

export default Prescriptions;