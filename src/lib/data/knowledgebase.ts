/**
 * Knowledgebase content. Article records are intentionally flat and
 * serialisable so this file can be swapped for a CMS or database query
 * without changing the page components.
 */

export interface KbCategory {
  slug: string;
  label: string;
  description: string;
}

export interface KbArticle {
  slug: string;
  title: string;
  category: string;
  description: string;
  date: string;
  readTime: string;
  sections: { heading: string; body: string }[];
  related?: string[];
}

export const KB_CATEGORIES: KbCategory[] = [
  { slug: "technical-guides", label: "Technical Guides", description: "How the systems work and how they are engineered." },
  { slug: "product-guides", label: "Product Guides", description: "Selection and specification of sensors, actuators and controllers." },
  { slug: "installation-guides", label: "Installation Guides", description: "Mounting, wiring and setting-to-work in the field." },
  { slug: "system-design-guides", label: "System Design Guides", description: "Sizing, calculation and control philosophy." },
  { slug: "application-notes", label: "Application Notes", description: "Building-type specific guidance and worked examples." },
  { slug: "faqs", label: "FAQs", description: "Short answers to the questions we are asked most." },
  { slug: "case-studies", label: "Case Studies", description: "Delivered projects and measured outcomes." },
  { slug: "standards-compliance", label: "Standards & Compliance", description: "Codes, testing regimes and documentation requirements." },
  { slug: "troubleshooting", label: "Troubleshooting", description: "Diagnosing faults in installed systems." },
];

export const KB_ARTICLES: KbArticle[] = [
  {
    slug: "how-car-park-ventilation-control-works",
    title: "How Car Park Ventilation Control Works",
    category: "technical-guides",
    description:
      "The sensing, staging and fan control chain that keeps CO levels inside an enclosed car park within limits while minimising fan energy.",
    date: "2026-07-14",
    readTime: "8 min",
    sections: [
      {
        heading: "Why demand control",
        body: "Running car park fans continuously at full duty meets the ventilation requirement but wastes a substantial amount of energy, because a car park is only contaminated for short periods around arrival and departure peaks. Demand control measures the contaminant directly and runs the fans only as hard as the measurement requires.",
      },
      {
        heading: "The sensor grid",
        body: "CO sensors are distributed so that every part of the parking level is represented, typically one sensor per 400 m² with additional coverage at ramps, lift lobbies and dead ends where air movement is poorest. CO₂ sensors are added where the ventilation also serves occupancy, such as attached plant or storage rooms.",
      },
      {
        heading: "Staging the fans",
        body: "Control is staged rather than binary. The first threshold starts the jet fans in the affected zone, sweeping air toward the exhaust shaft. If the reading does not fall, or a higher threshold is crossed, the main exhaust and supply fans step up to full duty. Once the measurement drops back below setpoint for a confirmation period, the system steps down in the same order.",
      },
      {
        heading: "Monitoring and records",
        body: "Every stage change, alarm and fan fault is timestamped and reported through the gateway controller. This record is what demonstrates the system was operating correctly, and it is also the data used to tune thresholds after the first few months of occupancy.",
      },
    ],
    related: ["stairway-pressurization-design-basics", "commissioning-a-co2-sensor-grid"],
  },
  {
    slug: "stairway-pressurization-design-basics",
    title: "Stairway Pressurization Design Basics",
    category: "system-design-guides",
    description:
      "Design pressure differences, air release, door-opening force and the fan control strategy that holds the band as doors open and close.",
    date: "2026-06-30",
    readTime: "10 min",
    sections: [
      {
        heading: "What the system has to achieve",
        body: "A pressurization system has two competing duties. With all doors closed it must hold a pressure difference across the stair door high enough to stop smoke passing. With a defined number of doors open it must maintain an air velocity through the open doorway. The design has to satisfy both without exceeding the maximum permitted door-opening force.",
      },
      {
        heading: "Air injection and release",
        body: "Air is injected into the shaft either at a single point or at multiple levels. Multi-injection distributes the air more evenly and reduces the pressure gradient over the height of the shaft. Whatever the arrangement, an air release path is essential — without it the shaft over-pressurises as soon as the doors close and the doors become difficult to open.",
      },
      {
        heading: "Control strategy",
        body: "Differential pressure sensors at the top, middle and bottom of the shaft feed a closed-loop controller driving the fan through a variable-speed drive. When a door opens the pressure collapses and the controller ramps the fan; when it closes the controller must reduce speed quickly enough to avoid overshoot. Tuning this recovery behaviour is the bulk of the commissioning effort.",
      },
      {
        heading: "Testing",
        body: "Acceptance testing measures the pressure difference with all doors closed, the air velocity through the specified open doors, and the force required to open the door. All three are recorded per stair and per floor, and they form the baseline that later maintenance tests are compared against.",
      },
    ],
    related: ["lift-lobby-pressurization-explained", "pressurization-test-documentation"],
  },
  {
    slug: "lift-lobby-pressurization-explained",
    title: "Lift Lobby Pressurization Explained",
    category: "technical-guides",
    description:
      "Why the lobby is treated as a protected transition zone, and how lobby control is coordinated with stairway pressurization.",
    date: "2026-06-12",
    readTime: "7 min",
    sections: [
      {
        heading: "The lobby as a buffer",
        body: "A lift lobby sits between the accommodation and the vertical shafts. Pressurising it creates a buffer that has to be crossed before smoke can reach the lift shaft or the stair, which both protects the shaft and keeps the lobby itself tenable for evacuation and fire-service access.",
      },
      {
        heading: "Per-floor control",
        body: "Unlike a stair shaft, which is one continuous volume, lobbies are discrete per floor. Each floor is served through a motorised zone damper with position feedback, so the system can pressurise the fire floor and the floors immediately above and below rather than the whole building at once.",
      },
      {
        heading: "Coordination with the stair",
        body: "Stair and lobby systems must be designed together. If both are pressurised to similar values the flow path between them collapses, so the cause-and-effect matrix defines the target pressure for each zone in each fire scenario rather than treating the two systems independently.",
      },
    ],
    related: ["stairway-pressurization-design-basics"],
  },
  {
    slug: "selecting-a-damper-actuator",
    title: "Selecting a Damper Actuator",
    category: "product-guides",
    description:
      "Working from damper size and type to the right torque, running time, signal type and fail-safe behaviour.",
    date: "2026-05-28",
    readTime: "6 min",
    sections: [
      {
        heading: "Start from the damper",
        body: "Torque requirement follows from the damper area, blade type and the seal. Multiply the damper area by the manufacturer's torque figure per square metre, then add margin for the seal and for the mounting arrangement. Undersizing shows up as a damper that stalls part-way and reports a position fault.",
      },
      {
        heading: "Running time and control signal",
        body: "Running time determines how quickly the damper can respond. Modulating control loops need a running time short enough to keep the loop stable but long enough to avoid hunting. Choose the signal type — on/off, 3-point floating or 0 – 10 V — to match the controller output available on the point schedule.",
      },
      {
        heading: "Fail-safe behaviour",
        body: "For life-safety duties the actuator must drive the damper to a defined safe position on loss of power. Spring-return actuators do this mechanically and are the default for fire and smoke dampers. For comfort ventilation, a non-spring actuator is usually appropriate and considerably cheaper.",
      },
    ],
    related: ["installing-fire-and-smoke-dampers", "how-car-park-ventilation-control-works"],
  },
  {
    slug: "choosing-co2-sensor-placement",
    title: "Choosing CO₂ Sensor Placement",
    category: "product-guides",
    description:
      "Mounting height, distance from diffusers and doors, and when to use duct sensors instead of room sensors.",
    date: "2026-05-15",
    readTime: "5 min",
    sections: [
      {
        heading: "Room sensors",
        body: "Mount room CO₂ sensors in the breathing zone, typically 1.2 to 1.5 m above floor level, on an internal wall. Keep them away from supply diffusers, doors, windows and any location where a person would exhale directly onto the sensor, all of which produce readings that do not represent the space.",
      },
      {
        heading: "Duct sensors",
        body: "Where a single air handling unit serves a homogeneous area, a return-duct sensor gives a representative average at a lower installed cost than sensors in every room. Where zones have very different occupancy patterns, room sensors are necessary because the duct average hides the peaks.",
      },
      {
        heading: "Reference measurement",
        body: "An outdoor reference sensor lets the control logic work on the difference between indoor and outdoor CO₂ rather than an absolute value, which makes the ventilation response consistent regardless of ambient background concentration.",
      },
    ],
    related: ["commissioning-a-co2-sensor-grid"],
  },
  {
    slug: "installing-fire-and-smoke-dampers",
    title: "Installing Fire and Smoke Dampers",
    category: "installation-guides",
    description:
      "Installation frames, access provision, actuator orientation and the wiring conventions that make later supervision possible.",
    date: "2026-04-22",
    readTime: "9 min",
    sections: [
      {
        heading: "Frames and penetrations",
        body: "The damper's fire rating is only achieved if it is installed in the tested arrangement. That means the correct installation frame, the specified gap and packing around the penetration, and no duct loads carried through the damper body.",
      },
      {
        heading: "Access",
        body: "Every damper needs an access panel large enough to reach the actuator, the release mechanism and the end switches. Access that is designed in at installation costs a fraction of the access that has to be cut into a finished ceiling during the first maintenance visit.",
      },
      {
        heading: "Wiring for supervision",
        body: "Wire both end switches, not just one. Position supervision that reads only the closed switch cannot distinguish between a damper that is open and a damper whose linkage has failed part-way. Label the cable at both ends against the damper schedule reference.",
      },
    ],
    related: ["selecting-a-damper-actuator", "damper-not-reporting-position"],
  },
  {
    slug: "commissioning-a-co2-sensor-grid",
    title: "Commissioning a CO₂ Sensor Grid",
    category: "installation-guides",
    description:
      "Verification order, calibration checks and the setpoint tuning that turns a working installation into a working system.",
    date: "2026-04-05",
    readTime: "7 min",
    sections: [
      {
        heading: "Verify before you tune",
        body: "Confirm every sensor reports to the correct point on the controller before adjusting any setpoint. A grid where two sensors are transposed will appear to work in test and behave unpredictably in occupancy.",
      },
      {
        heading: "Calibration check",
        body: "Check each sensor against a reference instrument in clean outdoor air. Sensors reading consistently high or low against the reference should be adjusted or replaced before handover, not left for the first maintenance visit.",
      },
      {
        heading: "Tuning the response",
        body: "Set the dead-band wide enough that normal occupancy variation does not cycle the dampers, and the ramp rate slow enough that the ventilation response is not audible in the space. Record the final values in the commissioning report so later changes can be traced.",
      },
    ],
    related: ["choosing-co2-sensor-placement", "how-car-park-ventilation-control-works"],
  },
  {
    slug: "designing-demand-controlled-ventilation",
    title: "Designing Demand-Controlled Ventilation",
    category: "system-design-guides",
    description:
      "Zoning, setpoints and minimum fresh-air rates when ventilation follows measured demand rather than a fixed schedule.",
    date: "2026-03-19",
    readTime: "9 min",
    sections: [
      {
        heading: "Zoning",
        body: "A demand-controlled zone should contain spaces with a similar occupancy profile served by a common air path. Mixing a meeting room and an open office on one zone forces the control to satisfy the worst case, which removes most of the benefit of measuring demand at all.",
      },
      {
        heading: "Minimum rates",
        body: "Demand control modulates between a minimum and a maximum, it does not switch ventilation off. The minimum rate must still cover building-related emissions and any process requirement in the space, independent of occupancy.",
      },
      {
        heading: "Control architecture",
        body: "Keep the loop local. The zone controller should be able to hold its own setpoint using its own sensor and actuator even when the supervisory network is unavailable; the platform layer schedules, reports and adjusts setpoints but should not sit inside the control loop.",
      },
    ],
    related: ["choosing-co2-sensor-placement", "building-automation-integration-checklist"],
  },
  {
    slug: "building-automation-integration-checklist",
    title: "Building Automation Integration Checklist",
    category: "system-design-guides",
    description:
      "Point naming, protocol selection, alarm priorities and the documentation that makes an integration maintainable.",
    date: "2026-03-02",
    readTime: "6 min",
    sections: [
      {
        heading: "Agree the points list first",
        body: "The points list is the contract between the mechanical system and the automation system. Agree it before any controller is programmed, including point names, units, ranges and which side owns each piece of logic.",
      },
      {
        heading: "Naming convention",
        body: "Use a consistent naming convention that encodes building, level, system and device. A point named to a convention can be found by a technician who has never seen the site; a point named ad-hoc cannot.",
      },
      {
        heading: "Alarm priorities",
        body: "Assign priorities deliberately. If every fault raises a high-priority alarm, operators learn to ignore the alarm list, and the one alarm that mattered is lost in the noise.",
      },
    ],
    related: ["designing-demand-controlled-ventilation"],
  },
  {
    slug: "ventilation-for-hospitals",
    title: "Ventilation and Pressure Control for Hospitals",
    category: "application-notes",
    description:
      "Pressure relationships between clinical spaces, and how ventilation control interacts with fire and smoke strategy.",
    date: "2026-02-18",
    readTime: "8 min",
    sections: [
      {
        heading: "Pressure relationships",
        body: "Clinical spaces depend on directional airflow: isolation rooms at negative pressure to the corridor, operating theatres at positive. These relationships must hold continuously, which makes measurement and alarm as important as the fan and damper hardware.",
      },
      {
        heading: "Interaction with smoke control",
        body: "A smoke control sequence will override normal ventilation. The cause-and-effect matrix must define what happens to each clinical pressure relationship in each fire scenario, and this needs to be agreed with the clinical and fire engineering teams rather than assumed by the controls contractor.",
      },
      {
        heading: "Continuity",
        body: "Hospitals rarely tolerate system downtime for maintenance. Design for device replacement and calibration under partial isolation, with enough redundancy that a single controller or sensor failure does not take a department out of service.",
      },
    ],
    related: ["designing-demand-controlled-ventilation"],
  },
  {
    slug: "ventilation-for-shopping-malls",
    title: "Ventilation and Smoke Control for Shopping Malls",
    category: "application-notes",
    description:
      "Large-volume spaces, atrium behaviour and coordinating car park ventilation with the mall ventilation strategy.",
    date: "2026-02-04",
    readTime: "7 min",
    sections: [
      {
        heading: "Large volumes",
        body: "Malls combine very large connected volumes with high and variable occupancy. Ventilation control must handle a peak occupancy many times the average without oversizing plant for a condition that occurs a few hours per week.",
      },
      {
        heading: "Atrium and smoke reservoirs",
        body: "Atria form natural smoke reservoirs. The smoke control strategy uses that behaviour, and the ventilation control must not work against it — which means the ventilation and smoke control sequences are designed as one matrix, not two.",
      },
      {
        heading: "Car park coordination",
        body: "Mall car parks are usually directly connected to the retail volume. Car park ventilation staging and the mall's smoke strategy need a defined interface so that a car park event does not push contaminated air into the retail space.",
      },
    ],
    related: ["how-car-park-ventilation-control-works"],
  },
  {
    slug: "faq-ventilation-systems",
    title: "FAQ: Ventilation and Air Quality Systems",
    category: "faqs",
    description:
      "Common questions on sensor life, calibration intervals, retrofit feasibility and integration with existing BMS platforms.",
    date: "2026-01-21",
    readTime: "4 min",
    sections: [
      {
        heading: "How long do CO₂ and CO sensors last?",
        body: "NDIR CO₂ sensors typically remain within specification for 10 to 15 years with periodic calibration checks. Electrochemical CO sensors have a finite cell life, usually 5 to 7 years, and the cell is replaced rather than the whole device.",
      },
      {
        heading: "How often should sensors be calibrated?",
        body: "An annual calibration check is the normal interval for both CO and CO₂ sensors in a maintained system. Car park CO sensors in heavy-use locations are sometimes checked every six months.",
      },
      {
        heading: "Can this be retrofitted into an existing building?",
        body: "Yes. Retrofit is usually a matter of adding sensors and controllers to existing fans and dampers. Where cabling routes are impractical, IP500 wireless nodes connect field devices without disruptive containment work.",
      },
      {
        heading: "Will it integrate with our existing BMS?",
        body: "The gateway controller presents the system over standard building protocols, so points appear on the existing BMS alongside the rest of the estate. Which side owns the control logic is agreed at design stage.",
      },
    ],
  },
  {
    slug: "faq-fire-smoke-dampers",
    title: "FAQ: Fire and Smoke Dampers",
    category: "faqs",
    description:
      "Damper types, testing frequency, position monitoring and what supervision actually proves.",
    date: "2026-01-08",
    readTime: "4 min",
    sections: [
      {
        heading: "What is the difference between a fire damper and a smoke damper?",
        body: "A fire damper maintains the fire resistance of a compartment boundary where a duct passes through it. A smoke damper controls the movement of smoke within a duct system. A combination damper does both in one assembly.",
      },
      {
        heading: "How often do dampers need testing?",
        body: "Dampers are typically tested annually, with more frequent testing in critical applications. Systems with monitoring modules can run scheduled cycle tests automatically and record the result, which substantially reduces the manual test burden.",
      },
      {
        heading: "What does position monitoring prove?",
        body: "Monitoring both end switches proves the damper actually reached the commanded position within the expected stroke time. A single switch, or an actuator command with no feedback, proves only that a signal was sent.",
      },
    ],
  },
  {
    slug: "case-study-mixed-use-tower",
    title: "Case Study: Mixed-Use Tower, Pressurization and Car Park Ventilation",
    category: "case-studies",
    description:
      "Stair and lobby pressurization across 32 floors with demand-controlled ventilation in a four-level basement car park.",
    date: "2025-12-10",
    readTime: "6 min",
    sections: [
      {
        heading: "Scope",
        body: "Stairway and lift lobby pressurization across 32 occupied floors, demand-controlled ventilation in a four-level basement car park, and supervision of 340 fire and smoke dampers, all reporting to a single automation platform.",
      },
      {
        heading: "Approach",
        body: "Pressurization loops were kept local to the shaft controllers so that control continues independently of the network. Car park ventilation was zoned per level with a CO sensor grid driving staged jet fan and main fan operation. Damper monitoring modules addressed each damper for automated cycle testing.",
      },
      {
        heading: "Outcome",
        body: "Car park fan running hours fell substantially against the previous continuous-run assumption, and the annual damper test that had required manual attendance at each device became a scheduled automated test with a generated report.",
      },
    ],
  },
  {
    slug: "case-study-hospital-retrofit",
    title: "Case Study: Hospital Ventilation Retrofit",
    category: "case-studies",
    description:
      "Adding air-quality monitoring and demand control to an operating hospital without clinical downtime.",
    date: "2025-11-19",
    readTime: "6 min",
    sections: [
      {
        heading: "Constraint",
        body: "The building could not be taken out of service. Every intervention had to be reversible within a single shift, and no clinical area could lose its pressure relationship at any point during the works.",
      },
      {
        heading: "Approach",
        body: "IP500 wireless nodes connected new sensors without new containment through occupied clinical corridors. Zones were migrated one at a time, with the existing control retained as a fallback until each zone had been verified under the new logic.",
      },
      {
        heading: "Outcome",
        body: "Air-quality monitoring was extended across the estate with no clinical downtime, and pressure relationships in critical areas moved from periodic manual checks to continuous monitored values with alarms.",
      },
    ],
  },
  {
    slug: "pressurization-test-documentation",
    title: "Pressurization Test Documentation",
    category: "standards-compliance",
    description:
      "What to record during pressurization acceptance testing, and how those records support later maintenance testing.",
    date: "2025-10-28",
    readTime: "5 min",
    sections: [
      {
        heading: "What gets recorded",
        body: "For each stair and lobby: pressure difference with all doors closed, air velocity through the specified open doorway, door-opening force, fan speed and drive frequency at the tested condition, and the ambient conditions at the time of test.",
      },
      {
        heading: "Why the baseline matters",
        body: "Maintenance testing is a comparison, not an absolute check. Without the acceptance baseline there is no way to tell whether a measured value represents drift in the system or simply a different set of ambient conditions.",
      },
      {
        heading: "Keeping records usable",
        body: "Records should be issued in a form that can be searched and compared across visits. A scanned sheet in a folder satisfies the handover requirement but is of little use to the technician diagnosing a fault three years later.",
      },
    ],
    related: ["stairway-pressurization-design-basics"],
  },
  {
    slug: "compliance-documentation-pack",
    title: "Building the Compliance Documentation Pack",
    category: "standards-compliance",
    description:
      "The as-built, test and maintenance records that should be issued with a ventilation and smoke control installation.",
    date: "2025-10-07",
    readTime: "5 min",
    sections: [
      {
        heading: "As-built information",
        body: "Device schedules with final addresses and locations, updated schematics, the points list as commissioned, and the control philosophy as it was actually implemented rather than as originally drafted.",
      },
      {
        heading: "Test records",
        body: "Point-to-point verification sheets, damper stroke and end-switch records, pressure differential results, sensor calibration certificates and the cause-and-effect demonstration record.",
      },
      {
        heading: "Ongoing obligations",
        body: "The pack should state the maintenance and test regime the system requires, the intervals, and the records that need to be kept — so that the obligation transfers cleanly to whoever maintains the building.",
      },
    ],
  },
  {
    slug: "damper-not-reporting-position",
    title: "Troubleshooting: Damper Not Reporting Position",
    category: "troubleshooting",
    description:
      "Working from a position fault back through end switches, actuator drive, wiring and the mechanical linkage.",
    date: "2025-09-23",
    readTime: "6 min",
    sections: [
      {
        heading: "Confirm the fault is real",
        body: "Check whether the controller is reporting no position, or conflicting positions from both switches. Conflicting switches almost always indicate a wiring or switch adjustment problem rather than a damper failure.",
      },
      {
        heading: "Check the drive",
        body: "Verify the actuator is receiving its command signal and supply voltage at the device, not at the panel. A shared supply that sags when several actuators drive simultaneously produces intermittent faults that are hard to reproduce on a single-device test.",
      },
      {
        heading: "Check the mechanics",
        body: "Increasing stroke time trended over months is the usual precursor to a stall. If the stroke time has been drifting upward, the linkage or the damper bearings need attention regardless of whether the damper still reaches position today.",
      },
    ],
    related: ["installing-fire-and-smoke-dampers"],
  },
  {
    slug: "unstable-pressurization-control",
    title: "Troubleshooting: Unstable Pressurization Control",
    category: "troubleshooting",
    description:
      "Hunting fans, pressure overshoot on door closure and sensor tubing problems in pressurization loops.",
    date: "2025-09-02",
    readTime: "6 min",
    sections: [
      {
        heading: "Hunting",
        body: "A fan that cycles up and down continuously usually indicates loop gain set too high for the shaft volume, or a sensor placed where it sees turbulence rather than shaft pressure. Reduce gain first; relocate the sensor only if reduced gain produces a sluggish response.",
      },
      {
        heading: "Overshoot on door closure",
        body: "Pressure spiking when a door closes points at relief capacity. Check that the relief damper is free, correctly set and not obstructed on the discharge side before adjusting the control loop.",
      },
      {
        heading: "Sensor tubing",
        body: "Long, kinked or disconnected sensing tubes produce readings that lag or simply do not represent the measured location. Inspect tubing before concluding that the transmitter is faulty.",
      },
    ],
    related: ["stairway-pressurization-design-basics"],
  },
];

export function getArticle(slug: string) {
  return KB_ARTICLES.find((article) => article.slug === slug);
}

export function getKbCategory(slug: string) {
  return KB_CATEGORIES.find((category) => category.slug === slug);
}

export function formatArticleDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
