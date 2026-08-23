import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["mechanical-smoke-control"].title,
  description: SEO_PAGES_DATA["mechanical-smoke-control"].metaDescription,
};

export default function MechanicalSmokeControlPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["mechanical-smoke-control"]} />;
}
