"use client";

import type { StartupDriveFormData } from "@/lib/startup-drive/types";
import type { FieldErrors } from "@/lib/startup-drive/validation";
import { WEAKEST_AREA_OPTIONS } from "@/lib/startup-drive/constants";
import {
  TextAreaField,
  YesNoField,
  RadioCardGroup,
  CheckboxGroup,
  SectionCard,
  ConditionalReveal,
} from "./ui";

interface Props {
  data: StartupDriveFormData;
  errors: FieldErrors;
  update: <K extends keyof StartupDriveFormData>(key: K, value: StartupDriveFormData[K]) => void;
}

export function Step3Founder({ data, errors, update }: Props) {
  return (
    <SectionCard>
      <div className="space-y-6">
        <div>
          <YesNoField
            label="Do you need free technology training related to the product/system?"
            name="needFreeTraining"
            value={data.needFreeTraining}
            onChange={(v) => update("needFreeTraining", v)}
            required
            error={errors.needFreeTraining}
          />
          <ConditionalReveal show={data.needFreeTraining === "yes"}>
            <TextAreaField
              label="Please specify"
              name="freeTrainingDetails"
              value={data.freeTrainingDetails}
              onChange={(v) => update("freeTrainingDetails", v)}
              rows={2}
            />
          </ConditionalReveal>
        </div>

        <div>
          <YesNoField
            label="Do you need specialized training related to the product/system?"
            name="needSpecializedTraining"
            value={data.needSpecializedTraining}
            onChange={(v) => update("needSpecializedTraining", v)}
            required
            error={errors.needSpecializedTraining}
          />
          <ConditionalReveal show={data.needSpecializedTraining === "yes"}>
            <TextAreaField
              label="Please specify"
              name="specializedTrainingDetails"
              value={data.specializedTrainingDetails}
              onChange={(v) => update("specializedTrainingDetails", v)}
              rows={2}
            />
          </ConditionalReveal>
        </div>

        <TextAreaField
          label="What inspired you to opt for a startup over regular company job placement?"
          name="startupInspiration"
          value={data.startupInspiration}
          onChange={(v) => update("startupInspiration", v)}
          required
          error={errors.startupInspiration}
          rows={5}
        />

        <YesNoField
          label="Do you have the self-confidence to own your startup as CEO, CTO, or a core Co-Founder?"
          name="selfConfidence"
          value={data.selfConfidence}
          onChange={(v) => update("selfConfidence", v)}
          required
          error={errors.selfConfidence}
        />

        <CheckboxGroup
          label="Where do you think your weakest professional areas are?"
          name="weakestAreas"
          options={WEAKEST_AREA_OPTIONS}
          selected={data.weakestAreas}
          onChange={(v) => update("weakestAreas", v)}
          otherValue={data.weakestAreasOther}
          onOtherChange={(v) => update("weakestAreasOther", v)}
        />

        <RadioCardGroup
          label="Are you willing to opt for a corporate job opportunity over your startup if one comes along during this drive or in the process?"
          name="corporateJobPreference"
          value={data.corporateJobPreference}
          onChange={(v) => update("corporateJobPreference", v)}
          required
          error={errors.corporateJobPreference}
          options={[
            {
              value: "prefer-job",
              label: "YES",
              description: "I would prefer a stable job if available.",
            },
            {
              value: "committed",
              label: "NO",
              description: "I am 100% committed to building and running this startup.",
            },
          ]}
        />

        <RadioCardGroup
          label="Are you willing to sign a long-term partnership agreement with Override-R once the mutual terms and profit-sharing matrices are finalized?"
          name="longTermPartnership"
          value={data.longTermPartnership}
          onChange={(v) => update("longTermPartnership", v)}
          required
          error={errors.longTermPartnership}
          options={[
            {
              value: "long-term",
              label: "YES",
              description: "I am looking for a long-term commitment.",
            },
            {
              value: "short-term",
              label: "NO",
              description: "I am only looking for short-term project exposure.",
            },
          ]}
        />
      </div>
    </SectionCard>
  );
}
