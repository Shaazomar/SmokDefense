import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["projects"].title,
  description: SEO_PAGES_DATA["projects"].metaDescription,
};

export default function ProjectsPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["projects"]} />;
}
