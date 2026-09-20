/**
 * B2B product catalogue. Drives /shop (filterable grid) and /shop/[slug].
 * Products carry specification rows rather than prices — enquiry-led, not retail.
 */

export type GlyphKind =
  | "sensor"
  | "actuator"
  | "damper"
  | "controller"
  | "gateway"
  | "window"
  | "fan";

export interface ShopCategory {
  slug: string;
  label: string;
  description: string;
}

export interface Product {
  slug: string;
  name: string;
  category: string;
  glyph: GlyphKind;
  short: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];
  systems: string[];
  /** Optional primary product image path (verified genuine hardware photography) */
  image?: string;
  manufacturer?: string;
  model?: string;
  sourceUrl?: string;
  verified?: boolean;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "smoke-control",
    label: "Smoke Control & FSCS",
    description: "Firefighters' Smoke Control Stations, manual override panels, and emergency control interfaces.",
  },
  {
    slug: "ip500-devices",
    label: "IP500® Wireless Devices",
    description: "Standardized IP500 sub-GHz wireless radio modules, mesh routers, and IoT interfaces.",
  },
  {
    slug: "dampers",
    label: "Fire & Smoke Dampers",
    description: "Fire, smoke and combination dampers with motorized actuation and end-switch position supervision.",
  },
  {
    slug: "actuators",
    label: "Actuators & Drives",
    description: "Belimo life-safety actuators, smoke vent window drives, and control valve actuators.",
  },
  {
    slug: "sensors",
    label: "Sensors & Transmitters",
    description: "Differential pressure transducers, NDIR CO₂, and electrochemical CO sensors.",
  },
  {
    slug: "controllers",
    label: "Controllers & Gateways",
    description: "Deterministic zone controllers, BACnet gateways, and field automation nodes.",
  },
  {
    slug: "field-devices",
    label: "Field Infrastructure",
    description: "Supervised power supplies, monitoring modules, and field accessories.",
  },
];

export const PRODUCTS: Product[] = [
  // ========================================================
  // PRIMARY HARDWARE & CORE TECHNOLOGY
  // ========================================================
  {
    slug: "fireman-override-panel-standard",
    name: "Firefighters' Smoke Control Station (FSCS)",
    category: "smoke-control",
    glyph: "controller",
    short: "Designated firefighter control point with architectural mimic and positive manual override.",
    description:
      "The Override-R Firefighters' Smoke Control Station (FSCS) / Fireman Override Panel provides emergency responders with a centralized, high-reliability interface for graphical monitoring and positive manual control over smoke-management fans, stairwell pressurization systems, and motorized fire/smoke dampers in accordance with NFPA 92 and applicable building codes.",
    specs: [
      { label: "Operation", value: "Key-operated 3-position switches (AUTO / OPEN-RUN / CLOSE-STOP) per zone" },
      { label: "Status Indication", value: "Supervised LED matrix confirming true mechanical end-switch and airflow proof" },
      { label: "Mimic Graphic", value: "Custom high-contrast architectural floor-by-floor graphic overlay" },
      { label: "Standards Reference", value: "Engineered in accordance with NFPA 92 and IBC Section 909 provisions" },
      { label: "Enclosure", value: "Heavy-gauge IP54/IP65 steel industrial cabinet with security key lock" },
      { label: "Interlocking", value: "Deterministic hardwired priority override over BMS and automated sequences" },
      { label: "Power Supply", value: "Dual redundant 24 V DC / 230 V AC with supervised battery backup provision" },
    ],
    applications: ["Fire command centers (FCC)", "Main building entrance lobbies", "Mechanical control rooms", "High-rise towers", "Covered shopping malls"],
    systems: ["smoke-management", "firefighters-smoke-control", "fire-alarm-integration"],
    image: "/images/hero-override-panel.png",
    manufacturer: "Override-R",
    model: "FSCS-STD-01",
    verified: true,
  },
  {
    slug: "cnx100-ip500-radio-module",
    name: "CNX100 – IP500® 868 MHz Wireless Radio Module",
    category: "ip500-devices",
    glyph: "gateway",
    short: "Sub-GHz 868 MHz wireless radio module with native IP500 protocol stack and BACnet support.",
    description:
      "The CNX100 is an official IP500® 868 MHz wireless radio module designed for commercial and industrial building automation, life safety, and security. Featuring full dual-channel mesh networking, IPv6/6LoWPAN connectivity, hardware AES-128 encryption, and native BACnet interface compatibility.",
    specs: [
      { label: "Frequency", value: "868 MHz (Sub-GHz band)" },
      { label: "Standard", value: "IEEE 802.15.4g-2011 / IP500® Standard" },
      { label: "Protocols", value: "IPv6, 6LoWPAN, native IP500 dual-channel stack" },
      { label: "Compliance", value: "ETSI EN300 220-1, FCC47 CFR Section 15.247" },
      { label: "Security", value: "AES-128 hardware-accelerated encryption" },
      { label: "Interface", value: "UART, dual antenna connections (U.FL / trace)" },
      { label: "Network Topology", value: "Self-healing dual-channel wireless mesh" },
      { label: "Building Integration", value: "Direct BACnet object mapping for building automation" },
      { label: "Dimensions", value: "24 mm × 35 mm compact surface-mount module" },
    ],
    applications: ["Wireless smoke & heat detector nodes", "Damper position retrofits", "Air quality sensor networks", "Commercial building IoT infrastructure"],
    systems: ["ip500-connectivity", "smoke-management", "field-devices"],
    image: "/product-images/cnx100.jpg",
    manufacturer: "CoreNetiX / IP500 Alliance",
    model: "CNX100 (868 MHz)",
    sourceUrl: "https://ip500.org/cnx100-868-mhz-wireless-radio-module/",
    verified: true,
  },

  // ========================================================
  // SENSORS & TRANSMITTERS
  // ========================================================
  {
    slug: "differential-pressure-sensor",
    name: "Differential Pressure Sensor (ΔP)",
    category: "sensors",
    glyph: "sensor",
    short: "Pressure difference measurement for stairwell pressurization control.",
    description:
      "Differential pressure transmitter measuring across stair and lobby doors, and across filters and fans. Serves as the primary closed-loop feedback element in stairway pressurization and egress protection systems.",
    specs: [
      { label: "Range", value: "0 – 100 / 0 – 500 Pa selectable" },
      { label: "Accuracy", value: "±1 % of full scale" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA / Modbus" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Connection", value: "6 mm push-on pressure ports" },
    ],
    applications: ["Stairway pressurization", "Lift lobby pressurization", "Filter monitoring", "Clean rooms"],
    systems: ["pressurization-system", "smoke-management"],
    manufacturer: "HK Instruments / Commercial Line",
    model: "DPT-R8-MOD",
    verified: false,
  },
  {
    slug: "co2-sensor-room",
    name: "CO₂ Sensor — Room Mount",
    category: "sensors",
    glyph: "sensor",
    short: "NDIR room CO₂ sensor for demand-controlled ventilation.",
    description:
      "Wall-mounted optical NDIR carbon dioxide sensor for occupied spaces. Provides a linear output to the zone controller so fresh-air delivery tracks actual occupancy instead of a fixed schedule.",
    specs: [
      { label: "Measurement", value: "NDIR, 0 – 2000 ppm" },
      { label: "Accuracy", value: "±30 ppm ±3 % of reading" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA / bus" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Mounting", value: "Wall, flush or surface" },
    ],
    applications: ["Offices", "Classrooms", "Meeting rooms", "Healthcare"],
    systems: ["co2-monitors-controls", "ventilation-system"],
    manufacturer: "SenseAir / Siemens Line",
    model: "S8 / QPA2002",
    verified: false,
  },
  {
    slug: "co2-sensor-duct",
    name: "CO₂ Sensor — Duct Mount",
    category: "sensors",
    glyph: "sensor",
    short: "In-duct CO₂ measurement for air handling units.",
    description:
      "Duct-mounted NDIR sensor with sampling probe, used on return and mixed-air ducts to control fresh-air intake at the air handling unit.",
    specs: [
      { label: "Measurement", value: "NDIR, 0 – 2000 ppm" },
      { label: "Probe length", value: "200 mm standard" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Protection", value: "IP54 housing" },
    ],
    applications: ["Air handling units", "Return air ducts", "Central plant"],
    systems: ["co2-monitors-controls", "ventilation-system"],
    manufacturer: "Siemens Line",
    model: "QPM2102",
    verified: false,
  },
  {
    slug: "co-sensor-carpark",
    name: "CO Sensor — Car Park",
    category: "sensors",
    glyph: "sensor",
    short: "Electrochemical carbon monoxide sensor for enclosed parking.",
    description:
      "Carbon monoxide sensor designed for basement and enclosed car parks. Drives staged jet fan and exhaust fan operation, and raises an alarm when concentrations remain above the configured threshold.",
    specs: [
      { label: "Measurement", value: "Electrochemical, 0 – 300 ppm" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA / relay" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Protection", value: "IP65 housing" },
      { label: "Calibration", value: "Field calibratable, 12-month interval" },
    ],
    applications: ["Basement car parks", "Multi-storey parking", "Loading bays"],
    systems: ["car-park-ventilation", "smoke-exhaust"],
    manufacturer: "MSR-Electronic / PolyGard",
    model: "SC2-CO",
    verified: false,
  },
  {
    slug: "duct-temp-humidity-sensor",
    name: "Duct Temperature & Humidity Sensor",
    category: "sensors",
    glyph: "sensor",
    short: "Combined in-duct temperature and humidity measurement.",
    description:
      "Combined temperature and relative humidity sensor for supply, return and fresh-air ducts, providing the measured values used by ventilation and air handling control loops.",
    specs: [
      { label: "Temperature", value: "-20 – +80 °C, ±0.3 °C" },
      { label: "Humidity", value: "0 – 100 % RH, ±2 % RH" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA" },
      { label: "Probe length", value: "150 / 250 mm" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Air handling units", "Ventilation ducts", "Clean rooms"],
    systems: ["ventilation-system"],
    manufacturer: "S+S Regeltechnik",
    model: "KFTF-Modbus",
    verified: false,
  },

  // ========================================================
  // ACTUATORS & DRIVES
  // ========================================================
  {
    slug: "fs-damper-actuator-spring-return",
    name: "Belimo F/S Damper Actuator — Spring Return",
    category: "actuators",
    glyph: "actuator",
    short: "Spring-return life-safety actuation for fire and smoke dampers.",
    description:
      "Belimo spring-return actuator for fire and smoke dampers. On loss of power or on an emergency command, the mechanical spring drives the damper to its safe position in <20 seconds, with auxiliary switches confirming achieved position.",
    specs: [
      { label: "Torque", value: "18 Nm (spring) / 18 Nm (motor)" },
      { label: "Fail-safe", value: "Mechanical spring return < 20 s" },
      { label: "Thermal release", value: "72 °C / 95 °C thermal sensor trigger" },
      { label: "Auxiliary switches", value: "2 × SPDT adjustable end switches" },
      { label: "Supply", value: "24 V AC/DC (BF24) or 230 V AC (BF230)" },
    ],
    applications: ["Fire dampers", "Smoke dampers", "Combination F/S dampers"],
    systems: ["actuators", "fs-dampers", "smoke-management"],
    image: "/product-images/fs-damper-actuator-spring-return-1-e002628d.jpg",
    manufacturer: "Belimo",
    model: "BF24 / BFN24",
    sourceUrl: "https://www.belimo.com/",
    verified: true,
  },
  {
    slug: "belimo-rotary-damper-actuator",
    name: "Belimo Rotary Damper Actuator",
    category: "actuators",
    glyph: "actuator",
    short: "Modulating rotary actuation for supply and exhaust dampers.",
    description:
      "Belimo rotary damper actuator for air dampers in ventilation and air handling applications. Available across the torque range with on/off, floating and modulating control, with position feedback for proof of operation.",
    specs: [
      { label: "Torque", value: "5 Nm / 10 Nm / 20 Nm (LM/NM/SM series)" },
      { label: "Control", value: "0 – 10 V modulating / 3-point" },
      { label: "Running time", value: "150 s / 90°" },
      { label: "Feedback", value: "2 – 10 V position feedback" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Air handling units", "Zone dampers", "Fresh-air intakes"],
    systems: ["actuators", "ventilation-system"],
    image: "/product-images/belimo-rotary-damper-actuator-1-ee5a8b45.jpg",
    manufacturer: "Belimo",
    model: "LM24A-SR / NM24A-SR",
    sourceUrl: "https://www.belimo.com/",
    verified: true,
  },
  {
    slug: "window-actuator-chain-drive",
    name: "Window Actuator — Chain Drive (Smoke Vent)",
    category: "actuators",
    glyph: "window",
    short: "Chain drive for natural ventilation and smoke-vent windows.",
    description:
      "High-thrust chain-drive window actuator for automatic opening vents (AOV). Used for natural ventilation under the building automation schedule and for rapid smoke-vent opening on a fire alarm or manual override signal.",
    specs: [
      { label: "Stroke", value: "150 / 300 / 500 mm" },
      { label: "Force", value: "300 N push / pull" },
      { label: "Control", value: "24 V DC, on/off with end-position cut-off" },
      { label: "Feedback", value: "Open / closed position contacts" },
      { label: "Synchronisation", value: "Multi-drive tandem operation" },
    ],
    applications: ["Atrium vents", "Façade windows", "Smoke vents", "Natural ventilation"],
    systems: ["actuators", "smoke-exhaust", "field-devices"],
    manufacturer: "AUMÜLLER / D+H Line",
    model: "KS4 24V S2",
    verified: false,
  },
  {
    slug: "belimo-control-valve-actuator",
    name: "Belimo Control Valve Actuator",
    category: "actuators",
    glyph: "actuator",
    short: "Valve actuation for hydronic heating and cooling control.",
    description:
      "Belimo valve actuator for characterised control valves in heating and cooling circuits, integrated with the same controller and feedback conventions as the damper actuators on site.",
    specs: [
      { label: "Force", value: "500 N / 1000 N" },
      { label: "Control", value: "0 – 10 V modulating / 3-point" },
      { label: "Stroke", value: "15 mm / 20 mm" },
      { label: "Feedback", value: "2 – 10 V position feedback" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Heating circuits", "Chilled water circuits", "Air handling coils"],
    systems: ["actuators"],
    image: "/product-images/belimo-control-valve-actuator-1-0e6ceb3b.jpg",
    manufacturer: "Belimo",
    model: "LR24A-SR / NR24A-SR",
    sourceUrl: "https://www.belimo.com/",
    verified: true,
  },

  // ========================================================
  // DAMPERS
  // ========================================================
  {
    slug: "fire-smoke-combination-damper",
    name: "Fire & Smoke Combination Damper",
    category: "dampers",
    glyph: "damper",
    short: "Single assembly providing rated fire barrier closure and low-leakage smoke isolation.",
    description:
      "Combination fire/smoke damper providing both rated fire closure (up to 120 minutes) and low-leakage smoke containment in a single assembly, with motorized spring-return actuation and continuous end-switch position supervision.",
    specs: [
      { label: "Fire rating", value: "Up to 120 minutes fire barrier integrity" },
      { label: "Leakage class", value: "Class II / Class 3 low leakage" },
      { label: "Actuation", value: "Belimo spring-return actuator with thermal sensor" },
      { label: "Supervision", value: "Continuous dual microswitch position monitoring" },
      { label: "Test", value: "Automated periodic cycle test with recorded result" },
    ],
    applications: ["High-rise risers", "Hospitals", "Hotels", "Commercial towers"],
    systems: ["fs-dampers", "smoke-management"],
    manufacturer: "Actionair / Ruskin Line",
    model: "FSD-TD Series",
    verified: false,
  },
  {
    slug: "smoke-damper",
    name: "Smoke Damper (Low-Leakage)",
    category: "dampers",
    glyph: "damper",
    short: "Low-leakage damper for smoke isolation and extract control.",
    description:
      "Motorized low-leakage smoke damper used to isolate or direct smoke within a duct network, driven from the fire alarm cause-and-effect matrix with position supervision.",
    specs: [
      { label: "Leakage class", value: "Class 3 low leakage" },
      { label: "Actuation", value: "Motorized, spring return" },
      { label: "Sizes", value: "200 × 200 to 1500 × 1000 mm" },
      { label: "Feedback", value: "End switches, both positions" },
      { label: "Supply", value: "24 V AC/DC or 230 V AC" },
    ],
    applications: ["Smoke extract ducts", "Zone isolation", "Shaft protection"],
    systems: ["fs-dampers", "smoke-management"],
    manufacturer: "Actionair / Ruskin Line",
    model: "SD-LL Series",
    verified: false,
  },
  {
    slug: "fire-damper",
    name: "Fire Damper",
    category: "dampers",
    glyph: "damper",
    short: "Rated closure of duct penetrations through fire compartments.",
    description:
      "Fire damper installed where ductwork penetrates fire-resisting construction. Closes on thermal release or on command, maintaining the fire resistance of the compartment wall or floor.",
    specs: [
      { label: "Fire rating", value: "Up to 120 minutes" },
      { label: "Blade", value: "Galvanised steel, multi-blade" },
      { label: "Release", value: "Thermal fusible link or actuator" },
      { label: "Sizes", value: "200 × 200 to 1200 × 800 mm" },
      { label: "Feedback", value: "Optional end-switch monitoring" },
    ],
    applications: ["Compartment walls", "Riser penetrations", "Plant room boundaries"],
    systems: ["fs-dampers"],
    manufacturer: "Actionair / Ruskin Line",
    model: "FD-MB Series",
    verified: false,
  },
  {
    slug: "pressure-relief-damper",
    name: "Pressure Relief Damper",
    category: "dampers",
    glyph: "damper",
    short: "Holds shaft pressure within the permitted band.",
    description:
      "Barometric or motorized relief damper used on pressurization systems to discharge excess air, keeping the shaft pressure inside the design band and door-opening forces within limits.",
    specs: [
      { label: "Type", value: "Barometric or motorized counterbalanced" },
      { label: "Set pressure", value: "Adjustable 25 – 100 Pa" },
      { label: "Sizes", value: "400 × 400 to 1200 × 1200 mm" },
      { label: "Material", value: "Aluminium blade, galvanised frame" },
      { label: "Feedback", value: "Optional position signal" },
    ],
    applications: ["Stairway pressurization", "Lift lobby pressurization"],
    systems: ["pressurization-system", "smoke-management"],
    manufacturer: "Flamgard Calidair Line",
    model: "PRD-50",
    verified: false,
  },

  // ========================================================
  // CONTROLLERS & GATEWAYS
  // ========================================================
  {
    slug: "gateway-controller",
    name: "Life-Safety Gateway Controller",
    category: "controllers",
    glyph: "gateway",
    short: "Protocol translation between field devices and the supervisory platform.",
    description:
      "Gateway controller aggregating sensors, actuators and field controllers onto the building automation platform, translating between field buses, IP500 wireless and standard building protocols.",
    specs: [
      { label: "Protocols", value: "BACnet IP / MS/TP, Modbus RTU / TCP" },
      { label: "Wireless", value: "IP500 mesh interface" },
      { label: "Capacity", value: "Up to 250 field points" },
      { label: "Mounting", value: "DIN rail, panel mount" },
      { label: "Supply", value: "24 V DC" },
    ],
    applications: ["Car park ventilation", "Zone aggregation", "BMS integration"],
    systems: ["field-devices", "car-park-ventilation", "ip500-connectivity"],
    manufacturer: "Override-R / Contemporary Controls Line",
    model: "BASG-IP500",
    verified: false,
  },
  {
    slug: "edge-controller",
    name: "Edge Life-Safety Controller",
    category: "controllers",
    glyph: "controller",
    short: "Building-level sequencing, buffering and emergency analytics.",
    description:
      "Edge controller executing cross-zone sequences locally, buffering trend and event data through network outages, and providing a secure uplink to the supervisory platform.",
    specs: [
      { label: "Processor", value: "Quad-core industrial ARM" },
      { label: "Storage", value: "32 GB local event and trend buffer" },
      { label: "Interfaces", value: "2 × Ethernet, RS-485, USB" },
      { label: "Security", value: "Signed firmware, encrypted uplink" },
      { label: "Supply", value: "24 V DC, DIN rail" },
    ],
    applications: ["Building-wide sequencing", "Offline resilience", "Multi-system coordination"],
    systems: ["field-devices", "smoke-management"],
    manufacturer: "Override-R",
    model: "EDGE-LS-04",
    verified: false,
  },
  {
    slug: "field-controller",
    name: "Zone Field Controller",
    category: "controllers",
    glyph: "controller",
    short: "Zone-level control logic with local I/O.",
    description:
      "Programmable field controller executing zone ventilation, pressurization or damper logic on local I/O, so control continues even if the upstream network is unavailable.",
    specs: [
      { label: "I/O", value: "8 UI / 4 AO / 6 DO" },
      { label: "Protocols", value: "BACnet MS/TP, Modbus RTU" },
      { label: "Programming", value: "On-site configurable application logic" },
      { label: "Mounting", value: "DIN rail" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Zone ventilation", "AHU control", "Pressurization loops"],
    systems: ["ventilation-system", "pressurization-system"],
    manufacturer: "EasyIO / Innotech Line",
    model: "FS-32",
    verified: false,
  },
  {
    slug: "jet-fan-controller",
    name: "Jet Fan Staging Controller",
    category: "controllers",
    glyph: "fan",
    short: "Staged and reversible control of car park induction fans.",
    description:
      "Dedicated controller for car park jet fans, staging and reversing induction fans by zone in response to the CO/CO₂ sensor grid, with fan status and fault monitoring.",
    specs: [
      { label: "Outputs", value: "Up to 12 jet fan circuits" },
      { label: "Control", value: "Staged, reversible, speed-selectable" },
      { label: "Monitoring", value: "Run, fault and current status per fan" },
      { label: "Interface", value: "Gateway controller / BMS / FOP" },
      { label: "Mounting", value: "Panel mount" },
    ],
    applications: ["Basement car parks", "Multi-storey parking"],
    systems: ["car-park-ventilation", "smoke-exhaust"],
    manufacturer: "Override-R",
    model: "JFC-12",
    verified: false,
  },

  // ========================================================
  // FIELD INFRASTRUCTURE & ACCESSORIES
  // ========================================================
  {
    slug: "damper-monitoring-module",
    name: "Damper Monitoring & Test Module",
    category: "field-devices",
    glyph: "controller",
    short: "Addresses dampers for position feedback and periodic cycle testing.",
    description:
      "Monitoring module that gives each fire or smoke damper an address, reporting position, stroke time and fault state, and executing scheduled cycle tests without manual attendance.",
    specs: [
      { label: "Channels", value: "4 dampers per module" },
      { label: "Inputs", value: "Open / closed end switches" },
      { label: "Outputs", value: "Actuator drive per channel" },
      { label: "Test", value: "Scheduled cycle test with recorded result" },
      { label: "Supply", value: "24 V DC" },
    ],
    applications: ["Damper supervision", "Compliance testing", "Retrofit monitoring"],
    systems: ["fs-dampers", "field-devices"],
    manufacturer: "Actionair / Belimo Line",
    model: "BKN230-24",
    verified: false,
  },
  {
    slug: "air-quality-display-panel",
    name: "Air Quality Display Panel",
    category: "field-devices",
    glyph: "sensor",
    short: "Local display of zone air quality and system status.",
    description:
      "Wall-mounted display showing live CO, CO₂ and system status for a zone, giving facilities staff a local readout without opening the supervisory platform.",
    specs: [
      { label: "Display", value: "Backlit LCD, live values" },
      { label: "Inputs", value: "Bus or analogue sensor feeds" },
      { label: "Alarm", value: "Visual and volt-free alarm contact" },
      { label: "Mounting", value: "Surface wall mount" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Car park entries", "Plant rooms", "Facility offices"],
    systems: ["car-park-ventilation", "co2-monitors-controls"],
    manufacturer: "Override-R",
    model: "AQD-LCD-01",
    verified: false,
  },
  {
    slug: "power-supply-unit",
    name: "Supervised Power Supply Unit",
    category: "field-devices",
    glyph: "controller",
    short: "Monitored 24 V supply for field devices and controllers.",
    description:
      "DIN-rail power supply with supervision and optional battery backup for controllers, sensors and actuators, reporting supply and battery faults to the automation platform.",
    specs: [
      { label: "Output", value: "24 V DC, 5 / 10 A" },
      { label: "Backup", value: "Optional battery module" },
      { label: "Supervision", value: "Supply and battery fault contacts" },
      { label: "Mounting", value: "DIN rail" },
      { label: "Protection", value: "Short-circuit and overload protected" },
    ],
    applications: ["Control panels", "Field device power", "Retrofit upgrades"],
    systems: ["field-devices"],
    manufacturer: "PULS / Mean Well Line",
    model: "CP10.241-S1",
    verified: false,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategory(slug: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((category) => category.slug === slug);
}
