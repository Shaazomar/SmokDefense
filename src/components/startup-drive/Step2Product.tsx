"use client";

import type { StartupDriveFormData } from "@/lib/startup-drive/types";
import type { FieldErrors } from "@/lib/startup-drive/validation";
import { TECH_RESOURCE_OPTIONS } from "@/lib/startup-drive/constants";
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

export function Step2Product({ data, errors, update }: Props) {
  return (
    <SectionCard>
      <div className="space-y-6">
        <TextAreaField
          label="Are you looking for a product or system for your intended startup? Briefly describe it."
          name="productDescription"
          value={data.productDescription}
          onChange={(v) => update("productDescription", v)}
          hint="Optional — describe the product or system you have in mind, if any."
        />

        <YesNoField
          label="Do you need Override-R to provide you the concept / product idea?"
          name="needConceptFromOverrideR"
          value={data.needConceptFromOverrideR}
          onChange={(v) => update("needConceptFromOverrideR", v)}
          required
          error={errors.needConceptFromOverrideR}
        />

        <TextAreaField
          label="Do you have the concept of the product or system to be developed? Provide a brief write-up if you have any."
          name="ownConceptDescription"
          value={data.ownConceptDescription}
          onChange={(v) => update("ownConceptDescription", v)}
        />

        <YesNoField
          label="Is your proposed startup idea / project / system complete?"
          name="startupComplete"
          value={data.startupComplete}
          onChange={(v) => update("startupComplete", v)}
          required
          error={errors.startupComplete}
        />

        <YesNoField
          label="Does your product need to be patented? Any patent support needed?"
          name="patentSupportNeeded"
          value={data.patentSupportNeeded}
          onChange={(v) => update("patentSupportNeeded", v)}
          required
          error={errors.patentSupportNeeded}
        />

        <RadioCardGroup
          label="What is the current status of your product design?"
          name="designStatus"
          value={data.designStatus}
          onChange={(v) => update("designStatus", v)}
          required
          error={errors.designStatus}
          options={[
            { value: "ready", label: "Design is ready" },
            { value: "design-stage", label: "Still at design stage" },
          ]}
        />

        <YesNoField
          label="Do you require more research on the product?"
          name="needMoreResearch"
          value={data.needMoreResearch}
          onChange={(v) => update("needMoreResearch", v)}
          required
          error={errors.needMoreResearch}
        />

        <YesNoField
          label="Do you need support on building your Proof of Concept (POC)?"
          name="needPocSupport"
          value={data.needPocSupport}
          onChange={(v) => update("needPocSupport", v)}
          required
          error={errors.needPocSupport}
        />

        <YesNoField
          label="Have you done any market research on the product?"
          name="doneMarketResearch"
          value={data.doneMarketResearch}
          onChange={(v) => update("doneMarketResearch", v)}
          required
          error={errors.doneMarketResearch}
        />

        <TextAreaField
          label="What is your current status / progress on MVP (Minimum Viable Product) research studies?"
          name="mvpStatus"
          value={data.mvpStatus}
          onChange={(v) => update("mvpStatus", v)}
        />

        <YesNoField
          label="Do you currently have any co-founders in your team?"
          name="hasCoFounders"
          value={data.hasCoFounders}
          onChange={(v) => update("hasCoFounders", v)}
          required
          error={errors.hasCoFounders}
        />

        <div>
          <YesNoField
            label="Are you looking for more co-founders to be in your team?"
            name="wantMoreCoFounders"
            value={data.wantMoreCoFounders}
            onChange={(v) => update("wantMoreCoFounders", v)}
            required
            error={errors.wantMoreCoFounders}
          />
          <ConditionalReveal show={data.wantMoreCoFounders === "yes"}>
            <TextAreaField
              label="Please specify"
              name="moreCoFoundersDetails"
              value={data.moreCoFoundersDetails}
              onChange={(v) => update("moreCoFoundersDetails", v)}
              rows={2}
            />
          </ConditionalReveal>
        </div>

        <YesNoField
          label="Do you require a Technology Co-Founder?"
          name="needTechCoFounder"
          value={data.needTechCoFounder}
          onChange={(v) => update("needTechCoFounder", v)}
          required
          error={errors.needTechCoFounder}
        />

        <YesNoField
          label="Do you require a Marketing / Sales Co-Founder?"
          name="needMarketingCoFounder"
          value={data.needMarketingCoFounder}
          onChange={(v) => update("needMarketingCoFounder", v)}
          required
          error={errors.needMarketingCoFounder}
        />

        <CheckboxGroup
          label="Do you think you might need any of the following technology resources in your development team?"
          name="techResources"
          options={TECH_RESOURCE_OPTIONS}
          selected={data.techResources}
          onChange={(v) => update("techResources", v)}
          otherValue={data.techResourcesOther}
          onOtherChange={(v) => update("techResourcesOther", v)}
        />
      </div>
    </SectionCard>
  );
}
