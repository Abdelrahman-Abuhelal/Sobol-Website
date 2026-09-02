export type AnalyticsSummary = {
  readers: number;
  views: number;
  sessions: number;
  averageEngagementSeconds: number;
  shares: number;
};

export type ArticleAnalyticsRow = {
  path: string;
  title: string;
  readers: number;
  views: number;
  averageEngagementSeconds: number;
  shares: number;
  completionRate: number | null;
};

export type AnalyticsDashboardData = {
  articles: ArticleAnalyticsRow[];
  channels: Array<{ channel: string; count: number }>;
  generatedAt: string;
  rangeDays: number;
  summary: AnalyticsSummary;
  trend: Array<{ date: string; readers: number; views: number }>;
  warnings: string[];
};

export type AnalyticsApiError = {
  code: "authentication_required" | "configuration_required" | "forbidden" | "provider_error";
  message: string;
  missingFields?: string[];
};
