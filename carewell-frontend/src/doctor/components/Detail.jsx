import { useEffect, useState } from "react";
import { BASE_URL } from "../../config"; 

const Detail = ({ isActive, activeId, patientsInDetail, prescriptionHandler }) => {
  const [p, setP] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activeId) return;

    const fetchPatient = async () => {
      try {
        const doctorId = localStorage.getItem("doctor$doctorid");
        const token = localStorage.getItem("doctor$token");
        const response = await fetch(
          `${BASE_URL}/api/doctor/${doctorId}/patient/${activeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        setP(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchPatient();
  }, [activeId]);

  if (!isActive) {
    return (
      <>
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Patient Overview</h2>
          <div className="flex space-x-2">
            <button title="Print" type="button" className="p-2 text-gray-500 hover:text-blue-600">
              <i className="fas fa-print"></i>
            </button>
            <button title="Share" type="button" className="p-2 text-gray-500 hover:text-blue-600">
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-500 mt-2">Select a patient to view detailed information</p>
        </div>
      </>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  if (!p) {
    return <div className="p-6">Loading...</div>;
  }

  const patient = p.patientData[0];
  const appointment = p.appointmentData[0] || {};

  return (
    <div className="p-6">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
        <h2 className="font-semibold text-lg">
          {patient.patientname} ({patient.patientid})
        </h2>
        <div className="flex space-x-2">
          <button
            title="New Prescription"
            type="button"
            onClick={prescriptionHandler}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <i className="fas fa-prescription-bottle-alt mr-2"></i> New Prescription
          </button>
          <button title="More" type="button" className="p-2 text-gray-500 hover:text-blue-600">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left Column */}
        <div className="md:col-span-1">
          <div className="flex flex-col items-center">
            <img
              src={patient.imageurl}
              alt={patient.patientname}
              className="w-32 h-32 rounded-full border-4 border-blue-100 mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{patient.patientname}</h3>
            <p className="text-gray-500">
              {patient.age} years, {patient.gender}
            </p>
            <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
              <i className="fas fa-heartbeat mr-2"></i> {appointment.disease}
            </span>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
              <i className="fas fa-id-card mr-2 text-blue-500"></i> Contact Information
            </h4>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <i className="fas fa-envelope mr-2 text-blue-500 w-5"></i> {patient.patientcontact}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <i className="fas fa-map-marker-alt mr-2 text-blue-500 w-5"></i> {patient.patient_address}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
              <i className="fas fa-heartbeat mr-2 text-blue-500"></i> Medical Information
            </h4>
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <i className="fas fa-tint mr-2 text-blue-500 w-5"></i> Blood Type: {patient.bloodgroup}
            </p>
            <p className="text-sm text-gray-600 flex flex-wrap">
              <i className="fas fa-pills mr-2 text-blue-500 w-5"></i>
              Current Medications:
              <span className="ml-1">
                {p.prescriptionData.map((rx, idx) => (
                  <div key={idx}>{rx.medicinename}</div>
                ))}
              </span>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-2">
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-heart mr-2 text-blue-500"></i> Vital Signs
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Blood Pressure</p>
                <p className="font-medium">{patient.bp}/80 mm Hg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Heart Rate</p>
                <p className="font-medium">{patient.hr} bpm</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="font-medium">{patient.temp} °C</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="font-medium">{patient.weight} kg</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <i className="fas fa-history mr-2 text-gray-500"></i> Medical History
            </h4>
            <p className="text-gray-600">
              {patient.history
                ? patient.history.split(";").map((item, index) => (
                    <span key={index} className="block">
                      {item.trim()}
                    </span>
                  ))
                : "No history available."}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
              <i className="fas fa-calendar-alt mr-2 text-blue-500"></i> Recent Visits
            </h4>
            <div className="space-y-4">
              {p.appointmentData.map((appt, idx) => (
                <div
                  key={idx}
                  className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/30 rounded-r"
                >
                  <p className="font-medium">{appt.type}</p>
                  <p className="text-sm text-gray-500">{appt.date} | {appt.time}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {appt.notes
                      ? appt.notes.split(";").map((item, index) => (
                          <span key={index} className="block">
                            {item.trim()}
                          </span>
                        ))
                      : "_"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 border-b pb-2 mb-3 flex items-center">
              <i className="fas fa-prescription mr-2 text-purple-500"></i> Current Prescriptions
            </h4>
            <div className="divide-y divide-gray-200">
              {p.prescriptionData.map((presc, idx) => (
                <div
                  key={idx}
                  className="prescription-item py-3 px-2 hover:bg-blue-50 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium flex items-center">
                        <i className="fas fa-pills mr-2 text-purple-500"></i> {presc.medicinename}
                      </p>
                      <p className="text-sm text-gray-500 ml-6">
                        {presc.dosage} {presc.frequency} for {presc.duration}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button title="Edit" type="button" className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button title="Delete" type="button" className="text-red-600 hover:text-red-800">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
