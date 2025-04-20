const PatientInfo = ({ patient }) => {
    const getLastVisit = (appointmentData) => {
        if (!appointmentData || appointmentData.length === 0) {
            return "No visits found";
        }

        const sortedAppointments = appointmentData.sort((a, b) => {
            const aDateTime = new Date(`${a.date}T${a.time}`);
            const bDateTime = new Date(`${b.date}T${b.time}`);
            return bDateTime - aDateTime;
        });

        const lastVisit = sortedAppointments[0];
        return new Date(`${lastVisit.date}T${lastVisit.time}`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div id="patientInfo" className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Patient Information</h2>
                {/* <button id="editPatientBtn" className="text-sm text-indigo-600 hover:text-indigo-800">
                    <i className="fas fa-edit mr-1"></i> Edit
                </button> */}
            </div>
            {patient ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                            {/* <i className="fas fa-user text-indigo-600 text-2xl"></i> */}
                            <img className="rounded-full" src={patient.patientData[0].imageurl} alt="User" />
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900" id="patientName">
                                {patient.patientData[0].patientname}
                            </h3>
                            <p className="text-sm text-gray-500" id="patientId">
                                ID: PT-{patient.patientData[0].patientid}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Age & Gender</h4>
                        <p className="text-base text-gray-900" id="patientAgeGender">
                            {patient.patientData[0].age}, {patient.patientData[0].gender}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Blood Type</h4>
                        <p className="text-base text-gray-900" id="patientBloodType">
                            {patient.patientData[0].bloodgroup}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-500">Last Visit</h4>
                        <p className="text-base text-gray-900" id="patientLastVisit">
                            {getLastVisit(patient.appointmentData)}
                        </p>
                    </div>
                </div>
            ) : (
                <div>No information found</div>
            )}
        </div>
    );
};

export default PatientInfo;