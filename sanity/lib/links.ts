import type { ControlledLink, Navigation } from "@/sanity/lib/types";

export function withSuccessStoriesNavigation(navigation: Navigation): Navigation {
  const updateLinks = (items: Navigation["headerLinks"]): Navigation["headerLinks"] => {
    const hasExplicitStoryLink = items.some((item) => item.destination.kind === "internal" && item.destination.internalRoute === "/success-stories");
    const links: Navigation["headerLinks"] = items.filter((item) => !hasExplicitStoryLink || item.destination.kind !== "internal" || item.destination.internalRoute !== "/portfolio").map((item) =>
      item.destination.kind === "internal" && item.destination.internalRoute === "/portfolio"
        ? { ...item, isHidden: false, label: "قصص نجاح", destination: { ...item.destination, label: "قصص نجاح", internalRoute: "/success-stories" satisfies ControlledLink["internalRoute"] } }
        : item,
    );
    if (links.some((item) => item.destination.kind === "internal" && item.destination.internalRoute === "/success-stories")) return links;
    const storyLink: Navigation["headerLinks"][number] = {
      _key: "success-stories", _type: "navigationItem", label: "قصص نجاح",
      destination: { kind: "internal", label: "قصص نجاح", internalRoute: "/success-stories" },
    };
    const blogIndex = links.findIndex((item) => item.destination.kind === "internal" && item.destination.internalRoute === "/blog");
    links.splice(blogIndex < 0 ? links.length : blogIndex, 0, storyLink);
    return links;
  };
  return { ...navigation, headerLinks: updateLinks(navigation.headerLinks), footerLinks: updateLinks(navigation.footerLinks) };
}

export function controlledLinkHref(link?: ControlledLink) {
  if (!link) return "#";
  switch (link.kind) {
    case "internal": return link.internalRoute === "/portfolio" ? "/success-stories" : link.internalRoute || "/";
    case "https": return link.url || "#";
    case "email": return link.email ? `mailto:${link.email}${link.emailSubject ? `?subject=${encodeURIComponent(link.emailSubject)}` : ""}` : "#";
    case "telephone": return link.telephone ? `tel:${link.telephone}` : "#";
    case "whatsapp": return link.whatsapp ? `https://wa.me/${link.whatsapp.replace(/\D/g, "")}` : "#";
    default: return "#";
  }
}

export function isExternalLink(link?: ControlledLink) {
  return link?.kind === "https" || link?.kind === "whatsapp";
}
