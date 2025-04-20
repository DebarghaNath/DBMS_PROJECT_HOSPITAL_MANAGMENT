export default function AppointmentSection(props){
     const newClassName=props.isActive.Appointment?"page-section active":"page-section"
    return <>
    <div className={newClassName} id="appointments-section">
                    <div className="hero-section mb-6" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">Appointments</h1>
                            <p className="mt-2">Schedule and manage patient appointments</p>
                        </div>
                    </div>
                    <div className="card p-6 text-center">
                        <i className="fas fa-calendar-check text-5xl text-blue-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Appointments Section</h3>
                        <p className="text-gray-600">This section would contain appointment scheduling, calendar views, and management tools.</p>
                    </div>
                </div>
    </>
}