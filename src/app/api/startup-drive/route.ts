import { NextResponse } from "next/server";
import { startupDriveStore } from "@/lib/db/startupDriveStore";
import { validateAll } from "@/lib/startup-drive/validation";
import { SUPPORT_DOMAINS } from "@/lib/startup-drive/constants";
import type { StartupDriveFormData, SupportDomainAnswer, YesNo } from "@/lib/startup-drive/types";

const MAX_SHORT = 200;
const MAX_LONG = 4000;

function sanitizeText(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  // Strip control characters and clamp length to prevent abuse.
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, maxLen);
}

function sanitizeYesNo(value: unknown): YesNo {
  return value === "yes" || value === "no" ? value : "";
}

function sanitizeStringArray(value: unknown, maxLen: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => sanitizeText(v, maxLen))
    .filter(Boolean)
    .slice(0, 20);
}

function sanitizeSupportDomains(value: unknown): SupportDomainAnswer[] {
  const incoming = Array.isArray(value) ? value : [];
  return SUPPORT_DOMAINS.map((domain) => {
    const match = incoming.find(
      (entry) => entry && typeof entry === "object" && (entry as { id?: unknown }).id === domain.id
    ) as Partial<SupportDomainAnswer> | undefined;
    return {
      id: domain.id,
      required: sanitizeYesNo(match?.required),
      details: sanitizeText(match?.details, MAX_LONG),
    };
  });
}

function sanitizeInput(body: unknown): StartupDriveFormData {
  const b = (body ?? {}) as Record<string, unknown>;
  return {
    fullName: sanitizeText(b.fullName, MAX_SHORT),
    contactNumber: sanitizeText(b.contactNumber, 30),
    email: sanitizeText(b.email, MAX_SHORT),
    institution: sanitizeText(b.institution, MAX_SHORT),

    productDescription: sanitizeText(b.productDescription, MAX_LONG),
    needConceptFromOverrideR: sanitizeYesNo(b.needConceptFromOverrideR),
    ownConceptDescription: sanitizeText(b.ownConceptDescription, MAX_LONG),
    startupComplete: sanitizeYesNo(b.startupComplete),
    patentSupportNeeded: sanitizeYesNo(b.patentSupportNeeded),
    designStatus: b.designStatus === "ready" || b.designStatus === "design-stage" ? b.designStatus : "",
    needMoreResearch: sanitizeYesNo(b.needMoreResearch),
    needPocSupport: sanitizeYesNo(b.needPocSupport),
    doneMarketResearch: sanitizeYesNo(b.doneMarketResearch),
    mvpStatus: sanitizeText(b.mvpStatus, MAX_LONG),
    hasCoFounders: sanitizeYesNo(b.hasCoFounders),
    wantMoreCoFounders: sanitizeYesNo(b.wantMoreCoFounders),
    moreCoFoundersDetails: sanitizeText(b.moreCoFoundersDetails, MAX_LONG),
    needTechCoFounder: sanitizeYesNo(b.needTechCoFounder),
    needMarketingCoFounder: sanitizeYesNo(b.needMarketingCoFounder),
    techResources: sanitizeStringArray(b.techResources, MAX_SHORT),
    techResourcesOther: sanitizeText(b.techResourcesOther, MAX_SHORT),

    needFreeTraining: sanitizeYesNo(b.needFreeTraining),
    freeTrainingDetails: sanitizeText(b.freeTrainingDetails, MAX_LONG),
    needSpecializedTraining: sanitizeYesNo(b.needSpecializedTraining),
    specializedTrainingDetails: sanitizeText(b.specializedTrainingDetails, MAX_LONG),
    startupInspiration: sanitizeText(b.startupInspiration, MAX_LONG),
    selfConfidence: sanitizeYesNo(b.selfConfidence),
    weakestAreas: sanitizeStringArray(b.weakestAreas, MAX_SHORT),
    weakestAreasOther: sanitizeText(b.weakestAreasOther, MAX_SHORT),
    corporateJobPreference:
      b.corporateJobPreference === "prefer-job" || b.corporateJobPreference === "committed"
        ? b.corporateJobPreference
        : "",
    longTermPartnership:
      b.longTermPartnership === "long-term" || b.longTermPartnership === "short-term"
        ? b.longTermPartnership
        : "",

    supportDomains: sanitizeSupportDomains(b.supportDomains),

    agreeDeclaration: b.agreeDeclaration === true,
    applicantName: sanitizeText(b.applicantName, MAX_SHORT),
    signatureDate: sanitizeText(b.signatureDate, 20),
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sanitized = sanitizeInput(body);

    const errors = validateAll(sanitized);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 400 });
    }

    const submission = startupDriveStore.createSubmission(sanitized);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Startup Drive submission error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
