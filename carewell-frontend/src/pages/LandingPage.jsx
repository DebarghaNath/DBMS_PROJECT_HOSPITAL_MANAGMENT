import { useEffect, useState } from 'react';
import './LandingPage.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Stats from './components/Stats';
import Services from './components/Services';
import Appointment from './components/Appointment';
import Doctors from './components/Doctors';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Map from './components/Map';
import Footer from './components/Footer';

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };


  return (
    <>
        <Header 
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        />

        <HeroSection />

        <Stats />

        <Services />

        <Appointment />

        <Doctors />

        <About />

        <Testimonials />

        <Contact />
    
        <Map />

        <Footer />
    </>        
  );
};

export default LandingPage;
