import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div style={{ backgroundColor: 'var(--light-bg)', paddingBottom: '80px' }}>
      <section style={{ backgroundColor: 'var(--deep-dark)', color: 'var(--white)', padding: '120px 0 80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '56px', marginBottom: '24px', color: 'var(--primary-orange)' }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}
          >
            We're Ready to Help. Whether you need a site survey, a quote, or just want to understand what system is right for your building.
          </motion.p>
        </div>
      </section>

      <section className="container" style={{ marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div className="contact-grid">
          
          {/* Contact Details */}
          <div style={{ backgroundColor: 'var(--primary-orange)', color: 'var(--white)', padding: '60px 40px', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '32px', marginBottom: '32px' }}>Contact Information</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <li style={{ display: 'flex', gap: '20px' }}>
                <MapPin size={28} />
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Location</h5>
                  <p style={{ opacity: 0.9 }}>Mangalore, Karnataka, India<br/>Service Coverage: Pan India</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '20px' }}>
                <Phone size={28} />
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Phone</h5>
                  <p style={{ opacity: 0.9 }}>+91 99999 99999</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '20px' }}>
                <Mail size={28} />
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Email</h5>
                  <p style={{ opacity: 0.9 }}>info@smokdefense.com</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '20px' }}>
                <Clock size={28} />
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>Response Time</h5>
                  <p style={{ opacity: 0.9 }}>We respond to all enquiries within 24 hours.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div style={{ backgroundColor: 'var(--white)', padding: '60px 40px', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
            <h3 style={{ fontSize: '32px', marginBottom: '32px', color: 'var(--deep-dark)' }}>Send a Message</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="form-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Full Name *</label>
                  <input type="text" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Company / Org</label>
                  <input type="text" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)' }} />
                </div>
              </div>
              <div className="form-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Email Address *</label>
                  <input type="email" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Phone Number *</label>
                  <input type="tel" style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Service Required</label>
                <select style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)', backgroundColor: 'var(--white)' }}>
                  <option>Active Fire Protection</option>
                  <option>Passive Fire Protection</option>
                  <option>Smoke Control Systems</option>
                  <option>CFD Modelling</option>
                  <option>Clean Room Systems</option>
                  <option>Maintenance / Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--body-grey)' }}>Message *</label>
                <textarea rows={4} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--mid-grey)' }}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }}>Submit Enquiry</button>
            </form>
          </div>
          
        </div>
      </section>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .contact-grid > div {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
