import "server-only";

import {
  getAboutPage,
  getBlogPage,
  getContactPage,
  getGlobalContent,
  getHomePage,
  getPortfolioPage,
  getServicesPage,
} from "@/sanity/lib/data";
import type {
  ControlledLink,
  CtaContent,
  Navigation,
  SiteSettings,
} from "@/sanity/lib/types";

function linkHref(link: ControlledLink): string {
  switch (link.kind) {
    case "internal":
      return link.internalRoute ?? "/";
    case "https":
      return link.url ?? "/";
    case "email": {
      const subject = link.emailSubject
        ? `?subject=${encodeURIComponent(link.emailSubject)}`
        : "";
      return `mailto:${link.email ?? ""}${subject}`;
    }
    case "telephone":
      return `tel:${link.telephone ?? ""}`;
    case "whatsapp":
      return `https://wa.me/${(link.whatsapp ?? "").replace(/\D/g, "")}`;
  }
}

function markdownLink(link: ControlledLink): string {
  return `[${link.label}](${linkHref(link)})`;
}

function visible<T extends { isHidden?: boolean }>(items: T[]): T[] {
  return items.filter((item) => !item.isHidden);
}

function renderIntro(intro: {
  eyebrow: string;
  heading: string;
  description: string;
}) {
  return [`# ${intro.heading}`, intro.eyebrow, intro.description];
}

function resolveCta(
  section: {
    useGlobalDefault?: boolean;
    eyebrow?: string;
    heading?: string;
    link?: ControlledLink;
  },
  globalCta: CtaContent,
): CtaContent {
  return section.useGlobalDefault !== false ||
    !section.eyebrow ||
    !section.heading ||
    !section.link
    ? globalCta
    : {
        eyebrow: section.eyebrow,
        heading: section.heading,
        link: section.link,
      };
}

function renderCta(cta: CtaContent): string[] {
  return [`## ${cta.heading}`, cta.eyebrow, markdownLink(cta.link)];
}

function renderNavigation(navigation: Navigation): string[] {
  const links = visible(navigation.headerLinks).map(
    (item) => `- ${markdownLink(item.destination)}`,
  );
  return links.length ? ["## التنقل", ...links] : [];
}

function renderFooter(
  navigation: Navigation,
  siteSettings: SiteSettings,
): string[] {
  return [
    "## معلومات التواصل",
    navigation.footerDescription,
    `- البريد الإلكتروني: [${siteSettings.email}](mailto:${siteSettings.email})`,
    `- الهاتف: [${siteSettings.telephone}](tel:${siteSettings.telephone})`,
    `- واتساب: [${siteSettings.whatsappLabel}](https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, "")})`,
    `- العنوان: ${siteSettings.address}`,
    navigation.footerTagline,
  ];
}

function documentFrom(
  main: string[],
  navigation: Navigation,
  siteSettings: SiteSettings,
) {
  return [
    ...main,
    ...renderNavigation(navigation),
    ...renderFooter(navigation, siteSettings),
  ]
    .filter(Boolean)
    .join("\n\n")
    .concat("\n");
}

export async function getSanityMarkdown(path: string): Promise<string | null> {
  const { navigation, siteSettings } = await getGlobalContent();

  if (path === "/") {
    const { hero } = await getHomePage();
    const main = [
      `# ${hero.titleLineOne} ${hero.titleLineTwo}`,
      hero.eyebrow,
      hero.description,
      markdownLink(hero.primaryButton),
      markdownLink(hero.secondaryButton),
      `## ${hero.journeyTitle}`,
      hero.journeyDescription,
      ...hero.journeyStages.flatMap((stage) => [
        `### ${stage.title}`,
        stage.description,
      ]),
      hero.closingBadgeText,
    ];
    return documentFrom(main, navigation, siteSettings);
  }

  if (path === "/about") {
    const page = await getAboutPage();
    const main = [...renderIntro(page.pageIntro)];
    for (const section of visible(page.sections)) {
      if (section._type === "aboutMethodSection") {
        main.push(
          `## ${section.heading}`,
          section.eyebrow,
          ...section.paragraphs,
          `### ${section.missionTitle}`,
          section.missionDescription,
          `### ${section.visionTitle}`,
          section.visionDescription,
        );
      } else if (section._type === "principlesSection") {
        main.push(
          `## ${section.heading}`,
          section.eyebrow,
          ...visible(section.principles).map((item) => `- ${item.text}`),
        );
      } else if (section._type === "teamSection") {
        main.push(
          `## ${section.heading}`,
          section.eyebrow,
          ...visible(section.members).map(
            (member) => `- ${member.name} — ${member.role}`,
          ),
        );
      } else if (section._type === "consultationCtaSection") {
        main.push(...renderCta(resolveCta(section, siteSettings.consultationCta)));
      }
    }
    return documentFrom(main, navigation, siteSettings);
  }

  if (path === "/services") {
    const page = await getServicesPage();
    const main = [...renderIntro(page.pageIntro)];
    for (const section of visible(page.sections)) {
      if (section._type === "servicePackagesSection") {
        main.push(`## ${section.heading}`, section.eyebrow, section.description);
        for (const service of visible(section.packages)) {
          main.push(
            `### ${service.title}`,
            service.label,
            service.description,
            ...visible(service.items).map((item) => `- ${item.text}`),
          );
        }
      } else if (section._type === "marketingServicesSection") {
        main.push(`## ${section.heading}`, section.eyebrow, section.description);
        for (const service of visible(section.services)) {
          main.push(`### ${service.title}`, service.description);
        }
      } else if (section._type === "consultationCtaSection") {
        main.push(...renderCta(resolveCta(section, siteSettings.consultationCta)));
      }
    }
    return documentFrom(main, navigation, siteSettings);
  }

  if (path === "/portfolio") {
    const page = await getPortfolioPage();
    const main = [...renderIntro(page.pageIntro)];
    for (const section of visible(page.sections)) {
      if (section._type === "portfolioListSection") {
        main.push(`## ${section.heading}`, section.eyebrow, section.description);
        for (const project of visible(section.projects)) {
          main.push(
            `### ${project.name}`,
            `- التصنيف: ${project.category}`,
            `- النتيجة: ${project.result}`,
          );
        }
        main.push(section.privacyNote);
      } else if (section._type === "consultationCtaSection") {
        main.push(...renderCta(resolveCta(section, siteSettings.consultationCta)));
      }
    }
    return documentFrom(main, navigation, siteSettings);
  }

  if (path === "/blog") {
    const page = await getBlogPage();
    const main = [...renderIntro(page.pageIntro)];
    for (const section of visible(page.sections)) {
      main.push(
        `## ${section.heading}`,
        section.statusLabel,
        section.description,
        markdownLink(section.emailCta),
        `### ${section.topicsHeading}`,
        ...visible(section.topics).map((topic) => `- ${topic.text}`),
      );
    }
    return documentFrom(main, navigation, siteSettings);
  }

  if (path === "/contact") {
    const page = await getContactPage();
    const { contactSection } = page;
    const labels = contactSection.serviceLabels;
    const main = [
      ...renderIntro(page.pageIntro),
      `## ${contactSection.heading}`,
      contactSection.eyebrow,
      contactSection.description,
      "### خيارات الخدمة في نموذج التواصل",
      `- ${labels.firefighting}`,
      `- ${labels.structuring}`,
      `- ${labels.growth}`,
      `- ${labels.marketing}`,
      `- ${labels.other}`,
      "إرسال النموذج يرسل رسالة حقيقية إلى فريق سُبُل ويتطلب موافقة المستخدم.",
    ];
    return documentFrom(main, navigation, siteSettings);
  }

  return null;
}

export async function getAgentServices() {
  const page = await getServicesPage();
  return {
    heading: page.pageIntro.heading,
    description: page.pageIntro.description,
    sections: visible(page.sections).map((section) => {
      if (section._type === "servicePackagesSection") {
        return {
          type: section._type,
          heading: section.heading,
          description: section.description,
          services: visible(section.packages).map((service) => ({
            title: service.title,
            label: service.label,
            description: service.description,
            items: visible(service.items).map((item) => item.text),
          })),
        };
      }
      if (section._type === "marketingServicesSection") {
        return {
          type: section._type,
          heading: section.heading,
          description: section.description,
          services: visible(section.services).map((service) => ({
            title: service.title,
            description: service.description,
          })),
        };
      }
      return null;
    }).filter((section) => section !== null),
  };
}

export async function getAgentContactChannels() {
  const { siteSettings } = await getGlobalContent();
  return {
    organization: siteSettings.organizationName,
    email: siteSettings.email,
    telephone: siteSettings.telephone,
    whatsapp: `https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, "")}`,
    address: siteSettings.address,
    contactPage: "/contact",
    note: "Opening a channel or submitting the contact form is a separate action that requires the user's approval.",
  };
}
