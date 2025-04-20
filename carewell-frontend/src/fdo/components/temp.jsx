import AppointmentCard from "./AppointmentCard";

export default function UpcomingAppointments({ setActiveItem, appointmentDetails }) {
  // Get current timestamp
  const now = new Date();

  // Prepare, filter, sort and limit to next 5 appointments
  const upcoming = appointmentDetails
    // 1. Normalize to a JS Date object (you can adjust keys to match your data)
    .map((apt) => {
      let dateTime;
      if (apt.datetime) {
        // if you already have a combined datetime
        dateTime = new Date(apt.datetime);
      } else {
        // fallback to separate date + time fields
        dateTime = new Date(`${apt.date}T${apt.time}`);
      }
      return { ...apt, dateTime };
    })
    // 2. Filter out past appointments
    .filter((apt) => apt.dateTime > now)
    // 3. Sort ascending by dateTime
    .sort((a, b) => a.dateTime - b.dateTime)
    // 4. Take only the next 5
    .slice(0, 5);

  return (
    <div className="appointments-card animate-fadeIn">
      <div className="card-header flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <i className="fas fa-calendar-check"></i>
          Upcoming Appointments
        </h2>
        <div>
          <button style={{ marginRight: 8 }}>View All</button>
          <button onClick={() => setActiveItem(4)}>+ New Appointment</button>
        </div>
      </div>

      <div className="card-body">
        <div className="table-container">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.length > 0 ? (
                upcoming.map((apt, idx) => (
                  <AppointmentCard key={apt.id || idx} apt={apt} />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No upcoming appointments.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
