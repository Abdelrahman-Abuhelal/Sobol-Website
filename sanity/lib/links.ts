import type { ControlledLink } from "@/sanity/lib/types";

export function controlledLinkHref(link?: ControlledLink) {
  if (!link) return "#";
  switch (link.kind) {
    case "internal": return link.internalRoute || "/";
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
