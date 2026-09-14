/**
 * Single source of truth for company identity, navigation and contact details.
 * Replace the CONTACT block with live company details before launch.
 */

export const SITE = {
  name: "Override-R",
  wordmark: { lead: "OVERRIDE", accent: "-R" },
  tagline: "Intelligent Building Systems",
  description:
    "Intelligent ventilation, pressurization, fire & smoke control, sensors, actuators, controllers and building automation systems.",
};

export const CONTACT = {
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  email: "info@override-r.com",
  emailHref: "mailto:info@override-r.com",
  address: ["Override-R Building Systems", "Unit 04, Technology Park", "Bengaluru 560100, India"],
  hours: "Mon – Sat / 09:00 – 18:00 IST",
};

export const SOCIALS: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "X", href: "https://x.com/" },
];

export const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/systems", label: "Systems" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/knowledgebase", label: "Knowledgebase" },
  { href: "/about", label: "About" },
];

export const FOOTER_COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Systems",
    links: [
      { href: "/systems/ventilation-system", label: "Ventilation" },
      { href: "/systems/car-park-ventilation", label: "Car Park Ventilation" },
      { href: "/systems/co2-monitors-controls", label: "CO₂ Controls" },
      { href: "/systems/pressurization-system", label: "Pressurization" },
      { href: "/systems/fs-dampers", label: "F/S Dampers" },
      { href: "/systems/actuators", label: "Actuators" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/shop?category=sensors", label: "Sensors" },
      { href: "/shop?category=actuators", label: "Actuators" },
      { href: "/shop?category=controllers", label: "Controllers" },
      { href: "/shop?category=dampers", label: "Dampers" },
      { href: "/shop?category=field-devices", label: "Field Devices" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/knowledgebase", label: "Knowledgebase" },
      { href: "/knowledgebase?category=technical-guides", label: "Technical Guides" },
      { href: "/knowledgebase?category=faqs", label: "FAQs" },
      { href: "/knowledgebase?category=case-studies", label: "Case Studies" },
    ],
  },
];
