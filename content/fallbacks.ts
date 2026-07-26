import content from "@/content/fallback-content.json";
import type { AboutPage, BlogPage, ContactPage, HomePage, Navigation, PortfolioPage, ServicesPage, SiteSettings } from "@/sanity/lib/types";

export const fallbackSiteSettings = content.siteSettings as SiteSettings;
export const fallbackNavigation = content.navigation as Navigation;
export const fallbackHomePage = content.homePage as HomePage;
export const fallbackAboutPage = content.aboutPage as AboutPage;
export const fallbackServicesPage = content.servicesPage as ServicesPage;
export const fallbackPortfolioPage = content.portfolioPage as PortfolioPage;
export const fallbackBlogPage = content.blogPage as BlogPage;
export const fallbackContactPage = content.contactPage as ContactPage;
