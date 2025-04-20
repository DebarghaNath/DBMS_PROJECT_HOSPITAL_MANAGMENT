export default function DashboardSection(props) {
    const newClassName = props.isActive.Dashboard ? "page-section active" : "page-section";

    // Get the current date and time
    const now = new Date();

    // Count future appointments
    const futureAppointmentsCount = props.appointments.filter(appointment => {
        const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
        return appointmentDateTime > now; // Include only future appointments
    }).length;

    // Calculate the number of available doctors
    const availableDoctorsCount = props.users.filter(user => {
        if (user.role !== "doctor") return false; // Include only doctors
        if (!user.lastlogin) return false; // Exclude doctors with no last login
        const lastLoginDate = new Date(user.lastlogin);
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1); // Calculate the date 1 month ago
        return lastLoginDate >= oneMonthAgo; // Include doctors who logged in within the last month
    }).length;

    return (
        <>
            <div className={newClassName} id="dashboard-section">
                <div className="hero-section mb-6">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold">Hospital Dashboard</h1>
                        <p className="mt-2">Overview of hospital operations and statistics</p>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Patients</p>
                                <h3 className="text-2xl font-bold mt-1">{props.patients.length}</h3>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-full">
                                <i className="fas fa-procedures text-blue-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Future Appointments</p>
                                <h3 className="text-2xl font-bold mt-1">{futureAppointmentsCount}</h3>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <i className="fas fa-calendar-check text-green-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Available Doctors</p>
                                <h3 className="text-2xl font-bold mt-1">{availableDoctorsCount}</h3>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <i className="fas fa-user-md text-purple-500 text-xl"></i>
                            </div>
                        </div>
                    </div>
                    {/* <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Pending Lab Results</p>
                                <h3 className="text-2xl font-bold mt-1">24</h3>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-full">
                                <i className="fas fa-flask text-yellow-500 text-xl"></i>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Recent Activities */}
                <div className="card mb-6 p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                        {/* Last Registered Patient */}
                        {props.patients.length > 0 && (
                            <div className="flex items-start">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <i className="fas fa-user-plus text-blue-500"></i>
                                </div>
                                <div>
                                    <p className="font-medium">New patient registered</p>
                                    <p className="text-gray-500 text-sm">
                                        {console.log(props.patients[props.patients.length - 1])}
                                        {props.patients[props.patients.length - 1].patientname} 
                                        {" "}was registered on{" "}
                                        {new Date(props.patients[props.patients.length - 1].additiontime).toLocaleString()}
                                    </p>
                                </div>
                                <span className="ml-auto text-sm text-gray-500"></span>
                            </div>
                        )}

                        {/* Most Recent Appointment */}
                        {props.appointments.length > 0 && (() => {
                            const now = new Date();
                            const sortedAppointments = [...props.appointments].sort((a, b) => {
                                const dateA = new Date(`${a.date}T${a.time}`);
                                const dateB = new Date(`${b.date}T${b.time}`);
                                return dateA - dateB;
                            });

                            const nextOrLastAppointment = sortedAppointments.find(
                                (appointment) => new Date(`${appointment.date}T${appointment.time}`) >= now
                            ) || sortedAppointments[sortedAppointments.length - 1];

                            return (
                                <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-full mr-3">
                                        <i className="fas fa-calendar-plus text-green-500"></i>
                                    </div>
                                    <div>
                                        <p className="font-medium">Appointment scheduled</p>
                                        <p className="text-gray-500 text-sm">
                                            Dr. 
                                            {nextOrLastAppointment.doctorname || "Doctor"} 
                                            {new Date(`${nextOrLastAppointment.date}T${nextOrLastAppointment.time}`) > now
                                            ? " has "
                                            : " had "} 
                                            an appointment on{" "}
                                            {new Date(`${nextOrLastAppointment.date}T${nextOrLastAppointment.time}`).toLocaleString()}
                                        </p>
                                    </div>
                                    <span className="ml-auto text-sm text-gray-500">
                                        {new Date(`${nextOrLastAppointment.date}T${nextOrLastAppointment.time}`) > now
                                            ? "Upcoming"
                                            : "Occurred"}
                                    </span>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </>
    );
}

{/* <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <i className="fas fa-flask text-purple-500"></i>
                            </div>
                            <div>
                                <p className="font-medium">Lab test completed</p>
                                <p className="text-gray-500 text-sm">Blood test #L-58492 results are ready</p>
                            </div>
                            <span className="ml-auto text-sm text-gray-500">5 hours ago</span>
                        </div> */}