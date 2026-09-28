"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Inbox, Search, Mail, Phone, Building2 } from "lucide-react";
import type { StartupDriveSubmission, YesNo } from "@/lib/startup-drive/types";
import { SUPPORT_DOMAINS } from "@/lib/startup-drive/constants";

interface Props {
  submissions: StartupDriveSubmission[];
}

function fmtYesNo(value: YesNo): string {
  if (value === "yes") return "Yes";
  if (value === "no") return "No";
  return "—";
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="py-1.5">
      <p className="text-[11px] font-mono text-slate-400">{q}</p>
      <p className="mt-0.5 text-xs text-slate-200">{a || "—"}</p>
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-slate-800 pt-4">
      <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
        {title}
      </h4>
      <div className="mt-2 divide-y divide-slate-800/60">{children}</div>
    </div>
  );
}

function ApplicationDetail({ submission }: { submission: StartupDriveSubmission }) {
  const s = submission;
  const requestedSupport = s.supportDomains.filter((d) => d.required === "yes");

  return (
    <div className="space-y-4 px-1 pb-1">
      <SectionBlock title="Product Concept & Team Status">
        <QA q="Product/system description" a={s.productDescription} />
        <QA q="Needs Override-R to provide concept?" a={fmtYesNo(s.needConceptFromOverrideR)} />
        <QA q="Own concept description" a={s.ownConceptDescription} />
        <QA q="Startup idea complete?" a={fmtYesNo(s.startupComplete)} />
        <QA q="Patent support needed?" a={fmtYesNo(s.patentSupportNeeded)} />
        <QA q="Design status" a={s.designStatus === "ready" ? "Design is ready" : s.designStatus === "design-stage" ? "Still at design stage" : "—"} />
        <QA q="Needs more research?" a={fmtYesNo(s.needMoreResearch)} />
        <QA q="Needs POC support?" a={fmtYesNo(s.needPocSupport)} />
        <QA q="Done market research?" a={fmtYesNo(s.doneMarketResearch)} />
        <QA q="MVP status" a={s.mvpStatus} />
        <QA q="Has co-founders?" a={fmtYesNo(s.hasCoFounders)} />
        <QA q="Wants more co-founders?" a={`${fmtYesNo(s.wantMoreCoFounders)}${s.moreCoFoundersDetails ? ` — ${s.moreCoFoundersDetails}` : ""}`} />
        <QA q="Needs Technology Co-Founder?" a={fmtYesNo(s.needTechCoFounder)} />
        <QA q="Needs Marketing/Sales Co-Founder?" a={fmtYesNo(s.needMarketingCoFounder)} />
        <QA q="Tech resources needed" a={[...s.techResources, s.techResourcesOther].filter(Boolean).join(", ")} />
      </SectionBlock>

      <SectionBlock title="Training & Founder Mindset">
        <QA q="Needs free training?" a={`${fmtYesNo(s.needFreeTraining)}${s.freeTrainingDetails ? ` — ${s.freeTrainingDetails}` : ""}`} />
        <QA q="Needs specialized training?" a={`${fmtYesNo(s.needSpecializedTraining)}${s.specializedTrainingDetails ? ` — ${s.specializedTrainingDetails}` : ""}`} />
        <QA q="Startup inspiration" a={s.startupInspiration} />
        <QA q="Self-confidence to own startup?" a={fmtYesNo(s.selfConfidence)} />
        <QA q="Weakest professional areas" a={[...s.weakestAreas, s.weakestAreasOther].filter(Boolean).join(", ")} />
        <QA
          q="Corporate job vs. startup"
          a={s.corporateJobPreference === "prefer-job" ? "Would prefer a stable job if available" : s.corporateJobPreference === "committed" ? "100% committed to the startup" : "—"}
        />
        <QA
          q="Long-term partnership with Override-R"
          a={s.longTermPartnership === "long-term" ? "Looking for long-term commitment" : s.longTermPartnership === "short-term" ? "Only short-term project exposure" : "—"}
        />
      </SectionBlock>

      <SectionBlock title={`Support Requested (${requestedSupport.length} of ${SUPPORT_DOMAINS.length})`}>
        {requestedSupport.length === 0 && (
          <p className="py-1.5 text-xs text-slate-500">No support domains requested.</p>
        )}
        {requestedSupport.map((domain) => {
          const def = SUPPORT_DOMAINS.find((d) => d.id === domain.id);
          return <QA key={domain.id} q={def?.label ?? domain.id} a={domain.details || "Yes (no details provided)"} />;
        })}
      </SectionBlock>

      <SectionBlock title="Declaration">
        <QA q="Applicant name (typed signature)" a={s.applicantName} />
        <QA q="Date" a={s.signatureDate} />
      </SectionBlock>
    </div>
  );
}

export function StartupDriveApplicationsList({ submissions }: Props) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.fullName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.institution.toLowerCase().includes(q)
    );
  }, [submissions, query]);

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display font-bold uppercase tracking-tight text-base text-white">
            Startup Drive Applications
          </h2>
          <p className="mt-0.5 text-xs font-mono text-slate-400">
            {submissions.length} total submission{submissions.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, institution…"
            className="w-full rounded-md border border-slate-800 bg-slate-900 py-2 pl-8 pr-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500/50 focus:outline-none sm:w-72"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 rounded-lg border border-dashed border-slate-800 py-16 text-center">
          <Inbox className="h-8 w-8 text-slate-600" />
          <p className="text-sm text-slate-400">
            {submissions.length === 0 ? "No applications have been submitted yet." : "No applications match your search."}
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {filtered.map((submission) => {
            const isExpanded = expandedId === submission.id;
            return (
              <div
                key={submission.id}
                className="rounded-lg border border-slate-800 bg-[#12151a] hover:border-slate-700 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-sans font-bold text-slate-100 text-sm">{submission.fullName}</h3>
                      <span className="text-[10px] font-mono text-slate-500">{fmtDate(submission.submittedAt)}</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-slate-500" />
                        {submission.email}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-slate-500" />
                        {submission.contactNumber}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-slate-500" />
                        {submission.institution}
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-slate-800 p-5">
                    <ApplicationDetail submission={submission} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
