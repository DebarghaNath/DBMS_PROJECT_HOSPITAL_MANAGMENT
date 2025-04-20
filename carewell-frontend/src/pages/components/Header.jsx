import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({isOpen, toggleMenu}) => {
    const navigate = useNavigate();
    useEffect(() => {
        const anchors = document.querySelectorAll('a[href^="#"]');
        const handleSmoothScroll = (e) => {
            e.preventDefault();
            const target = document.querySelector(e.currentTarget.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            } 
        };

        anchors.forEach((anchor) => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        // Cleanup event listeners on component unmount
        return () => {
            anchors.forEach((anchor) => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, []);

    return (
        <>
            <header>
                <div className="container header-container">
                    <a href="/" className="logo">
                        <i className="fas fa-hospital"></i>
                        <span>Care</span>Well 
                    </a>

                    <nav className={`nav-links ${isOpen ? 'flex' : 'hidden'} flex-col md:flex md:flex-row`}>
                        <a href="#" className="active">Home</a>
                        <a href="#services">Services</a>
                        <a href="#doctors">Doctors</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>
                    </nav>
                    
                    <div className="header-actions">
                        <button className="btn btn-primary">Patient Login</button>
                        <button 
                            onClick={() => {
                                navigate('/staff-login', {replace: true});
                            }} 
                            className="btn btn-primary"
                        >Staff Login</button>
                        <button className="mobile-menu-btn" onClick={toggleMenu}>
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header; 