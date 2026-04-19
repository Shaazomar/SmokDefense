import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Settings, Wind, FileBarChart, Microscope, Wrench, CheckCircle, ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const Home = () => {
  return (
    <div style={{ backgroundColor: 'var(--white)' }}>
      {/* BEAUTIFUL HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--deep-dark)',
        color: 'var(--white)',
        padding: '120px 5% 80px',
        overflow: 'hidden'
      }}>
        {/* Cinematic Background Image & Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url(/images/image_active_fire_1776602431065.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.2,
          mixBlendMode: 'luminosity'
        }} className="hero-bg" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, transparent 0%, var(--deep-dark) 100%)',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '40vh',
          background: 'linear-gradient(to bottom, var(--deep-dark) 0%, transparent 100%)',
          zIndex: 1
        }} />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >

          <motion.h1 variants={fadeInUp} style={{ 
            fontSize: 'clamp(44px, 8vw, 96px)', 
            fontWeight: 800, 
            lineHeight: 1.05,
            marginBottom: '32px',
            letterSpacing: '-2px',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)'
          }}>
             Protecting Lives. <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, var(--primary-orange) 0%, #FFB075 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>Controlling Smoke.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} style={{ 
            fontSize: 'clamp(18px, 2.5vw, 24px)', 
            fontWeight: 400, 
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '800px',
            marginBottom: '48px',
            lineHeight: 1.5
          }}>
            Delivering Peace of Mind.<br />
            <span style={{ fontSize: '18px', opacity: 0.8, marginTop: '16px', display: 'block' }}>
              We architect and install life-critical Active Fire, Passive Fire, and Smoke Ventilation systems across Pan India.
            </span>
          </motion.p>
          
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="hero-btn-primary" style={{
               padding: '18px 40px', 
               fontSize: '18px',
               fontWeight: 600,
               backgroundColor: 'var(--primary-orange)',
               color: 'var(--white)',
               borderRadius: 'var(--border-radius-pill)',
               display: 'flex',
               alignItems: 'center',
               gap: '12px',
               transition: 'all 0.3s ease',
               boxShadow: '0 10px 25px rgba(232, 118, 26, 0.4)',
               width: '100%',
               maxWidth: '300px',
               justifyContent: 'center'
            }}>
              Consult With Experts <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <section style={{ backgroundColor: 'var(--deep-dark)', color: 'var(--white)', padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {[
              { num: '01', title: 'Pan India Coverage', desc: 'Services delivered across all major Indian states' },
              { num: '02', title: 'Multiple Sectors', desc: 'Residential · Commercial · Industrial · Healthcare' },
              { num: '03', title: 'Full Lifecycle', desc: 'Design → Install → Maintain → Certify' },
              { num: '04', title: 'Technical Expertise', desc: 'PLC · BMS · HVAC · SCADA · Smoke Vent' }
            ].map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '24px', marginBottom: '8px' }}>{stat.num}</span>
                <span style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{stat.title}</span>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--deep-dark)', marginBottom: '16px' }}>Our Services</h2>
            <p style={{ color: 'var(--body-grey)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive safety solutions engineered to protect your assets and people.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[
              { icon: <Shield size={40} />, title: 'Active Fire', desc: 'Extinguishers, alarms, sprinklers and suppression running 24/7.', img: '/images/image_active_fire_1776602431065.png' },
              { icon: <Settings size={40} />, title: 'Passive Protection', desc: 'Fire doors, dampers, and fire stopping acting as silent barriers.', img: '/images/image_passive_fire_1776602447129.png' },
              { icon: <Wind size={40} />, title: 'Smoke Control', desc: 'FSCS panels and fan/damper management for critical extraction.', img: '/images/image_smoke_panel_1776602463560.png' },
              { icon: <FileBarChart size={40} />, title: 'CFD Modelling', desc: 'Advanced smoke tracking simulation before a brick is laid.', img: '/images/image_cfd_model_1776602481280.png' },
              { icon: <Microscope size={40} />, title: 'Clean Room Systems', desc: 'EMS monitoring for pharma and precision laboratories.', img: '/images/image_clean_room_1776602497882.png' },
              { icon: <Wrench size={40} />, title: 'Maintenance', desc: 'Inspections, testing, balancing, and regulatory sign-offs.', img: '/images/image_maintenance_1776602512508.png' }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--border-radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                  height: '400px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.2) 100%), url(${service.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 1
                }} className="service-bg-img" />
                
                <div style={{ position: 'relative', zIndex: 2, padding: '30px', color: 'var(--white)' }}>
                  <div style={{ color: 'var(--primary-orange)', marginBottom: '16px' }}>{service.icon}</div>
                  <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>{service.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontSize: '15px' }}>{service.desc}</p>
                  <Link 
                    to="/services" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      padding: '10px 20px', 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      backdropFilter: 'blur(10px)',
                      borderRadius: 'var(--border-radius-pill)',
                      color: 'var(--white)', 
                      fontWeight: 600,
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                    className="service-link"
                  >
                    Learn More <span>→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-dark">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--white)', marginBottom: '16px' }}>Industries We Serve</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', maxWidth: '600px' }}>
                Tailored solutions for every environment where safety is critical.
              </p>
            </div>
            <Link to="/contact" className="btn btn-outline-white">Consult With Us</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { name: 'High-Rise Residential', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop' },
              { name: 'Commercial Offices', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop' },
              { name: 'Healthcare & Hospitals', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop' },
              { name: 'Clean Rooms & Pharma', img: '/images/image_clean_room_1776602497882.png' },
              { name: 'Industrial & Warehouses', img: '/images/image_warehouse_1776602527449.png' },
              { name: 'Data Centres', img: '/images/image_datacenter_1776602542119.png' },
              { name: 'Car Parks', img: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?q=80&w=600&auto=format&fit=crop' },
              { name: 'Public Sector', img: '/images/image_public_sector_1776603419378.png' }
            ].map((industry, i) => (
              <div key={i} style={{ position: 'relative', height: '200px', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', inset: 0, 
                  background: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1)), url(${industry.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease'
                }} className="industry-img" />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                  <h4 style={{ color: 'var(--white)', fontSize: '18px', fontWeight: 600 }}>{industry.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <img src="/images/image_maintenance_1776602512508.png" alt="Engineer checking panel" style={{ width: '100%', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--deep-dark)', marginBottom: '24px' }}>Why Choose <span style={{ color: 'var(--primary-orange)' }}>SmokDefense?</span></h2>
            <p style={{ color: 'var(--body-grey)', fontSize: '18px', marginBottom: '32px' }}>
              We bring technical excellence and deep industry knowledge to ensure your building meets the highest safety standards.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Pan India service reach — we come to you, wherever you are.',
                'Specialists in both active and passive fire protection under one roof.',
                'CFD modelling and computational smoke analysis — rare in India.',
                'Clean room EMS expertise for pharmaceutical and biotech industries.',
                'Backed by international professionals and supplier networks.',
                'Every solution is custom-designed — not off-the-shelf.'
              ].map((point, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <CheckCircle size={24} color="var(--primary-orange)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--deep-dark)', fontSize: '16px', fontWeight: 500, minWidth: 0, flex: 1 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ backgroundColor: 'var(--primary-orange)', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--white)', marginBottom: '16px' }}>Ready to Make Your Building Safer?</h2>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', maxWidth: '800px', margin: '0 auto 40px auto' }}>
            Our team of specialists is ready to assess, design and deliver your fire and smoke management solution — anywhere in India.
          </p>
          <Link to="/contact" className="btn" style={{ backgroundColor: 'var(--white)', color: 'var(--primary-orange)', padding: '18px 48px', fontSize: '20px' }}>
            Book a Free Site Survey
          </Link>
        </div>
      </section>
      
      <style>{`
        .service-link:hover {
          background-color: var(--primary-orange) !important;
          border-color: var(--primary-orange) !important;
        }
        .hero-btn-primary:hover {
          background-color: var(--accent-orange) !important;
          transform: translateY(-2px);
        }
        .hero-btn-outline:hover {
          background-color: rgba(255,255,255,0.15) !important;
          transform: translateY(-2px);
        }
        .service-bg-img {
          transition: transform 0.5s ease;
        }
        div:hover > .service-bg-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Home;
