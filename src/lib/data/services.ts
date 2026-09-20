/** 
 * Seven-stage engineering lifecycle rendered across /services.
 * Strictly adheres to the Override-R engineering workflow:
 * 01 ENGINEER -> 02 CONTROL ARCHITECTURE -> 03 INTEGRATE -> 04 INSTALL -> 05 COMMISSION -> 06 VALIDATE -> 07 MAINTAIN
 */

export interface ServiceRecord {
  slug: string;
  number: string;
  stageName: string;
  title: string;
  summary: string;
  items: string[];
  deliverables: string[];
}

export const SERVICES: ServiceRecord[] = [
  {
    slug: "engineer",
    number: "01",
    stageName: "ENGINEER",
    title: "Smoke-Management System Design & Engineering",
    summary:
      "Comprehensive smoke-management engineering, computational fluid dynamics (CFD) airflow modeling, and zone boundary design in accordance with NFPA 92 and applicable building codes.",
    items: [
      "Smoke extraction volume & velocity calculations",
      "Stairway and hoistway pressurization design",
      "CFD smoke migration & tenability simulations",
      "Atrium smoke clearance & make-up air sizing",
      "Building geometry & fire compartmentation analysis",
    ],
    deliverables: [
      "Airflow, pressure & fan duty calculations",
      "CFD velocity & temperature distribution reports",
      "Mechanical smoke-control schematic drawings",
      "Equipment sizing and specification schedules",
    ],
  },
  {
    slug: "control-architecture",
    number: "02",
    stageName: "CONTROL ARCHITECTURE",
    title: "Fireman Override / FSCS Control Architecture",
    summary:
      "Engineering the Firefighters' Smoke Control Station (FSCS) and hardwired priority interlocks, guaranteeing deterministic firefighter manual command over all automated building systems.",
    items: [
      "Firefighters' Smoke Control Station (FSCS) engineering",
      "Architectural floor-by-floor mimic layout design",
      "Deterministic hardwired priority override logic",
      "Supervised LED status verification matrix",
      "Dual-redundant 24V DC / battery backup architecture",
    ],
    deliverables: [
      "FSCS panel wiring diagrams & faceplate engineering",
      "Hardware interlocking & priority ladder schematics",
      "Cause-and-effect control logic specifications",
      "Fail-safe power failure position tables",
    ],
  },
  {
    slug: "integrate",
    number: "03",
    stageName: "INTEGRATE",
    title: "Fans, Dampers, Actuators, Fire Alarm & BMS Integration",
    summary:
      "Unified integration of mechanical equipment, fire alarm control panels (FACP), BMS supervisory platforms, and field sensors over BACnet, Modbus, and IP500 wireless protocols.",
    items: [
      "Fire Alarm Control Panel (FACP) supervised relay links",
      "BMS supervisory gateway integration (BACnet/IP, Modbus)",
      "Belimo actuator signal wiring & feedback loops",
      "IP500 sub-GHz wireless sensor mesh network deployment",
      "Exhaust fan starter panel & VFD drive coordination",
    ],
    deliverables: [
      "Protocol interface & point mapping schedules",
      "Supervised input/output termination drawings",
      "Gateway configuration & object addressing files",
      "Cross-system integration test protocols",
    ],
  },
  {
    slug: "install",
    number: "04",
    stageName: "INSTALL",
    title: "Physical Installation & System Integration",
    summary:
      "Turnkey mechanical mounting, fire-rated cabling, sensor positioning, and control panel installation executed by certified life-safety technicians.",
    items: [
      "Fireman Override Panel (FSCS) enclosure mounting",
      "Belimo motorized fire/smoke damper actuator fitment",
      "Differential pressure sensor & sampling tube installation",
      "Fire-rated cabling, conduit runs & junction boxes",
      "Field controller and gateway panel terminations",
    ],
    deliverables: [
      "Physical installation & cable schedule records",
      "Terminal connection & wiring continuity logs",
      "Equipment mounting inspection sign-offs",
      "As-built layout and termination markups",
    ],
  },
  {
    slug: "commission",
    number: "05",
    stageName: "COMMISSION",
    title: "Point-by-Point Functional Testing & Commissioning",
    summary:
      "Methodical point-by-point functional commissioning, loop calibration, and electrical verification of every sensor, actuator end-switch, fan starter, and controller loop.",
    items: [
      "Actuator stroke time and end-switch calibration",
      "Differential pressure sensor zero & span calibration",
      "Electrical loop resistance & Fluke multimeter verification",
      "Fan VFD speed ramp and airflow proof confirmation",
      "Zone controller PID tuning for pressure stability",
    ],
    deliverables: [
      "Point-to-point electrical test records",
      "Damper travel & timing verification logs",
      "Sensor calibration certs with baseline readings",
      "Functional commissioning signed test sheets",
    ],
  },
  {
    slug: "validate",
    number: "06",
    stageName: "VALIDATE",
    title: "Sequence Verification, System Response & Firefighter Operation",
    summary:
      "Rigorous end-to-end cause-and-effect validation: initiating simulated fire alarms, measuring stair differential pressures, and verifying immediate manual firefighter override response.",
    items: [
      "Full cause-and-effect alarm matrix live execution",
      "Stairway door-opening force and differential pressure testing",
      "FSCS positive manual override emergency response testing",
      "Make-up air damper and smoke exhaust synchronisation",
      "Power failure fail-safe positioning verification",
    ],
    deliverables: [
      "Comprehensive system validation certificate pack",
      "Differential pressure vs door-opening force log sheets",
      "Firefighter manual override response time audits",
      "Authority Having Jurisdiction (AHJ) compliance pack",
    ],
  },
  {
    slug: "maintain",
    number: "07",
    stageName: "MAINTAIN",
    title: "Inspection, Servicing, Troubleshooting & Lifecycle AMC Support",
    summary:
      "Comprehensive annual maintenance contracts (AMC), scheduled damper cycle exercises, sensor recalibration, emergency troubleshooting, and obsolescence management.",
    items: [
      "Periodic automated damper exercise & stroke monitoring",
      "Annual differential pressure & gas sensor recalibration",
      "FSCS panel inspection, switch testing & LED audit",
      "Emergency fault attendance & corrective troubleshooting",
      "Firmware updates, component spares & lifecycle planning",
    ],
    deliverables: [
      "Annual preventive maintenance schedule & log",
      "Periodic inspection and recalibration certificates",
      "Emergency service response logs",
      "Spares inventory and obsolescence roadmaps",
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
