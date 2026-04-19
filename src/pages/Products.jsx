import React from 'react';
import { motion } from 'framer-motion';

const Products = () => {
  const smokePanels = [
    { title: "Smoke Control Panel 1", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1415049701941-GYC5HZJX7231E5UNBG5L/Smoke-Control-Panel-2.jpg" },
    { title: "Graphic Annunciator", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406664259312-CQJHNO575XX52P7XH9VY/Picture+1.png" },
    { title: "Louvre Abu Dhabi Panel", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1467891147086-368WLYJWI9COQYM92E2D/Louvre-Abu-Dhabi---Smoke-Control-Panel-13.1.jpg" },
    { title: "Smoke Purge Layout", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1467837255002-JUHYT3CU1486B68R75HM/Smoke-Control-Annunciator.jpg" },
    { title: "155 North Lake Annunciator", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406665802621-K3GBGIMVM3TPU3TKKNJD/155-North-Lake-Smoke-Ann.jpg" },
    { title: "Panel LEDs Closeup", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406664528621-6Y1JV2UMMPA9TJQSVNFD/LEDs-Closeup.jpg" },
    { title: "Simplex Panel Overview", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406664220647-MC11UR3SU4T6QMRHVC9L/Smoke-Ctrl-Panel-1.jpg" },
    { title: "Simplex Panel Interior", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406665235873-YZ9XZAJWF82ZMY2FHVJS/DSCF0014.jpg" },
    { title: "Exhaust Annunciator", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406664098988-HZ9A7CM85IFF39HKCMTS/Smoke-Exhaust-Ann-1.jpg" },
    { title: "Keyed Switch Module", img: "https://images.squarespace-cdn.com/content/v1/53ca9e5ce4b0bcaba3c714ac/1406664294740-NTABRDGOEB1J6P2NRFWR/Fire-Fighters-Smoke-Panel.jpg" }
  ];

  const bespokePanels = [
    { title: "Bespoke Panel (Inside)", img: "https://www.sarumelectronics.co.uk/wp-content/uploads/2016/01/sMOKE-EXTRACT-INSIDE-NUMBERED.jpg" },
    { title: "Bespoke Panel (Outside)", img: "https://www.sarumelectronics.co.uk/wp-content/uploads/2016/01/sMOKE-EXTRACT-OUTSIDE-NUMBERED-208x300.jpg" }
  ];

  const emsInstruments = [
    { title: "EMS System Rack", img: "https://www.polmon.com/wp-content/uploads/2022/10/EMS-1.jpg" },
    { title: "Clean Room Monitor (CRM)", img: "https://www.polmon.com/wp-content/uploads/2023/01/crm-t1.jpg" },
    { title: "RHT74 Time-Sync Monitor", img: "https://www.polmon.com/wp-content/uploads/2022/12/RHT74.jpg" },
    { title: "RHT76 Room Process Monitor", img: "https://www.polmon.com/wp-content/uploads/2022/12/RHT76.jpg" },
    { title: "DPI38I-F FLP Monitor", img: "https://www.polmon.com/wp-content/uploads/2022/12/DPI38IF-1.jpg" },
    { title: "DPI-37I DP Monitor", img: "https://www.polmon.com/wp-content/uploads/2022/12/DPI37I-1.jpg" },
    { title: "RHT-71I RH Temp Indicator", img: "https://www.polmon.com/wp-content/uploads/2022/12/RHT71I-1.jpg" },
    { title: "TET-91I Temp Indicator", img: "https://www.polmon.com/wp-content/uploads/2022/12/TET-91I-1.jpg" },
    { title: "DPT-54I DP Temp Indicator", img: "https://www.polmon.com/wp-content/uploads/2022/12/DPT-54I-1.jpg" },
    { title: "DPT52I-F DP Transmitter", img: "https://www.polmon.com/wp-content/uploads/2022/12/DPT52I-F-1.jpg" },
    { title: "DPT-52 DP Transmitter", img: "https://www.polmon.com/wp-content/uploads/2022/12/DPT-52-1.jpg" },
    { title: "WiDP57 Wireless Transmitter", img: "https://www.polmon.com/wp-content/uploads/2023/01/DP57-t.jpg" },
    { title: "RHT-70T RH Transmitter", img: "https://www.polmon.com/wp-content/uploads/2022/12/RHT70T-1.jpg" },
    { title: "Net Wireless Dataloggers", img: "https://www.polmon.com/wp-content/uploads/2022/10/Net-dataloggers.jpg" },
    { title: "RS485 Modbus Logger", img: "https://www.polmon.com/wp-content/uploads/2023/02/cn-60-t.jpg" },
    { title: "Door Interlocking System", img: "https://www.polmon.com/wp-content/uploads/2023/01/Door-inter-lock-system.jpg" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--white)', paddingBottom: '80px' }}>
      <section style={{ backgroundColor: 'var(--deep-dark)', color: 'var(--white)', padding: '120px 0 80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: '56px', marginBottom: '24px', color: 'var(--primary-orange)' }}
          >
            Products & Integration
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.8)' }}
          >
            Delivering high-end hardware for life-critical applications. Fully tested, UL-listed, and compliance-ready.
          </motion.p>
        </div>
      </section>

      {/* Main Feature: FSCS Panels */}
      <section className="section-padding">
        <div className="container">
          <div style={{ marginBottom: '48px' }}>
            <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Core Product</span>
            <h2 style={{ fontSize: '40px', color: 'var(--deep-dark)', marginBottom: '16px' }}>Smoke Control Panels (FSCS)</h2>
            <p style={{ color: 'var(--body-grey)', fontSize: '18px', maxWidth: '800px' }}>
              Designed for use in high-rise buildings to manually control fans and dampers designated for smoke removal during a fire emergency. H.O.A logic supported.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {smokePanels.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--light-bg)', padding: '20px', borderRadius: 'var(--border-radius-md)' }}>
                <div style={{ height: '220px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.img} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--deep-dark)' }}>{item.title}</h4>
              </div>
            ))}
          </div>

          {/* Bespoke Series */}
          <div style={{ marginTop: '60px', padding: '40px', backgroundColor: 'var(--deep-dark)', borderRadius: 'var(--border-radius-lg)', color: 'var(--white)' }}>
            <h3 style={{ fontSize: '28px', marginBottom: '24px' }}>Bespoke Extract Control Panels</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
              <div style={{ flex: '1 1 300px' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px' }}>Custom-designed smoke extract control panels built to individual client specifications. Engineers work with consultant specifications across a broad range of building types.</p>
                <ul style={{ paddingLeft: '20px', color: 'rgba(255,255,255,0.7)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Normal Operation (7-day time clock)</li>
                  <li>Fireman's Override Switch integration</li>
                  <li>Door Interlock live isolator safety protocols</li>
                </ul>
              </div>
              {bespokePanels.map((b, i) => (
                <div key={i} style={{ flex: '1 1 200px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>
                  <img src={b.img} alt={b.title} style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                  <p style={{ textAlign: 'center', color: '#111', fontSize: '14px', marginTop: '8px', fontWeight: 600 }}>{b.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Room EMS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--light-bg)' }}>
        <div className="container">
          <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '600px' }}>
              <span style={{ color: 'var(--primary-orange)', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Pharma / Biotech Support</span>
              <h2 style={{ fontSize: '40px', color: 'var(--deep-dark)', marginBottom: '16px' }}>Clean Room Monitoring (EMS)</h2>
              <p style={{ color: 'var(--body-grey)', fontSize: '18px' }}>
                Environment logging and GMP 21 CFR Compliant sensors designed for flawless audit trails across pharmaceutical clean spaces.
              </p>
            </div>
            <img src="https://www.vaisala.com/sites/default/files/styles/max_800/public/2024-08/LIFT-cleanroom-technician-800x450.jpg" alt="Technician" style={{ width: '300px', borderRadius: 'var(--border-radius-md)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {emsInstruments.map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--mid-grey)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ height: '140px', width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={item.img} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--deep-dark)', textAlign: 'center' }}>{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
