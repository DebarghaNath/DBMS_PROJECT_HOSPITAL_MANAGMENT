import "./Deo_Dashboard.css";
import { useState, useEffect, useRef } from 'react';
import Sidebar from "./components/Sidebar";
import TopNavigation from "./components/TopNavigation";
import PatientSelection from "./components/PatientSelection";
import Prescriptions from "./components/Prescriptions";
import MedicalHistory from "./components/MedicalHistory";
import TestResults from "./components/TestResults";
import PatientInfo from "./components/PatientInfo";

const TABS = {
    testResults: 'testResults',
    prescriptions: 'prescriptions',
    medicalHistory: 'medicalHistory',
};

const Deo_Dashboard = () => {
    const [patientid, setPatientId] = useState('');
    const [doctorid, setDoctorId] = useState('');

    const [patient, setPatient] = useState(null);
    const [activeTab, setActiveTab] = useState(TABS.testResults);
    const [tests, setTests] = useState(null);

    return (
        <div className="bg-gray-100 font-sans">
            <div className="flex h-screen overflow-hidden flex-row">
                <Sidebar />

                <div className="flex flex-col flex-1 overflow-hidden">
                    <TopNavigation />

                    <div className="flex-1 overflow-auto custom-scrollbar p-6">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Medical Data Entry</h1>
                            <p className="text-gray-600">Enter test results and prescriptions for patient appointments</p>
                        </div>

                        <PatientSelection 
                            setPatient={setPatient}
                            setTests={setTests}
                            patientid={patientid}
                            doctorid={doctorid}
                            setPatientid={setPatientId}
                            setDoctorid={setDoctorId}
                        />

                        <PatientInfo patient={patient}/>

                        <div className="border-b mb-4">
                            <nav className="border-b mb-4">
                                <div className="-mb-px flex space-x-8">
                                    {Object.entries(TABS).map(([key, val]) => (
                                    <button
                                        key={val}
                                        onClick={() => setActiveTab(val)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === val
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500'
                                        }`}
                                    >{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</button>
                                    ))}
                                </div>
                            </nav>
                        </div>

                        <div>
                            {activeTab === TABS.testResults && (
                                <TestResults tests={tests} doctorid={doctorid} patientid={patientid} setTests={setTests} />
                            )}
                            {activeTab === TABS.prescriptions && (
                                <Prescriptions doctorid={doctorid} patientid={patientid} patient={patient}/>
                            )}
                            {activeTab === TABS.medicalHistory && (
                                <MedicalHistory />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Deo_Dashboard;