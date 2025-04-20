const LoginForm = (
    {
        isForgotPassword, 
        isSuccessMessageVisible, 
        selectedRole, 
        setSelectedRole, 
        roleError, email, 
        setEmail, 
        emailError, 
        password, 
        setPassword, 
        passwordVisible, 
        togglePassword, 
        passwordError, 
        showForgotPassword, 
        validateLogin
    }
) => {
    return (
        <div id="login-form" className={`fade-in ${isForgotPassword||isSuccessMessageVisible ? "hidden" : ""}`}>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Staff Login</h2>
            <p className="text-gray-600 mb-8">Please select your role and enter your credentials</p>

            <div className="mb-8">
                <label className="block text-gray-700 mb-3">Select Your Role</label>
                <div className="grid grid-cols-2 gap-4">
                    {['fdo', 'deo', 'doctor', 'admin'].map((role) => (
                        <div
                            key={role}
                            className={`role-card p-4 rounded-lg cursor-pointer bg-white shadow-md ${
                                selectedRole === role ? 'selected' : ''
                            }`}
                            onClick={() => setSelectedRole(role)}
                        >
                            <div className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                                        role === 'fdo'
                                            ? 'bg-blue-100'
                                            : role === 'deo'
                                            ? 'bg-green-100'
                                            : role === 'doctor'
                                            ? 'bg-purple-100'
                                            : 'bg-red-100'
                                    }`}
                                >
                                    <i
                                        className={`fas ${
                                            role === 'fdo'
                                                ? 'fa-user-tie text-blue-600'
                                                : role === 'deo'
                                                ? 'fa-keyboard text-green-600'
                                                : role === 'doctor'
                                                ? 'fa-user-md text-purple-600'
                                                : 'fa-shield-alt text-red-600'
                                        }`}
                                    ></i>
                                </div>
                                <span className="font-medium">
                                    {role === 'fdo'
                                        ? 'Front Desk'
                                        : role === 'deo'
                                        ? 'Data Entry'
                                        : role === 'doctor'
                                        ? 'Doctor'
                                        : 'Admin'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                {roleError && <div className="error-message mt-2">Please select your role</div>}
            </div>

            <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                <div className="input-group flex items-center border border-gray-300 rounded-lg overflow-hidden transition-all">
                    <i className="fas fa-envelope px-4 text-gray-500"></i>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full py-3 px-2 border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none" 
                        placeholder="your@email.com" 
                    />
                </div>
                {emailError && <div className="error-message">Please enter a valid email address</div>}
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <div className="input-group flex items-center border border-gray-300 rounded-lg overflow-hidden transition-all">
                    <i className="fas fa-lock px-4 text-gray-500"></i>
                    <input
                        type={passwordVisible ? 'text' : 'password'} // Dynamically set input type
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full py-3 px-2 border-none outline-none focus:outline-none focus:ring-0 focus:border-none shadow-none"
                        placeholder="••••••••"
                    />
                    <i 
                        className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} password-toggle px-4`}
                        onClick={togglePassword}
                    ></i>
                </div>
                {passwordError && <div className="error-message">Password must be at least 8 characters</div>}
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <input type="checkbox" id="remember" name="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-gray-600">Remember me</label>
                </div>
                <a href="#" onClick={() => {showForgotPassword()}} className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button onClick={validateLogin} type="button" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-300 mb-4">
                Sign In
            </button>

            <div className="text-center text-gray-600">
                Having trouble? <a href="#" className="text-blue-600 hover:underline">Contact support</a>
            </div>
        </div>
    );
};

export default LoginForm;