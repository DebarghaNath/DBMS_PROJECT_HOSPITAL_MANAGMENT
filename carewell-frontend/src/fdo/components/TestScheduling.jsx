import { useState } from "react";
import { BASE_URL } from "../../config";

export default function ScheduleTestPage() {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    testType: "",
    instructions: "",
  });

  const [scheduledTest, setScheduledTest] = useState(null); // State to store the scheduled test details
  const [error, setError] = useState(null); // State to store any error messages
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setScheduledTest(null); // Clear previous scheduled test details

    try {
      const response = await fetch(`${BASE_URL}/api/test/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("fdo$token")}`,
        },
        body: JSON.stringify({
          patientid: formData.patientId,
          doctorid: formData.doctorId,
          type: formData.testType,
          notes: formData.instructions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to schedule the test");
      }

      const data = await response.json();
      setScheduledTest(data); // Store the scheduled test details
      setIsModalOpen(true); // Open the modal
    } catch (err) {
      console.error("Error scheduling test:", err.message);
      setError(err.message); // Store the error message
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="max-w-full">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Schedule Medical Test</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="form-group">
            <label htmlFor="patientId">Patient ID / Name</label>
            <input
              id="patientId"
              type="text"
              className="form-control"
              placeholder="e.g. P1234 or Alice Smith"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID / Name</label>
            <input
              id="doctorId"
              type="text"
              className="form-control"
              placeholder="Dr. Rajan"
              value={formData.doctorId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="testType">Test Type</label>
            <select
              id="testType"
              className="form-control"
              value={formData.testType}
              onChange={handleChange}
              required
            >
              <option value="">Select a test</option>
              <option>Blood Test</option>
              <option>X-Ray</option>
              <option>MRI Scan</option>
              <option>CT Scan</option>
              <option>ECG</option>
              <option>Ultrasound</option>
              <option>Urine Test</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="instructions">Special Instructions</label>
            <textarea
              id="instructions"
              rows="3"
              className="form-control"
              placeholder="Fasting required? Allergies?"
              value={formData.instructions}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-actions flex justify-end gap-2 mt-2">
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() =>
                setFormData({
                  patientId: "",
                  doctorId: "",
                  testType: "",
                  instructions: "",
                })
              }
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Schedule Test
            </button>
          </div>
        </form>

        {/* Display Error Message */}
        {error && (
          <div className="mt-6 bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-red-600">Error</h3>
            <p>{error}</p>
          </div>
        )}

        {/* Modal for Scheduled Test Details */}
        {isModalOpen && scheduledTest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Test Scheduled Successfully</h3>
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={closeModal}
                >
                  ✖
                </button>
              </div>
              <div>
                <p><strong>Test ID:</strong> {scheduledTest.test.testid}</p>
                <p><strong>Patient ID:</strong> {scheduledTest.test.patientid}</p>
                <p><strong>Test Type:</strong> {scheduledTest.test.type}</p>
                <p><strong>Test Date:</strong> {scheduledTest.test.testdate}</p>
                <p><strong>Test Time:</strong> {scheduledTest.test.testtime}</p>
                <p><strong>Lab Number:</strong> {scheduledTest.test.labno}</p>
                <p><strong>Notes:</strong> {scheduledTest.test.notes}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}