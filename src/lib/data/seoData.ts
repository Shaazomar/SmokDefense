export interface SEOPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  eyebrow: string;
  summary: string;
  keyTakeaways: string[];
  sections: { title: string; body: string }[];
  faqs?: { q: string; a: string }[];
}

export const SEO_PAGES_DATA: Record<string, SEOPageConfig> = {
  "smoke-management": {
    slug: "smoke-management",
    eyebrow: "Engineering Deep-Dive",
    title: "Intelligent Smoke Management Systems & Building Infrastructure",
    metaDescription:
      "Explore intelligent smoke management engineering: connecting smoke dampers, stairwell pressurization fans, and digital monitoring into one unified life-safety platform.",
    h1: "INTELLIGENT SMOKE MANAGEMENT INFRASTRUCTURE",
    summary:
      "Smoke management is an engineered discipline designed to control the movement of smoke during a building fire event. Through controlled pressure differentials, mechanical exhaust fans, and motorized smoke dampers, engineered smoke management protects occupant evacuation routes and facilitates firefighter access.",
    keyTakeaways: [
      "Smoke movement is driven by stack effect, buoyancy, expansion, and HVAC forced airflow.",
      "Stairwell pressurization prevents smoke from infiltrating vertical egress routes.",
      "Digital intelligence provides visibility without altering deterministic safety interlocks.",
      "Regular testing and maintenance ensure systems operate when needed.",
    ],
    sections: [
      {
        title: "The Physics of Smoke Movement in Buildings",
        body: "During a structural fire, hot smoke expands rapidly and creates positive pressure relative to surrounding zones. Thermal buoyancy propels smoke upwards through stairwells, elevator shafts, and utility risers—a phenomenon known as the stack effect. Uncontrolled smoke propagation is the primary hazard to building occupants. Effective smoke management uses mechanical ventilation to establish controlled pressure barriers that confine smoke to the fire zone while exhausting it safely out of the building.",
      },
      {
        title: "Centralized Monitoring vs. Local Autonomous Safety",
        body: "Modern building life-safety architecture balances local hardwired execution with centralized digital software monitoring. UUKL-listed local controllers execute fan sequences and damper stroke commands directly upon fire alarm activation. The centralized SmokDefense platform monitors telemetry from all zones in real time, alerting engineers to sensor drift, damper faults, or power battery degradation long before an emergency occurs.",
      },
    ],
    faqs: [
      {
        q: "What is the primary objective of a smoke management system?",
        a: "The primary objective is to maintain tenable environments in evacuation routes (such as stairwells and exit corridors) and limit smoke spreading to non-fire building zones.",
      },
      {
        q: "How does SmokDefense integrate with existing smoke dampers and fans?",
        a: "SmokDefense connects via BACnet IP, Modbus RTU, or IP500 IoT gateways directly to local building controllers without requiring replacement of physical field actuators.",
      },
    ],
  },
  "smoke-control-systems": {
    slug: "smoke-control-systems",
    eyebrow: "Hardware & Sequence Architecture",
    title: "Dedicated Smoke Control Systems & UUKL Architecture",
    metaDescription:
      "Comprehensive breakdown of dedicated smoke control systems, UUKL equipment listings, stairwell pressurization, and fail-safe airflow sequences.",
    h1: "DEDICATED SMOKE CONTROL SYSTEMS & UUKL ARCHITECTURE",
    summary:
      "Dedicated smoke control systems are specialized life-safety HVAC systems engineered exclusively to move smoke out of buildings and pressurize egress routes during emergencies.",
    keyTakeaways: [
      "UL 864 Category UUKL sets strict hardware compliance for smoke control panels.",
      "Pressurization systems maintain positive pressure (typically 25-50 Pa) in stairwells.",
      "Exhaust fans draw smoke from atrium spaces and high-occupancy zones.",
      "Real-time feedback confirms whether dampers actually open or close upon command.",
    ],
    sections: [
      {
        title: "Understanding UL 864 UUKL System Listings",
        body: "UL 864 Category UUKL certification specifies that control panels, electrical relays, and software logic have undergone rigorous testing for fire alarm and smoke control applications. UUKL hardware includes features like supervised wiring circuits, electrical noise immunity, and immediate override capability.",
      },
    ],
  },
  "centralized-monitoring": {
    slug: "centralized-monitoring",
    eyebrow: "Digital Twin & Operations",
    title: "Centralized Smoke Monitoring & Facility Telemetry Platform",
    metaDescription:
      "Unify multi-building smoke dampers, fans, sensors, and UUKL controllers into one real-time 3D monitoring dashboard.",
    h1: "CENTRALIZED SMOKE MONITORING & TELEMETRY",
    summary:
      "Centralized monitoring aggregates data from thousands of field safety devices across multiple floors or buildings into one intuitive digital interface.",
    keyTakeaways: [
      "Sub-second websocket updates deliver real-time building state visibility.",
      "3D WebGL spatial representation accelerates emergency situation assessment.",
      "Historical data archiving preserves complete logs for compliance audits.",
    ],
    sections: [
      {
        title: "Eliminating Blind Spots in Complex Building Infrastructure",
        body: "Traditional building control panels often provide only simple status lights or text lines on a localized alarm box. Centralized digital monitoring translates thousands of telemetry signals into a visual 3D building model, highlighting affected zones and equipment status immediately.",
      },
    ],
  },
  "life-safety-platform": {
    slug: "life-safety-platform",
    eyebrow: "Software Architecture",
    title: "Building Life-Safety Intelligence Platform",
    metaDescription:
      "Discover the SmokDefense digital intelligence layer for enterprise building life-safety systems.",
    h1: "BUILDING LIFE-SAFETY PLATFORM",
    summary:
      "The SmokDefense platform connects building networks, hardware panels, and operational software into a unified digital intelligence layer.",
    keyTakeaways: [
      "Zero-trust RBAC security with multi-factor authentication.",
      "Integrates BACnet, IP500, Modbus, and MQTT protocols.",
      "Provides predictive diagnostics for maintenance teams.",
    ],
    sections: [
      {
        title: "Enterprise Life-Safety Software Layer",
        body: "As buildings become smarter, life-safety systems must evolve from isolated hardware islands into interconnected enterprise platforms capable of continuous self-diagnostics and predictive maintenance.",
      },
    ],
  },
  "commissioning": {
    slug: "commissioning",
    eyebrow: "Lifecycle Workflow",
    title: "Digital Smoke Control Commissioning & Verification Workflow",
    metaDescription:
      "Streamline smoke control commissioning with automated device discovery, pressure verification, and digital test record generation.",
    h1: "DIGITAL SMOKE CONTROL COMMISSIONING",
    summary:
      "Commissioning is the rigorous process of testing and verifying every fan, damper, sensor, and control sequence to confirm system performance matches engineered design.",
    keyTakeaways: [
      "Automated device discovery maps physical hardware to building floor coordinates.",
      "Digital verification logs damper open/close stroke duration and pressure readings.",
      "Exportable, time-stamped digital handover certificates.",
    ],
    sections: [
      {
        title: "The 8-Step Digital Commissioning Protocol",
        body: "From initial gateway physical connection to final client handover, SmokDefense provides a structured digital workflow that eliminates manual paper checklists and ensures total compliance.",
      },
    ],
  },
  "maintenance": {
    slug: "maintenance",
    eyebrow: "System Health & Readiness",
    title: "Continuous Smoke Management Maintenance & Diagnostic Dashboard",
    metaDescription:
      "Maintain 100% system readiness with continuous diagnostic monitoring, scheduled test automation, and battery health tracking.",
    h1: "SMOKE MANAGEMENT MAINTENANCE & DIAGNOSTICS",
    summary:
      "Safety doesn't start when the alarm sounds. Continuous health monitoring flags sensor drift, sluggish dampers, and battery degradation before critical emergencies occur.",
    keyTakeaways: [
      "System Health Index tracking sensors, fans, dampers, and controllers.",
      "Automated testing workflows scheduled during off-peak hours.",
      "LiFePO4 battery voltage and internal impedance diagnostics.",
    ],
    sections: [
      {
        title: "Proactive Maintenance vs. Reactive Repair",
        body: "Smoke control equipment often sits dormant for months or years. Automated testing routines and continuous sensor diagnostic polling guarantee that actuators move smoothly when called upon.",
      },
    ],
  },
  "ip500-integration": {
    slug: "ip500-integration",
    eyebrow: "Wireless Safety Standard",
    title: "IP500 Wireless Ecosystem Integration for Building Safety",
    metaDescription:
      "Learn how IP500 industrial wireless mesh technology enables high-availability, low-latency smoke management networks.",
    h1: "IP500 WIRELESS ECOSYSTEM INTEGRATION",
    summary:
      "IP500 is the international wireless standard designed for safety-critical building applications, offering dual-band mesh resilience and sub-second latency.",
    keyTakeaways: [
      "Dual-frequency band operation (868/915 MHz + 2.4 GHz).",
      "Self-healing mesh topology reroutes around obstacles.",
      "AES-128 bit hardware encryption protects field network integrity.",
    ],
    sections: [
      {
        title: "Eliminating Wiring Costs in Retrofit Applications",
        body: "Installing control wiring to hundreds of smoke dampers across an existing high-rise is costly and disruptive. IP500 wireless nodes deliver certified safety-grade wireless connectivity directly to field actuators.",
      },
    ],
  },
  "uukl-integration": {
    slug: "uukl-integration",
    eyebrow: "Hardware Standards",
    title: "UUKL Smoke Control System Integration & Compliance",
    metaDescription:
      "Detailed guide to integrating digital monitoring software with UUKL-listed hardware smoke controllers.",
    h1: "UUKL SYSTEM INTEGRATION & COMPLIANCE",
    summary:
      "Connect digital analytics and 3D visualization to UUKL-listed smoke control equipment while preserving hardwired safety interlocks.",
    keyTakeaways: [
      "Maintains strict isolation between cloud analytics and local safety execution.",
      "Supervised input/output monitoring tracks wiring faults in real time.",
      "Compatible with major UUKL-listed manufacturer control panels.",
    ],
    sections: [
      {
        title: "Architectural Boundary Between Software and UUKL Logic",
        body: "Local UUKL hardware remains autonomous and fully capable of executing emergency smoke control sequences even if external network cables are cut. Software enhances monitoring and reporting without compromising safety integrity.",
      },
    ],
  },
  "control-and-override": {
    slug: "control-and-override",
    eyebrow: "Operator Interface",
    title: "Authorized Control & Override Modes for Life-Safety Systems",
    metaDescription:
      "Explore AUTO, AUTHORIZED MANUAL, and EMERGENCY override operational modes with role-based security and immutable audit logging.",
    h1: "AUTHORIZED CONTROL & OVERRIDE MODES",
    summary:
      "When automated sequences encounter unforeseen physical conditions, authorized facility engineers require clear, secure manual override capability.",
    keyTakeaways: [
      "AUTO mode executes pre-configured, approved safety sequences.",
      "AUTHORIZED MANUAL mode permits authenticated engineer intervention.",
      "EMERGENCY mode executes listed system sequences with priority override.",
      "Every override command is cryptographically recorded in an audit trail.",
    ],
    sections: [
      {
        title: "Governance and Verification of Operator Overrides",
        body: "To prevent accidental or unauthorized system manipulation, override commands require multi-factor challenge authentication and immediate confirmation of physical equipment position feedback.",
      },
    ],
  },
  "smoke-control-technology": {
    slug: "smoke-control-technology",
    eyebrow: "Technical Specifications",
    title: "Smoke Control Technology Architecture & System Components",
    metaDescription:
      "In-depth technical index of control panels, edge gateways, sensors, actuators, software layers, and cybersecurity protocols.",
    h1: "SMOKE CONTROL TECHNOLOGY ARCHITECTURE",
    summary:
      "A complete technological overview covering the hardware, network, software, edge computing, and cybersecurity layers of modern smoke management.",
    keyTakeaways: [
      "8-tier technical architecture from physical sensor to cloud analytics.",
      "Open standards: BACnet, IP500, Modbus, MQTT, REST APIs.",
      "Enterprise cybersecurity with TLS 1.3, TPM 2.0, and SSO.",
    ],
    sections: [
      {
        title: "End-to-End Engineering Architecture",
        body: "SmokDefense bridges physical mechanical engineering with modern software architecture, producing a resilient, information-rich building management ecosystem.",
      },
    ],
  },
};
