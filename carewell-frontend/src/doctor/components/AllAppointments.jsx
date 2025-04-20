import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";

// Map priority to Tailwind color names
const priorityColors = {
  Emergency: "red",
  High: "yellow",
  Normal: "green",
};

const AllAppointments = ({orgAppointments}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    console.log(`orgAppointments-> ${orgAppointments}`);
    const sorted = (orgAppointments || []).sort((a, b) => {
      const aDT = new Date(`${a.date}T${a.time}`);
      const bDT = new Date(`${b.date}T${b.time}`);
      return bDT - aDT;
    });
    setAppointments(sorted);
    setLoading(false);
  }, [orgAppointments]);

  // Apply date, priority, and search filters
  const filtered = appointments
    .filter((apt) => (selectedDate ? apt.date === selectedDate : true))
    .filter((apt) => (filter === "All" ? true : apt.priority === filter))
    .filter((apt) =>
      apt.patientname.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Header with search, priority, and date filters */}
      <div className="p-4 border-b bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <h2 className="font-semibold text-xl text-gray-800">Appointments</h2>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            aria-label="Search patient by name"
            placeholder="Search patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring"
          >
            {["All", "Emergency", "High", "Normal"].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          <input
            type="date"
            aria-label="Filter by date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center p-6">Loading appointments...</div>
      ) : error ? (
        <div className="text-center p-6 text-red-500">Error: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center p-6 text-gray-500">No appointments found.</div>
      ) : (
        <div className="space-y-4 p-4">
          {filtered.map((apt) => {
            const color = priorityColors[apt.priority] || "gray";
            return (
              <div
                key={apt.appointmentid}
                className={
                  `flex items-center p-4 rounded-lg shadow-sm border-l-4 border-${color}-500 hover:bg-gray-50 transition-all cursor-pointer`
                }
                onClick={() => console.log("Selected appt", apt.appointmentid)}
              >
                <img
                  src={apt.imageurl}
                  alt={apt.patientname}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">
                    {apt.patientname}, <span className="text-sm text-gray-500">{apt.age} yrs</span>
                  </p>
                  <p className="text-sm text-gray-600">{apt.disease}</p>
                </div>
                <div className="text-right space-y-1">
                  <span
                    className={
                      `inline-block px-2 py-0.5 text-xs font-semibold bg-${color}-100 text-${color}-800 rounded-full`
                    }
                  >
                    {apt.priority}
                  </span>
                  <p className="text-sm font-medium text-gray-700">{apt.time.slice(0, 5)}</p>
                  <p className="text-xs text-gray-500">{apt.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllAppointments;