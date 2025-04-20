import React, { useState, useEffect, useRef } from 'react';
import './Profile.css'; // Optional for additional styles (like role-badge classes)
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from 'react-router-dom';

const roles = {
  doctor: { class: 'role-doctor', text: 'Doctor' },
  admin: { class: 'role-admin', text: 'Administrator' },
  frontdesk: { class: 'role-frontdesk', text: 'Front Desk' },
  dataentry: { class: 'role-dataentry', text: 'Data Entry' }
};

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@hospital.com',
    mobile: '+1 (555) 123-4567',
    role: 'admin',
    profilePic: 'https://randomuser.me/api/portraits/men/41.jpg',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData((prev) => ({ ...prev, profilePic: reader.result }));
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setUserData({ ...formData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-full">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 p-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hospital Management System</h1>
            <p className="text-gray-600">My Account</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(`/${userData.role}/dashboard`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <i className="fas fa-home mr-2"></i> Dashboard
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center">
              <i className="fas fa-sign-out-alt mr-2"></i> Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-[80%] m-auto">
          <div className="md:flex">
            {/* Sidebar */}
            <div className="md:w-1/4 bg-blue-50 p-6 text-center">
              <div className="mb-6 relative inline-block">
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <div
                  className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer shadow"
                  onClick={() => fileInputRef.current.click()}
                >
                  <i className="fas fa-camera text-blue-600"></i>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                {userData.role === 'doctor' ? 'Dr. ' : ''}
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600 mb-4">{userData.email}</p>
              <div className="mb-6">
                <span className={`role-badge ${roles[userData.role].class}`}>
                  {roles[userData.role].text}
                </span>
              </div>
              <nav className="space-y-2 text-left">
                <a href="#" className="block py-2 px-4 bg-blue-100 text-blue-700 rounded-lg font-medium">
                  <i className="fas fa-user mr-2"></i> My Profile
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-blue-100 rounded-lg">
                  <i className="fas fa-calendar-alt mr-2"></i> Appointments
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-blue-100 rounded-lg">
                  <i className="fas fa-file-medical mr-2"></i> Reports
                </a>
                <a href="#" className="block py-2 px-4 hover:bg-blue-100 rounded-lg">
                  <i className="fas fa-cog mr-2"></i> Settings
                </a>
              </nav>
            </div>

            {/* Profile Form */}
            <div className="md:w-3/4 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit Profile
                  </button>
                )}
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={formData.role}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  >
                    {Object.entries(roles).map(([value, role]) => (
                      <option key={value} value={value}>
                        {role.text}
                      </option>
                    ))}
                  </select>
                </div>

                {isEditing && (
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handleSaveClick}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              {/* Additional Info */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard icon="fa-id-card" title="Employee ID" value="HMS-2023-0456" />
                  <InfoCard icon="fa-calendar-alt" title="Join Date" value="15 March 2020" />
                  <InfoCard icon="fa-building" title="Department" value="Cardiology" />
                  <InfoCard icon="fa-user-md" title="Specialization" value="Cardiologist" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
      <i className={`fas ${icon} mr-2 text-blue-500`}></i> {title}
    </h4>
    <p className="text-gray-900">{value}</p>
  </div>
);

export default Profile;
