"use client";

import type { StartupDriveFormData } from "@/lib/startup-drive/types";
import type { FieldErrors } from "@/lib/startup-drive/validation";
import { TextField, SectionCard } from "./ui";

interface Props {
  data: StartupDriveFormData;
  errors: FieldErrors;
  update: <K extends keyof StartupDriveFormData>(key: K, value: StartupDriveFormData[K]) => void;
}

export function Step1Personal({ data, errors, update }: Props) {
  return (
    <SectionCard>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Full Name"
          name="fullName"
          value={data.fullName}
          onChange={(v) => update("fullName", v)}
          required
          error={errors.fullName}
          autoComplete="name"
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          type="tel"
          value={data.contactNumber}
          onChange={(v) => update("contactNumber", v)}
          required
          error={errors.contactNumber}
          placeholder="+91 90000 00000"
          autoComplete="tel"
        />
        <TextField
          label="Email ID"
          name="email"
          type="email"
          value={data.email}
          onChange={(v) => update("email", v)}
          required
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <TextField
          label="Institution / College Name"
          name="institution"
          value={data.institution}
          onChange={(v) => update("institution", v)}
          required
          error={errors.institution}
          autoComplete="organization"
        />
      </div>
    </SectionCard>
  );
}
