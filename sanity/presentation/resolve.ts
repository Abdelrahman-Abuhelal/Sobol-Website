import { defineDocuments, defineLocations } from "sanity/presentation";

const routeMap = {
  homePage: { title: "Homepage", href: "/" },
  aboutPage: { title: "About page", href: "/about" },
  servicesPage: { title: "Services page", href: "/services" },
  portfolioPage: { title: "Portfolio page", href: "/portfolio" },
  blogPage: { title: "Blog page", href: "/blog" },
  contactPage: { title: "Contact page", href: "/contact" },
} as const;

export const locations = Object.fromEntries(
  Object.entries(routeMap).map(([type, location]) => [type, defineLocations({ locations: [location] })]),
);

locations.solutionPage = defineLocations({
  select: { title: "shortTitle", slug: "slug.current" },
  resolve: (document) => ({
    locations: document?.slug
      ? [{ title: document.title || "صفحة حل", href: `/services/${document.slug}` }]
      : [],
  }),
});

export const mainDocuments = defineDocuments(
  [
    ...Object.entries(routeMap).map(([type, location]) => ({ route: location.href, type })),
    { route: "/services/:slug", type: "solutionPage" },
  ],
);

export const presentationResolve = { locations, mainDocuments };
