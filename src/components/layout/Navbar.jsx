import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        boxShadow: isScrolled ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
        padding: isScrolled ? '1rem 5%' : '1.5rem 5%',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 60 }}>
          <Flame size={32} color="#E8761A" strokeWidth={2.5} />
          <span style={{ 
            fontFamily: 'Inter, sans-serif', 
            fontWeight: 800, 
            fontSize: '24px', 
            color: isScrolled || isMobileMenuOpen ? '#FFFFFF' : (location.pathname === '/' ? '#FFFFFF' : '#1A1A1A') 
          }}>
            SmokDefense
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
          <ul style={{ display: 'flex', gap: '24px' }}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  style={{
                    color: isScrolled || location.pathname === '/' ? 'rgba(255,255,255,0.8)' : '#555555',
                    fontWeight: 600,
                    fontSize: '15px',
                    transition: 'color 0.2s',
                    borderBottom: location.pathname === link.path ? '2px solid #E8761A' : 'none',
                    paddingBottom: '4px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#E8761A'}
                  onMouseLeave={(e) => e.target.style.color = isScrolled || location.pathname === '/' ? 'rgba(255,255,255,0.8)' : '#555555'}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ zIndex: 60, cursor: 'pointer', display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <X size={28} color="#FFFFFF" />
          ) : (
            <Menu size={28} color={isScrolled || location.pathname === '/' ? '#FFFFFF' : '#1A1A1A'} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: '#1A1A1A',
              paddingTop: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              overflow: 'hidden'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    style={{
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '24px',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn btn-primary">
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
