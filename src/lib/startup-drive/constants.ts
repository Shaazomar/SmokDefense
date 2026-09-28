import type { StartupDriveFormData } from "./types";

export const TECH_RESOURCE_OPTIONS = [
  "AI-Agent Developers",
  "Embedded Designers",
  "Software Developers",
  "SolidWorks / CAD / 3D Modelers",
  "Other",
] as const;

export const WEAKEST_AREA_OPTIONS = [
  "Marketing",
  "Sales",
  "Negotiation Skills",
  "Management",
  "Technology",
  "Other",
] as const;

export interface SupportDomainDef {
  id: string;
  label: string;
}

export const SUPPORT_DOMAINS: SupportDomainDef[] = [
  { id: "embedded-tech-support", label: "Embedded System Tech-Support" },
  { id: "mechanical-tech-support", label: "Mechanical System Tech-Support" },
  { id: "electrical-tech-support", label: "Electrical System Tech-Support" },
  { id: "power-electronics", label: "Electronics / Power Electronics" },
  { id: "control-logics", label: "Control Logics Development" },
  { id: "design-3d-printing", label: "Design Support & 3D Printing" },
  { id: "poc-development", label: "POC Development & Building" },
  { id: "testing-certification", label: "Product Testing, Certification & Approvals" },
  { id: "material-sourcing", label: "Material / Equipment Sourcing Support" },
  { id: "pitch-deck", label: "Pitch Deck Preparation" },
  { id: "project-report", label: "Project Report Drafting & Estimation" },
  { id: "funding-pitching", label: "Pitching for Seed / Angel / Venture Funding" },
  { id: "presentation-prep", label: "Presentation Preparation" },
  { id: "mentorship", label: "Overall Mentorship" },
  { id: "bootstrap-financial", label: "Bootstrap Financial Support" },
  { id: "office-lab-facility", label: "Office and LAB Facility During Startup" },
];

export const EMPTY_STARTUP_DRIVE_FORM: StartupDriveFormData = {
  fullName: "",
  contactNumber: "",
  email: "",
  institution: "",

  productDescription: "",
  needConceptFromOverrideR: "",
  ownConceptDescription: "",
  startupComplete: "",
  patentSupportNeeded: "",
  designStatus: "",
  needMoreResearch: "",
  needPocSupport: "",
  doneMarketResearch: "",
  mvpStatus: "",
  hasCoFounders: "",
  wantMoreCoFounders: "",
  moreCoFoundersDetails: "",
  needTechCoFounder: "",
  needMarketingCoFounder: "",
  techResources: [],
  techResourcesOther: "",

  needFreeTraining: "",
  freeTrainingDetails: "",
  needSpecializedTraining: "",
  specializedTrainingDetails: "",
  startupInspiration: "",
  selfConfidence: "",
  weakestAreas: [],
  weakestAreasOther: "",
  corporateJobPreference: "",
  longTermPartnership: "",

  supportDomains: SUPPORT_DOMAINS.map((domain) => ({
    id: domain.id,
    required: "",
    details: "",
  })),

  agreeDeclaration: false,
  applicantName: "",
  signatureDate: new Date().toISOString().slice(0, 10),
};
