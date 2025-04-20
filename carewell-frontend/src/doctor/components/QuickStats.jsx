export default function QuickStats({ patients, orgAppointments }) {
  // Calculate stats
  const uniquePatients = [...new Set(patients.map((p) => p.patientid))].length;
  const currentMonth = new Date().getMonth() + 1; // October = 10
  const currentYear = new Date().getFullYear(); // 2025
  const patientThisMonth = patients.filter((p) => {
      const visitDate = new Date(p.date);
      return (
          visitDate.getMonth() + 1 === currentMonth &&
          visitDate.getFullYear() === currentYear
      );
  }).length;

  const totalAppointments = orgAppointments.length;
  const pendingAppointments = orgAppointments.filter((apt) => {
      const appointmentDate = new Date(apt.date);
      return appointmentDate > new Date(); // Future appointments
  }).length;

  const statsData = [
      {
          icon: "fas fa-user-injured",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          borderColor: "border-blue-500",
          label: "Total Patients",
          value: `${uniquePatients}`,
          subtext: `${patientThisMonth} this month`,
          subIcon: "fas fa-hospital-user",
          subTextColor: "text-green-500",
      },
      {
          icon: "fas fa-calendar-check",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          borderColor: "border-green-500",
          label: "Total Appointments",
          value: `${totalAppointments}`,
          subtext: `${pendingAppointments} pending`,
          subIcon: "fas fa-clock",
          subTextColor: "text-red-500",
      },
      {
          icon: "fas fa-prescription-bottle-alt",
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          borderColor: "border-yellow-500",
          label: "Active Prescriptions",
          value: "23",
          subtext: "5 renewals needed",
          subIcon: "fas fa-sync-alt",
          subTextColor: "text-blue-500",
      },
      {
          icon: "fas fa-notes-medical",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          borderColor: "border-purple-500",
          label: "Reports Generated",
          value: "56",
          subtext: "3 new this week",
          subIcon: "fas fa-file-export",
          subTextColor: "text-purple-500",
      },
  ];

  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
              <div
                  key={index}
                  className={`bg-white rounded-xl shadow p-6 flex items-center border-l-4 ${stat.borderColor}`}
              >
                  <div
                      className={`p-3 rounded-full ${stat.iconBg} ${stat.iconColor} mr-4`}
                  >
                      <i className={`${stat.icon} text-xl`}></i>
                  </div>
                  <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className={`text-xs ${stat.subTextColor} mt-1`}>
                          <i className={`${stat.subIcon} mr-1`}></i> {stat.subtext}
                      </p>
                  </div>
              </div>
          ))}
      </div>
  );
}