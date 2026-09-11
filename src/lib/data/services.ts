/** Service catalogue rendered as cards + expandable detail on /services. */

export interface ServiceRecord {
  slug: string;
  number: string;
  title: string;
  summary: string;
  items: string[];
  deliverables: string[];
}

export const SERVICES: ServiceRecord[] = [
  {
    slug: "system-design",
    number: "01",
    title: "System Design",
    summary:
      "Ventilation, pressurization and fire/smoke control designed against the building geometry, occupancy and the applicable code — with the automation architecture defined at the same time, not afterwards.",
    items: [
      "Ventilation system design",
      "Car park ventilation design",
      "Pressurization system design",
      "Fire/smoke control design",
      "Building automation design",
    ],
    deliverables: [
      "Airflow and pressure calculations",
      "Equipment and device schedules",
      "Control philosophy and cause-and-effect matrix",
      "Schematics and points list",
    ],
  },
  {
    slug: "engineering-integration",
    number: "02",
    title: "Engineering & Integration",
    summary:
      "Controllers programmed, sensors and actuators integrated, and the whole field layer brought onto the building automation platform through gateways and standard building protocols.",
    items: [
      "System integration",
      "Controller programming",
      "Sensor integration",
      "Actuator integration",
      "BMS integration",
      "Gateway integration",
    ],
    deliverables: [
      "Controller application software",
      "Protocol and point mapping",
      "Graphics and dashboard configuration",
      "Integration test records",
    ],
  },
  {
    slug: "installation-commissioning",
    number: "03",
    title: "Installation & Commissioning",
    summary:
      "Field devices and controllers installed to the schedule, then commissioned point by point until every loop, interlock and alarm behaves as the design intended.",
    items: [
      "Field device installation",
      "Controller installation",
      "System commissioning",
      "Testing",
      "Calibration",
    ],
    deliverables: [
      "Installation and cable records",
      "Point-to-point verification sheets",
      "Commissioning report",
      "Operator handover and training",
    ],
  },
  {
    slug: "testing-validation",
    number: "04",
    title: "Testing & Validation",
    summary:
      "Measured proof that the installed system performs: sensor accuracy, damper operation, pressure differentials and ventilation rates verified and documented against the design figures.",
    items: [
      "Sensor testing",
      "Damper testing",
      "Pressurization testing",
      "Ventilation testing",
      "Control-system validation",
    ],
    deliverables: [
      "Measured performance results",
      "Damper stroke and end-switch records",
      "Pressure differential test sheets",
      "Validation certificate pack",
    ],
  },
  {
    slug: "amc-maintenance",
    number: "05",
    title: "AMC / Maintenance",
    summary:
      "Planned maintenance contracts that keep the system in the condition it was handed over in — scheduled inspection, calibration, fault attendance and a managed upgrade path.",
    items: [
      "Preventive maintenance",
      "System inspection",
      "Troubleshooting",
      "Calibration",
      "Replacement of field devices",
      "System upgrades",
    ],
    deliverables: [
      "Planned maintenance schedule",
      "Inspection and calibration records",
      "Fault response and resolution log",
      "Spares and obsolescence plan",
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
