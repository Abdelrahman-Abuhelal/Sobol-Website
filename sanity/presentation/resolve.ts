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

export const mainDocuments = defineDocuments(
  Object.entries(routeMap).map(([type, location]) => ({ route: location.href, type })),
);

export const presentationResolve = { locations, mainDocuments };
