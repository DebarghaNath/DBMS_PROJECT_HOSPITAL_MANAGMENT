import { useState } from "react";
import { BASE_URL } from "../../config";

export default function PatientRegistration() {
  const initialFormData = {
    name: "",
    email: "",
    age: "",
    weight: "",
    gender: "",
    patientcontact: "",
    patientaddress: "",
    aadhaar: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${BASE_URL}/api/authorization/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('fdo$token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.err || "Failed to register patient.");
      }

      const data = await response.json();
      setSuccessMessage(`Patient registered successfully! Patient ID: ${data.patientid}`);
      setFormData(initialFormData);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="registration-card animate-fadeIn">
      <div className="card-header flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <i className="fas fa-user-plus"></i> Patient Registration
        </h2>
        <button className="btn btn-link">View All</button>
      </div>

      <div className="card-body">
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Patient Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="patient@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              className="form-control"
              placeholder="Age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input
              type="number"
              id="weight"
              className="form-control"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="patientcontact">Contact Number</label>
            <input
              type="tel"
              id="patientcontact"
              className="form-control"
              placeholder="+1 (___) ___-____"
              value={formData.patientcontact}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhaar">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaar"
              className="form-control"
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientaddress">Address</label>
            <textarea
              id="patientaddress"
              rows="2"
              className="form-control"
              placeholder="Patient Address"
              value={formData.patientaddress}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-actions flex justify-end gap-2 mt-4">
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary">
              Register Patient
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}