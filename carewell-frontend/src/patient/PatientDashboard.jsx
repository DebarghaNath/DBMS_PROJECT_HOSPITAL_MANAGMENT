import React, { useEffect } from "react";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  useEffect(() => {
    // DOM Elements
    const openMobileSidebar = document.getElementById("openMobileSidebar");
    const closeMobileSidebar = document.getElementById("closeMobileSidebar");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const mobileSidebarBackdrop = document.getElementById("mobileSidebarBackdrop");
    const openHealthStatusModal = document.getElementById("openHealthStatusModal");
    const closeHealthStatusModal = document.getElementById("closeHealthStatusModal");
    const healthStatusModal = document.getElementById("healthStatusModal");
    const healthStatusForm = document.getElementById("healthStatusForm");
    const moodRatingInput = document.getElementById("moodRating");
    const emojiButtons = document.querySelectorAll(".health-status-emoji");

    // Event Listeners for mobile sidebar
    openMobileSidebar?.addEventListener("click", () => {
      mobileSidebar.classList.remove("-translate-x-full");
      mobileSidebarBackdrop.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });

    closeMobileSidebar?.addEventListener("click", () => {
      mobileSidebar.classList.add("-translate-x-full");
      mobileSidebarBackdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });

    mobileSidebarBackdrop?.addEventListener("click", () => {
      mobileSidebar.classList.add("-translate-x-full");
      mobileSidebarBackdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });

    // Event Listeners for health status modal
    openHealthStatusModal?.addEventListener("click", () => {
      healthStatusModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      setTimeout(() => {
        healthStatusModal.classList.add("modal-open");
      }, 10);
    });

    closeHealthStatusModal?.addEventListener("click", () => {
      healthStatusModal.classList.remove("modal-open");
      setTimeout(() => {
        healthStatusModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      }, 300);
    });

    // Emoji selection
    emojiButtons.forEach((button) => {
      button.addEventListener("click", () => {
        emojiButtons.forEach((btn) => {
          btn.classList.remove("bg-blue-100", "border-blue-300");
        });

        button.classList.add("bg-blue-100", "border-blue-300");
        moodRatingInput.value = button.dataset.value;
      });
    });

    // Form submission
    healthStatusForm?.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log("Health status submitted:", {
        moodRating: moodRatingInput.value,
        symptoms: document.getElementById("symptoms").value,
        medicationAdherence: document.getElementById("medicationAdherence").value,
        bloodPressure: {
          systolic: document.getElementById("bloodPressureSystolic").value,
          diastolic: document.getElementById("bloodPressureDiastolic").value,
        },
        bloodSugar: document.getElementById("bloodSugar").value,
      });

      showSuccessToast("Health status updated successfully");

      healthStatusModal.classList.remove("modal-open");
      setTimeout(() => {
        healthStatusModal.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
      }, 300);

      healthStatusForm.reset();
      emojiButtons.forEach((btn) => {
        btn.classList.remove("bg-blue-100", "border-blue-300");
      });
    });

    // Tab switching
    const tabButtons = document.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });

    // Sidebar item activation
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    sidebarItems.forEach((item) => {
      item.addEventListener("click", () => {
        sidebarItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    });

    // Toast notification functions
    function showSuccessToast(message) {
      const toast = document.createElement("div");
      toast.className =
        "fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in";
      toast.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("animate-fade-out");
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 3000);
    }

    function showErrorToast(message) {
      const toast = document.createElement("div");
      toast.className =
        "fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in";
      toast.innerHTML = `
        <i class="fas fa-exclamation-circle mr-2"></i>
        <span>${message}</span>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add("animate-fade-out");
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 3000);
    }

    // Cleanup the event listeners on unmount if necessary
    return () => {
      openMobileSidebar?.removeEventListener("click", () => {});
      closeMobileSidebar?.removeEventListener("click", () => {});
      mobileSidebarBackdrop?.removeEventListener("click", () => {});
      openHealthStatusModal?.removeEventListener("click", () => {});
      closeHealthStatusModal?.removeEventListener("click", () => {});
      emojiButtons.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
      healthStatusForm?.removeEventListener("submit", () => {});
      tabButtons.forEach((button) => {
        button.removeEventListener("click", () => {});
      });
      sidebarItems.forEach((item) => {
        item.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="sidebar w-64 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <img
            src="https://img.icons8.com/fluency/96/hospital-3.png"
            alt="Hospital Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold">HealthConnect</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-2 space-y-1">
            <a
              href="#"
              className="sidebar-item active flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-tachometer-alt w-6"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-calendar-check w-6"></i>
              <span>Appointments</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-user-md w-6"></i>
              <span>Doctors</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-pills w-6"></i>
              <span>Medications</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-file-medical w-6"></i>
              <span>Medical Records</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-heartbeat w-6"></i>
              <span>Health Tracker</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-bell w-6"></i>
              <span>Notifications</span>
              <div className="notification-badge">3</div>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-4 py-3 rounded-lg"
            >
              <i className="fas fa-cog w-6"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-blue-400">
          <div className="flex items-center space-x-3 px-2 py-3 rounded-lg bg-blue-700 bg-opacity-30">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">Sarah Johnson</p>
              <p className="text-xs text-blue-100">Patient</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar backdrop */}
      <div id="mobileSidebarBackdrop" className="fixed inset-0 bg-black bg-opacity-50 z-40 hidden"></div>

      {/* Mobile sidebar */}
      <div
        id="mobileSidebar"
        className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white z-50 transform -translate-x-full transition-transform duration-300 ease-in-out flex flex-col"
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          <div className="flex items-center space-x-3">
            <img
              src="https://img.icons8.com/fluency/96/hospital-3.png"
              alt="Hospital Logo"
              className="w-8 h-8"
            />
            <h1 className="text-lg font-bold">HealthConnect</h1>
          </div>
          <button id="closeMobileSidebar" className="text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <nav className="px-2 space-y-1">
            <a
              href="#"
              className="sidebar-item active flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-tachometer-alt w-6"></i>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-calendar-check w-6"></i>
              <span>Appointments</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-user-md w-6"></i>
              <span>Doctors</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-pills w-6"></i>
              <span>Medications</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-file-medical w-6"></i>
              <span>Medical Records</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-heartbeat w-6"></i>
              <span>Health Tracker</span>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-bell w-6"></i>
              <span>Notifications</span>
              <div className="notification-badge">3</div>
            </a>
            <a
              href="#"
              className="sidebar-item flex items-center space-x-3 px-3 py-3 rounded-lg"
            >
              <i className="fas fa-cog w-6"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>

        <div className="p-3 border-t border-blue-500">
          <div className="flex items-center space-x-3 px-2 py-2 rounded-lg bg-blue-700 bg-opacity-30">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium text-sm">Sarah Johnson</p>
              <p className="text-xs text-blue-100">Patient</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <button id="openMobileSidebar" className="md:hidden text-gray-600">
                <i className="fas fa-bars text-xl"></i>
              </button>
              <h2 className="text-xl font-semibold text-gray-800">Patient Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-600">
                <i className="fas fa-bell text-xl"></i>
                <div className="notification-badge">3</div>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline font-medium">Sarah Johnson</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h1>
                <p className="opacity-90">You have 2 upcoming appointments this week</p>
              </div>
              <button className="mt-4 md:mt-0 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
                Book New Appointment
              </button>
            </div>
          </div>

          {/* Dashboard tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px space-x-8 px-6">
                <button className="tab-button active py-4 px-1 font-medium text-sm">
                  Overview
                </button>
                <button className="tab-button py-4 px-1 font-medium text-sm text-gray-500 hover:text-gray-700">
                  Appointments
                </button>
                <button className="tab-button py-4 px-1 font-medium text-sm text-gray-500 hover:text-gray-700">
                  Health Status
                </button>
                <button className="tab-button py-4 px-1 font-medium text-sm text-gray-500 hover:text-gray-700">
                  Medical History
                </button>
              </nav>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Upcoming appointments card */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {/* Appointment 1 */}
                <div className="card appointment-card upcoming bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        alt="Doctor"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">Dr. Michael Chen</h4>
                        <p className="text-sm text-gray-600">Cardiologist</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <i className="fas fa-calendar-day mr-2 text-blue-500"></i>
                          <span>Today, 2:30 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-video"></i>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Follow-up
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                        Cancel
                      </button>
                      <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Appointment 2 */}
                <div className="card appointment-card upcoming bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4">
                      <img
                        src="https://randomuser.me/api/portraits/women/45.jpg"
                        alt="Doctor"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium">Dr. Emily Rodriguez</h4>
                        <p className="text-sm text-gray-600">Dermatologist</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <i className="fas fa-calendar-day mr-2 text-blue-500"></i>
                          <span>Friday, 10:00 AM</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <i className="fas fa-clinic-medical"></i>
                      </button>
                      <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Annual Checkup
                    </span>
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                        Cancel
                      </button>
                      <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health metrics card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Health Metrics</h3>

              <div className="space-y-4">
                {/* Blood Pressure */}
                <div className="health-metric p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-heartbeat text-red-500"></i>
                      <span className="font-medium">Blood Pressure</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      High
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    142/88 <span className="text-sm font-normal text-gray-500">mmHg</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Last checked: Today</span>
                    <a href="#" className="text-blue-600">
                      View History
                    </a>
                  </div>
                </div>

                {/* Blood Sugar */}
                <div className="health-metric p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-tint text-blue-500"></i>
                      <span className="font-medium">Blood Sugar</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                      Normal
                    </span>
                  </div>
                  <div className="text-2xl font-bold">
                    98 <span className="text-sm font-normal text-gray-500">mg/dL</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Last checked: Yesterday</span>
                    <a href="#" className="text-blue-600">
                      View History
                    </a>
                  </div>
                </div>

                {/* Weight */}
                <div className="health-metric p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-weight text-purple-500"></i>
                      <span className="font-medium">Weight</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">+1.2kg</span>
                  </div>
                  <div className="text-2xl font-bold">
                    68.4 <span className="text-sm font-normal text-gray-500">kg</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Last checked: 2 days ago</span>
                    <a href="#" className="text-blue-600">
                      View History
                    </a>
                  </div>
                </div>

                {/* Update Health Status Button */}
                <button
                  id="openHealthStatusModal"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
                >
                  Update Health Status
                </button>
              </div>
            </div>
          </div>

          {/* Recent activity and medications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Medications */}
            <div className="md:col-span-1 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Current Medications</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {/* Medication 1 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <i className="fas fa-pills"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Atorvastatin</h4>
                    <p className="text-sm text-gray-600">20mg tablet</p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>1 tablet daily at bedtime</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Refill in 7 days</span>
                  </div>
                </div>

                {/* Medication 2 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <i className="fas fa-pills"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Metoprolol</h4>
                    <p className="text-sm text-gray-600">50mg tablet</p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>1 tablet twice daily</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Refill in 14 days</span>
                  </div>
                </div>

                {/* Medication 3 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <i className="fas fa-pills"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Lisinopril</h4>
                    <p className="text-sm text-gray-600">10mg tablet</p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>1 tablet in the morning</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    <span>Refill in 21 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <a href="#" className="text-blue-600 text-sm font-medium">
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {/* Activity 1 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <i className="fas fa-file-prescription"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">New prescription added</h4>
                    <p className="text-sm text-gray-600">
                      Dr. Michael Chen prescribed Metoprolol
                    </p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>Today at 9:30 AM</span>
                    </div>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Appointment confirmed</h4>
                    <p className="text-sm text-gray-600">
                      Follow-up with Dr. Emily Rodriguez on Friday
                    </p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>Yesterday at 2:15 PM</span>
                    </div>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Test results available</h4>
                    <p className="text-sm text-gray-600">
                      Blood test results from last week are now available
                    </p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>Monday at 11:45 AM</span>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">View</button>
                </div>

                {/* Activity 4 */}
                <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition">
                  <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Reminder</h4>
                    <p className="text-sm text-gray-600">
                      Don't forget to take your Atorvastatin tonight
                    </p>
                    <div className="mt-1 text-xs text-gray-500">
                      <span>Sunday at 8:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Health Status Modal */}
      <div id="healthStatusModal" className="fixed inset-0 z-[100] hidden">
        <div className="modal-overlay absolute inset-0"></div>
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="modal-content bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Update Health Status</h3>
                <button id="closeHealthStatusModal" className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form id="healthStatusForm" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How are you feeling today?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    <button
                      type="button"
                      className="health-status-emoji py-2 rounded-lg border border-gray-200 text-2xl hover:bg-gray-50"
                      data-value="5"
                    >
                      😄
                    </button>
                    <button
                      type="button"
                      className="health-status-emoji py-2 rounded-lg border border-gray-200 text-2xl hover:bg-gray-50"
                      data-value="4"
                    >
                      🙂
                    </button>
                    <button
                      type="button"
                      className="health-status-emoji py-2 rounded-lg border border-gray-200 text-2xl hover:bg-gray-50"
                      data-value="3"
                    >
                      😐
                    </button>
                    <button
                      type="button"
                      className="health-status-emoji py-2 rounded-lg border border-gray-200 text-2xl hover:bg-gray-50"
                      data-value="2"
                    >
                      😕
                    </button>
                    <button
                      type="button"
                      className="health-status-emoji py-2 rounded-lg border border-gray-200 text-2xl hover:bg-gray-50"
                      data-value="1"
                    >
                      😞
                    </button>
                  </div>
                  <input type="hidden" id="moodRating" name="moodRating" />
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Symptoms
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows="3"
                    className="health-status-input w-full px-3 py-2 rounded-lg"
                    placeholder="Describe any symptoms you're experiencing"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="medicationAdherence" className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Adherence
                  </label>
                  <select
                    id="medicationAdherence"
                    name="medicationAdherence"
                    className="health-status-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="">Select adherence level</option>
                    <option value="excellent">Excellent - Taken all medications as prescribed</option>
                    <option value="good">Good - Missed 1-2 doses</option>
                    <option value="fair">Fair - Missed several doses</option>
                    <option value="poor">Poor - Not taking regularly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Pressure (optional)
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      id="bloodPressureSystolic"
                      name="bloodPressureSystolic"
                      placeholder="Systolic"
                      className="health-status-input flex-1 px-3 py-2 rounded-lg"
                    />
                    <span className="flex items-center">/</span>
                    <input
                      type="number"
                      id="bloodPressureDiastolic"
                      name="bloodPressureDiastolic"
                      placeholder="Diastolic"
                      className="health-status-input flex-1 px-3 py-2 rounded-lg"
                    />
                    <span className="flex items-center text-sm text-gray-500">mmHg</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="bloodSugar" className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Sugar (optional)
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="bloodSugar"
                      name="bloodSugar"
                      placeholder="Value"
                      className="health-status-input flex-1 px-3 py-2 rounded-lg"
                    />
                    <span className="flex items-center text-sm text-gray-500 ml-2">mg/dL</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
                  >
                    Submit Health Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
