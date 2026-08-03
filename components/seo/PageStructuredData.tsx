import type { SiteSettings } from "@/sanity/lib/types";

type PageSchemaType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

type PageStructuredDataProps = {
  settings: SiteSettings;
  path: string;
  name: string;
  description: string;
  type?: PageSchemaType;
  mainEntity?: Record<string, unknown> | Array<Record<string, unknown>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
};

export function PageStructuredData({
  settings,
  path,
  name,
  description,
  type = "WebPage",
  mainEntity,
  breadcrumbs,
}: PageStructuredDataProps) {
  const base = settings.publicSiteUrl.replace(/\/$/, "");
  const url = `${base}${path === "/" ? "" : path}`;
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "ar-PS",
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#organization` },
      mainEntity,
    },
  ];

  if (path !== "/") {
    const trail = breadcrumbs || [
      { name: "الرئيسية", path: "/" },
      { name, path },
    ];
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${base}${item.path === "/" ? "/" : item.path}`,
      })),
    });
  }

  const structuredData = { "@context": "https://schema.org", "@graph": graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
