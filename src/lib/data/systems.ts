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
}

export const SYSTEMS: SystemRecord[] = [
  {
    slug: "ventilation-system",
    number: "01",
    title: "Ventilation System",
    short: "Ventilation",
    eyebrow: "Airflow Engineering",
    summary:
      "A complete ventilation solution combining sensors, actuators, controllers and field devices under one automation layer — from air-quality measurement through to fan and damper actuation.",
    capabilities: [
      "Demand-based supply and exhaust air control",
      "Continuous air-quality and airflow monitoring",
      "Automatic sequencing of fans, dampers and louvres",
      "Integration with the building automation platform",
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
    image: "/images/image_clean_room_1776602497882.png",
  },
  {
    slug: "car-park-ventilation",
    number: "02",
    title: "Car Park Ventilation",
    short: "Car Park Ventilation",
    eyebrow: "Enclosed Parking",
    summary:
      "Demand-controlled ventilation for enclosed and basement car parks. CO and CO₂ sensors drive jet fans, exhaust and supply fans automatically, holding contaminant levels within limits while cutting fan energy.",
    capabilities: [
      "CO and CO₂ sensor grid across every parking level",
      "Automatic jet fan and ventilation control",
      "Staged exhaust and supply fan operation",
      "Real-time monitoring with gateway/controller integration",
    ],
    components: [
      { name: "CO sensor", detail: "Electrochemical carbon monoxide measurement, the primary trigger for car park ventilation." },
      { name: "CO₂ sensor", detail: "NDIR carbon dioxide measurement for occupancy-driven air renewal." },
      { name: "Jet fan control", detail: "Directional induction fans sweeping contaminated air toward the exhaust shafts." },
      { name: "Exhaust & supply fans", detail: "Multi-stage or variable-speed main fans sized to the level's air-change requirement." },
      { name: "Gateway controller", detail: "Aggregates the sensor grid and drives the fan control logic per zone." },
    ],
    sequence: [
      { step: "Sense", detail: "The CO/CO₂ sensor grid scans each parking zone continuously." },
      { step: "Stage", detail: "Crossing the first threshold starts the jet fans in the affected zone only." },
      { step: "Escalate", detail: "Sustained or higher readings bring the main exhaust and supply fans to full duty." },
      { step: "Recover", detail: "Once levels return below setpoint the system steps back down and logs the event." },
    ],
    applications: ["Basement car parks", "Multi-storey parking", "Mixed-use podiums", "Airport parking"],
    image: "/images/image_warehouse_1776602527449.png",
  },
  {
    slug: "co2-monitors-controls",
    number: "03",
    title: "CO₂ Monitors & Controls",
    short: "CO₂ Controls",
    eyebrow: "Indoor Air Quality",
    summary:
      "Air-quality monitoring and demand-controlled ventilation. CO₂ sensors in occupied spaces drive fresh-air delivery automatically, with live readings and trends available to the building automation platform.",
    capabilities: [
      "NDIR CO₂ sensors for wall and duct mounting",
      "Continuous air-quality monitoring and trending",
      "Automatic ventilation control against CO₂ setpoints",
      "Real-time dashboards and building automation integration",
    ],
    components: [
      { name: "CO₂ sensors", detail: "Room, duct and outdoor reference sensors with analogue and bus outputs." },
      { name: "Controllers", detail: "Setpoint, dead-band and schedule logic per zone or air-handling unit." },
      { name: "Damper actuators", detail: "Fresh-air damper modulation proportional to measured CO₂." },
      { name: "Monitoring layer", detail: "Live values, trends and threshold alarms published to the platform." },
    ],
    sequence: [
      { step: "Measure", detail: "Zone CO₂ is sampled and compared against the occupied setpoint." },
      { step: "Modulate", detail: "Fresh-air dampers and fan speed track the measured demand." },
      { step: "Alarm", detail: "Sustained exceedance raises an alarm with the zone and the time of onset." },
      { step: "Trend", detail: "Historic data supports compliance reporting and ventilation tuning." },
    ],
    applications: ["Offices", "Classrooms", "Hospitals", "Conference and assembly spaces"],
    image: "/images/image_datacenter_1776602542119.png",
  },
  {
    slug: "pressurization-system",
    number: "04",
    title: "Pressurization System",
    short: "Pressurization",
    eyebrow: "Egress Protection",
    summary:
      "Controlled overpressure keeps escape routes clear of smoke. Differential pressure sensors, variable-speed supply fans and relief dampers hold the design pressure difference across stairways and lift lobbies.",
    capabilities: [
      "Differential pressure measurement across protected doors",
      "Variable-speed supply fan control with automatic tuning",
      "Pressure relief damper modulation",
      "Fire alarm interface and supervised operation",
    ],
    components: [
      { name: "Differential pressure sensors", detail: "Measure the pressure difference between the protected shaft and the adjacent space." },
      { name: "Supply fans with drives", detail: "Variable-speed pressurization fans delivering the design air volume." },
      { name: "Relief dampers", detail: "Barometric or motorised relief holding pressure within the permitted band." },
      { name: "Pressurization controller", detail: "Closed-loop control with fire alarm interface and status reporting." },
    ],
    sequence: [
      { step: "Trigger", detail: "A fire alarm signal starts the pressurization set for the affected shaft." },
      { step: "Pressurise", detail: "The supply fan ramps until the measured pressure difference reaches setpoint." },
      { step: "Regulate", detail: "Relief dampers and fan speed hold the band as doors open and close." },
      { step: "Supervise", detail: "Sensor, fan and damper status are monitored continuously and reported as faults." },
    ],
    applications: ["High-rise towers", "Hospitals", "Hotels", "Infrastructure projects"],
    image: "/images/image_smoke_panel_1776602463560.png",
    subsections: [
      {
        key: "stairway",
        label: "A. Stairway Pressurization",
        title: "Stairway Pressurization",
        body:
          "Stairways are the primary escape route in a tall building. Pressurization fans inject filtered outside air into the stair shaft so that its pressure stays above the adjacent lobby or corridor, preventing smoke from entering as occupants evacuate and as the fire service enters.",
        points: [
          "Design pressure difference maintained across the stair door",
          "Multi-injection or single-injection shaft arrangements",
          "Variable-speed fan control with door-opening pressure recovery",
          "Relief damper to prevent excess pressure and door-opening force issues",
          "Differential pressure sensors at top, middle and bottom of the shaft",
          "Weekly self-test and supervised fault reporting",
        ],
      },
      {
        key: "lift-lobby",
        label: "B. Lift Lobby Pressurization",
        title: "Lift Lobby Pressurization",
        body:
          "Lift lobbies and lift shafts form a continuous vertical path through a building. Pressurizing the lobby creates a protected transition zone between the accommodation and the lift or stair, keeping smoke out of the shaft and holding the lobby tenable for evacuation and fire-service access.",
        points: [
          "Per-floor lobby pressure control with zone dampers",
          "Coordinated control with stairway pressurization",
          "Lift shaft protection against smoke migration",
          "Motorised dampers with position feedback on every floor",
          "Floor-level differential pressure monitoring",
          "Integration with the fire alarm cause-and-effect matrix",
        ],
      },
    ],
  },
  {
    slug: "fs-dampers",
    number: "05",
    title: "F/S Dampers",
    short: "F/S Dampers",
    eyebrow: "Fire & Smoke Control",
    summary:
      "Fire dampers, smoke dampers and combination fire/smoke dampers with motorised actuation, end-switch position monitoring and supervised control from the automation platform.",
    capabilities: [
      "Fire, smoke and combined fire/smoke damper types",
      "Motorised actuation with spring-return fail-safe",
      "End-switch position monitoring and supervision",
      "Scheduled drop tests with recorded results",
    ],
    components: [
      { name: "Fire dampers", detail: "Rated closure of duct penetrations through fire-resisting construction." },
      { name: "Smoke dampers", detail: "Low-leakage dampers isolating or directing smoke within a duct network." },
      { name: "Fire/smoke combination dampers", detail: "Single assembly providing both rated fire closure and smoke isolation." },
      { name: "Damper actuators", detail: "Spring-return actuators with auxiliary switches and optional thermal release." },
      { name: "Monitoring modules", detail: "Address each damper for position feedback, test control and fault reporting." },
    ],
    sequence: [
      { step: "Normal", detail: "Dampers are held in their operating position with continuous position supervision." },
      { step: "Event", detail: "A fire alarm or thermal trigger drives the damper to its safe position." },
      { step: "Confirm", detail: "End switches confirm the achieved position back to the controller." },
      { step: "Test", detail: "Scheduled cycle tests exercise each damper and record stroke time and result." },
    ],
    applications: ["Commercial buildings", "Hospitals", "Residential towers", "Industrial facilities"],
    image: "/images/image_passive_fire_1776602447129.png",
  },
  {
    slug: "actuators",
    number: "06",
    title: "Actuators",
    short: "Actuators",
    eyebrow: "Field Actuation",
    summary:
      "Damper, valve and window actuation for ventilation, fire/smoke and building automation duties — including Belimo actuators specified, supplied and integrated as part of the control system.",
    capabilities: [
      "Damper, valve, window and fire/smoke damper actuation",
      "On/off, floating and modulating control signals",
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
    image: "/images/image_active_fire_1776602431065.png",
    subsections: [
      {
        key: "belimo",
        label: "Belimo Actuators",
        title: "Belimo Actuators",
        body:
          "Belimo actuators are used across our ventilation, pressurization and fire/smoke installations. The range covers rotary and linear damper drives, characterised control valves and dedicated fire/smoke damper actuators, all with consistent wiring, signal and feedback conventions that make system-wide integration predictable.",
        points: [
          "Applications: air dampers, control valves, fire/smoke dampers, VAV boxes",
          "Control: on/off, 3-point floating, 0–10 V modulating and bus-capable variants",
          "Reliability: spring-return fail-safe operation for life-safety duties",
          "Integration: position feedback and auxiliary switches wired to field controllers",
          "Selection support: torque, running time and mounting verified against the damper schedule",
        ],
      },
    ],
  },
  {
    slug: "field-devices",
    number: "07",
    title: "Field Devices",
    short: "Field Devices",
    eyebrow: "Hardware Layer",
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
    image: "/images/image_cfd_model_1776602481280.png",
  },
];

export interface FieldDevice {
  slug: string;
  name: string;
  category: DeviceCategory;
  summary: string;
  /** Matching product in the shop catalogue, when one exists. */
  productSlug?: string;
}

export const FIELD_DEVICES: FieldDevice[] = [
  {
    slug: "window-actuator",
    name: "Window Actuator",
    category: "Actuators",
    summary: "Chain and spindle drives for natural ventilation and smoke-vent windows.",
    productSlug: "window-actuator-chain-drive",
  },
  {
    slug: "fs-damper-actuator",
    name: "F/S Damper Actuator",
    category: "Actuators",
    summary: "Spring-return actuation with thermal release and auxiliary position switches.",
    productSlug: "fs-damper-actuator-spring-return",
  },
  {
    slug: "co2-sensor",
    name: "CO₂ Sensor",
    category: "Sensors",
    summary: "NDIR carbon dioxide measurement for room and duct mounting.",
    productSlug: "co2-sensor-room",
  },
  {
    slug: "co-sensor",
    name: "CO Sensor",
    category: "Sensors",
    summary: "Electrochemical carbon monoxide detection for car park ventilation control.",
    productSlug: "co-sensor-carpark",
  },
  {
    slug: "gateway-controller",
    name: "Gateway Controller",
    category: "Controllers",
    summary: "Protocol translation and aggregation between field devices and the platform.",
    productSlug: "gateway-controller",
  },
  {
    slug: "ip500",
    name: "IP500",
    category: "Network",
    summary: "Wireless mesh network nodes for building-wide field device connectivity.",
    productSlug: "ip500-node",
  },
  {
    slug: "fs-dampers",
    name: "F/S Dampers",
    category: "Dampers",
    summary: "Fire, smoke and combination dampers with supervised position feedback.",
    productSlug: "fire-smoke-combination-damper",
  },
  {
    slug: "edge-controller",
    name: "Edge Controller",
    category: "Controllers",
    summary: "Local compute for sequencing, buffering and analytics at the building edge.",
    productSlug: "edge-controller",
  },
  {
    slug: "differential-pressure-sensor",
    name: "Differential Pressure Sensor",
    category: "Sensors",
    summary: "Pressure difference measurement for pressurization and filter monitoring.",
    productSlug: "differential-pressure-sensor",
  },
  {
    slug: "jet-fan-controller",
    name: "Jet Fan Controller",
    category: "Controllers",
    summary: "Staged and reversible control of car park induction fans.",
    productSlug: "jet-fan-controller",
  },
  {
    slug: "duct-sensor",
    name: "Duct Temperature & Humidity Sensor",
    category: "Sensors",
    summary: "In-duct measurement for air handling and ventilation control loops.",
  },
  {
    slug: "damper-actuator",
    name: "Damper Actuator",
    category: "Actuators",
    summary: "Rotary modulating actuation for supply, exhaust and fresh-air dampers.",
    productSlug: "belimo-rotary-damper-actuator",
  },
];

export const DEVICE_CATEGORIES: DeviceCategory[] = [
  "Sensors",
  "Actuators",
  "Dampers",
  "Controllers",
  "Network",
];

/** Vertical control chain rendered on the Systems architecture diagram. */
export const ARCHITECTURE_LAYERS: { tier: string; title: string; detail: string; items: string[] }[] = [
  {
    tier: "L1",
    title: "Sensors / Field Devices",
    detail: "Measurement and detection at the point of use.",
    items: ["CO₂ / CO sensors", "Differential pressure", "Temperature & humidity", "Position switches"],
  },
  {
    tier: "L2",
    title: "Gateway / Field Controller",
    detail: "Local loop execution and protocol translation.",
    items: ["Zone control logic", "IP500 / bus interface", "Device supervision", "Point aggregation"],
  },
  {
    tier: "L3",
    title: "Edge Controller",
    detail: "Building-level sequencing, buffering and analytics.",
    items: ["Cross-zone sequences", "Offline event buffer", "Trend storage", "Secure uplink"],
  },
  {
    tier: "L4",
    title: "Building Automation / Control Platform",
    detail: "Supervision, scheduling, reporting and operator control.",
    items: ["Live dashboards", "Alarm management", "Scheduling", "Compliance reports"],
  },
  {
    tier: "L5",
    title: "Fans / Dampers / Actuators / Ventilation Equipment",
    detail: "The equipment the system drives.",
    items: ["Supply & exhaust fans", "Jet fans", "Fire & smoke dampers", "Window & valve actuators"],
  },
];

export function getSystem(slug: string) {
  return SYSTEMS.find((system) => system.slug === slug);
}
