import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Signup from "./auth/Signup"
import StaffLogin from "./auth/StaffLogin"
import PatientLogin from "./patient/PatientLogin"

import Profile from "./profile/Profile"
import Admin_Dashboard from "./admin/Admin_Dashboard"
import Fdo_Dashboard from "./fdo/Fdo_Dashboard"
import Doctor_Dashboard from "./doctor/Doctor_Dashboard"
import Deo_Dashboard from "./deo/Deo_Dashboard"
import PatientDashboard from "./patient/PatientDashboard"; 
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />     
        <Route path="/signup" element={<Signup />} />
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        {/* <Route path="/admin/dashboard" element={<Admin_Dashboard />} /> */}
        {/* <Route path="/fdo/dashboard" element={<Fdo_dashboard />} /> */}
        {/* <Route path="/doctor/dashboard" element={<Doctor_Dashboard />} /> */}
        {/* <Route path="/deo/dashboard" element={<Deo_Dashboard />} /> */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route
          path="/fdo/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deo/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Admin_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fdo/dashboard"
          element={
            <ProtectedRoute>
              <Fdo_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <Doctor_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deo/dashboard"
          element={
            <ProtectedRoute>
              <Deo_Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
