import "./DoctorDashboard.css"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import QuickStats from "./components/QuickStats"
import SearchFilter from "./components/SearchFilter"
import PatientList from "./components/PatientList"
import EmailNotification from "./components/EmailNotification"
import RecentPatients from "./components/RecentPatients"
import UpcomingAppointments from "./components/UpcomingAppointments"
import AllAppointments from "./components/AllAppointments"
import Footer from "./components/Footer"
import { useState, useEffect } from 'react';
import {BASE_URL} from "../config";

export default function DoctorDashboard() {
    const [activeItem, setActiveItem] = useState(1);
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [orgAppointments, setOrgAppointments] = useState([]);
    
    const [navItems, setNavItems] = useState([
        { itemid: 1, id: "dashboard-text", label: "Dashboard", icon: "fas fa-tachometer-alt", active: false },
        { itemid: 2, id: "patients-text", label: "Patients", icon: "fas fa-user-injured", active: false },
        { itemid: 3, id: "appointments-text", label: "Appointments", icon: "fas fa-calendar-check", active: false },
        { itemid: 4, id: "prescriptions-text", label: "Prescriptions", icon: "fas fa-prescription-bottle-alt", active: false },
        { itemid: 5, id: "reports-text", label: "Medical Reports", icon: "fas fa-file-medical", active: false },
    ]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch(
                    `${BASE_URL}/api/doctor/${localStorage.getItem("doctor$doctorid")}/patient`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("doctor$token")}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch patients");
                }

                const data = await response.json();
                setPatients(data.patientdata);
                setFilteredPatients(data.patientdata); // Initialize filtered patients
            } catch (err) {
                console.log("Error fetching patients...");
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        const doctorIdStr = localStorage.getItem("doctor$doctorid");
        const token = localStorage.getItem("doctor$token");
        const doctorId = parseInt(doctorIdStr, 10);

        if (isNaN(doctorId) || !token) {
            return;
        }

        const fetchAppointments = async () => {
            try {
                const resp = await fetch(
                `${BASE_URL}/api/doctor/${doctorId}/appointments`,
                {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                }
                );

                if (!resp.ok) {
                const errData = await resp.json().catch(() => ({}));
                throw new Error(errData.error || "Unable to fetch appointments");
                }

                const data = await resp.json();
                setOrgAppointments(data.appointments);
            } catch (err) {
                console.log(err);
            } 
        };
        fetchAppointments();
    }, [])

    const handleSearch = ({ searchTerm, status }) => {
        let filtered = patients;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (patient) =>
                    patient.patientname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.patientid.toString().includes(searchTerm) ||
                    patient.disease.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (status !== "All Status") {
            filtered = filtered.filter((patient) => patient.priority === status);
        }

        setFilteredPatients(filtered);
    };

    return (
        <>
            <div className="flex h-[100vh] overflow-hidden">
                {/* Sidebar */}
                <Sidebar 
                    activeItem={activeItem} 
                    setActiveItem={setActiveItem} 
                    navItems={navItems}
                    setNavItems={setNavItems}
                />

                {/* Main Content */}
                
                <div id="main-content" className="relative main-content content-expanded flex-1">
                    <main className="p-6 overflow-y-auto">
                        <Topbar />
                        <br />
                        <br />
                        <br />
                        <QuickStats 
                            patients={patients}
                            orgAppointments={orgAppointments}
                        />
                        {activeItem == 1 && (
                            <div className="flex flex-row gap-5">
                                <RecentPatients 
                                    patients={filteredPatients} 
                                    setActiveItem={setActiveItem} 
                                    setNavItems={setNavItems}
                                />
                                <UpcomingAppointments 
                                    orgAppointments={orgAppointments}
                                    setActiveItem={setActiveItem} 
                                    setNavItems={setNavItems}
                                />
                            </div>
                        )}
                        {activeItem == 2 && (
                            <>
                                <SearchFilter onSearch={handleSearch} />
                                <PatientList patients={filteredPatients} />
                            </>
                        )}
                        {activeItem == 3 && <AllAppointments orgAppointments={orgAppointments}/>}
                        {activeItem == 4 && <EmailNotification />}
                        
                    </main>
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    );
}