import { withSuccessStoriesNavigation } from "@/sanity/lib/links";
import content from "@/content/fallback-content.json";
import type { AboutPage, BlogPage, ContactPage, HomePage, Navigation, PortfolioPage, ServicesPage, SiteSettings, SuccessStoriesPage } from "@/sanity/lib/types";

export const fallbackSiteSettings = content.siteSettings as SiteSettings;
export const fallbackNavigation = withSuccessStoriesNavigation(content.navigation as Navigation);
export const fallbackHomePage = content.homePage as HomePage;
export const fallbackAboutPage = content.aboutPage as AboutPage;
export const fallbackServicesPage = content.servicesPage as ServicesPage;
export const fallbackPortfolioPage = content.portfolioPage as PortfolioPage;
export const fallbackBlogPage = content.blogPage as BlogPage;
export const fallbackContactPage = content.contactPage as ContactPage;

export const fallbackSuccessStoriesPage = {
  pageIntro: {
    eyebrow: "من أعمالنا",
    heading: "قصص نجاح",
    image: { alt: "مشروعات مكتملة مرتبة على درجات النجاح", fallbackSrc: "/images/page-intros/portfolio.webp" },
    description: "كل مشروع له ظروفه وتحدياته. هنا نشارك قصص العمل مع عملائنا، من فهم التحدي إلى خطوات التنفيذ وما تحقق على أرض الواقع.",
  },
  emptyHeading: "لكل تعاون قصة تستحق أن تُروى",
  emptyDescription: "نعمل على توثيق قصص تعاوننا مع الشركات. سنشارك هنا تفاصيلها وتجاربها قريباً.",
} satisfies SuccessStoriesPage;
