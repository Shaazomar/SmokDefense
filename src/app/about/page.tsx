import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { CallForDemo } from "@/components/demo/CallForDemo";
import { buttonClass } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Override-R engineers intelligent ventilation, building automation, fire & smoke control, pressurization, sensors, actuators and controllers for real buildings.",
};

const WHAT_WE_DO = [
  { title: "Ventilation", detail: "Demand-controlled supply, exhaust and car park ventilation." },
  { title: "Building Automation", detail: "Controllers, gateways and edge compute under one platform." },
  { title: "Fire & Smoke Control", detail: "Dampers, actuation and supervised position monitoring." },
  { title: "Pressurization", detail: "Stairway and lift lobby pressure control for protected egress." },
  { title: "Sensors", detail: "CO₂, CO, differential pressure, temperature and humidity." },
  { title: "Actuators", detail: "Damper, valve and window actuation including Belimo." },
  { title: "Controllers", detail: "Field, gateway and edge controllers including IP500." },
  { title: "Intelligent Building Systems", detail: "Systems that integrate rather than sit side by side." },
];

const APPROACH = [
  {
    title: "Reliable engineering",
    body: "Selections sized against the duty, not the catalogue. Torque, range, running time and fail-safe behaviour verified before anything is ordered.",
  },
  {
    title: "Automation with local autonomy",
    body: "Control loops run on the field controller. The platform schedules, reports and supervises — it never sits inside the loop that keeps a building safe.",
  },
  {
    title: "Safety as a design constraint",
    body: "Where life safety depends on a device, it fails to a defined safe position and reports that it got there.",
  },
  {
    title: "Integration by design",
    body: "Ventilation, pressurization and fire/smoke sequences are designed as one cause-and-effect matrix rather than three systems negotiating at handover.",
  },
  {
    title: "Built for the real building",
    body: "Access, maintainability and retrofit constraints are designed in, because a system that cannot be reached cannot be maintained.",
  },
];

const INDUSTRIES = [
  { label: "Hospitals", image: "/images/image_clean_room_1776602497882.png" },
  { label: "Commercial Buildings", image: "/images/image_datacenter_1776602542119.png" },
  { label: "Residential Buildings", image: "/images/image_passive_fire_1776602447129.png" },
  { label: "Shopping Malls", image: "/images/image_active_fire_1776602431065.png" },
  { label: "Airports", image: "/images/image_public_sector_1776603419378.png" },
  { label: "Industrial Facilities", image: "/images/image_warehouse_1776602527449.png" },
  { label: "Parking Facilities", image: "/images/image_maintenance_1776602512508.png" },
  { label: "Infrastructure Projects", image: "/images/image_cfd_model_1776602481280.png" },
];

export default function AboutPage() {
  return (
    <main className="bg-canvas">
      <PageHeader
        eyebrow="About"
        title="We build the systems buildings depend on."
        lead="Override-R designs, integrates and maintains intelligent ventilation, pressurization and fire & smoke control systems — from the sensor on the wall to the platform that supervises it."
        crumbs={[{ label: "About" }]}
        actions={<CallForDemo source="About Page" />}
      />

      {/* Who we are */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="// Who We Are" title="Building systems engineers." />
          </div>
          <div className="space-y-5 font-sans text-sm leading-relaxed text-ink-soft md:text-base lg:col-span-7">
            <p>
              Override-R is a building systems engineering company working across ventilation,
              pressurization, fire &amp; smoke control and building automation. We specify and supply
              the field hardware, write the control logic, commission the installation and maintain it
              afterwards.
            </p>
            <p>
              That combination is deliberate. Most problems we are called to fix are not device
              failures — they are gaps between the mechanical design, the controls contractor and the
              party who inherits the building. Holding the whole chain closes those gaps.
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="border-t border-line bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// What We Do"
            title="Eight disciplines, one system."
            lead="Every project draws on some combination of these; none of them is delivered in isolation."
          />
          <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_DO.map((item) => (
              <div key={item.title} className="bg-canvas p-6">
                <h3 className="font-display text-sm font-bold uppercase leading-tight tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[11px] leading-relaxed text-ink-soft">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-line bg-canvas px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="// Our Approach" title="How we engineer." />
          <div className="mt-10 border border-line bg-white">
            {APPROACH.map((item, index) => (
              <div
                key={item.title}
                className="grid grid-cols-1 gap-4 border-b border-line p-6 last:border-b-0 md:grid-cols-12 md:gap-8 md:p-8"
              >
                <div className="flex items-start gap-4 md:col-span-4">
                  <span className="font-mono text-[11px] font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-base font-bold uppercase leading-tight tracking-tight text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-xs leading-relaxed text-ink-soft md:col-span-8 md:text-sm">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-line bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="// Industries & Applications"
            title="Where these systems run."
          />
          <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <div key={industry.label} className="group relative aspect-4/3 overflow-hidden bg-canvas">
                <Image
                  src={industry.image}
                  alt={industry.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-ink/45" />
                <span className="absolute inset-x-0 bottom-0 p-4 font-mono text-[11px] font-bold uppercase tracking-wider text-white">
                  {industry.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-canvas px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 border border-line bg-white p-10 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              {"// "}Talk to Our Team
            </span>
            <h2 className="mt-2 max-w-xl font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink md:text-2xl">
              Bring us a drawing, a problem, or a building.
            </h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Link href="/contact" className={buttonClass("primary")}>
              Talk to Our Team →
            </Link>
            <CallForDemo source="About Page CTA" variant="secondary" />
          </div>
        </div>
      </section>

      <ClosingCTA source="About Page" secondary={{ href: "/systems", label: "Explore Systems" }} />
    </main>
  );
}
