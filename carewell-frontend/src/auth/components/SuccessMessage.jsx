const SuccessMessage = ({isSuccessMessageVisible, setIsSuccessMessageVisible}) => {
    return (
        <div id="success-message" className={`${isSuccessMessageVisible ? "" : "hidden"} text-center fade-in`}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Reset Link Sent!</h3>
            <p className="text-gray-600 mb-6">We've sent a password reset link to your email address. Please check your inbox.</p>
            <button type="button" onClick={() => setIsSuccessMessageVisible(false)}  
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300">
                Back to Login
            </button>
        </div>
    );
};

export default SuccessMessage;