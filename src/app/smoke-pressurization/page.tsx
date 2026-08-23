import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["smoke-pressurization"].title,
  description: SEO_PAGES_DATA["smoke-pressurization"].metaDescription,
};

export default function SmokePressurizationPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["smoke-pressurization"]} />;
}
