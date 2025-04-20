export default function  DoctorSection(props){
     const newClassName=props.isActive.Doctor?"page-section active":"page-section"
    return <>
     <div className={newClassName} id="doctors-section">
                    <div className="hero-section mb-6" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"}}>
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">Doctor Management</h1>
                            <p className="mt=2">Manage all doctor profiles and schedules</p>
                        </div>
                    </div>
                    <div className="card p-6 text-center">
                        <i className="fas fa-user-md text-5xl text-blue-500 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-2">Doctors Section</h3>
                        <p className="text-gray-600">This section would contain doctor profiles, specialties, schedules, and availability.</p>
                    </div>
                </div>
    </>
}