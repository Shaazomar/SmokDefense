/**
 * Shared types for the Override-R Startup Drive application form.
 * Used by both the client wizard and the isolated API route/store.
 */

export type YesNo = "yes" | "no" | "";

export interface SupportDomainAnswer {
  id: string;
  required: YesNo;
  details: string;
}

export interface StartupDriveFormData {
  // Section 01 — Personal & Academic Details
  fullName: string;
  contactNumber: string;
  email: string;
  institution: string;

  // Section 02 — Product Concept & Team Status
  productDescription: string;
  needConceptFromOverrideR: YesNo;
  ownConceptDescription: string;
  startupComplete: YesNo;
  patentSupportNeeded: YesNo;
  designStatus: "ready" | "design-stage" | "";
  needMoreResearch: YesNo;
  needPocSupport: YesNo;
  doneMarketResearch: YesNo;
  mvpStatus: string;
  hasCoFounders: YesNo;
  wantMoreCoFounders: YesNo;
  moreCoFoundersDetails: string;
  needTechCoFounder: YesNo;
  needMarketingCoFounder: YesNo;
  techResources: string[];
  techResourcesOther: string;

  // Section 03 — Training & Founder Mindset
  needFreeTraining: YesNo;
  freeTrainingDetails: string;
  needSpecializedTraining: YesNo;
  specializedTrainingDetails: string;
  startupInspiration: string;
  selfConfidence: YesNo;
  weakestAreas: string[];
  weakestAreasOther: string;
  corporateJobPreference: "prefer-job" | "committed" | "";
  longTermPartnership: "long-term" | "short-term" | "";

  // Section 04 — Support Required
  supportDomains: SupportDomainAnswer[];

  // Final Declaration
  agreeDeclaration: boolean;
  applicantName: string;
  signatureDate: string;
}

export interface StartupDriveSubmission extends StartupDriveFormData {
  id: string;
  submittedAt: string;
}

export const STEP_KEYS = ["personal", "product", "founder", "support", "declaration"] as const;
export type StepKey = (typeof STEP_KEYS)[number];
