import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";

export default function AdmitPatientPage() {
  const [formData, setFormData] = useState({
    patientid: "",
    type: "",
    department: "",
    doctorid: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "department") {
      fetchDoctors(value);
    }
  };

  const fetchDoctors = async (departmentname) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/appointments/getdoctors?departmentname=${departmentname}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("fdo$token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        setDoctors(data.doctordata);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error("No doctors available", error);
      setDoctors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await fetch(`${BASE_URL}/api/rooms/admitpatients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.err || "Something went wrong");

      setResponseMsg({ type: "success", text: "Patient admitted successfully!" });
    } catch (err) {
      setResponseMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Admit Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientid" className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <input
            id="patientid"
            type="text"
            value={formData.patientid}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 placeholder:text-[#9795aa]"
            required
            placeholder="Enter Patient ID"
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Ward Type
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select ward type</option>
            <option value="General">General</option>
            <option value="ICU">ICU</option>
            <option value="Maternity">Maternity</option>
            <option value="Surgery">Surgery</option>
            <option value="Emergency">Emergency</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700">
            Department
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Department</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Oncology</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
            <option>Psychiatry</option>
            <option>Gastroenterology</option>
            <option>Urology</option>
            <option>ENT</option>
          </select>
        </div>
        <div>
          <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">
            Doctor
          </label>
          <select
            id="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorID} value={doctor.doctorID}>
                Dr. {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="reset"
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={() => setFormData({ patientid: "", type: "", department: "", doctor: "" })}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Admitting..." : "Admit Patient"}
          </button>
        </div>
      </form>

      {responseMsg && (
        <div
          className={`mt-4 p-3 rounded flex flex-row justify-between ${
            responseMsg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          <div>{responseMsg.text}</div>
          <button
            onClick={() => setResponseMsg(null)}
            className="text-xl font-bold text-gray-700 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}