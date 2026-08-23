import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["natural-smoke-control"].title,
  description: SEO_PAGES_DATA["natural-smoke-control"].metaDescription,
};

export default function NaturalSmokeControlPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["natural-smoke-control"]} />;
}
