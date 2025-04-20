import { useState } from "react";
import { BASE_URL } from "../../config";

export default function AppointmentPage() {
  const initialFormData = {
    patient: "",
    department: "",
    doctor: "",
    date: "",
    type: "",
    priority: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [doctors, setDoctors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [appointmentDetails, setAppointmentDetails] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "modal-department") {
      setFormData((prev) => ({ ...prev, department: value, doctor: "" }));
      fetchDoctors(value);
      return;
    }

    if (id === "modal-doctor") {
      setFormData((prev) => ({ ...prev, doctor: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, [id.replace("modal-", "")]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Scheduled Appointment:", formData);

    try {
      const response = await fetch(`${BASE_URL}/api/appointments/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("fdo$token")}`,
        },
        body: JSON.stringify({
          patientID: formData.patient,
          doctorID: formData.doctor,
          date: formData.date,
          priority: formData.priority,
          type: formData.type,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSuccessMessage(`Appointment scheduled successfully!`);
      setAppointmentDetails(
        `Appointment ID: ${data.appointmentid}, Appointment Time: ${data.appointmentTime}`
      );
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setSuccessMessage(`Error: ${error.message}`);
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

  const handleReset = () => {
    setFormData(initialFormData);
    setDoctors([]);
    setSuccessMessage("");
    setAppointmentDetails("");
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-xl font-semibold mb-4">Schedule New Appointment</div>

        {/* Success Message Section */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            <p>{successMessage}</p>
            {appointmentDetails && <p>{appointmentDetails}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="modal-patient">Patient</label>
              <input
                type="text"
                id="modal-patient"
                className="form-control"
                value={formData.patient}
                onChange={handleChange}
                placeholder="Enter Patient ID"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-department">Department</label>
              <select
                id="modal-department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
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
            <div className="form-group">
              <label htmlFor="modal-doctor">Doctor</label>
              <select
                id="modal-doctor"
                className="form-control"
                value={formData.doctor}
                onChange={handleChange}
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
            <div className="form-group">
              <label htmlFor="modal-date">Date</label>
              <input
                type="date"
                id="modal-date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-type">Appointment Type</label>
              <select
                id="modal-type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option>Consultation</option>
                <option>Follow-up</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="modal-priority">Priority</label>
              <select
                id="modal-priority"
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select priority</option>
                <option>Normal</option>
                <option>High</option>
                <option>Emergency</option>
              </select>
            </div>
            <div className="form-actions md:col-span-2 flex justify-end space-x-2 mt-4">
              <button
                type="reset"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Clear
              </button>
              <button type="submit" className="btn btn-primary">
                Schedule Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

