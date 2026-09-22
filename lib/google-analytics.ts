import "server-only";

import { BetaAnalyticsDataClient, protos } from "@google-analytics/data";
import type { AnalyticsDashboardData, ArticleAnalyticsRow } from "@/sanity/analytics/types";

type RunReportResponse = protos.google.analytics.data.v1beta.IRunReportResponse;

const BLOG_FILTER = {
  filter: {
    fieldName: "pagePath",
    stringFilter: { matchType: "FULL_REGEXP" as const, value: "^/blog/[^/?]+/?$" },
  },
};

const EVENT_NAMES = ["article_view", "article_scroll", "article_read_time", "article_share"];

function numberValue(value: string | null | undefined) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function firstMetric(response: RunReportResponse, index: number) {
  return numberValue(response.rows?.[0]?.metricValues?.[index]?.value);
}

function getConfiguration() {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const clientEmail = process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  const missingFields = [
    !propertyId && "GA4_PROPERTY_ID",
    !clientEmail && "GOOGLE_ANALYTICS_CLIENT_EMAIL",
    !privateKey && "GOOGLE_ANALYTICS_PRIVATE_KEY",
  ].filter(Boolean) as string[];

  if (missingFields.length) return { missingFields } as const;
  return { clientEmail: clientEmail!, privateKey: privateKey!, propertyId: propertyId! } as const;
}

export function getMissingAnalyticsConfiguration() {
  const configuration = getConfiguration();
  return "missingFields" in configuration ? configuration.missingFields || [] : [];
}

export async function getArticleViewCounts(): Promise<Record<string, number>> {
  const configuration = getConfiguration();
  if ("missingFields" in configuration) return {};

  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: configuration.clientEmail,
      private_key: configuration.privateKey,
    },
  });
  const [response] = await client.runReport({
    property: `properties/${configuration.propertyId}`,
    dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    dimensionFilter: BLOG_FILTER,
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 1000,
  });

  return Object.fromEntries((response.rows || []).flatMap((row) => {
    const path = row.dimensionValues?.[0]?.value || "";
    const slug = path.match(/^\/blog\/([^/?]+)\/?$/)?.[1];
    return slug ? [[slug, numberValue(row.metricValues?.[0]?.value)]] : [];
  }));
}

export async function getArticleAnalytics(days: number): Promise<AnalyticsDashboardData> {
  const configuration = getConfiguration();
  if ("missingFields" in configuration) throw new Error("Analytics configuration is incomplete");

  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: configuration.clientEmail,
      private_key: configuration.privateKey,
    },
  });
  const property = `properties/${configuration.propertyId}`;
  const dateRanges = [{ startDate: `${days - 1}daysAgo`, endDate: "today" }];

  const [summaryResult, articleResult, trendResult, eventResult] = await Promise.all([
    client.runReport({
      property,
      dateRanges,
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "userEngagementDuration" },
      ],
      dimensionFilter: BLOG_FILTER,
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "userEngagementDuration" },
      ],
      dimensionFilter: BLOG_FILTER,
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 100,
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      dimensionFilter: BLOG_FILTER,
      orderBys: [{ dimension: { dimensionName: "date" } }],
      limit: 366,
    }),
    client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "pagePath" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            BLOG_FILTER,
            {
              filter: {
                fieldName: "eventName",
                inListFilter: { values: EVENT_NAMES },
              },
            },
          ],
        },
      },
      limit: 1000,
    }),
  ]);

  const warnings: string[] = [];
  let channelResponse: RunReportResponse | null = null;
  let completionResponse: RunReportResponse | null = null;

  try {
    [channelResponse] = await client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "customEvent:share_channel" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: { fieldName: "eventName", stringFilter: { value: "article_share", matchType: "EXACT" } },
      },
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    });
  } catch {
    warnings.push("أضف البُعد المخصّص share_channel في GA4 لعرض توزيع قنوات المشاركة.");
  }

  try {
    [completionResponse] = await client.runReport({
      property,
      dateRanges,
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        andGroup: {
          expressions: [
            BLOG_FILTER,
            { filter: { fieldName: "eventName", stringFilter: { value: "article_scroll", matchType: "EXACT" } } },
            { filter: { fieldName: "customEvent:scroll_percent", stringFilter: { value: "90", matchType: "EXACT" } } },
          ],
        },
      },
      limit: 100,
    });
  } catch {
    warnings.push("أضف البُعد المخصّص scroll_percent في GA4 لعرض نسبة إكمال قراءة المقال.");
  }

  const summaryResponse = summaryResult[0];
  const articleResponse = articleResult[0];
  const trendResponse = trendResult[0];
  const eventResponse = eventResult[0];
  const sharesByPath = new Map<string, number>();
  const viewsByPath = new Map<string, number>();
  const completionsByPath = new Map<string, number>();

  for (const row of eventResponse.rows || []) {
    const path = row.dimensionValues?.[0]?.value || "";
    const eventName = row.dimensionValues?.[1]?.value || "";
    const count = numberValue(row.metricValues?.[0]?.value);
    if (eventName === "article_share") sharesByPath.set(path, count);
    if (eventName === "article_view") viewsByPath.set(path, count);
  }
  for (const row of completionResponse?.rows || []) {
    completionsByPath.set(row.dimensionValues?.[0]?.value || "", numberValue(row.metricValues?.[0]?.value));
  }

  const articles: ArticleAnalyticsRow[] = (articleResponse.rows || []).map((row) => {
    const path = row.dimensionValues?.[0]?.value || "";
    const readers = numberValue(row.metricValues?.[0]?.value);
    const trackedViews = viewsByPath.get(path) || 0;
    const completionCount = completionsByPath.get(path);
    return {
      path,
      title: (row.dimensionValues?.[1]?.value || path).replace(/ \| .*$/, ""),
      readers,
      views: numberValue(row.metricValues?.[1]?.value),
      averageEngagementSeconds: readers ? numberValue(row.metricValues?.[2]?.value) / readers : 0,
      shares: sharesByPath.get(path) || 0,
      completionRate: completionCount === undefined || !trackedViews
        ? null
        : Math.min(100, (completionCount / trackedViews) * 100),
    };
  });

  const readers = firstMetric(summaryResponse, 0);
  const totalShares = [...sharesByPath.values()].reduce((sum, value) => sum + value, 0);
  return {
    articles,
    channels: (channelResponse?.rows || []).map((row) => ({
      channel: row.dimensionValues?.[0]?.value || "غير معروف",
      count: numberValue(row.metricValues?.[0]?.value),
    })),
    generatedAt: new Date().toISOString(),
    rangeDays: days,
    summary: {
      readers,
      views: firstMetric(summaryResponse, 1),
      sessions: firstMetric(summaryResponse, 2),
      averageEngagementSeconds: readers ? firstMetric(summaryResponse, 3) / readers : 0,
      shares: totalShares,
    },
    trend: (trendResponse.rows || []).map((row) => ({
      date: row.dimensionValues?.[0]?.value || "",
      readers: numberValue(row.metricValues?.[0]?.value),
      views: numberValue(row.metricValues?.[1]?.value),
    })),
    warnings,
  };
}
