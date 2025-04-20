const Doctors = () => {
    return (
        <>
            <section id="doctors" className="doctors">
                <div className="container">
                    <h2 className="section-title text-center">Our Specialist Doctors</h2>
                    <p className="section-subtitle text-center">Meet our team of highly qualified and experienced medical professionals</p>
                    
                    <div className="doctors-grid">
                        <div className="doctor-card">
                            <div className="doctor-image">
                                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Dr. Jonathan Smith" />
                            </div>
                            <div className="doctor-info">
                                <h3 className="doctor-name">Dr. Jonathan Smith</h3>
                                <p className="doctor-specialty">Cardiologist</p>
                                <p className="doctor-bio">15 years of experience in interventional cardiology and heart failure management.</p>
                                <div className="doctor-social">
                                    <a href="#" title="temp"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-twitter"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="doctor-card">
                            <div className="doctor-image">
                                <img src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" alt="Dr. Sarah Johnson" />
                            </div>
                            <div className="doctor-info">
                                <h3 className="doctor-name">Dr. Sarah Johnson</h3>
                                <p className="doctor-specialty">Neurologist</p>
                                <p className="doctor-bio">Specialist in stroke prevention, treatment and rehabilitation programs.</p>
                                <div className="doctor-social">
                                    <a href="#" title="temp"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-twitter"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="doctor-card">
                            <div className="doctor-image">
                                <img src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1962&q=80" alt="Dr. Michael Williams" />
                            </div>
                            <div className="doctor-info">
                                <h3 className="doctor-name">Dr. Michael Williams</h3>
                                <p className="doctor-specialty">Orthopedic Surgeon</p>
                                <p className="doctor-bio">Expert in joint replacement and sports medicine rehabilitation.</p>
                                <div className="doctor-social">
                                    <a href="#" title="temp"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-twitter"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="doctor-card">
                            <div className="doctor-image">
                                <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1924&q=80" alt="Dr. Emily Davis" />
                            </div>
                            <div className="doctor-info">
                                <h3 className="doctor-name">Dr. Emily Davis</h3>
                                <p className="doctor-specialty">Pediatrician</p>
                                <p className="doctor-bio">Dedicated to children's health with a gentle approach and modern techniques.</p>
                                <div className="doctor-social">
                                    <a href="#" title="temp"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-twitter"></i></a>
                                    <a href="#" title="temp"><i className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="doctors-more">
                        <button className="btn btn-primary">
                            View All Doctors <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Doctors;