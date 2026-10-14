import { defineDocuments, defineLocations } from "sanity/presentation";

const routeMap = {
  homePage: { title: "Homepage", href: "/" },
  aboutPage: { title: "About page", href: "/about" },
  servicesPage: { title: "Services page", href: "/services" },
  successStoriesPage: { title: "قصص النجاح", href: "/success-stories" },
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

locations.successStory = defineLocations({
  select: { title: "title", slug: "slug.current" },
  resolve: (document) => ({
    locations: document?.slug ? [
      { title: document.title || "قصة نجاح", href: `/success-stories/${document.slug}` },
      { title: "كل قصص النجاح", href: "/success-stories" },
    ] : [],
  }),
});

export const mainDocuments = defineDocuments(
  [
    ...Object.entries(routeMap).map(([type, location]) => ({ route: location.href, type })),
    { route: "/services/:slug", type: "solutionPage" },
    { route: "/success-stories/:slug", type: "successStory" },
  ],
);

export const presentationResolve = { locations, mainDocuments };
