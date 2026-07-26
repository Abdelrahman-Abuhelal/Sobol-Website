import { ConsultationCTA } from "@/components/layout/ConsultationCTA";
import { AboutMethodSection } from "@/components/sections/AboutMethodSection";
import { BlogComingSoonSection } from "@/components/sections/BlogComingSoonSection";
import { MarketingServicesSection } from "@/components/sections/MarketingServicesSection";
import { PortfolioListSection } from "@/components/sections/PortfolioListSection";
import { PrinciplesSection } from "@/components/sections/PrinciplesSection";
import { ServicePackagesSection } from "@/components/sections/ServicePackagesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import type { AboutPage, BlogPage, CtaContent, PortfolioPage, ServicesPage } from "@/sanity/lib/types";

function unknownSection(page: string, section: { _type: string }) {
  if (process.env.NODE_ENV === "development") console.warn(`[sanity] Unsupported ${page} section type: ${section._type}`);
  return null;
}

function resolveCta(section: { useGlobalDefault?: boolean; eyebrow?: string; heading?: string; link?: CtaContent["link"] }, globalCta: CtaContent): CtaContent {
  return section.useGlobalDefault !== false || !section.eyebrow || !section.heading || !section.link
    ? globalCta : { eyebrow: section.eyebrow, heading: section.heading, link: section.link };
}

export function AboutPageSections({ sections, globalCta }: { sections: AboutPage["sections"]; globalCta: CtaContent }) {
  return sections.filter((section) => !section.isHidden).map((section) => {
    switch (section._type) {
      case "aboutMethodSection": return <AboutMethodSection key={section._key} section={section} />;
      case "principlesSection": return <PrinciplesSection key={section._key} section={section} />;
      case "teamSection": return <TeamSection key={section._key} section={section} />;
      case "consultationCtaSection": return <ConsultationCTA key={section._key} content={resolveCta(section, globalCta)} />;
      default: return unknownSection("about page", section);
    }
  });
}

export function ServicesPageSections({ sections, globalCta }: { sections: ServicesPage["sections"]; globalCta: CtaContent }) {
  return sections.filter((section) => !section.isHidden).map((section) => {
    switch (section._type) {
      case "servicePackagesSection": return <ServicePackagesSection key={section._key} section={section} />;
      case "marketingServicesSection": return <MarketingServicesSection key={section._key} section={section} />;
      case "consultationCtaSection": return <ConsultationCTA key={section._key} content={resolveCta(section, globalCta)} />;
      default: return unknownSection("services page", section);
    }
  });
}

export function PortfolioPageSections({ sections, globalCta }: { sections: PortfolioPage["sections"]; globalCta: CtaContent }) {
  return sections.filter((section) => !section.isHidden).map((section) => {
    switch (section._type) {
      case "portfolioListSection": return <PortfolioListSection key={section._key} section={section} />;
      case "consultationCtaSection": return <ConsultationCTA key={section._key} content={resolveCta(section, globalCta)} />;
      default: return unknownSection("portfolio page", section);
    }
  });
}

export function BlogPageSections({ sections }: { sections: BlogPage["sections"] }) {
  return sections.filter((section) => !section.isHidden).map((section) => {
    switch (section._type) {
      case "blogComingSoonSection": return <BlogComingSoonSection key={section._key} section={section} />;
      default: return unknownSection("blog page", section);
    }
  });
}
