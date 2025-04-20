import { useState, useMemo } from "react";
import AppointmentCard from "./AppointmentCard";

const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Oncology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "Psychiatry",
  "Gastroenterology",
  "Urology",
  "ENT",
];

export default function UpcomingAppointments({ setActiveItem, appointmentDetails }) {
    const now = new Date();
    const [showModal, setShowModal] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDept, setFilterDept] = useState("");

    const upcoming = useMemo(() =>
        appointmentDetails
        .map((apt) => ({ ...apt, dateTime: new Date(`${apt.date}T${apt.time}`) }))
        .filter((apt) => apt.dateTime > now)
        .sort((a, b) => a.dateTime - b.dateTime)
        .slice(0, 5),
        [appointmentDetails]
    );

    const filteredAll = useMemo(() => {
        return appointmentDetails
        .map((apt) => ({ ...apt, dateTime: new Date(`${apt.date}T${apt.time}`) }))
        .filter((apt) => {
            if (searchText) {
                const txt = searchText.toLowerCase();
                const patientName = (apt.patientname || "").toLowerCase();
                const doctorName = (apt.doctorname || "").toLowerCase();
                const inPatient = patientName.includes(txt);
                const inDoctor = doctorName.includes(txt);
                if (!inPatient && !inDoctor) return false;
            }
            if (filterDate && apt.date !== filterDate) return false;
            if (filterType && apt.type !== filterType) return false;
            if (filterDept && apt.department !== filterDept) return false;
            return true;
        })
        .sort((a, b) => a.dateTime - b.dateTime);
    }, [appointmentDetails, searchText, filterDate, filterType, filterDept]);

    const handleResetFilters = () => {
        setSearchText("");
        setFilterDate("");
        setFilterType("");
        setFilterDept("");
    };

    return (
        <>
        <div className="appointments-card animate-fadeIn">
            <div className="card-header flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <i className="fas fa-calendar-check"></i> Upcoming Appointments
            </h2>
            <div className="flex flex-row gap-5">
                <button
                    style={{
                    backgroundColor: "#2563eb", 
                    color: "#ffffff", 
                    padding: "0.5rem 1rem", 
                    borderRadius: "0.375rem", 
                    border: "none", 
                    cursor: "pointer", 
                    transition: "background-color 0.2s ease, color 0.2s ease", 
                    }}
                    onClick={() => setShowModal(true)}
                >
                    View All
                </button>
                <button
                    style={{
                    backgroundColor: "#2563eb", 
                    color: "#ffffff", 
                    padding: "0.5rem 1rem", 
                    borderRadius: "0.375rem", 
                    border: "none", 
                    cursor: "pointer", 
                    transition: "background-color 0.2s ease, color 0.2s ease", 
                    }}
                    onClick={() => setActiveItem(4)}
                >
                    + New Appointment
                </button>
                </div>
            </div>

            <div className="card-body">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Doctor</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Type</th>
                                <th>Status</th>
                                {/* <th className="table-actions">Actions</th> */}
                                <th>Department</th>
                            </tr>
                        </thead>
                    
                        {
                            upcoming.map((apt, idx) => (
                                <AppointmentCard key={apt.id || idx} apt={apt} />
                            ))
                        }
                    </table>
                </div>
            </div>
        </div>

        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 overflow-y-auto max-h-full">
                    <div
                        style={{
                            position: "sticky", // Make it stick to the top
                            top: 0, // Stick to the top of the modal
                            backgroundColor: "white", // Ensure it has a background to cover content behind it
                            zIndex: 10, // Ensure it stays above other content
                            padding: "1rem", // Add padding for spacing
                            borderBottom: "1px solid #e5e7eb", // Optional: Add a bottom border for separation
                          }}
                    >
                        <div 
                            className="flex justify-between items-center mb-4"
                        >
                            <h3 className="text-lg font-semibold">All Appointments</h3>
                            <button
                                className="text-gray-600 hover:text-gray-800"
                                onClick={() => {
                                    setShowModal(false)
                                    handleResetFilters();   
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="Search patient or doctor"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="form-control"
                            />
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="form-control"
                            />
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="form-control"
                            >
                                <option value="">All Types</option>
                                <option>Consultation</option>
                                <option>Follow-up</option>
                            </select>
                            <select
                                value={filterDept}
                                onChange={(e) => setFilterDept(e.target.value)}
                                className="form-control"
                            >
                                <option value="">All Departments</option>
                                {DEPARTMENTS.map((d) => (
                                <option key={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    {/* <th className="table-actions">Actions</th> */}
                                    <th>Department</th>
                                </tr>
                            </thead>
                        
                            {
                                filteredAll.map((apt, idx) => (
                                    <AppointmentCard key={apt.id || idx} apt={apt} />
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}
