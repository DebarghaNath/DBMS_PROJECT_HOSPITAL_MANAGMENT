import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffLogin.css';
import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import SuccessMessage from './components/SuccessMessage';
import Toast from './components/Toast';
import { BASE_URL } from '../config';

const StaffLogin = () => {
    const navigate = useNavigate();
    const [toast, setToast] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    const [roleError, setRoleError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [resetEmailError, setResetEmailError] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);  
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);

    const resetEmailRef = useRef(null); 
    const showForgotPassword = () => {
        setIsForgotPassword(true);
        setTimeout(() => {
            resetEmailRef.current?.focus(); 
        }, 0);
    };

    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/authorization/getdetails`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem(`${selectedRole}$token`)}`, 
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details');
            }

            const orgData = await response.json();
            const data = orgData.data;
            // Store user details in localStorage
            console.log("User details:", data);
            localStorage.setItem(`${selectedRole}$userid`, data.userid);
            localStorage.setItem(`${selectedRole}$name`, data.name);
            localStorage.setItem(`${selectedRole}$email`, data.email);
            localStorage.setItem(`${selectedRole}$mobile`, data.mobile);
            localStorage.setItem(`${selectedRole}$role`, data.role);
            localStorage.setItem(`${selectedRole}$imageurl`, data.imageurl);
            localStorage.setItem(`${selectedRole}$lastlogin`, data.lastlogin);
            if(data.role == "doctor") {
                localStorage.setItem(`${selectedRole}$doctorid`, data.doctorid);
            }
            console.log("User details fetched successfully:", data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleSubmit = async () => {
        try {
            console.log("inside handleSubmit", email, password, selectedRole);
            let newRole = selectedRole;
            if (email == 'debargha.nath@gmail.com') {
                newRole = 'owner';
            }
            const payload = {
                email: email,
                password: password,
                role: newRole,
            };
    
            const response = await fetch(`${BASE_URL}/api/authorization/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Failed to login');
            }
    
            const data = await response.json();
            localStorage.setItem(`${selectedRole}$token`, data.token);
            fetchUserDetails();

            setToast({
                type: 'success',
                title: 'Login Successful',
                message: `Welcome back, ${email}!`,
            });
    
            setTimeout(() => {
                navigate(`/${newRole === "owner" ? "admin" : newRole}/dashboard`);
            }, 2000);
        } catch (error) {
            console.error('Error during login:', error);
            setToast({
                type: 'error',
                title: 'Login Failed',
                message: 'Wrong Credentials',
            });
        }
    };

    const togglePassword = () => {
        setPasswordVisible((prev) => !prev); // Toggle password visibility state
    };

    const sendResetLink = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(resetEmail)) {
            setResetEmailError(true);
            return;
        }

        setResetEmailError(false);

        setIsForgotPassword(false);
        setIsSuccessMessageVisible(true);
    };

    const validateLogin = async () => {
        let isValid = true;

        if (!selectedRole) {
            setRoleError(true);
            isValid = false;
        } else {
            setRoleError(false);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }
        // if (password.length < 8) {
        //     setPasswordError(true);
        //     isValid = false;
        // } else {
        //     setPasswordError(false);
        // }

        if (isValid) {
            await handleSubmit();          
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col lg:flex-row">
                {toast && <Toast type={toast.type} title={toast.title} message={toast.message} onClose={() => setToast(null)} />}
                <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 lg:p-12 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-20"></div>
                    <div className="relative z-10 max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-6">Welcome to CareWell Hospital</h1>
                        <p className="text-xl mb-8 opacity-90">Secure access to our healthcare management system for authorized personnel only.</p>
                        <img src="https://img.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_23-2148856559.jpg?w=740&t=st=1689345637~exp=1689346237~hmac=4ef4b8d5d8a7d0df8e6c9f6d6b2b8d6c0a9e9e6b3e6b3d6c6b3d6c6b3d6c6b3d6" 
                            alt="Medical Staff Illustration" 
                            className="illustration-img max-w-full h-auto" />
                    </div>
                </div>

                <div className="lg:w-1/2 bg-white p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="flex items-center mb-10">
                            <i className="fas fa-heartbeat text-3xl text-pink-600 mr-3"></i>
                            <span className="text-2xl font-bold text-blue-600">CareWell</span>
                        </div>

                        <LoginForm 
                            isForgotPassword={isForgotPassword}
                            isSuccessMessageVisible={isSuccessMessageVisible}
                            selectedRole={selectedRole}
                            setSelectedRole={setSelectedRole}
                            roleError={roleError}
                            email={email}
                            setEmail={setEmail}
                            emailError={emailError}
                            password={password}
                            setPassword={setPassword}
                            passwordVisible={passwordVisible}
                            togglePassword={togglePassword}
                            passwordError={passwordError}
                            showForgotPassword={showForgotPassword}
                            validateLogin={validateLogin}
                        />

                        <ForgotPasswordForm 
                            isForgotPassword={isForgotPassword}
                            resetEmailRef={resetEmailRef}
                            resetEmail={resetEmail}
                            resetEmailError={resetEmailError}
                            setResetEmail={setResetEmail}
                            sendResetLink={sendResetLink}
                            setIsForgotPassword={setIsForgotPassword}
                        />

                        <SuccessMessage 
                            isSuccessMessageVisible={isSuccessMessageVisible}
                            setIsSuccessMessageVisible={setIsSuccessMessageVisible}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StaffLogin;