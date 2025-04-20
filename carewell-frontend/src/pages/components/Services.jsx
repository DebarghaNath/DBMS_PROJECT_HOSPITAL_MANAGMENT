const Services = () => {
    return (
        <>
            <section id="services" className="services">
                <div className="container">
                    <h2 className="section-title text-center">Our Services</h2>
                    <p className="section-subtitle text-center">We provide a wide range of medical services to meet all your healthcare needs</p>
                    
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-heartbeat"></i>
                            </div>
                            <h3 className="service-title">Cardiology</h3>
                            <p className="service-description">Advanced cardiac care with cutting-edge technology and experienced cardiologists.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-brain"></i>
                            </div>
                            <h3 className="service-title">Neurology</h3>
                            <p className="service-description">Comprehensive neurological services for disorders of the brain and nervous system.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-bone"></i>
                            </div>
                            <h3 className="service-title">Orthopedics</h3>
                            <p className="service-description">Specialized care for bones, joints, ligaments, tendons, and muscles.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-baby"></i>
                            </div>
                            <h3 className="service-title">Pediatrics</h3>
                            <p className="service-description">Compassionate care for infants, children and adolescents.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-eye"></i>
                            </div>
                            <h3 className="service-title">Ophthalmology</h3>
                            <p className="service-description">Advanced eye care including laser treatments and cataract surgery.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <i className="fas fa-ambulance"></i>
                            </div>
                            <h3 className="service-title">Emergency Care</h3>
                            <p className="service-description">24/7 emergency services with rapid response times and critical care.</p>
                            <a href="/" className="service-link">Learn More <i className="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;    