import { format, isToday, isTomorrow } from "date-fns";

const AllPatients = ({ patients, handlePatient, diseaseDetails }) => {
    const scrollToDetails = () => {
        const detailsSection = document.getElementById("patient-details");
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isToday(date)) {
            return "Today";
        } else if (isTomorrow(date)) {
            return "Tomorrow";
        } else {
            return format(date, "dd MMM yyyy"); // Format as "19 Apr 2025"
        }
    };

    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h2 className="font-semibold text-lg">All Patients</h2>
                </div>

                <div className="overflow-y-auto" style={{ maxHeight: 460 }}>
                    <div className="divide-y divide-gray-200">
                        {patients.map((patient) => {
                            const [iconClass, color] =
                                diseaseDetails[patient.disease] || ['fas fa-question-circle', 'gray'];

                            return (
                                <div
                                    key={patient.patientid}
                                    className="p-4 hover:bg-gray-50 cursor-pointer transition-all"
                                    onClick={() => {
                                        handlePatient(patient.patientid);
                                        scrollToDetails();
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={patient.imageurl}
                                            alt="Patient"
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-medium">{patient.patientname}</p>
                                            <p className="text-sm text-gray-500">
                                                ID: {patient.patientid} | {patient.age}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex justify-between items-center text-sm">
                                        <span
                                            className={`
                                                px-2 py-1 
                                                bg-${color}-100 
                                                text-${color}-800 
                                                text-xs rounded-full 
                                                flex items-center gap-1 font-medium
                                            `}
                                        >
                                            <i className={`${iconClass}`}></i>
                                            {patient.disease}
                                        </span>

                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <i className="fas fa-clock"></i>
                                            {formatDate(patient.date)} {patient.time}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPatients;
