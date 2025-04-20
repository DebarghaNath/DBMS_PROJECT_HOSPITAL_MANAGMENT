const Testimonials = () => {
    return (
        <>
            <section className="testimonials">
                <div className="container">
                    <h2 className="section-title text-center">Patient Testimonials</h2>
                    <p className="section-subtitle text-center">Hear what our patients say about their experiences with our hospital</p>
                    
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <span className="date">2 weeks ago</span>
                            </div>
                            <p className="testimonial-text">"The care I received at MediCare was exceptional. The doctors took time to explain my condition and treatment options clearly."</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
                                </div>
                                <div className="author-info">
                                    <h4>Sarah Johnson</h4>
                                    <p>Cardiology Patient</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                                <span className="date">1 month ago</span>
                            </div>
                            <p className="testimonial-text">"Very impressed with the hospital management system. Appointment booking was easy and all my records were available digitally when needed."</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Robert Chen" />
                                </div>
                                <div className="author-info">
                                    <h4>Robert Chen</h4>
                                    <p>Orthopedics Patient</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <div className="testimonial-rating">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <span className="date">3 days ago</span>
                            </div>
                            <p className="testimonial-text">"The pediatric department went above and beyond for my daughter. They made her feel comfortable during her entire treatment."</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Maria Garcia" />
                                </div>
                                <div className="author-info">
                                    <h4>Maria Garcia</h4>
                                    <p>Parent of Pediatric Patient</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;