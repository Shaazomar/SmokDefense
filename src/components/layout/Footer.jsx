import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', paddingBottom: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Brand */}
        <div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Flame size={28} color="#E8761A" strokeWidth={2.5} />
            <span style={{ fontWeight: 800, fontSize: '20px' }}>SmokDefense</span>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '14px', lineHeight: 1.8 }}>
            Protecting Lives. Controlling Smoke. Delivering Peace of Mind. Your Total Fire & Smoke Management Partner across Pan India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '18px', marginBottom: '24px' }}>Quick Links</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', transition: 'color 0.2s' }}>About Us</Link></li>
            <li><Link to="/services" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', transition: 'color 0.2s' }}>Services</Link></li>
            <li><Link to="/products" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', transition: 'color 0.2s' }}>Products</Link></li>
            <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', transition: 'color 0.2s' }}>Contact & Booking</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: '18px', marginBottom: '24px' }}>Our Services</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Smoke Control Systems</li>
            <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>CFD & Modelling</li>
            <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Clean Room Systems</li>
            <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Active Fire Protection</li>
            <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Passive Fire Protection</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '18px', marginBottom: '24px' }}>Contact Us</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <MapPin size={20} color="#E8761A" style={{ flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>163 C, Technologics Global, 3rd Cross Rd, near Mantralaya Apartments,<br/>3rd Phase, J. P. Nagar, Bengaluru, Karnataka 560078<br/>Pan India Services</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={20} color="#E8761A" style={{ flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>+91 9035544406</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={20} color="#E8761A" style={{ flexShrink: 0 }} />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>info@smokdefense.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', paddingTop: '40px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} SmokDefense. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Privacy Policy</Link>
          <Link to="/glossary" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Technical Glossary</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
