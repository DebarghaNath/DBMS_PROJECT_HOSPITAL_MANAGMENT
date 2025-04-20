import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './PatientLogin.css'; 

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  return (
    <div className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fade-in`}>
      <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
      <span>{message}</span>
    </div>
  );
};

const PatientLogin = () => {
  const [step, setStep] = useState('aadhaar'); // steps: aadhaar, otp, success
  const [aadhaar, setAadhaar] = useState('');
  const [consent, setConsent] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [aadhaarLast4, setAadhaarLast4] = useState('');
  const [countdownValue, setCountdownValue] = useState(30);
  const [sendLoading, setSendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  const timerRef = useRef(null);
  const otpInputRefs = useRef([]);

  // Start OTP countdown timer
  const startOtpTimer = () => {
    setCountdownValue(30);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdownValue(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Show toast notifications
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Handle Aadhaar form submission
  const handleAadhaarSubmit = (e) => {
    e.preventDefault();
    // Validate Aadhaar: must be 12 digits
    if (!/^\d{12}$/.test(aadhaar.trim())) {
      showToast('Please enter a valid 12-digit Aadhaar number', 'error');
      return;
    }
    if (!consent) {
      showToast('Please consent to Aadhaar verification', 'error');
      return;
    }

    setSendLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      simulateSendOtp(aadhaar.trim());
      setSendLoading(false);
    }, 1500);
  };

  // Simulate sending OTP: move to OTP step, update last 4 digits, start timer, etc.
  const simulateSendOtp = (aadhaarValue) => {
    console.log(`API called to send OTP for Aadhaar: ${aadhaarValue}`);
    setAadhaarLast4(aadhaarValue.slice(-4));
    setStep('otp');
    startOtpTimer();

    // For demo: auto-fill OTP after a short delay
    setTimeout(() => {
      autoFillOtpForDemo();
    }, 700);

    showToast('OTP sent successfully to your registered mobile number', 'success');
  };

  // Auto-fill demo OTP (123456)
  const autoFillOtpForDemo = () => {
    const demoOtp = '123456';
    const newOtp = demoOtp.split('');
    setOtp(newOtp);
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.charAt(value.length - 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input if filled
    if (value && index < 5 && otpInputRefs.current[index + 1]) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP key down to catch Backspace for moving focus
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      if (otpInputRefs.current[index - 1]) {
        otpInputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP form submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      showToast('Please enter the complete 6-digit OTP', 'error');
      return;
    }
    setVerifyLoading(true);
    // Simulate API call to verify OTP
    setTimeout(() => {
      simulateVerifyOtp(fullOtp);
      setVerifyLoading(false);
    }, 1500);
  };

  const simulateVerifyOtp = (fullOtp) => {
    console.log(`API called to verify OTP: ${fullOtp}`);
    // For demo: any 6-digit OTP is accepted.
    setStep('success');
    showToast('Verification Successful!', 'success');

    // Simulate redirect (for demo, just show a toast message)
    setTimeout(() => {
      showToast('Redirecting to your dashboard...', 'success');
      // window.location.href = '/patient-dashboard';
    }, 3000);
  };

  const handleBackToAadhaar = () => {
    setStep('aadhaar');
    clearInterval(timerRef.current);
    setOtp(Array(6).fill(''));
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    setSendLoading(true);
    // Simulate API call to resend OTP
    setTimeout(() => {
      console.log('OTP resent successfully');
      startOtpTimer();
      setOtp(Array(6).fill(''));
      setSendLoading(false);
      showToast('New OTP sent successfully', 'success');
    }, 1000);
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="login-container relative">
        {/* Background pattern element can be styled or replaced as needed */}
        <div className="bg-pattern absolute inset-0"></div>
        <div className="content relative z-10 bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header Image */}
          <img
            src="https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611198.jpg"
            alt="Medical Banner"
            className="header-image w-full object-cover"
          />

          {/* Aadhaar Verification Step */}
          {step === 'aadhaar' && (
            <div id="aadhaarStep" className="p-8">
              <div className="text-center mb-8">
                <i class="fas fa-hospital text-3xl m-auto"></i>
                {/* <img
                  src="https://img.icons8.com/fluency/96/hospital-3.png"
                  alt="Hospital Logo"
                  className="hospital-logo mx-auto"
                /> */}
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Welcome to HealthConnect</h1>
                <p className="text-gray-600 mt-2">Secure patient portal for your healthcare needs</p>
              </div>
              <form onSubmit={handleAadhaarSubmit} className="space-y-6">
                <div>
                  <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="aadhaarNumber"
                      name="aadhaarNumber"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Enter 12-digit Aadhaar"
                      maxLength="12"
                      pattern="\d{12}"
                      required
                      value={aadhaar}
                      onChange={(e) => setAadhaar(e.target.value)}
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <i className="fas fa-id-card medical-icon"></i>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <i className="fas fa-shield-alt mr-1 text-blue-500"></i> We'll send an OTP to your registered mobile number
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consentCheckbox"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                  </div>
                  <label htmlFor="consentCheckbox" className="ml-3 block text-sm text-gray-700">
                    I consent to verify my Aadhaar details for secure authentication
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={sendLoading}
                  className="w-full btn-primary text-white py-3 px-4 font-medium flex items-center justify-center"
                >
                  {sendLoading ? (
                    <>
                      <span className="hidden">Continue with Aadhaar</span>
                      <i className="fas fa-spinner fa-spin ml-2"></i>
                    </>
                  ) : (
                    <span>Continue with Aadhaar</span>
                  )}
                </button>
              </form>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                    Register here
                  </a>
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <i className="fab fa-google"></i>
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <i className="fab fa-apple"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OTP Verification Step */}
          {step === 'otp' && (
            <div id="otpStep" className="p-8">
              <div className="text-center mb-8">
                <i class="fas fa-hospital text-2xl m-auto"></i>
                {/* <img
                  src="https://img.icons8.com/fluency/96/hospital-3.png"
                  alt="Hospital Logo"
                  className="hospital-logo mx-auto"
                /> */}
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Secure Verification</h1>
                <p className="text-gray-600 mt-2">Enter the 6-digit OTP sent to your mobile</p>
                <p className="text-sm text-gray-500 mt-3 flex items-center justify-center">
                  <i className="fas fa-mobile-alt mr-2 text-blue-500"></i> Linked to Aadhaar ending with{' '}
                  <span className="font-semibold ml-1">{aadhaarLast4}</span>
                </p>
              </div>
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="otp-input border border-gray-300 mx-1 text-center"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <input type="hidden" name="otp" value={otp.join('')} />
                <div className="text-center mt-4">
                  <div className="relative inline-block">
                    <svg className="countdown-svg" width="120" height="120">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="countdown-path"
                        style={{ stroke: '#3b82f6', strokeWidth: '8', fill: 'none' }}
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span id="countdown">{countdownValue}</span>s
                    </div>
                  </div>
                  {countdownValue === 0 && (
                    <a
                      href="#"
                      onClick={handleResendOtp}
                      className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block"
                    >
                      Resend OTP
                    </a>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={verifyLoading}
                  className="w-full btn-primary text-white py-3 px-4 font-medium flex items-center justify-center"
                >
                  {verifyLoading ? (
                    <>
                      <span className="hidden">Verify & Continue</span>
                      <i className="fas fa-spinner fa-spin ml-2"></i>
                    </>
                  ) : (
                    <span>Verify & Continue</span>
                  )}
                </button>
              </form>
              <div className="mt-6 text-center">
                <button onClick={handleBackToAadhaar} className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto">
                  <i className="fas fa-arrow-left mr-2"></i> Back to Aadhaar Entry
                </button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div id="successStep" className="p-8 text-center">
              <div className="mb-8">
                <div className="success-circle w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-check text-white text-4xl"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Verification Successful!</h2>
                <p className="text-gray-600 mt-3">Welcome to your personalized healthcare portal</p>
                <div className="mt-8 flex justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  <i className="fas fa-lock text-green-500 mr-1"></i> Your session is securely encrypted
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default PatientLogin;
