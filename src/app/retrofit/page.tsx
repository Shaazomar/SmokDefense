import { SEOPageTemplate } from "@/components/layout/SEOPageTemplate";
import { SEO_PAGES_DATA } from "@/lib/data/seoData";

export const metadata = {
  title: SEO_PAGES_DATA["retrofit"].title,
  description: SEO_PAGES_DATA["retrofit"].metaDescription,
};

export default function RetrofitPage() {
  return <SEOPageTemplate pageData={SEO_PAGES_DATA["retrofit"]} />;
}
