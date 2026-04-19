import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Award, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div style={{ backgroundColor: 'var(--light-bg)', paddingBottom: '80px' }}>
      {/* Header */}
      <section style={{ backgroundColor: 'var(--deep-dark)', color: 'var(--white)', padding: '120px 0 80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '56px', marginBottom: '24px', color: 'var(--primary-orange)' }}
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}
          >
            SmokDefense is a fire and smoke management systems company based in Mangalore, Karnataka, providing end-to-end solutions across Pan India.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-md)' }}>
              <Target size={40} color="var(--primary-orange)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Our Mission</h3>
              <p style={{ color: 'var(--body-grey)' }}>
                To be a leader in customer service excellence — supporting our customers with quality, punctual service delivered in a courteous and professional manner.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--white)', padding: '40px', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-md)' }}>
              <Eye size={40} color="var(--primary-orange)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Our Vision</h3>
              <p style={{ color: 'var(--body-grey)' }}>
                To provide automation and control system services that are competitively priced, promoting Environmental Green Automation initiatives focused on technological outsourcing.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', padding: '60px', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-md)', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '32px' }}>Our Strength & Quality Policy</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              <div>
                <h4 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-orange)' }}><Shield size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Core Strengths</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--body-grey)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li>Solutions backed by our own well-trained technical team.</li>
                  <li>Wide network of international professionals and suppliers.</li>
                  <li>Every solution is custom-designed based on specific needs.</li>
                  <li>Future-focused — designed for today and tomorrow.</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--primary-orange)' }}><Award size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> Quality Commitment</h4>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--body-grey)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li>Total commitment towards customer satisfaction.</li>
                  <li>Strive for quality excellence in all offered solutions.</li>
                  <li>Offer timely and cost-effective solutions.</li>
                  <li>Constant up-gradation of skills and technologies.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Grid Layout for Specialisations and Approach */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '40px', backgroundColor: 'var(--deep-dark)', color: 'var(--white)', borderRadius: 'var(--border-radius-md)' }}>
              <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Our Specialisations</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>System integration, training, and strategic outsourcing</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Industrial Automation (PLC, SCADA)</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Building Management Systems (BMS)</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>HVAC Controls</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Smoke Ventilation & Fire Safety Systems</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Clean Room Environmental Monitoring</li>
                <li style={{ paddingBottom: '12px' }}>CFD & Computational Smoke Modelling</li>
              </ul>
            </div>
            
            <div style={{ padding: '40px', backgroundColor: 'var(--white)', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '28px', marginBottom: '24px', color: 'var(--deep-dark)' }}>Location & Coverage</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Globe size={32} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h5 style={{ fontSize: '18px', fontWeight: 700 }}>Head Office</h5>
                    <p style={{ color: 'var(--body-grey)' }}>Mangalore, Karnataka, India</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Users size={32} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h5 style={{ fontSize: '18px', fontWeight: 700 }}>Service Coverage</h5>
                    <p style={{ color: 'var(--body-grey)' }}>Pan India — all major states and union territories</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Award size={32} color="var(--primary-orange)" style={{ flexShrink: 0 }} />
                  <div>
                    <h5 style={{ fontSize: '18px', fontWeight: 700 }}>International Focus</h5>
                    <p style={{ color: 'var(--body-grey)' }}>Middle East and Indian Subcontinent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
