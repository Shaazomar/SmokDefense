export interface HardwareItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  role: string;
  technicalDetails: { label: string; value: string }[];
  integration: string;
  monitoring: string;
  documentationUrl: string;
}

export interface PlatformModule {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string; status?: "normal" | "active" | "warning" }[];
  features: string[];
}

export interface StandardItem {
  id: string;
  code: string;
  title: string;
  appliesTo: string;
  whatItIs: string;
  whyItMatters: string;
  disclaimer?: string;
}

export interface TechnicalCategory {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  specs: { title: string; detail: string }[];
}

export const HARDWARE_ECOSYSTEM: HardwareItem[] = [
  {
    id: "nema-4x",
    name: "NEMA 4X ENCLOSURE",
    category: "Hardware Enclosure",
    tagline: "Industrial-Grade Environmental Protection for Critical Nodes",
    overview:
      "Engineered stainless steel / polycarbonate NEMA 4X rated enclosure designed to protect local smoke control controllers, network interfaces, and I/O modules from water ingress, dust, corrosion, and extreme temperatures.",
    role: "Ensures survivability of smoke management electronics in harsh plant, stairwell, or roof-level mechanical room environments.",
    technicalDetails: [
      { label: "Protection Rating", value: "NEMA 4X / IP66 Waterproof & Dustproof" },
      { label: "Material Construction", value: "316 Stainless Steel or High-Impact Polycarbonate" },
      { label: "Operating Range", value: "-40°C to +75°C (-40°F to 167°F)" },
      { label: "Door & Gasket", value: "Continuous Polyurethane Seamless Gasket" },
      { label: "Locking Mechanism", value: "Dual Tool-Operated Quarter-Turn Latch" },
    ],
    integration: "Pre-drilled conduit entries with IP68 gland assemblies; integrates seamlessly with standard building conduit networks.",
    monitoring: "Internal temperature and door-open tamper switch connected directly to edge telemetry.",
    documentationUrl: "/resources/nema-4x-datasheet.pdf",
  },
  {
    id: "uukl-control",
    name: "UUKL CONTROL EQUIPMENT",
    category: "Smoke Control Hardware",
    tagline: "Dedicated Life-Safety Smoke Control Automation Nodes",
    overview:
      "Hardware controllers designed for UUKL smoke-control system requirements, providing direct relay output, fan sequencing, stairwell pressurization logic, and damper control independently of high-level software.",
    role: "Executes deterministic, hardwired smoke evacuation and stairwell pressurization matrices immediately upon receiving fire alarm trigger signals.",
    technicalDetails: [
      { label: "Listing / Category", value: "UL 864 Category UUKL (Smoke Control System Equipment)" },
      { label: "Fail-Safe Logic", value: "Hardware Hardwired Priority Interlocks & Watchdog Timer" },
      { label: "I/O Capacity", value: "32 Configurable Supervised Inputs / 16 Relay Outputs" },
      { label: "Response Time", value: "< 250 milliseconds from signal to actuator output" },
      { label: "Bus Protocol", value: "Redundant RS-485 / IP500 Dual Bus" },
    ],
    integration: "Direct interface to Fire Alarm Control Panels (FACP), stairwell injection fans, smoke dampers, and differential pressure transmitters.",
    monitoring: "Supervised circuit wiring detects open, short, and ground fault conditions in real time.",
    documentationUrl: "/resources/uukl-control-spec.pdf",
  },
  {
    id: "ip500",
    name: "IP500 BUILDING NETWORK",
    category: "Wireless & Wired Mesh Ecosystem",
    tagline: "High-Availability Low-Latency Infrastructure Network",
    overview:
      "An open, dual-channel wireless/wired building network standard optimized for critical safety devices, offering sub-second response latency, dual-band redundancy, and AES-128 end-to-end security.",
    role: "Connects smoke sensors, motorized dampers, and pressurization sensors to local edge controllers across wide floorplates and multi-story shafts.",
    technicalDetails: [
      { label: "Frequency Spectrum", value: "868 / 915 MHz + 2.4 GHz Dual-Band Mesh" },
      { label: "Encryption Standard", value: "AES-128 Bit Hardware Encryption" },
      { label: "Latency Rating", value: "< 100ms End-to-End Hop Latency" },
      { label: "Mesh Topology", value: "Self-Healing Multi-Path Mesh with Dynamic Rerouting" },
      { label: "Interoperability", value: "IEEE 802.15.4g Compliant Standard" },
    ],
    integration: "Native gateway connections to BACnet IP, Modbus TCP, and central SmokDefense IoT Edge Nodes.",
    monitoring: "Continuous RSSI signal strength monitoring and automatic packet loss recovery metrics.",
    documentationUrl: "/resources/ip500-architecture.pdf",
  },
  {
    id: "redundant-battery",
    name: "REDUNDANT BATTERY BACKUP",
    category: "Resilient Power System",
    tagline: "Uninterrupted 24-Hour Active Power Reserves",
    overview:
      "Dual Lithium Iron Phosphate (LiFePO4) power reserve units featuring integrated smart charging, automated impedance testing, and seamless zero-switchover power delivery during primary AC outages.",
    role: "Guarantees continuous operation of local controllers, motorized dampers, and sensor monitoring during structural power loss or fire-related grid isolation.",
    technicalDetails: [
      { label: "Chemistry", value: "Lithium Iron Phosphate (LiFePO4) Safety Cell Architecture" },
      { label: "Standby Capacity", value: "24 Hours Full Operational Standby + 15 Min Full Alarm Load" },
      { label: "Switchover Speed", value: "0ms True Online Double-Conversion Transfer" },
      { label: "Charge Controller", value: "Microprocessor-Controlled Temperature Compensated Float" },
      { label: "Cycle Life", value: "> 4,000 Cycles @ 80% Depth of Discharge" },
    ],
    integration: "Plug-and-play connection to UUKL control enclosures with dedicated power status telemetry output.",
    monitoring: "Monitors individual cell voltages, internal temperature, remaining capacity percentage, and estimated battery health.",
    documentationUrl: "/resources/battery-backup-manual.pdf",
  },
  {
    id: "iot-gateway",
    name: "IoT NETWORK GATEWAY",
    category: "Edge Computing Node",
    tagline: "Secure Bridge Between Local Automation and Digital Intelligence",
    overview:
      "Hardened Linux edge device with dual Ethernet, isolated CAN/RS-485 interfaces, and cellular fallback, running the SmokDefense local sync agent for real-time telemetry processing.",
    role: "Aggregates real-time telemetry from building controllers, normalizes device data, buffers offline logs during connectivity loss, and streams secure metrics to the central platform.",
    technicalDetails: [
      { label: "Processor Architecture", value: "Quad-Core ARM Cortex-A53 Industrial Processor" },
      { label: "Local Storage", value: "32GB eMMC Flash (Stores up to 6 months offline event logs)" },
      { label: "Cellular Fallback", value: "Integrated 4G LTE-M / NB-IoT Modem" },
      { label: "Cybersecurity", value: "Hardware TPM 2.0 Secure Boot & TLS 1.3 Encryption" },
      { label: "Protocol Translation", value: "BACnet/IP, Modbus TCP, IP500, MQTT-SN to Secure WebSockets" },
    ],
    integration: "Mounts inside main electrical/LV riser closets; connects upstream to facility LAN or cellular network.",
    monitoring: "CPU load, memory consumption, disk write cycles, network link status, and heartbeat pulse.",
    documentationUrl: "/resources/iot-gateway-guide.pdf",
  },
  {
    id: "connected-devices",
    name: "CONNECTED FIELD DEVICES",
    category: "Sensors & Actuators",
    tagline: "Precision End-Device Sensors, Damper Actuators & Fan Controls",
    overview:
      "Comprehensive ecosystem of connected devices including photoelectric optical smoke detectors, differential pressure transmitters (0-500 Pa), and fast-acting spring-return fire/smoke damper actuators.",
    role: "Provides physical sensing and physical airflow control across stairwells, elevator shafts, smoke zones, and exhaust plenums.",
    technicalDetails: [
      { label: "Pressure Sensor Accuracy", value: "±0.5% Full Scale (Range 0-500 Pa)" },
      { label: "Actuator Speed", value: "< 15 Seconds Open/Close Stroke under nominal load" },
      { label: "Feedback Switches", value: "Dual End-Position Auxiliary Switches (Open/Closed)" },
      { label: "Smoke Optical Chamber", value: "Dual-Ray Scattering for Particle Size Discrimination" },
      { label: "Operating Temp", value: "-20°C to +60°C continuous" },
    ],
    integration: "Communicates directly via supervised analog loops, RS-485 Modbus RTU, or IP500 wireless nodes.",
    monitoring: "Continuous optical chamber cleanliness sensing, motor torque feedback, and loop integrity status.",
    documentationUrl: "/resources/connected-devices-catalog.pdf",
  },
];

export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id: "live-monitoring",
    title: "LIVE MONITORING",
    tagline: "Real-time building life-safety status dashboard",
    description:
      "Provides facility engineering teams with unified visibility into active alarm states, pressure differentials across stairwells, exhaust fan status, and sensor telemetry in real time.",
    metrics: [
      { label: "System Status", value: "ONLINE / NORMAL", status: "normal" },
      { label: "Active Nodes", value: "428 Connected Devices", status: "normal" },
      { label: "Alarm Events", value: "0 Active Alarms", status: "normal" },
      { label: "Network Health", value: "99.98% Uptime", status: "normal" },
    ],
    features: [
      "Sub-second event propagation from edge gateway",
      "Interactive 3D building floorplate overlay",
      "Color-coded pressure zone mapping (Pa)",
      "Instant fan/damper operational state indicators",
    ],
  },
  {
    id: "building-viz",
    title: "BUILDING VISUALIZATION",
    tagline: "Building → Floor → Zone → Device spatial hierarchy",
    description:
      "Navigate from multi-building global assets down to individual smoke dampers on Floor 18 Zone 3 within seconds using high-performance WebGL visual spatial layers.",
    metrics: [
      { label: "Buildings Onboarded", value: "14 Towers", status: "normal" },
      { label: "Floors Mapped", value: "312 Floors", status: "normal" },
      { label: "Smoke Zones", value: "84 Zones", status: "normal" },
      { label: "Spatial Render", value: "60 FPS WebGL", status: "normal" },
    ],
    features: [
      "Full 3D wireframe and floor cross-section views",
      "Instant camera zoom to target floorplate",
      "Isolation of individual smoke containment zones",
      "Visual airflow direction indicator vectors",
    ],
  },
  {
    id: "device-management",
    title: "DEVICE MANAGEMENT",
    tagline: "Centralized inventory, signal health, and firmware control",
    description:
      "Track full lifecycle details, calibration history, signal strength (RSSI), battery voltage, and maintenance schedules for all connected field sensors and actuators.",
    metrics: [
      { label: "Sensors Online", value: "240 Smoke Detectors", status: "normal" },
      { label: "Dampers Active", value: "128 Actuators", status: "normal" },
      { label: "Fans Ready", value: "36 Pressurization Fans", status: "normal" },
      { label: "Fault Count", value: "0 Faults Detected", status: "normal" },
    ],
    features: [
      "Automated device discovery & mapping matrix",
      "Signal attenuation & interference tracking",
      "Firmware version governance & OTA updates",
      "Calibration drift history and alerts",
    ],
  },
  {
    id: "events-timeline",
    title: "EVENTS & ALARM TIMELINE",
    tagline: "Chronological event reconstruction & incident logs",
    description:
      "Every sensor trigger, damper position change, fan start signal, and operator intervention is recorded with microsecond timestamps for compliance and post-incident investigation.",
    metrics: [
      { label: "Total Events (24h)", value: "1,420 Telemetry Logs", status: "normal" },
      { label: "Critical Alarms", value: "0", status: "normal" },
      { label: "Operator Overrides", value: "0", status: "normal" },
      { label: "Audit Precision", value: "1 Millisecond", status: "normal" },
    ],
    features: [
      "Microsecond-accurate event sequencing",
      "Filter by event type, zone, device ID, or operator",
      "Exportable compliance event reports (PDF/CSV)",
      "Automated incident playback animation mode",
    ],
  },
  {
    id: "notifications",
    title: "CONFIGURABLE NOTIFICATIONS",
    tagline: "Multi-channel alerting for facility engineering teams",
    description:
      "Route real-time alerts via SMS, email, push notification, or direct BACnet alarm class routing based on severity levels (Critical Alarm, System Fault, Maintenance Due).",
    metrics: [
      { label: "Alert Rules", value: "18 Configured", status: "normal" },
      { label: "Avg Delivery", value: "< 1.2 Seconds", status: "normal" },
      { label: "Active Escalations", value: "0 Escalations", status: "normal" },
      { label: "Channels Active", value: "SMS / BACnet / Email", status: "normal" },
    ],
    features: [
      "Role-based emergency escalation paths",
      "Custom threshold alerts for pressure anomalies",
      "Shift-schedule notification routing",
      "Mobile app push notifications for field staff",
    ],
  },
  {
    id: "audit-trail",
    title: "USERS, ROLES & AUDIT TRAIL",
    tagline: "Tamper-evident security and role-based operational permissions",
    description:
      "Enforce strict multi-factor authentication (MFA) and granular permissions. Every manual override command requires authorized sign-off and is written to an immutable audit ledger.",
    metrics: [
      { label: "Auth Level", value: "MFA / SSO Enforced", status: "normal" },
      { label: "Audit Ledger", value: "Immutable Log Active", status: "normal" },
      { label: "Active Sessions", value: "3 Engineers", status: "normal" },
      { label: "Security Standard", value: "SOC 2 Type II Certified", status: "normal" },
    ],
    features: [
      "Granular role definition (Operator, Engineer, Admin, Auditor)",
      "Strict authorization challenge for manual control overrides",
      "Full digital signature requirement for test sign-offs",
      "Complete user activity & IP address recording",
    ],
  },
];

export const STANDARDS_TRUST: StandardItem[] = [
  {
    id: "nfpa-72",
    code: "NFPA 72",
    title: "National Fire Alarm and Signaling Code",
    appliesTo: "Fire Alarm Systems, Off-Premises Signaling, Circuit Pathways & Testing Procedures",
    whatItIs:
      "The benchmark standard for installation, performance, testing, and maintenance of fire alarm and emergency communications systems globally.",
    whyItMatters:
      "Ensures that system monitoring, circuit supervision, battery sizing, and emergency alarm notification conform to recognized life-safety engineering protocols.",
    disclaimer:
      "SmokDefense software and gateways integrate with NFPA 72 compliant fire alarm control panels; software reporting supports NFPA 72 inspection documentation.",
  },
  {
    id: "ul-864-uukl",
    code: "UL 864 / UUKL",
    title: "Standard for Control Units and Accessories for Fire Alarm Systems (Category UUKL)",
    appliesTo: "Dedicated Smoke-Control System Controllers, Control Panels & Relay Execution Units",
    whatItIs:
      "UL 864 Category UUKL governs controllers specifically tested and listed for dedicated smoke control applications, including fan sequencing and damper override logic.",
    whyItMatters:
      "Guarantees that physical smoke management hardware functions with fail-safe reliability, electrical noise immunity, and environmental resilience under emergency conditions.",
    disclaimer:
      "Primary smoke control operations rely on listed UUKL hardware controllers. The SmokDefense digital platform acts as a centralized monitoring and intelligence layer.",
  },
  {
    id: "nema-4x",
    code: "NEMA 4X",
    title: "Enclosures for Electrical Equipment (Corrosion & Hose-Down Protection)",
    appliesTo: "Hardware Control Enclosures, Edge Gateway Housing & Riser Node Panels",
    whatItIs:
      "Standard establishing enclosure resistance against windblown dust, rain, splashing water, hose-directed water, ice formation, and corrosion.",
    whyItMatters:
      "Protects delicate electronic controllers in wet mechanical rooms, damp basement riser shafts, or exposed rooftop air-handling equipment locations.",
    disclaimer:
      "Hardware node enclosures offered within the SmokDefense ecosystem carry certified NEMA 4X / IP66 ratings.",
  },
  {
    id: "ip500-standard",
    code: "IP500 ECOSYSTEM",
    title: "International Industrial Wireless Building Safety Standard",
    appliesTo: "Wireless Sensor Mesh Networks, Damper Nodes & Local Building Safety Infrastructure",
    whatItIs:
      "The world's only wireless standard specifically certified for safety-critical building applications, offering dual-band resilience and sub-second transmission.",
    whyItMatters:
      "Eliminates single points of network failure in complex buildings while enabling cost-effective wireless retrofits for existing smoke dampers and pressure sensors.",
    disclaimer:
      "SmokDefense IoT modules natively support IP500 network protocols alongside wired BACnet and Modbus architectures.",
  },
];

export const TECHNICAL_CATEGORIES: TechnicalCategory[] = [
  {
    id: "control",
    title: "LOCAL CONTROL ARCHITECTURE",
    subtitle: "Deterministic safety logic executing at the local controller",
    summary:
      "Smoke control logic runs on dedicated UUKL-listed local microcontrollers. Primary emergency sequences execute locally regardless of network or cloud connectivity.",
    specs: [
      { title: "Execution Speed", detail: "< 250 milliseconds deterministic relay switching" },
      { title: "Interlock Logic", detail: "Hardwired electrical interlocks prevent fan surge and conflicting damper modes" },
      { title: "Fail-Safe Default", detail: "Configurable fail-safe open or closed actuator positioning on signal loss" },
      { title: "Watchdog Protection", detail: "Dual hardware watchdog timers reset CPU automatically upon fault" },
    ],
  },
  {
    id: "network",
    title: "COMMUNICATION & MESH NETWORK",
    subtitle: "High-availability wired and wireless transmission layer",
    summary:
      "Combines IP500 dual-band mesh wireless for field sensors with redundant wired RS-485 / BACnet IP rings for core control panels.",
    specs: [
      { title: "Protocol Standards", detail: "IP500, BACnet IP, BACnet MS/TP, Modbus TCP, MQTT-SN" },
      { title: "Network Redundancy", detail: "Self-healing ring and mesh topologies with automatic path rerouting" },
      { title: "Encryption", detail: "AES-128 bit hardware encryption at network layer" },
      { title: "Throughput", detail: "Real-time telemetry sampling at up to 10 Hz per critical sensor node" },
    ],
  },
  {
    id: "edge",
    title: "EDGE & IOT GATEWAY COMPUTING",
    subtitle: "Local data normalization, buffer storage, and cloud sync",
    summary:
      "Industrial edge computing nodes process local telemetry, filter noise, execute anomaly detection algorithms, and maintain local event log backups.",
    specs: [
      { title: "Offline Storage", detail: "32GB flash memory buffers 6+ months of continuous telemetry offline" },
      { title: "Operating System", detail: "Hardened Linux OS with read-only root partition & secure boot" },
      { title: "Cellular Backup", detail: "Automatic failover to LTE-M / NB-IoT upon wired LAN loss" },
      { title: "Local API", detail: "Restful JSON API and WebSocket server for local facility network integration" },
    ],
  },
  {
    id: "power",
    title: "POWER RESILIENCE & BACKUP",
    subtitle: "Uninterrupted power supplies and active battery health tracking",
    summary:
      "Dual LiFePO4 battery power reserves back up every local control enclosure, ensuring continued monitoring and damper actuation during mains power failure.",
    specs: [
      { title: "Backup Duration", detail: "24-hour continuous standby + 15 minutes full alarm load operation" },
      { title: "Transfer Time", detail: "0ms true online double conversion switchover" },
      { title: "Battery Chemistry", detail: "Lithium Iron Phosphate (LiFePO4) - non-gassing, 4,000+ cycle life" },
      { title: "Health Telemetry", detail: "Continuous internal cell resistance & temperature monitoring" },
    ],
  },
  {
    id: "devices",
    title: "SENSORS & FIELD ACTUATORS",
    subtitle: "High-precision sensing and heavy-duty mechanical dampers",
    summary:
      "Industrial photoelectric smoke detectors, differential pressure transmitters, and heavy-duty damper actuators engineered for high-temperature airflow.",
    specs: [
      { title: "Pressure Transmitters", detail: "Piezoresistive silicon sensors (0-500 Pa range, ±0.5% accuracy)" },
      { title: "Damper Actuators", detail: "Brushless DC motors with spring-return mechanical failsafe (<15s stroke)" },
      { title: "Smoke Detection", detail: "Dual optical chamber preventing false alarms from dust or steam" },
      { title: "End-Switch Feedback", detail: "Supervised positive position mechanical switches (Open / Closed)" },
    ],
  },
  {
    id: "software",
    title: "SOFTWARE PLATFORM & VISUALIZATION",
    subtitle: "3D WebGL digital twin and centralized operational dashboard",
    summary:
      "Next.js and WebGL powered software platform providing spatial 3D building visualization, live telemetry overlays, and automated reporting.",
    specs: [
      { title: "Render Engine", detail: "Custom Three.js / WebGL shader pipeline (60 FPS on modern browsers)" },
      { title: "Latency", detail: "Sub-second websocket updates from edge gateway to web browser" },
      { title: "Multi-Building", detail: "Scalable global asset management across multiple sites from single login" },
      { title: "Cross-Platform", detail: "Responsive layout optimized for Control Room workstations & mobile tablets" },
    ],
  },
  {
    id: "data",
    title: "DATA TELEMETRY & ANALYTICS",
    subtitle: "Event history, time-series logging, and predictive insights",
    summary:
      "Time-series data engine captures every sensor reading, pressure shift, and operational event for continuous system optimization and compliance.",
    specs: [
      { title: "Timestamp Precision", detail: "1 millisecond resolution event synchronization" },
      { title: "Data Retention", detail: "Infinite historical log archiving with automated compliance PDF generation" },
      { title: "Anomaly Detection", detail: "Machine learning algorithms flagging pressure drift or sluggish damper stroke" },
      { title: "Export Formats", detail: "JSON, CSV, PDF, and direct REST API export" },
    ],
  },
  {
    id: "security",
    title: "CYBERSECURITY & AUDIT GOVERNANCE",
    subtitle: "End-to-end security architecture built for critical infrastructure",
    summary:
      "Implements zero-trust security principles, single sign-on (SSO), hardware-backed authentication, and immutable audit logs.",
    specs: [
      { title: "Authentication", detail: "SAML 2.0 / OpenID Connect SSO with mandatory MFA" },
      { title: "Data Encryption", detail: "TLS 1.3 in transit, AES-256 for data at rest" },
      { title: "Role Management", detail: "Granular Role-Based Access Control (RBAC) down to specific zone permissions" },
      { title: "Audit Trail", detail: "Cryptographically signed command ledger recording all manual overrides" },
    ],
  },
];

export const COMMISSIONING_STEPS = [
  { step: "01", name: "CONNECT", title: "Gateway Physical Connection", detail: "Connect edge gateway to local building controller bus and facility network." },
  { step: "02", name: "DISCOVER", title: "Automated Device Discovery", detail: "Scan local BACnet/IP500 buses to discover all smoke sensors, fans, and dampers." },
  { step: "03", name: "MAP", title: "Spatial & Zone Mapping", detail: "Bind discovered physical device IDs to building floors, stairwells, and smoke zones." },
  { step: "04", name: "CONFIGURE", title: "Sequence Configuration", detail: "Define pressure setpoints (e.g. 50 Pa stairwell differential) and fan sequence matrices." },
  { step: "05", name: "TEST", title: "Automated Loop Testing", detail: "Trigger sequence simulation commands to open dampers and verify end-switch feedback." },
  { step: "06", name: "VERIFY", title: "Pressure Balance Verification", detail: "Confirm differential pressure readings conform to engineered smoke control designs." },
  { step: "07", name: "DOCUMENT", title: "Digital Handover Record", detail: "Generate digitally signed commissioning certificates with time-stamped test logs." },
  { step: "08", name: "HANDOVER", title: "Operator Handover & Sync", detail: "Transfer platform access to facility management and activate 24/7 continuous monitoring." },
];

export const TESTING_WORKFLOW_DEMO = [
  { device: "DMP-18-E", type: "Smoke Damper", location: "Floor 18 East Corridor", command: "OPEN", feedback: "OPEN (11.2s)", result: "PASS" },
  { device: "FAN-03-EX", type: "Exhaust Fan", location: "Roof Mechanical Room 3", command: "START", feedback: "RUNNING (1,450 RPM)", result: "PASS" },
  { device: "PRS-18-ST", type: "Pressure Trans.", location: "Stairwell B Shaft 18F", command: "READ", feedback: "48.5 Pa (Setpoint 50 Pa)", result: "PASS" },
  { device: "SMK-18-04", type: "Smoke Sensor", location: "Floor 18 Return Air Duct", command: "TEST SIGNAL", feedback: "ALARM STATE VERIFIED", result: "PASS" },
];

export const MAINTENANCE_HEALTH_METRICS = [
  { category: "Sensors & Detectors", health: 98, totalCount: 240, activeFaults: 0, statusLabel: "OPERATIONAL [DEMO]" },
  { category: "Exhaust & Pressurization Fans", health: 100, totalCount: 36, activeFaults: 0, statusLabel: "OPERATIONAL [DEMO]" },
  { category: "Motorized Smoke Dampers", health: 96, totalCount: 128, activeFaults: 1, statusLabel: "MAINTENANCE DUE [DEMO]" },
  { category: "Network Communication Nodes", health: 99, totalCount: 42, activeFaults: 0, statusLabel: "OPTIMAL [DEMO]" },
  { category: "Local Hardware Controllers", health: 100, totalCount: 14, activeFaults: 0, statusLabel: "OPTIMAL [DEMO]" },
  { category: "LiFePO4 Backup Power", health: 97, totalCount: 14, activeFaults: 0, statusLabel: "CHARGED [DEMO]" },
];

export const INDUSTRY_VERTICALS = [
  {
    id: "high-rise",
    title: "HIGH-RISE TOWERS",
    description: "Complex multi-floor smoke management, stairwell pressurization, and elevator shaft containment for 30+ story structures.",
    challenges: "Stack effect in tall vertical shafts, multi-zone smoke propagation, and high occupant density during evacuation.",
    solution: "Dynamic multi-floor zone isolation, staged fan ramping, and real-time stairwell differential pressure stabilization.",
  },
  {
    id: "hospitals",
    title: "HOSPITALS & HEALTHCARE",
    description: "Defend-in-place smoke containment infrastructure for critical healthcare facilities and surgical suites.",
    challenges: "Non-ambulatory patients who cannot quickly evacuate; sensitive sterile airflow requirements.",
    solution: "Sub-zone compartment isolation, non-recirculating exhaust sequences, and continuous clean room pressure monitoring.",
  },
  {
    id: "hotels",
    title: "HOTELS & RESORTS",
    description: "Large-occupancy hospitality environments with multi-wing guest rooms, atrium spaces, and central HVAC systems.",
    challenges: "Unfamiliar transient occupants, vast horizontal corridors, and high acoustic noise limits during testing.",
    solution: "Automated corridor smoke purging, quiet self-testing damper routines, and centralized multi-property overview.",
  },
  {
    id: "commercial",
    title: "COMMERCIAL REAL ESTATE",
    description: "Grade-A office towers, shopping centers, and mixed-use commercial developments.",
    challenges: "Tenant buildouts modifying floor layouts, complex variable air volume (VAV) duct networks.",
    solution: "Flexible software zone re-mapping without rewiring hardware, seamlessly integrating tenant HVAC with life safety.",
  },
  {
    id: "industrial",
    title: "INDUSTRIAL & LOGISTICS",
    description: "High-bay warehouses, manufacturing plants, cleanrooms, and chemical storage facilities.",
    challenges: "Enormous open volumes, high ceiling heights, harsh dust and humidity ambient conditions.",
    solution: "NEMA 4X industrial node protection, optical beam smoke sensing, and high-volume roof smoke extraction fan control.",
  },
  {
    id: "infrastructure",
    title: "INFRASTRUCTURE & TRANSPORT",
    description: "Airport terminals, underground rail stations, traffic tunnels, and critical data centers.",
    challenges: "Vast public spaces, high airflow velocities, severe operational continuity demands.",
    solution: "High-speed redundant IP500 network backbone, tunnel jet fan staging, and 24/7 continuous health analytics.",
  },
];
