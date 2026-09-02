"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type ArticleAnalyticsProps = {
  categories: string[];
  slug: string;
  title: string;
};

const TIME_MILESTONES = [15, 30, 60, 120, 300];
const SCROLL_MILESTONES = [25, 50, 75, 90, 100];

export function ArticleAnalytics({ categories, slug, title }: ArticleAnalyticsProps) {
  useEffect(() => {
    let engagedSeconds = 0;
    let lastReportedSeconds = 0;
    const reachedTimes = new Set<number>();
    const reachedDepths = new Set<number>();

    const articleParameters = {
      article_slug: slug,
      article_title: title,
      article_categories: categories.join(", "),
    };

    trackEvent("article_view", articleParameters);

    const reportTime = (seconds: number, isExit = false) => {
      if (seconds <= lastReportedSeconds) return;
      trackEvent("article_read_time", {
        ...articleParameters,
        engaged_seconds: seconds,
        milestone_seconds: isExit ? "exit" : seconds,
        transport_type: isExit ? "beacon" : "xhr",
      });
      lastReportedSeconds = seconds;
    };

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible" || !document.hasFocus()) return;
      engagedSeconds += 1;
      for (const milestone of TIME_MILESTONES) {
        if (engagedSeconds >= milestone && !reachedTimes.has(milestone)) {
          reachedTimes.add(milestone);
          reportTime(milestone);
        }
      }
    }, 1000);

    const onScroll = () => {
      const article = document.querySelector<HTMLElement>("[data-article-content]");
      if (!article) return;
      const start = article.offsetTop;
      const height = article.offsetHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      const depth = Math.max(0, Math.min(100, Math.round(((viewportBottom - start) / height) * 100)));

      for (const milestone of SCROLL_MILESTONES) {
        if (depth >= milestone && !reachedDepths.has(milestone)) {
          reachedDepths.add(milestone);
          trackEvent("article_scroll", { ...articleParameters, scroll_percent: milestone });
        }
      }
    };

    const onPageHide = () => reportTime(engagedSeconds, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    onScroll();

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", onPageHide);
      reportTime(engagedSeconds, true);
    };
  }, [categories, slug, title]);

  return null;
}
