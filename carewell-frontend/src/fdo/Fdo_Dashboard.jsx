import "./fdo_style.css"
import {useState,useEffect,useRef} from "react"
import Sidebar from "./components/Sidebar"
import Topbar from "./components/Topbar"
import QuickStats from "./components/QuickStats"
import PatientRegistration from "./components/PatientRegistration"
import UpcomingAppointments from "./components/UpcomingAppointments"
import AppointmentModal from "./components/AppointmentModal"
import RecentAdmission from "./components/RecentAdmission"
import RoomAvailability from "./components/RoomAvailability"
import BookAppointment from "./components/BookAppointment"
import AdmitPatient from "./components/AdmitPatient"    
import DischargePatient from "./components/DischargePatient"
import TestScheduling from "./components/TestScheduling"
import NavigationCards from "./components/NavigationCards"
import AadhaarCheckSection from "./components/AadharCheckSection"
import { BASE_URL } from "../config"

export default function Fdo_dashboard(){
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [mobileButton,setMobileButton]=useState(false);
    const [appointmentDetails,setAppointmentDetails]=useState([])
    const [activeItem, setActiveItem] = useState(1);
    const [rooms, setRooms] = useState([]);
    const [admissions, setAdmissions] = useState([]);

    function buttonClick(){
        setMobileButton((preVal)=>{
            return !preVal
        })
    }
    const sidebarRef=useRef(null)
    const buttonRef=useRef(null)
  
    useEffect(()=>{
        function handleClickOutside(event){
            if(mobileButton && sidebarRef.current && !sidebarRef.current.contains(event.target)
        && buttonRef.current && buttonRef.current.contains(event.target)){
                    setMobileButton(false)
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside);
    },[mobileButton])

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/appointments/getappointments`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("fdo$token")}`,
                    },
                });
                console.log("Response:", response);
                const data = await response.json();
                console.log("Appointment Details:", data.appointmentDetails);
                setAppointmentDetails(data.appointmentDetails);
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        }
        fetchAppointments();
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/rooms/allrooms`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("fdo$token")}`,
                    },
                });
                console.log("Response:", response);
                const data = await response.json();
                setRooms(data.data);
                console.log("Room Details:", data.data);
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        } 
        fetchRooms();
    }, []);

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/rooms/admissions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("fdo$token")}`,
                    },
                });
                console.log("Response:", response);
                const data = await response.json();
                setAdmissions(data.data);
                console.log("Admission Details:", data.data);
            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };
        fetchAdmissions();
    }, []);

    return (
        <>
            <div className="dashboard-container">
                <Sidebar ref={sidebarRef} buttonClick={buttonClick} mobileButton={mobileButton} activeItem={activeItem} setActiveItem={setActiveItem}/>
                
                <div className="main-content">
                    <Topbar  ref={buttonRef} buttonClick={buttonClick}/>
                    
                    <div className="dashboard-content">
                            <QuickStats 
                                appointmentDetails={appointmentDetails} 
                                rooms={rooms}
                                admissions={admissions}
                            />

                            <div className="main-grid">
                                {activeItem === 1 && (
                                    <div className="flex flex-col">
                                        <NavigationCards setActiveItem={setActiveItem}/>
                                        <UpcomingAppointments 
                                            setActiveItem={setActiveItem}
                                            appointmentDetails={appointmentDetails}
                                        />
                                    </div>
                                )}
                                {activeItem === 2 && (
                                    <>
                                        <RecentAdmission admissions={admissions}/>
                                        <RoomAvailability rooms={rooms}/>
                                    </>
                                )}
                                {activeItem === 3 && (
                                    <div className="flex flex-col">
                                        <AadhaarCheckSection/>
                                        <PatientRegistration/>
                                    </div>
                                )}
                                {activeItem === 4 && (
                                    <div className="flex flex-row">
                                        <BookAppointment/>
                                    </div>
                                )}
                                {activeItem === 5 && (
                                    <>
                                        <AdmitPatient/>
                                        <DischargePatient/>
                                    </>
                                )}
                                {activeItem === 6 && (
                                    <>
                                        <TestScheduling/>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
    
            {isModalOpen && (
                <AppointmentModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
            )}
        </>
    )
}