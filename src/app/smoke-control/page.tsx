import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["smoke-control"].title,
  description: SEO_PAGES_DATA["smoke-control"].metaDescription,
};

export default function SmokeControlPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["smoke-control"]} />;
}
