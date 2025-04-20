import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";

const UpcomingAppointments = ({ orgAppointments, setActiveItem, setNavItems }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const sortedAppointments = (orgAppointments || []).sort((a, b) => {
            const aDateTime = new Date(`${a.date}T${a.time}`);
            const bDateTime = new Date(`${b.date}T${b.time}`);
            return aDateTime - bDateTime; 
        });

        setAppointments(sortedAppointments.slice(0, 5)); 
        setLoading(false);
    }, [orgAppointments]);

    if (loading) {
        return <div className="text-center p-4">Loading upcoming appointments...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    if (appointments.length === 0) {
        return <div className="text-center p-4 text-gray-500">No upcoming appointments.</div>;
    }

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden w-[50%] h-[422px]">
            <div className="p-4 border-b bg-gray-50 flex flex-row justify-between">
                <h2 className="font-semibold text-lg my-auto">Upcoming Appointments</h2>
                <button 
                    className="btn btn-primary"
                    onClick={() => {
                    setActiveItem(3);
                    setNavItems((prevNavItems) =>
                        prevNavItems.map((item) => ({
                        ...item,
                        active: item.id === 3,
                        }))
                    );
                    }}
                >
                    View All
                </button>
            </div>
            <div className="p-4 space-y-3">
                {appointments.map((apt) => (
                    <div
                        key={apt.appointmentid}
                        className={`appointment-card p-3 rounded-lg border-l-4 border-${
                            apt.priority === "High"
                                ? "red"
                                : apt.priority === "Emergency"
                                ? "yellow"
                                : "green"
                        }-500 shadow-sm`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-medium">{apt.patientname}</p>
                                <p className="text-sm text-gray-500">{apt.disease}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium">{apt.time.slice(0, 5)}</p>
                                <p className="text-xs text-gray-500">{apt.date}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpcomingAppointments;