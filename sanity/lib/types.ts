export const publicRoutes = ["/", "/about", "/services", "/portfolio", "/blog", "/contact"] as const;
export type PublicRoute = (typeof publicRoutes)[number];
export type PublicPageSitemapEntry = { route: PublicRoute; updatedAt?: string };

export type SanityKeyed = { _key: string; _type: string };
export type ControlledLink = {
  label: string;
  kind: "internal" | "https" | "email" | "telephone" | "whatsapp";
  internalRoute?: PublicRoute;
  url?: string;
  email?: string;
  emailSubject?: string;
  telephone?: string;
  whatsapp?: string;
};
export type EditorialImage = {
  alt: string;
  fallbackSrc?: string;
  image?: {
    asset?: { _ref?: string; _id?: string; url?: string };
    crop?: Record<string, number>;
    hotspot?: Record<string, number>;
  };
};
export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: EditorialImage;
  noIndex?: boolean;
};
export type CtaContent = { eyebrow: string; heading: string; link: ControlledLink };

export type SiteSettings = {
  _id?: string;
  organizationName: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOpenGraphImage?: EditorialImage;
  publicSiteUrl: string;
  address: string;
  email: string;
  telephone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappLabel: string;
  consultationCta: CtaContent;
};

export type NavigationItem = SanityKeyed & { label: string; destination: ControlledLink; isHidden?: boolean };
export type Navigation = {
  _id?: string;
  headerLinks: NavigationItem[];
  headerCta: ControlledLink;
  mobileHeaderCtaLabel: string;
  footerLinks: NavigationItem[];
  footerDescription: string;
  footerLinksHeading: string;
  footerContactHeading: string;
  footerTagline: string;
  copyrightWording: string;
};

export type PageIntroData = {
  eyebrow: string;
  heading: string;
  description: string;
  image?: EditorialImage;
};

export type HomeHeroSection = {
  _type: "homeHeroSection";
  eyebrow: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  primaryButton: ControlledLink;
  secondaryButton: ControlledLink;
  trustPoints?: string[];
  journeyTitle: string;
  journeyDescription: string;
  journeyStages: Array<{ _key: string; title: string; description: string }>;
  closingBadgeText: string;
};

export type AboutMethodSection = SanityKeyed & {
  _type: "aboutMethodSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
};
export type PrinciplesSection = SanityKeyed & {
  _type: "principlesSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  principles: Array<{ _key: string; text: string; isHidden?: boolean }>;
};
export type TeamSection = SanityKeyed & {
  _type: "teamSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  members: Array<{ _key: string; name: string; role: string; initials?: string; image?: EditorialImage; isHidden?: boolean }>;
};
export type ConsultationCtaSection = SanityKeyed & {
  _type: "consultationCtaSection";
  isHidden?: boolean;
  useGlobalDefault?: boolean;
  eyebrow?: string;
  heading?: string;
  link?: ControlledLink;
};
export type ServicePackagesSection = SanityKeyed & {
  _type: "servicePackagesSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  description: string;
  packages: Array<{ _key: string; label: string; title: string; description: string; items?: Array<{ _key: string; text: string; isHidden?: boolean }>; isHidden?: boolean }>;
};
export type MarketingServicesSection = SanityKeyed & {
  _type: "marketingServicesSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  description: string;
  services: Array<{ _key: string; icon: "Palette" | "Share2" | "Megaphone" | "PenTool" | "Layout" | "Target"; title: string; description: string; isHidden?: boolean }>;
};
export type PortfolioListSection = SanityKeyed & {
  _type: "portfolioListSection";
  isHidden?: boolean;
  eyebrow: string;
  heading: string;
  description: string;
  projects: Array<{ _key: string; name: string; category: string; result: string; isHidden?: boolean }>;
  privacyNote: string;
};
export type BlogComingSoonSection = SanityKeyed & {
  _type: "blogComingSoonSection";
  isHidden?: boolean;
  statusLabel: string;
  heading: string;
  description: string;
  emailCta: ControlledLink;
  topicsHeading: string;
  topics: Array<{ _key: string; text: string; isHidden?: boolean }>;
};
export type ContactSection = {
  _type: "contactSection";
  eyebrow: string;
  heading: string;
  description: string;
  form: {
    nameLabel: string; namePlaceholder?: string; emailLabel?: string; emailPlaceholder?: string;
    phoneLabel: string; phonePlaceholder?: string;
    companyLabel: string; companyPlaceholder?: string; serviceLabel: string; servicePlaceholder: string;
    messageLabel: string; messagePlaceholder?: string; submitText: string; sendingText: string;
    successHeading: string; successMessage: string; resetText: string; errorFallback: string;
  };
  serviceLabels: { firefighting: string; structuring: string; growth: string; marketing: string; other: string };
};

export type HomePage = { _id?: string; seo?: Seo; hero: HomeHeroSection };
export type AboutPage = { _id?: string; seo?: Seo; pageIntro: PageIntroData; sections: Array<AboutMethodSection | PrinciplesSection | TeamSection | ConsultationCtaSection> };
export type ServicesPage = { _id?: string; seo?: Seo; pageIntro: PageIntroData; sections: Array<ServicePackagesSection | MarketingServicesSection | ConsultationCtaSection> };
export type PortfolioPage = { _id?: string; seo?: Seo; pageIntro: PageIntroData; sections: Array<PortfolioListSection | ConsultationCtaSection> };
export type BlogPage = { _id?: string; seo?: Seo; pageIntro: PageIntroData; sections: BlogComingSoonSection[] };
export type ContactPage = { _id?: string; seo?: Seo; pageIntro: PageIntroData; contactSection: ContactSection };

export type ArticleAuthor = {
  name: string;
  slug: string;
  role: string;
  bio?: string;
  expertise?: string[];
  image?: EditorialImage;
};
export type ArticleCategory = { _id: string; title: string; slug: string };
export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  directAnswer: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  featuredImage?: EditorialImage;
  author: ArticleAuthor;
  categories?: ArticleCategory[];
};
export type Article = ArticleCard & {
  _updatedAt?: string;
  body: Array<Record<string, unknown>>;
  reviewer?: ArticleAuthor;
  faqs?: Array<{ _key: string; question: string; answer: string }>;
  sources?: Array<{ _key: string; title: string; publisher?: string; url: string; accessedAt?: string }>;
  seo?: Seo;
};
export type ArticleSitemapEntry = { slug: string; publishedAt: string; updatedAt?: string };

export type SolutionPage = {
  _id?: string;
  _updatedAt?: string;
  slug: string;
  order?: number;
  isHidden?: boolean;
  eyebrow: string;
  title: string;
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  directAnswer: string;
  symptomsHeading: string;
  symptoms: string[];
  outcomesHeading: string;
  outcomesIntro: string;
  outcomes: Array<{ title: string; description: string }>;
  process: Array<{ title: string; description: string }>;
  questions: Array<{ question: string; answer: string }>;
  related: string[];
  seo?: Seo;
};

export type SolutionSitemapEntry = {
  slug: string;
  updatedAt?: string;
};
