const Contact = () => {
    return (
        <>
            <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title text-center">Contact Us</h2>
                <p className="section-subtitle text-center">Get in touch with our team for any inquiries or assistance</p>
                
                <div className="contact-container">
                    <form className="contact-form">
                        <div className="form-group">
                            <label htmlFor="contact-name">Your Name</label>
                            <input type="text" id="contact-name" className="form-control" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-email">Email Address</label>
                            <input type="email" id="contact-email" className="form-control" placeholder="your@email.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-subject">Subject</label>
                            <input type="text" id="contact-subject" className="form-control" placeholder="What's your question about?" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" className="form-control" rows="5" placeholder="Your message..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                    
                    <div className="contact-info">
                        <h3>Hospital Information</h3>
                        
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="info-content">
                                <h4>Address</h4>
                                <p>123 Medical Plaza, Downtown,<br /> New York, NY 10001, USA</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="info-content">
                                <h4>Phone</h4>
                                <p>+1 (212) 555-1234 (General)<br /> +1 (212) 555-5678 (Emergency)</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="info-content">
                                <h4>Email</h4>
                                <p>info@medicareconnect.com<br /> support@medicareconnect.com</p>
                            </div>
                        </div>
                        
                        <div className="info-item">
                            <div className="info-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="info-content">
                                <h4>Working Hours</h4>
                                <p>Monday - Friday: 8:00 AM - 8:00 PM<br /> Saturday: 9:00 AM - 5:00 PM<br /> Sunday: Emergency Only</p>
                            </div>
                        </div>
                        
                        <div className="contact-social">
                            <h4>Follow Us</h4>
                            <div className="social-links">
                                <a href="#" title="temp" className="social-link social-facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" title="temp" className="social-link social-twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" title="temp" className="social-link social-youtube"><i className="fab fa-youtube"></i></a>
                                <a href="#" title="temp" className="social-link social-instagram"><i className="fab fa-instagram"></i></a>
                                <a href="#" title="temp" className="social-link social-linkedin"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default Contact;