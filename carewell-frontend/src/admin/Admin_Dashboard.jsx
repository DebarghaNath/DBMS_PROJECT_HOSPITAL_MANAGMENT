import { useState, useEffect } from 'react';
import "./Admin_Dashboard.css"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import DashboardSection from "./components/DashboardSection"
import HeroSection from "./components/HeroSection"
import StatsCard from "./components/StatsCard"
import AddUser from "./components/AddUser"
import AddUserModal from "./components/AddUserModal"
import UserTable from "./components/UserTable"
import Pagination from "./components/Pagination"
import PatientSection from "./components/PatientSection"
import DoctorSection from "./components/DoctorSection"
import AppointmentSection from "./components/AppointmentSection"
import OtherSection from "./components/OtherSection"
import { BASE_URL } from "../config"
import Toast from "./components/Toast"

export default function Admin_Dashboard(){
    const [isActive, setIsActive] = useState({
        "Dashboard": true,
        "User": false,
        "Patient": false,
        "Doctor": false,
        "Appointment": false,
        "Lab":false,
        "Billing":false,
        "Setting":false,
    });
    const [toast, setToast] = useState(null);
    const [openModal,setOpenModal]=useState(false)
    const newClassName=isActive.User?"page-section active":"page-section"
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState("all");
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/appointments/getappointments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("admin$token")}`,
                    },
                });
                console.log("Response:", response);
                const data = await response.json();
                console.log("Appointment Details:", data.appointmentDetails);
                setAppointments(data.appointmentDetails);
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        }
        fetchAppointments();
    }, []);

    useEffect(() => {
        const fetchAllPatients = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/patient/showpatients`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(`admin$token`)}`, 
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch patient details');
                }
    
                const orgData = await response.json();
                const data = orgData.data;
                setPatients(data);
                console.log("Patients fetched successfully:", data);
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };

        fetchAllPatients();
    }, []);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/authorization/showusers`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem(`admin$token`)}`, 
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
    
                const orgData = await response.json();
                const data = orgData.data;
                setUsers(data);
                console.log("Users fetched successfully:", data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchAllUsers();
    }, []);

    return <>
            <div className="flex">
            {toast && <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
        {/* <!-- Sidebar --> */}
        <Sidebar isActive={isActive} setIsActive={setIsActive} />


        {/* <!-- Main Content --> */}

        <div className="main-content md:ml-64 w-auto">
            {/* <!-- Top Bar --> */}
            <Topbar/>

            {/* <!-- Main Content Area - All Sections are hidden by default --> */}
            <main className="p-6 overflow-y-auto">
                {/* <!-- Dashboard Section --> */}
               <DashboardSection isActive={isActive} users={users} patients={patients} appointments={appointments}/>

                {/* <!-- User Management Section --> */}

                <div className={newClassName} id="users-section">
                    {/* <!-- Hero Section --> */}
                    <HeroSection/>

                    {/* <!-- Stats Cards --> */}
                    <StatsCard users={users}/>

                    {/* <!-- Add User and Search --> */}
                    <AddUser 
                        setOpenModal={setOpenModal} 
                        selectedRole={selectedRole} 
                        setSelectedRole={setSelectedRole} 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery}
                    />

                    {/* <!-- Add User Modal (hidden by default) --> */}
                    <AddUserModal openModal={openModal} setOpenModal={setOpenModal} setToast={setToast} setUsers={setUsers}/>

                    {/* <!-- Users Table --> */}
                    <UserTable users={users} setUsers={setUsers} searchQuery={searchQuery} selectedRole={selectedRole}/>

                    {/* <!-- Pagination --> */}
                    {/* <Pagination/> */}
                </div>

                {/* <!-- Patients Section --> */}
                <PatientSection isActive={isActive}/>
                {/* <!-- Doctors Section --> */}
                <DoctorSection isActive={isActive}/>

                {/* <!-- Appointments Section --> */}
               <AppointmentSection isActive={isActive}/>

                {/* <!-- Other sections (Laboratories, Billing, Settings) follow the same pattern --> */}
                 {/* <OtherSection isActive={isActive}/> */}
            </main>
        </div>
    </div>
    </>
}