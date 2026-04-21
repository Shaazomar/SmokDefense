import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const categories = [
    {
      id: 'smoke',
      title: 'Smoke Control Systems',
      desc: "SmokDefense's core technical specialisation. We design, commission and install.",
      img: '/images/image_smoke_panel_1776602463560.png',
      items: [
        { name: 'FSCS', desc: 'Firefighters Smoke Control Station — design, supply and installation' },
        { name: 'Bespoke Panels', desc: 'Smoke Extract Control Panels — custom-built to client specs' },
        { name: 'Fan Control', desc: 'H.O.A. (Hand, Off, Auto) three-position control' },
        { name: 'Indication Systems', desc: 'LED colour-coded status (White/Red/Green/Amber)' }
      ]
    },
    {
      id: 'cfd',
      title: 'CFD & Computational Modelling',
      desc: 'Advanced fire engineering and computational modelling services.',
      img: '/images/image_cfd_model_1776602481280.png',
      items: [
        { name: 'CFD Smoke Modelling', desc: '3D simulation showing smoke layer height, visibility and vent efficiency.' },
        { name: 'CHD Modelling', desc: 'Heat and smoke dynamics modelling for complex geometries.' },
        { name: 'Site Survey & Testing', desc: 'On-site assessment, airflow testing, and system balancing.' },
        { name: 'Regulatory Support', desc: 'Reports prepared to BS 7974 and BS EN 12101.' }
      ]
    },
    {
      id: 'ems',
      title: 'Clean Room Systems (EMS)',
      desc: 'Specialist monitoring solutions for pharmaceutical and biotech clean rooms.',
      img: '/images/image_clean_room_1776602497882.png',
      items: [
        { name: 'Parameters Monitored', desc: 'RH · Temperature · Differential Pressure · CO₂' },
        { name: 'Data Logging', desc: '21 CFR Part 11 compliant software with real-time trends.' },
        { name: 'Wireless Systems', desc: 'Ultra-low power wireless transmitters with SCADA integration.' },
        { name: 'Door Interlocking', desc: 'Personnel access control systems for classified areas.' }
      ]
    },
    {
      id: 'active',
      title: 'Active Fire Protection',
      desc: 'Live, operational fire-fighting and suppression systems that activate during a fire event.',
      img: '/images/image_active_fire_1776602431065.png',
      items: [
        { name: 'Fire Extinguishers', desc: 'Portable and fixed suppression devices for immediate fire response.' },
        { name: 'Fire Alarms', desc: 'Detection and early-warning alert systems (conventional, addressable).' },
        { name: 'Sprinkler Systems', desc: 'Automatic water-based fire suppression systems.' },
        { name: 'Suppression Systems', desc: 'Gaseous or chemical suppression for server rooms, data centres.' },
        { name: 'Emergency Lighting', desc: 'Maintained and non-maintained luminaires for safe evacuation.' },
        { name: 'Smoke Ventilation', desc: 'Mechanical and natural systems to extract smoke.' }
      ]
    },
    {
      id: 'passive',
      title: 'Passive Fire Protection',
      desc: 'Structural and architectural fire barriers that require no mechanical action.',
      img: '/images/image_passive_fire_1776602447129.png',
      items: [
        { name: 'Fire Doors', desc: 'Fire-rated doors that compartmentalise fire and smoke spread.' },
        { name: 'Wayfinding', desc: 'Photoluminescent and illuminated signage.' },
        { name: 'Dampers', desc: 'Mechanical barriers installed in ductwork to prevent smoke spread.' },
        { name: 'Fire Stopping', desc: 'Sealing of all service penetrations to maintain compartmentation.' },
        { name: 'Fire Rated Glass', desc: 'Specialist glazing that resists fire and smoke spread.' }
      ]
    }
  ];

  return (
    <div>
      <section style={{ backgroundColor: 'var(--deep-dark)', color: 'var(--white)', padding: '120px 0 80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(40px, 8vw, 56px)', marginBottom: '24px', color: 'var(--primary-orange)' }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}
          >
            Comprehensive safety solutions ranging from Active Protection to complex Computational Fluid Dynamics. We install, commission, and maintain.
          </motion.p>
        </div>
      </section>

      {categories.map((cat, index) => (
        <section key={cat.id} id={cat.id} style={{ 
          padding: '80px 0', 
          backgroundColor: index % 2 === 0 ? 'var(--light-bg)' : 'var(--white)'
        }}>
          <div className="container">
            <div className="service-layout" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '60px',
              alignItems: 'start'
            }}>
              
              {/* Image side - explicitly reversing order for CSS grid based on index via class / style logic if needed, but we can do it via purely standard mobile flow */}
              <div style={{ position: 'relative', gridRow: index % 2 === 0 ? '1' : '1', order: index % 2 === 0 ? 1 : 2 }}>
                  {/* Decorative background box */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '20px',
                    left: index % 2 === 0 ? '-20px' : '20px',
                    right: index % 2 === 0 ? '20px' : '-20px',
                    bottom: '-20px',
                    backgroundColor: 'var(--primary-orange)', 
                    borderRadius: 'var(--border-radius-lg)',
                    zIndex: 0 
                  }} className="decor-box" />
                  <img src={cat.img} alt={cat.title} style={{ 
                    width: '100%', 
                    height: 'auto',
                    minHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: 'var(--border-radius-lg)', 
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                    zIndex: 1
                  }} />
              </div>

              {/* Text Side */}
              <div style={{ order: index % 2 === 0 ? 2 : 1 }}>
                <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '18px' }}>0{index + 1}.</span>
                <h2 style={{ fontSize: 'clamp(28px, 6vw, 40px)', color: 'var(--deep-dark)', marginBottom: '20px' }}>{cat.title}</h2>
                <p style={{ fontSize: '18px', color: 'var(--body-grey)', marginBottom: '40px' }}>{cat.desc}</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {cat.items.map((item, i) => (
                    <div key={i} style={{ 
                      backgroundColor: index % 2 === 0 ? 'var(--white)' : 'var(--light-bg)',
                      padding: '20px', 
                      borderRadius: 'var(--border-radius-sm)',
                      borderLeft: '4px solid var(--primary-orange)',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <h4 style={{ fontSize: '16px', marginBottom: '8px', color: 'var(--deep-dark)' }}>{item.name}</h4>
                      <p style={{ color: 'var(--body-grey)', fontSize: '14px', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      
      <style>{`
        @media (max-width: 900px) {
          .service-layout > div {
             order: unset !important;
          }
          .decor-box {
            top: 10px !important; bottom: -10px !important; left: 10px !important; right: -10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Services;
