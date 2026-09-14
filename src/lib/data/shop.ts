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
  /** Optional primary product image path (populated from DB / imported assets) */
  image?: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: "sensors",
    label: "Sensors",
    description: "CO₂, CO and environmental measurement for demand-controlled ventilation.",
  },
  {
    slug: "actuators",
    label: "Actuators",
    description: "Belimo, window and fire/smoke damper actuation across the torque range.",
  },
  {
    slug: "dampers",
    label: "Dampers",
    description: "Fire, smoke and combination dampers with supervised position feedback.",
  },
  {
    slug: "controllers",
    label: "Controllers",
    description: "Gateway, edge, field and IP500 controllers for the automation layer.",
  },
  {
    slug: "field-devices",
    label: "Other Field Devices",
    description: "Additional building automation and ventilation components.",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "co2-sensor-room",
    name: "CO₂ Sensor — Room Mount",
    category: "sensors",
    glyph: "sensor",
    short: "NDIR room CO₂ sensor for demand-controlled ventilation.",
    description:
      "Wall-mounted NDIR carbon dioxide sensor for occupied spaces. Provides a linear output to the zone controller so fresh-air delivery tracks actual occupancy instead of a fixed schedule.",
    specs: [
      { label: "Measurement", value: "NDIR, 0 – 2000 ppm" },
      { label: "Accuracy", value: "±30 ppm ±3 % of reading" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA / bus" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Mounting", value: "Wall, flush or surface" },
    ],
    applications: ["Offices", "Classrooms", "Meeting rooms", "Healthcare"],
    systems: ["co2-monitors-controls", "ventilation-system"],
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
    systems: ["car-park-ventilation"],
  },
  {
    slug: "differential-pressure-sensor",
    name: "Differential Pressure Sensor",
    category: "sensors",
    glyph: "sensor",
    short: "Pressure difference measurement for pressurization control.",
    description:
      "Differential pressure transmitter measuring across stair and lobby doors, and across filters and fans. The primary feedback element in a pressurization control loop.",
    specs: [
      { label: "Range", value: "0 – 100 / 0 – 500 Pa selectable" },
      { label: "Accuracy", value: "±1 % of full scale" },
      { label: "Output", value: "0 – 10 V / 4 – 20 mA" },
      { label: "Supply", value: "24 V AC/DC" },
      { label: "Connection", value: "6 mm pressure ports" },
    ],
    applications: ["Stairway pressurization", "Lift lobby pressurization", "Filter monitoring"],
    systems: ["pressurization-system"],
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
      { label: "Torque", value: "5 / 10 / 20 / 40 Nm" },
      { label: "Control", value: "On/off, 3-point, 0 – 10 V modulating" },
      { label: "Running time", value: "90 – 150 s, 90°" },
      { label: "Feedback", value: "0 – 10 V position signal" },
      { label: "Supply", value: "24 V AC/DC or 230 V AC" },
    ],
    applications: ["Air handling units", "Zone dampers", "Fresh-air intakes"],
    systems: ["actuators", "ventilation-system"],
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
      { label: "Force", value: "500 – 1000 N" },
      { label: "Control", value: "On/off, 3-point, 0 – 10 V modulating" },
      { label: "Stroke", value: "20 mm" },
      { label: "Feedback", value: "0 – 10 V position signal" },
      { label: "Supply", value: "24 V AC/DC" },
    ],
    applications: ["Heating circuits", "Chilled water circuits", "Air handling coils"],
    systems: ["actuators"],
  },
  {
    slug: "window-actuator-chain-drive",
    name: "Window Actuator — Chain Drive",
    category: "actuators",
    glyph: "window",
    short: "Chain drive for natural ventilation and smoke-vent windows.",
    description:
      "Chain-drive window actuator for automatic opening vents. Used for natural ventilation under the building automation schedule and for smoke-vent opening on a fire signal.",
    specs: [
      { label: "Stroke", value: "150 / 300 / 500 mm" },
      { label: "Force", value: "300 N push / pull" },
      { label: "Control", value: "24 V DC, on/off with end-position cut-off" },
      { label: "Feedback", value: "Open / closed position contacts" },
      { label: "Synchronisation", value: "Multi-drive tandem operation" },
    ],
    applications: ["Atrium vents", "Façade windows", "Smoke vents", "Natural ventilation"],
    systems: ["actuators", "field-devices"],
  },
  {
    slug: "fs-damper-actuator-spring-return",
    name: "F/S Damper Actuator — Spring Return",
    category: "actuators",
    glyph: "actuator",
    short: "Spring-return actuation for fire and smoke dampers.",
    description:
      "Spring-return actuator for fire and smoke dampers. On loss of power or on a fire signal the spring drives the damper to its safe position, with auxiliary switches confirming the achieved position.",
    specs: [
      { label: "Torque", value: "4 / 8 / 16 Nm" },
      { label: "Fail-safe", value: "Spring return < 20 s" },
      { label: "Thermal release", value: "72 °C / 95 °C options" },
      { label: "Auxiliary switches", value: "2 × SPDT end switches" },
      { label: "Supply", value: "24 V AC/DC or 230 V AC" },
    ],
    applications: ["Fire dampers", "Smoke dampers", "Combination F/S dampers"],
    systems: ["actuators", "fs-dampers"],
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
  },
  {
    slug: "smoke-damper",
    name: "Smoke Damper",
    category: "dampers",
    glyph: "damper",
    short: "Low-leakage damper for smoke isolation and extract control.",
    description:
      "Motorised low-leakage smoke damper used to isolate or direct smoke within a duct network, driven from the fire alarm cause-and-effect matrix with position supervision.",
    specs: [
      { label: "Leakage class", value: "Class 3 low leakage" },
      { label: "Actuation", value: "Motorised, spring return" },
      { label: "Sizes", value: "200 × 200 to 1500 × 1000 mm" },
      { label: "Feedback", value: "End switches, both positions" },
      { label: "Supply", value: "24 V AC/DC or 230 V AC" },
    ],
    applications: ["Smoke extract ducts", "Zone isolation", "Shaft protection"],
    systems: ["fs-dampers"],
  },
  {
    slug: "fire-smoke-combination-damper",
    name: "Fire & Smoke Combination Damper",
    category: "dampers",
    glyph: "damper",
    short: "Single assembly providing fire closure and smoke isolation.",
    description:
      "Combination fire/smoke damper providing both rated fire closure and low-leakage smoke isolation in a single assembly, with supervised actuation and position feedback to the controller.",
    specs: [
      { label: "Fire rating", value: "Up to 120 minutes" },
      { label: "Leakage class", value: "Class 3 low leakage" },
      { label: "Actuation", value: "Spring-return actuator, thermal release" },
      { label: "Supervision", value: "Continuous position monitoring" },
      { label: "Test", value: "Scheduled cycle test with recorded result" },
    ],
    applications: ["High-rise risers", "Hospitals", "Hotels", "Commercial towers"],
    systems: ["fs-dampers", "field-devices"],
  },
  {
    slug: "pressure-relief-damper",
    name: "Pressure Relief Damper",
    category: "dampers",
    glyph: "damper",
    short: "Holds shaft pressure within the permitted band.",
    description:
      "Barometric or motorised relief damper used on pressurization systems to discharge excess air, keeping the shaft pressure inside the design band and door-opening forces within limits.",
    specs: [
      { label: "Type", value: "Barometric or motorised" },
      { label: "Set pressure", value: "Adjustable 25 – 100 Pa" },
      { label: "Sizes", value: "400 × 400 to 1200 × 1200 mm" },
      { label: "Material", value: "Aluminium blade, galvanised frame" },
      { label: "Feedback", value: "Optional position signal" },
    ],
    applications: ["Stairway pressurization", "Lift lobby pressurization"],
    systems: ["pressurization-system"],
  },
  {
    slug: "gateway-controller",
    name: "Gateway Controller",
    category: "controllers",
    glyph: "gateway",
    short: "Protocol translation between field devices and the platform.",
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
    systems: ["field-devices", "car-park-ventilation"],
  },
  {
    slug: "edge-controller",
    name: "Edge Controller",
    category: "controllers",
    glyph: "controller",
    short: "Building-level sequencing, buffering and analytics.",
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
    systems: ["field-devices"],
  },
  {
    slug: "ip500-node",
    name: "IP500 Node",
    category: "controllers",
    glyph: "gateway",
    short: "Wireless mesh node for field device connectivity.",
    description:
      "IP500 wireless mesh node connecting field devices where cabling is impractical — particularly in retrofit work — with self-healing routing and encrypted transport.",
    specs: [
      { label: "Standard", value: "IP500 dual-band mesh" },
      { label: "Topology", value: "Self-healing mesh, multi-hop" },
      { label: "Security", value: "AES-128 encryption" },
      { label: "Battery option", value: "Long-life battery or 24 V DC" },
      { label: "Range", value: "Building-wide with mesh repeaters" },
    ],
    applications: ["Retrofit projects", "Damper monitoring", "Distributed sensing"],
    systems: ["field-devices"],
  },
  {
    slug: "field-controller",
    name: "Field Controller",
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
  },
  {
    slug: "jet-fan-controller",
    name: "Jet Fan Controller",
    category: "controllers",
    glyph: "fan",
    short: "Staged and reversible control of car park induction fans.",
    description:
      "Dedicated controller for car park jet fans, staging and reversing induction fans by zone in response to the CO/CO₂ sensor grid, with fan status and fault monitoring.",
    specs: [
      { label: "Outputs", value: "Up to 12 jet fan circuits" },
      { label: "Control", value: "Staged, reversible, speed-selectable" },
      { label: "Monitoring", value: "Run, fault and current status per fan" },
      { label: "Interface", value: "Gateway controller / BMS" },
      { label: "Mounting", value: "Panel mount" },
    ],
    applications: ["Basement car parks", "Multi-storey parking"],
    systems: ["car-park-ventilation"],
  },
  {
    slug: "damper-monitoring-module",
    name: "Damper Monitoring Module",
    category: "field-devices",
    glyph: "controller",
    short: "Addresses dampers for position feedback and cycle testing.",
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
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getCategory(slug: string): ShopCategory | undefined {
  return SHOP_CATEGORIES.find((category) => category.slug === slug);
}
