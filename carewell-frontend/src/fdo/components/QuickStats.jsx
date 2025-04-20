export default function QuickStats({appointmentDetails, rooms, admissions}) {
    const now = new Date();
    
    const futureAppointmentsCount = appointmentDetails.filter((appointment) => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        return appointmentDateTime > now; 
    }).length;

    const emergencyAppoinmentsCount = appointmentDetails.filter((appointment) => {
        return appointment.type === "Emergency";
    }).length;

    const totalBeds = rooms.reduce((acc, room) => {
        return acc + room.maxcapacity;
    }, 0);
    
    const bedsAvailable = rooms.reduce((acc, room) => {
        return acc + room.remcapacity;
    }, 0);

    const icuAvailable = rooms.reduce((acc, room) => {
        if(room.type === "ICU") {
            return acc + room.remcapacity;
        }
        return acc;
    }, 0);

    const admissionsToday = admissions.filter((admission) => {
        const admissionDate = new Date(admission.admitdate).toISOString().split("T")[0]; 
        const todayDate = now.toISOString().split("T")[0];
        return admissionDate === todayDate; 
    }).length;

    const dischargedToday = admissions.filter((admission) => {
        const dischargeDate = admission.dischargedate ? new Date(admission.dischargedate).toISOString().split("T")[0] : null; 
        const todayDate = now.toISOString().split("T")[0]; 
        return dischargeDate === todayDate; 
    }).length;

    return <>
            <div className="stats-container">
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor:" rgba(59, 130, 246, 0.1)", color:" #3b82f6"}}>
                    <i className="fas fa-user-injured"></i>
                </div>
                <div className="stat-info">
                    <h3>Today's Admissions</h3>
                    <h2>{admissionsToday}</h2>
                    <div className="stat-change up">
                        <span>{dischargedToday} Discharged Today</span>
                    </div>
                </div>
            </div>
            
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor:" rgba(139, 92, 246, 0.1)", color:" #8b5cf6"}}>
                    <i className="fas fa-calendar-check"></i>
                </div>
                <div className="stat-info">
                    <h3>Appointments</h3>
                    <h2>{futureAppointmentsCount}</h2>
                    <div className="stat-change down">
                        <i className="fas fa-circle-exclamation"></i>
                        <span>{emergencyAppoinmentsCount} emergencies</span>
                    </div>
                </div>
            </div>
            
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor:" rgba(16, 185, 129, 0.1)", color:" #10b981"}}>
                    <i className="fas fa-procedures"></i>
                </div>
                <div className="stat-info">
                    <h3>Available Beds</h3>
                    <h2>{bedsAvailable}/{totalBeds}</h2>
                    <div className="stat-change neutral">
                        <i className="fas fa-bed"></i>
                        <span>{icuAvailable} ICU available</span>
                    </div>
                </div>
            </div>
            
            <div className="stat-card">
                <div className="stat-icon" style={{backgroundColor: "rgba(251, 191, 36, 0.1)", color:" #fbbf24"}}>
                    <i className="fas fa-flask"></i>
                </div>
                <div className="stat-info">
                    <h3>Pending Tests</h3>
                    <h2>17</h2>
                    <div className="stat-change neutral">
                        <span>5 delayed results</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}