import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config"

export default function AadhaarCheckSection() {
  const [aadhaar, setAadhaar] = useState("");
  const [patientId, setPatientId] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    if(aadhaar.length < 12) {
      setNotFound(true);
      return;
    }
    if (!aadhaar.trim()) return;

    setLoading(true);
    setPatientId(null);
    setNotFound(false);

    try {
      const response = await fetch(`${BASE_URL}/api/authorization/checkaadhaar?aadhaar=${aadhaar}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem(`fdo$token`)}`, 
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.patientid) {
          setPatientId(data.patientid);
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-full mb-8">
      <h2 className="text-lg font-semibold mb-4">Check Patient Aadhaar</h2>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <input
          type="text"
          placeholder="Enter Aadhaar Number (0000-0000-0000)"
          className="form-input border p-2 rounded w-full sm:w-auto flex-1 placeholder:text-[#9795aa]"
          value={aadhaar}
          onChange={(e) => {
            if(e.target.value.length > 12) {
              return;
            }
            setAadhaar(e.target.value)
          }}
        />
        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {patientId && (
        <div className="mt-4 text-green-600 font-medium">
          ✅ Patient Found. Patient ID: <span className="font-mono">{patientId}</span>
        </div>
      )}

      {notFound && (
        <div className="mt-4 text-red-600">
          ❌ No patient found with this Aadhaar.
          {/* <button
            onClick={() => navigate("/patients/register")}
            className="ml-2 underline text-blue-600 hover:text-blue-800"
          >
            Register Patient
          </button> */}
        </div>
      )}
    </div>
  );
}
