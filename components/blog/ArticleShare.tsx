"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Facebook,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Share2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type ShareChannel = "copy_link" | "facebook" | "linkedin" | "whatsapp" | "email" | "native";

type ArticleShareProps = {
  canonicalUrl: string;
  slug: string;
  title: string;
  placement?: "top" | "bottom";
};

const channelUtmSource: Record<ShareChannel, string> = {
  copy_link: "copy_link",
  facebook: "facebook",
  linkedin: "linkedin",
  whatsapp: "whatsapp",
  email: "email",
  native: "native_share",
};

function addShareAttribution(url: string, channel: ShareChannel) {
  const sharedUrl = new URL(url);
  sharedUrl.searchParams.set("utm_source", channelUtmSource[channel]);
  sharedUrl.searchParams.set("utm_medium", "share");
  sharedUrl.searchParams.set("utm_campaign", "article_share");
  return sharedUrl.toString();
}

export function ArticleShare({ canonicalUrl, slug, title, placement = "top" }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const shareText = `مقال من سُبُل: ${title}`;
  const links = useMemo(() => {
    const facebookUrl = addShareAttribution(canonicalUrl, "facebook");
    const linkedinUrl = addShareAttribution(canonicalUrl, "linkedin");
    const whatsappUrl = addShareAttribution(canonicalUrl, "whatsapp");
    const emailUrl = addShareAttribution(canonicalUrl, "email");

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(facebookUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(linkedinUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${whatsappUrl}`)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${emailUrl}`)}`,
    };
  }, [canonicalUrl, shareText, title]);

  const recordShare = (channel: ShareChannel) => {
    trackEvent("article_share", {
      article_slug: slug,
      article_title: title,
      share_channel: channel,
      share_placement: placement,
    });
  };

  const copyLink = async () => {
    const sharedUrl = addShareAttribution(canonicalUrl, "copy_link");
    try {
      await navigator.clipboard.writeText(sharedUrl);
    } catch {
      const input = document.createElement("textarea");
      input.value = sharedUrl;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    recordShare("copy_link");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const nativeShare = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text: shareText, url: addShareAttribution(canonicalUrl, "native") });
      recordShare("native");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

  const linkClass = "inline-flex size-11 items-center justify-center rounded-full border border-[oklch(0.82_0.025_187)] bg-background text-secondary transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-[oklch(0.95_0.03_178)] hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-3";

  return (
    <aside
      className={placement === "top" ? "mb-10 border-y border-[oklch(0.87_0.018_190)] py-5" : "mt-14 rounded-2xl bg-[oklch(0.96_0.022_178)] px-5 py-6 sm:px-7"}
      aria-label="مشاركة المقال"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-base font-black text-secondary">شارك الفكرة مع من تهمّه</p>
          {placement === "bottom" && <p className="mt-1 text-sm leading-6 text-muted-foreground">قد يكون هذا المقال الخطوة التي يحتاجها صاحب عمل آخر.</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="خيارات المشاركة">
          <button type="button" onClick={copyLink} className={`${linkClass} w-auto gap-2 px-4`} aria-live="polite">
            {copied ? <Check className="size-4" aria-hidden="true" /> : <LinkIcon className="size-4" aria-hidden="true" />}
            <span className="text-sm font-bold">{copied ? "تم النسخ" : "نسخ الرابط"}</span>
          </button>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => recordShare("whatsapp")} className={linkClass} aria-label="مشاركة على واتساب"><MessageCircle className="size-5" aria-hidden="true" /></a>
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" onClick={() => recordShare("facebook")} className={linkClass} aria-label="مشاركة على فيسبوك"><Facebook className="size-5" aria-hidden="true" /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => recordShare("linkedin")} className={linkClass} aria-label="مشاركة على لينكدإن"><Linkedin className="size-5" aria-hidden="true" /></a>
          <a href={links.email} onClick={() => recordShare("email")} className={linkClass} aria-label="مشاركة عبر البريد الإلكتروني"><Mail className="size-5" aria-hidden="true" /></a>
          <button type="button" onClick={nativeShare} className={linkClass} aria-label="فتح خيارات المشاركة في الجهاز"><Share2 className="size-5" aria-hidden="true" /></button>
        </div>
      </div>
    </aside>
  );
}
