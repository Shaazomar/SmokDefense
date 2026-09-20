/**
 * Systems catalogue. Drives /systems (hub), /systems/[slug] (detail) and the
 * homepage quick-solutions grid. Add a record here and every surface updates.
 */

export type DeviceCategory = "Sensors" | "Actuators" | "Controllers" | "Dampers" | "Network";

export interface SystemSubsection {
  key: string;
  label: string;
  title: string;
  body: string;
  points: string[];
}

export interface SystemRecord {
  slug: string;
  number: string;
  title: string;
  short: string;
  eyebrow: string;
  summary: string;
  /** Bullet list shown on the hub cards and the detail page overview. */
  capabilities: string[];
  /** Hardware that makes up the system. */
  components: { name: string; detail: string }[];
  /** Sequence of operation, rendered as a numbered control narrative. */
  sequence: { step: string; detail: string }[];
  applications: string[];
  subsections?: SystemSubsection[];
  image?: string;
  categoryType?: "primary" | "secondary";
}

export const SYSTEMS: SystemRecord[] = [
  // ==========================================
  // PRIMARY CORE SYSTEMS
  // ==========================================
  {
    slug: "smoke-management",
    number: "01",
    title: "Smoke Management",
    short: "Smoke Management",
    eyebrow: "Core Safety Architecture",
    categoryType: "primary",
    summary:
      "Engineered control of smoke movement during fire events to support protected egress paths, maintain tenable conditions, and assist firefighting operations in accordance with NFPA 92 and applicable building codes.",
    capabilities: [
      "Zoned smoke containment and directional pressure barriers",
      "Automated smoke exhaust and make-up air coordination",
      "Stairway and hoistway pressurization integration",
      "Firefighters' Smoke Control Station (FSCS) manual override interface",
      "Supervised damper end-switch and fan status feedback",
    ],
    components: [
      { name: "Firefighters' Smoke Control Station (FSCS)", detail: "Central graphic interface providing status monitoring and manual priority override." },
      { name: "High-temperature smoke exhaust fans", detail: "Rated exhaust units (F300/F400) extracting toxic gases from fire zones." },
      { name: "Pressurization supply fans", detail: "Variable-speed fans maintaining positive pressure across stair enclosures and lobbies." },
      { name: "Motorized fire & smoke dampers", detail: "Spring-return dampers with position verification end switches." },
      { name: "Differential pressure sensors", detail: "Continuous monitoring across protected barriers and door openings." },
    ],
    sequence: [
      { step: "Detection", detail: "Smoke detectors or waterflow switches signal the Fire Alarm Control Panel (FACP)." },
      { step: "Automated Control", detail: "Controllers immediately execute pre-programmed smoke-control sequences (exhaust, pressurization, damper positioning)." },
      { step: "FSCS Monitoring", detail: "The Firefighters' Smoke Control Station reflects real-time status of all fans, dampers and pressure zones." },
      { step: "Manual Override", detail: "Emergency responders take direct manual command of any zone via positive-action key switches." },
      { step: "Verification", detail: "End-switch feedback and airflow sensors confirm execution of the manual command." },
    ],
    applications: ["High-rise commercial towers", "Atriums & covered malls", "Hospitals & healthcare facilities", "Transit terminals & tunnels", "Enclosed car parks"],
    image: "/images/systems-hero-architecture.jpg",
  },
  {
    slug: "firefighters-smoke-control",
    number: "02",
    title: "Firefighters' Smoke Control Station",
    short: "FSCS / Fireman Override",
    eyebrow: "Designated Control Point",
    categoryType: "primary",
    summary:
      "A designated physical control station providing graphical status monitoring and positive manual override over all smoke-control equipment, engineered in compliance with NFPA 92 and applicable local regulations.",
    capabilities: [
      "Physical high-reliability toggle/key switches per smoke zone",
      "Individual LED status confirmation (Run, Stop, Fault, Open, Closed)",
      "High-contrast architectural building graphic layout",
      "Hardwired interlocks with deterministic priority over automation",
      "Supervised 24V DC / dual redundant power supply architecture",
    ],
    components: [
      { name: "Industrial steel enclosure", detail: "Heavy-gauge IP54/IP65 lockable housing with industrial finish." },
      { name: "Architectural mimic graphic", detail: "Clear building elevation schematic showing all smoke zones and equipment locations." },
      { name: "Manual control switches", detail: "Three-position switches (AUTO - OPEN/RUN - CLOSE/STOP) with tactile feedback." },
      { name: "Supervised LED status matrix", detail: "Independent green/red/amber LEDs confirming true mechanical end-switch feedback." },
      { name: "Fire Alarm interface loop", detail: "Monitored dry-contact and supervised RS485 communication links to FACP." },
    ],
    sequence: [
      { step: "Standby Supervision", detail: "Panel continuously monitors line integrity, power supplies and damper position feedback." },
      { step: "Alarm Activation", detail: "Upon fire trigger, zone graphics illuminate to indicate the active smoke-control zone." },
      { step: "Responder Arrival", detail: "Firefighters evaluate zone smoke migration directly from the graphic panel layout." },
      { step: "Command Override", detail: "Switching from AUTO to OPEN/CLOSE instantly forces mechanical equipment into responder-commanded states." },
      { step: "True Status Display", detail: "LED indicators confirm that mechanical dampers reached end-travel and fans started." },
    ],
    applications: ["Fire command centers (FCC)", "Main building entrance lobbies", "Mechanical control rooms", "Airport & transit operations centers"],
    image: "/images/hero-override-panel.png",
  },
  {
    slug: "ip500-connectivity",
    number: "03",
    title: "IP500 Connectivity & Building IoT",
    short: "IP500 Connectivity",
    eyebrow: "Wireless Infrastructure",
    categoryType: "primary",
    summary:
      "An open, vendor-neutral wireless platform utilizing IEEE 802.15.4 and IPv6/6LoWPAN to connect commercial fire/smoke sensors, actuators, and building controls in a resilient, dual-band mesh network.",
    capabilities: [
      "Sub-GHz (868 MHz / 915 MHz) wireless mesh with high building penetration",
      "End-to-end IPv6 / 6LoWPAN communication with AES-128 encryption",
      "Seamless BACnet and building automation gateway integration",
      "Support for safety, security, lighting, and environmental sensors",
      "Standardized, interoperable hardware ecosystem (including CNX100 module)",
    ],
    components: [
      { name: "CNX100 Wireless Radio Module", detail: "IP500® 868 MHz wireless radio module with native IP500 stack and BACnet interface." },
      { name: "IP500 Network Gateway", detail: "Bridges the sub-GHz wireless mesh to building Ethernet and IP-based supervisory networks." },
      { name: "Battery & line-powered nodes", detail: "Connects smoke sensors, pressure transmitters, and actuator feedback modules." },
      { name: "Security layer", detail: "Hardware-level AES-128 encryption ensuring secure life-safety signal transmission." },
    ],
    sequence: [
      { step: "Mesh Formation", detail: "Nodes discover adjacent routers and establish redundant multi-hop paths automatically." },
      { step: "Sensor Telemetry", detail: "Field sensors broadcast air-quality, pressure, and temperature data over IPv6 packets." },
      { step: "Gateway Translation", detail: "The IP500 Gateway converts node data into standardized BACnet/IP objects for supervisory controllers." },
      { step: "Path Recovery", detail: "If a wireless node is obstructed, the mesh automatically reroutes packets through alternate nodes." },
    ],
    applications: ["Retrofit building safety upgrades", "Historic properties", "Commercial office complexes", "Industrial facilities with distributed sensing"],
    image: "/images/system-07-field-devices.jpg",
  },

  // ==========================================
  // SUPPORTING & EXECUTION SYSTEMS
  // ==========================================
  {
    slug: "ventilation-system",
    number: "04",
    title: "Ventilation System",
    short: "Ventilation",
    eyebrow: "Airflow Engineering",
    categoryType: "secondary",
    summary:
      "Demand-controlled ventilation combining sensors, actuators, controllers and field devices under one automation layer — from air-quality measurement through to fan and damper actuation.",
    capabilities: [
      "Demand-based supply and exhaust air control",
      "Continuous air-quality and airflow monitoring",
      "Automatic sequencing of fans, dampers and louvres",
      "Integration with the building automation platform and fire safety overrides",
    ],
    components: [
      { name: "Air-quality sensors", detail: "CO₂, CO, temperature, humidity and differential pressure measurement across zones." },
      { name: "Modulating actuators", detail: "Damper and louvre actuators with position feedback for proportional airflow control." },
      { name: "Field controllers", detail: "Zone controllers executing ventilation logic locally, independent of the network." },
      { name: "Gateways", detail: "Protocol translation between field devices and the supervisory platform." },
    ],
    sequence: [
      { step: "Measure", detail: "Zone sensors report air quality, temperature and pressure at a fixed scan interval." },
      { step: "Evaluate", detail: "The field controller compares readings against configured setpoints and occupancy schedules." },
      { step: "Actuate", detail: "Fan speed and damper position are modulated to the airflow demanded by the zone." },
      { step: "Report", detail: "Device status, runtime and faults are published upstream for monitoring and maintenance." },
    ],
    applications: ["Commercial buildings", "Hospitals", "Shopping malls", "Industrial facilities"],
    image: "/images/system-01-ventilation.jpg",
  },
  {
    slug: "smoke-exhaust",
    number: "05",
    title: "Smoke Exhaust & Extraction",
    short: "Smoke Exhaust",
    eyebrow: "Thermal Extraction",
    categoryType: "secondary",
    summary:
      "Dedicated high-temperature exhaust fan systems and natural smoke vents engineered to extract large volumes of smoke and hot gases from fire zones, atriums, and car parks.",
    capabilities: [
      "F300 (300°C/2h) and F400 (400°C/2h) rated high-temperature extraction fans",
      "Automated make-up air damper and supply fan sequencing",
      "Car park jet fan swept-path smoke clearance integration",
      "Direct hardwired interlock to Fireman Override Panels",
    ],
    components: [
      { name: "Smoke extraction fans", detail: "Axial and centrifugal roof/shaft extract fans with fire-rated electrical windings." },
      { name: "Jet induction fans", detail: "Directional impulse fans guiding smoke toward main extract shafts in enclosed parking." },
      { name: "Make-up air louvres", detail: "Motorized low-level intake dampers preventing depressurization." },
      { name: "Dual-speed starter panels", detail: "Contactor panels with bypass circuits for emergency high-speed run." },
    ],
    sequence: [
      { step: "Trigger", detail: "Fire alarm or FSCS manual override issues the smoke exhaust command." },
      { step: "Make-up Air Release", detail: "Fresh air intake louvres open fully to provide low-velocity replacement air." },
      { step: "Fan Ramp", detail: "Extract fans spin up to emergency duty point within specified ramp times." },
      { step: "Supervision", detail: "Differential pressure across the fan and current switches confirm continuous extraction." },
    ],
    applications: ["Shopping mall atriums", "Enclosed car parks", "Industrial warehouses", "Hotel lobbies & exhibition halls"],
    image: "/images/system-02-carpark.jpg",
  },
  {
    slug: "fs-dampers",
    number: "06",
    title: "Smoke & Fire Dampers",
    short: "F/S Dampers",
    eyebrow: "Fire & Smoke Barriers",
    categoryType: "secondary",
    summary:
      "Motorized fire dampers, smoke dampers and combination fire/smoke dampers with spring-return actuation, thermal release, and end-switch position supervision.",
    capabilities: [
      "Fire, smoke and combined fire/smoke damper assemblies",
      "Motorized spring-return fail-safe actuation",
      "Dual end-switch position monitoring (100% open / 100% closed)",
      "Automated periodic cycle testing and compliance recording",
    ],
    components: [
      { name: "Fire dampers", detail: "Rated barrier closure preventing flame transmission through duct penetrations." },
      { name: "Smoke dampers", detail: "Ultra-low leakage dampers controlling and isolating toxic smoke movement." },
      { name: "Combination F/S dampers", detail: "Single unit providing both thermal fire isolation and smoke containment." },
      { name: "Belimo damper actuators", detail: "Spring-return actuators with auxiliary switches and thermal response sensors." },
      { name: "Addressable I/O modules", detail: "Supervised communication nodes linking damper position to the control platform." },
    ],
    sequence: [
      { step: "Normal State", detail: "Dampers are held energized open (or closed per schedule) with continuous position supervision." },
      { step: "Emergency Actuation", detail: "Upon fire alarm or FSCS command, power is interrupted or driven to the designated safety position." },
      { step: "End-Switch Confirmation", detail: "Internal mechanical microswitches confirm positive physical blade travel." },
      { step: "Supervised Audit", detail: "Periodic automated testing exercises blades and logs travel time for maintenance audits." },
    ],
    applications: ["Commercial high-rises", "Healthcare facilities", "Residential towers", "Multi-zone HVAC networks"],
    image: "/images/system-05-fs-dampers.jpg",
  },
  {
    slug: "pressurization-system",
    number: "07",
    title: "Stairway & Shaft Pressurization",
    short: "Pressurization",
    eyebrow: "Egress Protection",
    categoryType: "secondary",
    summary:
      "Controlled positive overpressure systems keeping escape stairways, elevator hoistways, and refuge areas free of smoke during building evacuation, in accordance with applicable life-safety standards.",
    capabilities: [
      "Closed-loop differential pressure control across stair and lobby doors",
      "Variable-speed supply fans with fast dynamic door-opening response",
      "Barometric and motorized overpressure relief dampers",
      "Multi-point pressure sensing across shaft height",
    ],
    components: [
      { name: "Differential pressure transmitters", detail: "High-accuracy transducers measuring stairwell-to-corridor differential pressure (typically 25–50 Pa)." },
      { name: "VFD supply fan assemblies", detail: "Variable-frequency driven fans modulating outside air injection." },
      { name: "Pressure relief dampers", detail: "Fast-acting relief dampers preventing excessive door-opening forces." },
      { name: "Stair pressurization controller", detail: "Dedicated PID control algorithm holding pressure within design limits." },
    ],
    sequence: [
      { step: "Alarm Initiation", detail: "FACP activates the pressurization sequence for the designated escape shaft." },
      { step: "Rapid Ramp", detail: "Supply fans accelerate to establish target differential pressure against the building." },
      { step: "Dynamic Regulation", detail: "When stair doors open during egress, fan speed instantly increases to prevent smoke ingress." },
      { step: "Overpressure Relief", detail: "Relief dampers modulate to keep door opening forces below 133 N (30 lbf) per standard egress limits." },
    ],
    applications: ["High-rise office towers", "Hospital evacuation stairwells", "Hotel towers", "Deep underground infrastructure"],
    image: "/images/system-04-pressurization.jpg",
    subsections: [
      {
        key: "stairway",
        label: "A. Stairway Pressurization",
        title: "Stairway Pressurization",
        body:
          "Stairways are the primary vertical escape route in multi-storey buildings. Pressurization fans inject outside air into the stair shaft so that its pressure remains above the adjacent floor plate, preventing toxic smoke and heat from entering while occupants evacuate.",
        points: [
          "Target 50 Pa design pressure difference maintained across stair doors",
          "Multi-injection air distribution preventing localized pressure gradients",
          "Fast VFD acceleration compensating for open-door pressure drops",
          "Relief dampers preventing door-opening force from exceeding code limits",
          "Differential pressure sensors at top, middle and base of the shaft",
        ],
      },
      {
        key: "lift-lobby",
        label: "B. Lift Lobby Pressurization",
        title: "Lift Lobby Pressurization",
        body:
          "Lift lobbies and shafts represent continuous vertical paths for smoke migration. Pressurizing the lobby forms a protected buffer between tenant floors and vertical egress corridors, protecting firefighting access elevators.",
        points: [
          "Per-floor lobby pressure regulation with motorized zone dampers",
          "Coordinated sequencing with stairway pressurization systems",
          "Smoke migration barrier for fire service elevator shafts",
          "Supervised end-switch feedback on all lobby isolation dampers",
        ],
      },
    ],
  },
  {
    slug: "fire-alarm-integration",
    number: "08",
    title: "Fire Alarm Integration",
    short: "Fire Alarm Interface",
    eyebrow: "Supervised Interlocking",
    categoryType: "secondary",
    summary:
      "Deterministic, supervised interfacing between Fire Alarm Control Panels (FACP) and smoke-control mechanical equipment, executing the building's cause-and-effect matrix without network ambiguity.",
    capabilities: [
      "Hardwired supervised relay circuits and monitored dry-contact loops",
      "Zone-by-zone cause-and-effect execution",
      "Fail-safe power drop sequences for default safety positions",
      "High-level protocol interfaces (BACnet, Modbus, IP500) for supervisory diagnostics",
    ],
    components: [
      { name: "FACP interface relays", detail: "Monitored contact inputs initiating pre-programmed emergency sequences." },
      { name: "Cause & Effect matrix controller", detail: "Hardened hardware executing deterministic mechanical sequencing." },
      { name: "Line supervision modules", detail: "Monitors wiring loops for open-circuit or short-circuit fault conditions." },
      { name: "Status reporting gateway", detail: "Supplies system execution diagnostics to the building operations center." },
    ],
    sequence: [
      { step: "Signal Acquisition", detail: "FACP contact closes upon confirmed smoke detector or sprinkler waterflow signal." },
      { step: "Matrix Evaluation", detail: "Hardware controller identifies fire zone and issues synchronized mechanical commands." },
      { step: "Mechanical Execution", detail: "Supply fans shut down, smoke exhaust fans engage, and dampers drive to safe states." },
      { step: "Supervised Confirmation", detail: "All equipment positions are verified and reflected on both the FACP and the FSCS." },
    ],
    applications: ["Multi-tenant commercial centers", "Campus fire alarm networks", "Industrial manufacturing plants", "High-density residential towers"],
    image: "/images/hero-override-panel.png",
  },
  {
    slug: "bms-integration",
    number: "09",
    title: "BMS & Building Automation",
    short: "BMS Integration",
    eyebrow: "System Interoperability",
    categoryType: "secondary",
    summary:
      "Integrating everyday building management systems (BMS) with life-safety smoke management, maintaining strict life-safety priority over regular comfort HVAC operations.",
    capabilities: [
      "Native BACnet/IP, BACnet MS/TP, Modbus and IP500 communication",
      "Dual-mode operation: daily IAQ/ventilation management vs emergency smoke control",
      "Deterministic priority override: emergency commands override BMS control loops",
      "Comprehensive telemetry, energy trending, and maintenance predictive diagnostics",
    ],
    components: [
      { name: "BACnet Gateway controllers", detail: "High-throughput protocol translation bridging field networks to BMS." },
      { name: "Priority command modules", detail: "Hardware interlocks ensuring emergency signals physically override BMS outputs." },
      { name: "Energy & air-quality dashboards", detail: "Real-time visualization of airflow, CO₂ levels, fan speeds, and energy consumption." },
    ],
    sequence: [
      { step: "Normal BMS Control", detail: "BMS modulates HVAC, ventilation fans, and fresh air dampers according to occupancy and IAQ setpoints." },
      { step: "Override Detection", detail: "Upon fire alarm or FSCS manual command, BMS control commands are immediately superseded." },
      { step: "Safe State Locking", detail: "Controllers lock dampers and fans into emergency positions regardless of BMS schedule." },
      { step: "Event Logging", detail: "All telemetry, operator actions, and override events are recorded for compliance audits." },
    ],
    applications: ["Smart commercial offices", "Educational campuses", "Healthcare complexes", "Mixed-use developments"],
    image: "/images/bms-workstation.jpg",
  },
  {
    slug: "sensors-actuators",
    number: "10",
    title: "Field Sensors & Actuators",
    short: "Sensors & Actuators",
    eyebrow: "Hardware Layer",
    categoryType: "secondary",
    summary:
      "The precision physical sensing and actuation hardware installed throughout the building — CO/CO₂ sensors, differential pressure transmitters, and Belimo motorized damper actuators.",
    capabilities: [
      "High-precision electrochemical CO and optical NDIR CO₂ sensors",
      "Industrial differential pressure transmitters for stair and duct monitoring",
      "Belimo spring-return rotary and linear damper actuators",
      "IP500 wireless and wired RS485 communication interfaces",
    ],
    components: [
      { name: "Belimo damper actuators", detail: "Spring-return actuators with auxiliary end switches and thermal release triggers." },
      { name: "Differential pressure sensors", detail: "Pressure transducers feeding stair pressurization and filter monitoring loops." },
      { name: "NDIR CO₂ & CO sensors", detail: "Duct and wall mounted air quality sensors driving demand ventilation." },
      { name: "Window actuators", detail: "Chain and spindle drives for natural smoke vent openings." },
    ],
    sequence: [
      { step: "Continuous Sensing", detail: "Sensors sample environmental and differential pressure values continuously." },
      { step: "Signal Conditioning", detail: "Analog (0-10V/4-20mA) or digital (BACnet/IP500) signals feed local controllers." },
      { step: "Actuation Execution", detail: "Actuators position dampers and valves with millimetre precision." },
      { step: "Proof of Position", detail: "End switches provide mechanical proof of physical open/closed states." },
    ],
    applications: ["AHUs & duct networks", "Car park ventilation grids", "Stairwell pressurization shafts", "Life-safety damper assemblies"],
    image: "/images/system-06-actuators.jpg",
  },

  // ==========================================
  // BACKWARDS COMPATIBILITY SLUGS
  // ==========================================
  {
    slug: "car-park-ventilation",
    number: "11",
    title: "Car Park Ventilation",
    short: "Car Park Ventilation",
    eyebrow: "Enclosed Parking",
    categoryType: "secondary",
    summary:
      "Demand-controlled ventilation and smoke clearing for enclosed car parks. CO sensors drive jet induction fans, exhaust and supply fans automatically, with emergency smoke exhaust override.",
    capabilities: [
      "CO and CO₂ sensor grid across parking levels",
      "Automatic jet fan and ventilation sequencing",
      "Staged exhaust and supply fan operation",
      "Fireman Override Panel integration for manual smoke extraction",
    ],
    components: [
      { name: "Electrochemical CO sensors", detail: "Monitors vehicle exhaust accumulation across parking bays." },
      { name: "Jet induction fans", detail: "Sweeps air toward extract shafts without extensive ductwork." },
      { name: "Main exhaust & supply fans", detail: "Dual-speed fans providing regular air change and smoke clearance." },
      { name: "Gateway controller", detail: "Executes zone logic and communicates with the central control platform." },
    ],
    sequence: [
      { step: "Sense", detail: "CO sensor grid scans each parking zone continuously." },
      { step: "Stage", detail: "Low threshold starts induction jet fans in the affected zone." },
      { step: "Escalate", detail: "High threshold or smoke trigger ramps main exhaust fans to full duty." },
      { step: "Override", detail: "Firefighters can manually control each zone from the Fireman Override Panel." },
    ],
    applications: ["Basement car parks", "Multi-storey parking structures", "Mixed-use podiums", "Airport parking terminals"],
    image: "/images/system-02-carpark.jpg",
  },
  {
    slug: "co2-monitors-controls",
    number: "12",
    title: "CO₂ Monitors & Controls",
    short: "CO₂ Controls",
    eyebrow: "Indoor Air Quality",
    categoryType: "secondary",
    summary:
      "Air-quality monitoring and demand-controlled ventilation. NDIR CO₂ sensors drive fresh-air delivery automatically, maintaining healthy indoor environments while optimizing HVAC fan energy.",
    capabilities: [
      "High-accuracy optical NDIR CO₂ sensors",
      "Continuous air-quality monitoring and trending",
      "Automatic fresh-air damper modulation",
      "Integration with supervisory building automation systems",
    ],
    components: [
      { name: "Room & duct CO₂ sensors", detail: "Precision optical sensors with analog and digital bus outputs." },
      { name: "Modulating damper actuators", detail: "Belimo actuators regulating fresh air intake." },
      { name: "Field controllers", detail: "PID control logic maintaining setpoints." },
    ],
    sequence: [
      { step: "Measure", detail: "Zone CO₂ level is sampled continuously." },
      { step: "Modulate", detail: "Fresh air damper opens proportionally to occupancy demand." },
      { step: "Supervise", detail: "Data is logged for IAQ compliance and energy reporting." },
    ],
    applications: ["Offices & commercial spaces", "Schools & universities", "Auditoriums & conference halls"],
    image: "/images/system-03-co2-sensors.jpg",
  },
  {
    slug: "actuators",
    number: "13",
    title: "Actuators & Drives",
    short: "Actuators",
    eyebrow: "Field Actuation",
    categoryType: "secondary",
    summary:
      "Damper, valve and window actuation for ventilation, fire/smoke and building automation duties — including Belimo actuators specified, supplied and integrated as part of the control system.",
    capabilities: [
      "Damper, valve, window and fire/smoke damper actuation",
      "On/off, floating and modulating 0-10V control signals",
      "Spring-return fail-safe models for life-safety duties",
      "Bus-capable models for direct platform integration",
    ],
    components: [
      { name: "Belimo actuators", detail: "Rotary and linear damper actuators, control valves and fire/smoke damper actuators across the torque range." },
      { name: "Window actuators", detail: "Chain and spindle drives for natural ventilation and smoke-vent openings." },
      { name: "F/S damper actuators", detail: "Spring-return actuators with thermal release and auxiliary position switches." },
      { name: "Feedback & supervision", detail: "Position feedback signals and end switches used for proof of operation." },
    ],
    sequence: [
      { step: "Select", detail: "Torque, running time, fail-safe behaviour and signal type are matched to the damper or valve." },
      { step: "Command", detail: "The controller issues an on/off, floating or modulating signal to the actuator." },
      { step: "Verify", detail: "Position feedback confirms the commanded position was reached within the expected time." },
      { step: "Maintain", detail: "Stroke time trending identifies mechanical binding before it becomes a failure." },
    ],
    applications: ["Air handling units", "Fire & smoke dampers", "Natural ventilation windows", "Hydronic control valves"],
    image: "/images/system-06-actuators.jpg",
  },
  {
    slug: "field-devices",
    number: "14",
    title: "Field Devices & Infrastructure",
    short: "Field Devices",
    eyebrow: "Hardware Layer",
    categoryType: "secondary",
    summary:
      "The sensing, actuation and networking hardware installed in the building — sensors, actuators, dampers, gateway and edge controllers — supplied, installed and commissioned as one coordinated layer.",
    capabilities: [
      "Sensors for CO, CO₂, temperature, humidity and differential pressure",
      "Actuators for windows, dampers and fire/smoke dampers",
      "Gateway, edge and field controllers including IP500",
      "Consistent addressing, labelling and supervision across the estate",
    ],
    components: [
      { name: "Sensing devices", detail: "CO, CO₂ and differential pressure sensors feeding the control logic." },
      { name: "Actuation devices", detail: "Window actuators and fire/smoke damper actuators with position proof." },
      { name: "Control devices", detail: "Field, gateway and edge controllers executing and forwarding the logic." },
      { name: "Network devices", detail: "IP500 wireless nodes and wired bus segments linking the field layer." },
    ],
    sequence: [
      { step: "Schedule", detail: "Every device is scheduled with type, location, address and cable reference." },
      { step: "Install", detail: "Devices are mounted, wired and labelled against the schedule." },
      { step: "Commission", detail: "Each point is verified end-to-end from the device to the platform." },
      { step: "Hand over", detail: "As-built schedules, test records and spares lists are issued with the system." },
    ],
    applications: ["New build", "Retrofit", "System upgrades", "Multi-site portfolios"],
    image: "/images/system-07-field-devices.jpg",
  },
];

export interface FieldDevice {
  slug: string;
  name: string;
  category: DeviceCategory;
  summary: string;
  /** Matching product in the shop catalogue, when one exists. */
  productSlug?: string;
  image?: string;
}

export const FIELD_DEVICES: FieldDevice[] = [
  {
    slug: "cnx100-ip500-module",
    name: "CNX100 – IP500® 868 MHz Wireless Radio Module",
    category: "Network",
    summary: "Sub-GHz 868 MHz radio module with native IP500 protocol stack, IEEE 802.15.4, IPv6, 6LoWPAN, and BACnet interface.",
    productSlug: "cnx100-ip500-radio-module",
    image: "/product-images/cnx100.jpg",
  },
  {
    slug: "fireman-override-panel-unit",
    name: "Firefighters' Smoke Control Station (FSCS)",
    category: "Controllers",
    summary: "Key-operated manual override panel with architectural graphic display and LED status supervision per NFPA 92.",
    productSlug: "fireman-override-panel-standard",
    image: "/images/hero-override-panel.png",
  },
  {
    slug: "fs-damper-actuator",
    name: "Belimo Fire & Smoke Damper Actuator",
    category: "Actuators",
    summary: "Spring-return life-safety actuator with integrated thermal sensor and auxiliary position end-switches.",
    productSlug: "fs-damper-actuator-spring-return",
    image: "/product-images/fs-damper-actuator-spring-return-1-e002628d.jpg",
  },
  {
    slug: "differential-pressure-sensor",
    name: "Differential Pressure Sensor (ΔP)",
    category: "Sensors",
    summary: "Precision pressure transducer measuring stairwell and elevator lobby pressure differences (0–100 Pa).",
    productSlug: "differential-pressure-sensor",
  },
  {
    slug: "co2-sensor",
    name: "NDIR CO₂ Sensor",
    category: "Sensors",
    summary: "Dual-channel optical carbon dioxide sensor for demand-controlled ventilation and IAQ monitoring.",
    productSlug: "co2-sensor-room",
  },
  {
    slug: "co-sensor",
    name: "Electrochemical CO Sensor",
    category: "Sensors",
    summary: "Carbon monoxide sensor for enclosed car park ventilation and toxic gas detection.",
    productSlug: "co-sensor-carpark",
  },
  {
    slug: "fire-smoke-combination-damper",
    name: "Motorized Combination Fire / Smoke Damper",
    category: "Dampers",
    summary: "Motorized fire & smoke damper assembly with positive end-switch position feedback.",
    productSlug: "fire-smoke-combination-damper",
  },
  {
    slug: "window-actuator",
    name: "Window Actuator (Natural Smoke Vent)",
    category: "Actuators",
    summary: "High-thrust chain drive actuator for automated smoke ventilation windows and louvres.",
    productSlug: "window-actuator-chain-drive",
  },
];

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  "Sensors",
  "Actuators",
  "Dampers",
  "Controllers",
  "Network",
];

/** 6-Stage Control Hierarchy Architecture Flow */
export const CONTROL_HIERARCHY = [
  {
    stage: "01",
    phase: "NORMAL OPERATION",
    title: "Daily Building Automation",
    detail: "BMS regulates daily IAQ, tenant ventilation schedules, and energy efficiency across zones.",
    equipment: ["Ventilation Fans", "CO₂ Sensors", "BMS Scheduling", "Modulating Dampers"],
  },
  {
    stage: "02",
    phase: "AUTOMATED SMOKE CONTROL",
    title: "Automated Life-Safety Sequence",
    detail: "Upon smoke or heat detection, controllers execute pre-programmed smoke-control sequences.",
    equipment: ["Smoke Detectors", "Zone Controllers", "Exhaust Fans", "F/S Dampers"],
  },
  {
    stage: "03",
    phase: "EMERGENCY CONDITION",
    title: "Firefighter Response Arrival",
    detail: "Fire department arrives at Fire Command Center and assesses smoke migration across building zones.",
    equipment: ["Building Mimic Display", "Zone Annunciation", "Fire Alarm Panel (FACP)"],
  },
  {
    stage: "04",
    phase: "FIREFIGHTERS' SMOKE CONTROL STATION",
    title: "Centralized Human Control Point",
    detail: "The FSCS provides true graphical status and designated manual override over all mechanical smoke equipment.",
    equipment: ["Override-R FSCS Panel", "Three-Position Switches", "Supervised Status LEDs"],
  },
  {
    stage: "05",
    phase: "MANUAL CONTROL / OVERRIDE",
    title: "Direct Physical Command",
    detail: "Responders take positive manual command of fans and dampers to clear egress routes and ventilate tactical zones.",
    equipment: ["Hardwired Interlocks", "Positive Action Override", "Priority Control Relays"],
  },
  {
    stage: "06",
    phase: "SMOKE CONTROL EQUIPMENT",
    title: "Mechanical Response Execution",
    detail: "Exhaust fans extract toxic smoke, stair pressurization maintains positive pressure, and dampers isolate compartments.",
    equipment: ["High-Temp Exhaust Fans", "Stair Pressurization Fans", "Motorized Dampers"],
  },
];

/** Vertical control chain rendered on the Systems architecture diagram. */
export const ARCHITECTURE_LAYERS: { tier: string; title: string; detail: string; items: string[] }[] = [
  {
    tier: "L1",
    title: "Field Sensing & Detection Layer",
    detail: "Continuous measurement and emergency detection at the zone level.",
    items: ["Smoke & Heat Detectors", "Differential Pressure Transducers (ΔP)", "CO₂ / CO Sensors", "Position End-Switches"],
  },
  {
    tier: "L2",
    title: "IP500 & Field Networking Layer",
    detail: "Resilient sub-GHz wireless mesh and supervised wired bus communication.",
    items: ["CNX100 868 MHz Modules", "IP500 Gateways", "IPv6 / 6LoWPAN Mesh", "BACnet MS/TP / IP"],
  },
  {
    tier: "L3",
    title: "Deterministic Zone Controllers",
    detail: "Local sequence execution and hardwired life-safety interlocks.",
    items: ["Smoke Control Logic", "Fan Starter Panels", "Damper Interlock Relays", "Fail-Safe Drop Controls"],
  },
  {
    tier: "L4",
    title: "Firefighters' Smoke Control Station (FSCS)",
    detail: "The designated central point for firefighter monitoring and manual override.",
    items: ["Graphic Building Mimic", "Manual Override Switches", "True End-Switch LED Supervision", "FACP Interface"],
  },
  {
    tier: "L5",
    title: "Mechanical Smoke Management Equipment",
    detail: "High-capacity air-movement and compartmentalization equipment.",
    items: ["High-Temp Smoke Extract Fans", "Stairway Pressurization Fans", "Motorized Fire/Smoke Dampers", "Make-Up Air Louvres"],
  },
];

export function getSystem(slug: string) {
  return SYSTEMS.find((system) => system.slug === slug);
}
