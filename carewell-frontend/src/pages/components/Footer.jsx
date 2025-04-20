const Footer = () => {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="footer-container">
                        <div className="footer-about">
                            <a href="#" className="footer-logo">
                                <span>Medi</span>Care Connect
                            </a>
                            <p>Comprehensive healthcare solutions with a patient-first approach.</p>
                            <div className="footer-social">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        
                        <div className="footer-links">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#services">Services</a></li>
                                <li><a href="#doctors">Doctors</a></li>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#contact">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-links">
                            <h4>Departments</h4>
                            <ul>
                                <li><a href="#">Cardiology</a></li>
                                <li><a href="#">Neurology</a></li>
                                <li><a href="#">Orthopedics</a></li>
                                <li><a href="#">Pediatrics</a></li>
                                <li><a href="#">Emergency</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-newsletter">
                            <h4>Newsletter</h4>
                            <p>Subscribe to our newsletter for the latest updates and health tips.</p>
                            <form className="newsletter-form">
                                <input type="email" className="newsletter-input" placeholder="Your email" />
                                <button type="submit" className="newsletter-button">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p className="copyright">© 2023 MediCare Connect Hospital. All rights reserved.</p>
                        <div className="footer-links-bottom">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
};

export default Footer;