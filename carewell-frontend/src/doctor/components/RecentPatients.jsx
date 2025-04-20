import { format, isToday, isYesterday } from "date-fns";

const RecentPatients = ({ patients, setActiveItem, setNavItems }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isToday(date)) {
            return "Today";
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else {
            return format(date, "dd MMM yyyy");
        }
    };

    // Filter and sort patients by recent visits
    const recentPatients = patients
        .filter((patient) => new Date(patient.date) <= new Date()) // Only include patients with past or today's visits
        .sort((a, b) => new Date(b.date + "T" + b.time) - new Date(a.date + "T" + a.time)); // Sort by date and time (descending)

    return (
        <div className="w-[50%] h-[460px]">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex flex-row justify-between">
                    <h2 className="font-semibold text-lg my-auto">Recent Patients</h2>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setActiveItem(2);
                        setNavItems((prevNavItems) =>
                          prevNavItems.map((item) => ({
                          ...item,
                          active: item.id === 2,
                          }))
                        );
                      }}
                    >
                        View All
                    </button>
                </div>

                <div className="overflow-y-auto" style={{ maxHeight: 460 }}>
                    <div className="divide-y divide-gray-200">
                        {recentPatients.map((patient) => {
                            const [iconClass, color] =
                                patient.diseaseDetails || ["fas fa-question-circle", "gray"];

                            return (
                                <div
                                    key={patient.patientid}
                                    className="p-4 hover:bg-gray-50 transition-all"
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
                                            className={`px-2 py-1 bg-${color}-100 text-${color}-800 text-xs rounded-full flex items-center gap-1 font-medium`}
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

export default RecentPatients;