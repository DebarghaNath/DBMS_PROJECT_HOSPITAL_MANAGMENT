import { useState } from "react";

export default function EmailNotification() {
  const [email, setEmail] = useState("dr.sarah.johnson@medicare.com");
  const [notificationFrequency, setNotificationFrequency] = useState("Daily Digest");
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [medicationReports, setMedicationReports] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow mt-6 overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-semibold text-lg">Automated Email Reports</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Weekly Reports */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
              <div>
                <p className="font-medium">Weekly Patient Reports</p>
                <p className="text-sm text-gray-500">
                  Receive a comprehensive weekly summary of all your patients' health status and treatment progress
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={weeklyReports}
                  onChange={() => setWeeklyReports(!weeklyReports)} // Toggle state
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Emergency Alerts */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
              <div>
                <p className="font-medium">Emergency Alerts</p>
                <p className="text-sm text-gray-500">
                  Immediate notifications for critical patient conditions or abnormal test results
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emergencyAlerts}
                  onChange={() => setEmergencyAlerts(!emergencyAlerts)} // Toggle state
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Appointment Reminders */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
              <div>
                <p className="font-medium">Appointment Reminders</p>
                <p className="text-sm text-gray-500">
                  Daily reminders for upcoming appointments and schedule changes
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={appointmentReminders}
                  onChange={() => setAppointmentReminders(!appointmentReminders)} // Toggle state
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Medication Reports */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50">
              <div>
                <p className="font-medium">Medication Adherence Reports</p>
                <p className="text-sm text-gray-500">
                  Weekly reports on patient medication adherence and refill needs
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={medicationReports}
                  onChange={() => setMedicationReports(!medicationReports)} // Toggle state
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-700 mb-4">Notification Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div>
                <label className="block text-gray-700 mb-2">Email Address for Notifications*</label>
                <div className="flex">
                  <input
                    type="email"
                    className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                    <i className="fas fa-save"></i>
                  </button>
                </div>
              </div>

              {/* Notification Frequency */}
              <div>
                <label className="block text-gray-700 mb-2">Notification Frequency</label>
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={notificationFrequency}
                  onChange={(e) => setNotificationFrequency(e.target.value)} // Update state
                >
                  <option value="Real-time">Real-time</option>
                  <option value="Daily Digest">Daily Digest</option>
                  <option value="Weekly Summary">Weekly Summary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}