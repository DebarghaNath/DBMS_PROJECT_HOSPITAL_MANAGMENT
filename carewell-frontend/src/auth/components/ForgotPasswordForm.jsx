import {useState} from "react";
import { BASE_URL } from "../../config"

const ForgotPasswordForm = ({isForgotPassword, resetEmailRef, resetEmail, resetEmailError, setResetEmail, sendResetLink, setIsForgotPassword}) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP, Step 3: Reset password
    const [otpSent, setOtpSent] = useState(false);
    const [sentOtp, setSentOtp] = useState("");
    const [error, setError] = useState("");
    
    // Send OTP to email
    const sendOtp = async () => {
        if (!email) {
            setError("Please enter a valid email address.");
            return;
        }
        try {
            const newOtp = Math.floor(100000 + Math.random() * 900000);
            setSentOtp(newOtp); 
            const response = await fetch(`${BASE_URL}/mailer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    message: `This is your OTP ${newOtp}`, // Generate random OTP
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send OTP.");
            }

            setOtpSent(true);
            setStep(2); // Move to Step 2
            setError("");
        } catch (err) {
            setError("Failed to send OTP. Please try again.");
        }
    };

    // Verify OTP and move to reset password step
    const verifyOtp = () => {
        if (otp == sentOtp) {
            setStep(3); // Move to Step 3
            setError("");
        } else {
            setError("Invalid OTP. Please try again.");
        }
    };

    // Reset password
    const resetPassword = async () => {
        if (!newPassword || newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/authorization/submit-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: newPassword,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to reset password.");
            }

            alert("Password reset successfully!");
            setIsForgotPassword(false); // Go back to login
        } catch (err) {
            setError("Failed to reset password. Please try again.");
        }
    };

    // Resend OTP
    const resendOtp = async () => {
        setOtpSent(false);
        sendOtp();
    };

    return (
        <div id="forgot-password-form" className={`fade-in ${isForgotPassword ? "" : "hidden"}`}>
            {step === 1 && (
                <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                    <p className="text-gray-600 mb-8">Enter your email to receive an OTP</p>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                            placeholder="your@email.com"
                        />
                    </div>

                    {error && <div className="error-message text-red-500">{error}</div>}

                    <button
                        type="button"
                        onClick={sendOtp}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 mb-4"
                    >
                        Send OTP
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify OTP</h2>
                    <p className="text-gray-600 mb-8">Enter the OTP sent to your email</p>

                    <div className="mb-6">
                        <label htmlFor="otp" className="block text-gray-700 mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                            placeholder="Enter OTP"
                        />
                    </div>

                    {error && <div className="error-message text-red-500">{error}</div>}

                    <button
                        type="button"
                        onClick={verifyOtp}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 mb-4"
                    >
                        Verify OTP
                    </button>

                    <button
                        type="button"
                        onClick={resendOtp}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-300"
                    >
                        Resend OTP
                    </button>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
                    <p className="text-gray-600 mb-8">Enter your new password</p>

                    <div className="mb-6">
                        <label htmlFor="new-password" className="block text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full py-3 px-2 border border-gray-300 rounded-lg"
                            placeholder="Re-enter new password"
                        />
                    </div>

                    {error && <div className="error-message text-red-500">{error}</div>}

                    <button
                        type="button"
                        onClick={resetPassword}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 mb-4"
                    >
                        Reset Password
                    </button>
                </>
            )}

            <div className="text-center">
                <a
                    href="#"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-blue-600 hover:underline"
                >
                    <i className="fas fa-arrow-left mr-1"></i> Back to login
                </a>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;