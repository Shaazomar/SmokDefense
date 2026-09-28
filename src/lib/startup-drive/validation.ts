import type { StartupDriveFormData, StepKey } from "./types";
import { SUPPORT_DOMAINS } from "./constants";

export type FieldErrors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+]?[\d\s()-]{7,20}$/;

export function validatePersonal(data: StartupDriveFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required.";
  if (!data.contactNumber.trim()) {
    errors.contactNumber = "Contact number is required.";
  } else if (!PHONE_RE.test(data.contactNumber.trim())) {
    errors.contactNumber = "Enter a valid contact number.";
  }
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.institution.trim()) errors.institution = "Institution / college name is required.";
  return errors;
}

export function validateProduct(data: StartupDriveFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.needConceptFromOverrideR) errors.needConceptFromOverrideR = "Please select an option.";
  if (!data.startupComplete) errors.startupComplete = "Please select an option.";
  if (!data.patentSupportNeeded) errors.patentSupportNeeded = "Please select an option.";
  if (!data.designStatus) errors.designStatus = "Please select the current design status.";
  if (!data.needMoreResearch) errors.needMoreResearch = "Please select an option.";
  if (!data.needPocSupport) errors.needPocSupport = "Please select an option.";
  if (!data.doneMarketResearch) errors.doneMarketResearch = "Please select an option.";
  if (!data.hasCoFounders) errors.hasCoFounders = "Please select an option.";
  if (!data.wantMoreCoFounders) errors.wantMoreCoFounders = "Please select an option.";
  if (!data.needTechCoFounder) errors.needTechCoFounder = "Please select an option.";
  if (!data.needMarketingCoFounder) errors.needMarketingCoFounder = "Please select an option.";
  return errors;
}

export function validateFounder(data: StartupDriveFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.needFreeTraining) errors.needFreeTraining = "Please select an option.";
  if (!data.needSpecializedTraining) errors.needSpecializedTraining = "Please select an option.";
  if (!data.startupInspiration.trim()) errors.startupInspiration = "Please share what inspired you.";
  if (!data.selfConfidence) errors.selfConfidence = "Please select an option.";
  if (!data.corporateJobPreference) errors.corporateJobPreference = "Please select an option.";
  if (!data.longTermPartnership) errors.longTermPartnership = "Please select an option.";
  return errors;
}

export function validateSupport(data: StartupDriveFormData): FieldErrors {
  const errors: FieldErrors = {};
  for (const domain of SUPPORT_DOMAINS) {
    const answer = data.supportDomains.find((entry) => entry.id === domain.id);
    if (!answer || !answer.required) {
      errors[domain.id] = "Please select YES or NO.";
    }
  }
  return errors;
}

export function validateDeclaration(data: StartupDriveFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.agreeDeclaration) errors.agreeDeclaration = "You must agree to the declaration to submit.";
  if (!data.applicantName.trim()) errors.applicantName = "Please type your full name to confirm.";
  if (!data.signatureDate.trim()) errors.signatureDate = "Please provide a date.";
  return errors;
}

export function validateStep(step: StepKey, data: StartupDriveFormData): FieldErrors {
  switch (step) {
    case "personal":
      return validatePersonal(data);
    case "product":
      return validateProduct(data);
    case "founder":
      return validateFounder(data);
    case "support":
      return validateSupport(data);
    case "declaration":
      return validateDeclaration(data);
    default:
      return {};
  }
}

export function validateAll(data: StartupDriveFormData): FieldErrors {
  return {
    ...validatePersonal(data),
    ...validateProduct(data),
    ...validateFounder(data),
    ...validateSupport(data),
    ...validateDeclaration(data),
  };
}
