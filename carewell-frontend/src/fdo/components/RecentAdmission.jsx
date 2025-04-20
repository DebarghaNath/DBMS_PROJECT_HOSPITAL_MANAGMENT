import { useState } from "react";
import AdmissionCard from "./AdmissionCard";

export default function RecentAdmission({ admissions }) {
    const [selectedAdmission, setSelectedAdmission] = useState(null);

    const sortedAdmissions = [...admissions].sort((a, b) => {
        const dateA = a.dischargedate ? new Date(a.dischargedate) : new Date(a.admitdate);
        const dateB = b.dischargedate ? new Date(b.dischargedate) : new Date(b.admitdate);
        return dateB - dateA;
    });

    return (
        <>
            <div className="admissions-card animate-fadeIn">
                <div className="card-header">
                    <h2>
                        <i className="fas fa-procedures"></i>
                        Recent Admits - Discharges
                    </h2>
                </div>
                <div className="admissions-list">
                    {sortedAdmissions.map((adm, index) => (
                        <div key={index} onClick={() => setSelectedAdmission(adm)} style={{ cursor: 'pointer' }}>
                            <AdmissionCard
                                name={adm.patientname}
                                gender={adm.gender}
                                age={adm.age}
                                room={adm.wardno}
                                doctor={adm.doctorname}
                                badgeClass={adm.badgeClass}
                                bedno={adm.bedno}
                                admitdate={adm.admitdate}
                                dischargedate={adm.dischargedate}
                                departmentname={adm.department}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedAdmission && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setSelectedAdmission(null)}
                >
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                            <h3 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                                <i className="fas fa-user-injured text-blue-600 text-lg"></i>
                                Patient Admission Details
                            </h3>
                            <button
                                className="text-gray-400 hover:text-red-500 text-2xl font-bold"
                                onClick={() => setSelectedAdmission(null)}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Info Sections */}
                        <div className="space-y-4 text-gray-800 text-xs md:text-sm">

                            {/* Patient Info */}
                            <div className="bg-gray-50 p-3 rounded-lg border">
                                <h4 className="text-base font-semibold mb-1 text-indigo-600">Patient Info</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <p><span className="font-medium">Name:</span> {selectedAdmission.patientname}</p>
                                    <p><span className="font-medium">Gender:</span> {selectedAdmission.gender}</p>
                                    <p><span className="font-medium">Patient ID:</span> {selectedAdmission.patientid}</p>
                                    <p><span className="font-medium">Age:</span> {selectedAdmission.age}</p>
                                </div>
                            </div>

                            {/* Room Info */}
                            <div className="bg-gray-50 p-3 rounded-lg border">
                                <h4 className="text-base font-semibold mb-1 text-indigo-600">Room Info</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <p><span className="font-medium">Ward:</span> {selectedAdmission.wardno}</p>
                                    <p><span className="font-medium">Bed:</span> {selectedAdmission.bedno}</p>
                                </div>
                            </div>

                            {/* Medical Info */}
                            <div className="bg-gray-50 p-3 rounded-lg border">
                                <h4 className="text-base font-semibold mb-1 text-indigo-600">Medical Info</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <p><span className="font-medium">Doctor:</span> {selectedAdmission.doctorname}</p>
                                    <p><span className="font-medium">Department:</span> {selectedAdmission.department}</p>
                                    <p><span className="font-medium">Doctor ID:</span> {selectedAdmission.doctorid}</p>
                                </div>
                            </div>

                            {/* Timeline Info */}
                            <div className="bg-gray-50 p-3 rounded-lg border">
                                <h4 className="text-base font-semibold mb-1 text-indigo-600">Admission Timeline</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <p className="font-medium">Admit Date:</p>
                                        <p className="text-xs text-gray-700">{new Date(selectedAdmission.admitdate).toLocaleDateString()}</p>
                                        <p className="text-xs text-gray-500">{new Date(selectedAdmission.admitdate).toLocaleTimeString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium">Discharge Date:</p>
                                        {selectedAdmission.dischargedate ? (
                                            <>
                                                <p className="text-xs text-gray-700">{new Date(selectedAdmission.dischargedate).toLocaleDateString()}</p>
                                                <p className="text-xs text-gray-500">{new Date(selectedAdmission.dischargedate).toLocaleTimeString()}</p>
                                            </>
                                        ) : (
                                            <p className="italic text-xs text-gray-500">Not discharged</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
