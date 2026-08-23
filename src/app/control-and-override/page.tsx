import { SEO_PAGES_DATA } from "@/lib/data/seoData";
import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import type { Metadata } from "next";

const pageData = SEO_PAGES_DATA["control-and-override"];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.metaDescription,
};

export default function ControlAndOverridePage() {
  return <SEOPageTemplate pageData={pageData} />;
}
