import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas px-6 py-16 font-mono text-xs text-ink-soft md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 border-b border-line pb-12">
          {/* Col 1: Brand & Core Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
              SMOK<span className="text-accent">DEFENSE</span>
            </Link>
            <p className="font-sans text-xs text-ink-soft leading-relaxed max-w-sm">
              The digital intelligence layer for complex building life-safety systems. Connecting professional smoke-control hardware, building networks, and centralized software into one operational platform.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-ink-faint pt-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>SYSTEM READY // NETWORK ONLINE</span>
            </div>
          </div>

          {/* Col 2: Solutions & SEO Pages */}
          <div className="space-y-3">
            <span className="font-bold text-ink uppercase text-[11px]">SOLUTIONS & PLATFORM</span>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/smoke-management" className="hover:text-ink">Smoke Management</Link></li>
              <li><Link href="/smoke-control-systems" className="hover:text-ink">Smoke Control Systems</Link></li>
              <li><Link href="/centralized-monitoring" className="hover:text-ink">Centralized Monitoring</Link></li>
              <li><Link href="/life-safety-platform" className="hover:text-ink">Life-Safety Platform</Link></li>
              <li><Link href="/building-explorer" className="hover:text-ink">Building Explorer Twin</Link></li>
            </ul>
          </div>

          {/* Col 3: Technology & Workflows */}
          <div className="space-y-3">
            <span className="font-bold text-ink uppercase text-[11px]">HARDWARE & WORKFLOWS</span>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/smoke-control-technology" className="hover:text-ink">Technology Architecture</Link></li>
              <li><Link href="/control-and-override" className="hover:text-ink">Control & Override</Link></li>
              <li><Link href="/commissioning" className="hover:text-ink">Commissioning Protocol</Link></li>
              <li><Link href="/maintenance" className="hover:text-ink">Maintenance Diagnostics</Link></li>
              <li><Link href="/ip500-integration" className="hover:text-ink">IP500 Integration</Link></li>
              <li><Link href="/uukl-integration" className="hover:text-ink">UUKL Integration</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources & Enterprise */}
          <div className="space-y-3">
            <span className="font-bold text-ink uppercase text-[11px]">RESOURCES & COMPANY</span>
            <ul className="space-y-2 text-[11px]">
              <li><Link href="/industries" className="hover:text-ink">Industries & Verticals</Link></li>
              <li><Link href="/case-studies" className="hover:text-ink">Case Studies</Link></li>
              <li><Link href="/resources" className="hover:text-ink">Technical Resource Center</Link></li>
              <li><Link href="/company" className="hover:text-ink">Company & Pillars</Link></li>
              <li><Link href="/contact" className="hover:text-ink font-semibold text-accent">Talk to an Engineer →</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Footer */}
        <div className="mt-8 flex flex-col justify-between gap-4 text-[10px] text-ink-faint md:flex-row md:items-center">
          <p>© 2026 SmokDefense Inc. All rights reserved. Industrial Smoke Management Infrastructure.</p>
          <div className="flex gap-6">
            <span>UL 864 UUKL / NFPA 72 COMPLIANT INTEGRATION</span>
            <span>NEMA 4X / IP500 ECOSYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
