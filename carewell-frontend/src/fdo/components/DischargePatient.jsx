import { useState } from "react";
import { BASE_URL } from "../../config";

export default function DischargePatientPage() {
  const [formData, setFormData] = useState({
    patientId: "",
    wardNo: "",
    dischargeDate: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setSuccessMessage(null); // Clear message when editing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patientid: formData.patientId,
      wardno: formData.wardNo,
      dischargedate: formData.dischargeDate,
    };

    try {
      const res = await fetch(`${BASE_URL}/api/rooms/dischargepatient`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage("✅ Patient successfully discharged.");
        console.log("Extra info (diagnosis/notes):", {
          finalDiagnosis: formData.finalDiagnosis,
          notes: formData.notes,
        });
      } else {
        setSuccessMessage("❌ Discharge failed: " + result.err);
      }
    } catch (err) {
      setSuccessMessage("⚠️ Error: " + err.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Discharge Patient</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="form-group">
            <label htmlFor="patientId">Patient ID</label>
            <input
              id="patientId"
              type="text"
              className="form-control"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="wardNo">Ward Number</label>
            <input
              id="wardNo"
              type="text"
              className="form-control"
              value={formData.wardNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dischargeDate">Discharge Date</label>
            <input
              id="dischargeDate"
              type="date"
              className="form-control"
              value={formData.dischargeDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions flex justify-end gap-2 mt-2">
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() => {
                setFormData({
                  patientId: "",
                  wardNo: "",
                  dischargeDate: "",
                });
                setSuccessMessage(null);
              }}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Discharge Patient
            </button>
          </div>
        </form>

        {successMessage && (
          <div
            className={`mt-4 p-3 rounded ${
              successMessage.startsWith("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
