import { useNavigate } from "react-router-dom";
import { ClipboardEdit, CalendarPlus, BedDouble, TestTube2 } from "lucide-react";

export default function PatientActionsDashboard({setActiveItem}) {
  const navigate = useNavigate();

  const actions = [
    {
      id: 3,
      title: "Patient Registration",
      description: "Register a new patient in the system.",
      icon: <ClipboardEdit className="h-6 w-6 text-blue-600" />,
      route: "/patients/register",
    },
    {
      id: 4,
      title: "Schedule Appointment",
      description: "Book a consultation with a doctor.",
      icon: <CalendarPlus className="h-6 w-6 text-green-600" />,
      route: "/appointments/schedule",
    },
    {
      id: 5,
      title: "Admit / Discharge",
      description: "Manage patient admission and discharge.",
      icon: <BedDouble className="h-6 w-6 text-orange-600" />,
      route: "/patients/admit-discharge",
    },
    {
      id: 6,
      title: "Schedule Test",
      description: "Book a lab or diagnostic test.",
      icon: <TestTube2 className="h-6 w-6 text-purple-600" />,
      route: "/tests/schedule",
    },
  ];

  return (
    <div className="max-w-full py-8">
      <h2 className="text-2xl font-semibold mb-6">Patient Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, idx) => (
          <div
            key={idx}
            // onClick={() => navigate(action.route)}
            onClick={() => {
              setActiveItem(action.id);
            }}
            className="cursor-pointer rounded-xl border p-5 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 mb-3">
              <div className="p-2 rounded-full bg-gray-100">{action.icon}</div>
              <h3 className="text-lg font-medium">{action.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
