const About = () => {
    return (
        <>
            <section id="about" className="features">
                <div className="container">
                    <h2 className="section-title text-center">Advanced Hospital Management</h2>
                    <p className="section-subtitle text-center">Our integrated system streamlines all aspects of hospital operations</p>
                    
                    <div className="features-container">
                        <div className="features-image">
                            <img src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2079&q=80" alt="Hospital Management Dashboard" />
                        </div>
                        
                        <div className="features-list">
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="fas fa-calendar-check"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Appointment Scheduling</h3>
                                    <p>Efficient online booking system that reduces wait times and improves patient experience.</p>
                                </div>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="fas fa-file-medical-alt"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Electronic Health Records</h3>
                                    <p>Secure, centralized digital records accessible to authorized staff for better coordinated care.</p>
                                </div>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="fas fa-pills"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Pharmacy Management</h3>
                                    <p>Automated inventory tracking and prescription processing for medication safety.</p>
                                </div>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-icon">
                                    <i className="fas fa-chart-line"></i>
                                </div>
                                <div className="feature-content">
                                    <h3>Analytics Dashboard</h3>
                                    <p>Real-time data visualization to support decision making and operational efficiency.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;   