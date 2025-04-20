import { useState } from "react";
import AllPatients from "./AllPatients";
import Detail from "./Detail";
import PrescriptionForm from "./PrescriptionForm";
import "../DoctorDashboard.css";
import { patientsInDetail } from "./ElaboratedDetail";
import { diseaseDetails } from "./DiseaseDetails";

export default function PatientList({patients}) {
  const [isActive, setIsActive] = useState(false);
  const [activeId, setActiveId] = useState(0);
  const [showPrescription, setShowPrescription] = useState(false);
  const newClass = showPrescription ? "" : "hidden";

  function prescriptionHandler() {
    setShowPrescription(true);
  }

  function handlePatient(id) {
    setIsActive(true);
    setActiveId(id);
  }

  return (
    <>
      <div className="grid gap-6 mb-6">
        {/* Patient List */}
        <AllPatients patients={patients} handlePatient={handlePatient} diseaseDetails={diseaseDetails}/>

        {/* Patient Details and Analytics */}
        <div id="patient-details">
          {/* Patient Details */}
          <div id="patient-details" className="bg-white rounded-xl shadow overflow-hidden">
            <Detail
              isActive={isActive}
              activeId={activeId}
              patientsInDetail={patientsInDetail}
              prescriptionHandler={prescriptionHandler}
            />
          </div>
          <PrescriptionForm newClass={newClass} />
        </div>
      </div>
    </>
  );
}