import { StubPage } from "@/components/sections/StubPage";

export default function ContactPage() {
  return (
    <StubPage
      eyebrow="Contact"
      title="Talk to an Engineer"
      description="Whether you need a site survey, a quote, or just want to understand what system is right for your building — we respond to all enquiries within 24 hours."
    >
      <dl className="mt-10 grid gap-6 border-t border-line pt-8 font-mono text-sm text-ink-soft sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-widest text-ink-faint">Address</dt>
          <dd className="mt-2 text-ink">
            163 C, Technologics Global, 3rd Cross Rd, near Mantralaya Apartments, 3rd Phase, J. P.
            Nagar, Bengaluru, Karnataka 560078
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-widest text-ink-faint">Phone</dt>
          <dd className="mt-2 text-ink">
            <a href="tel:+919035544406" className="hover:text-accent">
              +91 90355 44406
            </a>
          </dd>
          <dt className="mt-4 text-xs uppercase tracking-widest text-ink-faint">Email</dt>
          <dd className="mt-2 text-ink">
            <a href="mailto:info@smokdefense.com" className="hover:text-accent">
              info@smokdefense.com
            </a>
          </dd>
        </div>
      </dl>
    </StubPage>
  );
}
