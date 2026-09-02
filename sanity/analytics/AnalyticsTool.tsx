"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChartUpwardIcon } from "@sanity/icons/ChartUpward";
import { RefreshIcon } from "@sanity/icons/Refresh";
import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@sanity/ui";
import { useClient } from "sanity";
import type { AnalyticsApiError, AnalyticsDashboardData } from "@/sanity/analytics/types";
import { apiVersion } from "@/sanity/env";

const numberFormatter = new Intl.NumberFormat("ar-PS", { maximumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("ar-PS", { maximumFractionDigits: 0, style: "percent" });
const dateFormatter = new Intl.DateTimeFormat("ar-PS", { day: "numeric", month: "short" });
const dateTimeFormatter = new Intl.DateTimeFormat("ar-PS", { dateStyle: "medium", timeStyle: "short" });

const channelNames: Record<string, string> = {
  copy_link: "نسخ الرابط",
  email: "البريد الإلكتروني",
  facebook: "فيسبوك",
  linkedin: "لينكدإن",
  native: "مشاركة الجهاز",
  native_share: "مشاركة الجهاز",
  whatsapp: "واتساب",
};

function formatDuration(seconds: number) {
  if (seconds < 60) return `${numberFormatter.format(Math.round(seconds))} ث`;
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return remainder ? `${numberFormatter.format(minutes)} د ${numberFormatter.format(remainder)} ث` : `${numberFormatter.format(minutes)} د`;
}

function TrendChart({ data }: { data: AnalyticsDashboardData["trend"] }) {
  const points = useMemo(() => {
    if (!data.length) return "";
    const max = Math.max(1, ...data.map((item) => item.views));
    return data.map((item, index) => {
      const x = data.length === 1 ? 50 : (index / (data.length - 1)) * 100;
      const y = 36 - (item.views / max) * 32;
      return `${x},${y}`;
    }).join(" ");
  }, [data]);

  if (!data.length) return null;
  const total = data.reduce((sum, item) => sum + item.views, 0);
  return (
    <Card border radius={3} padding={4}>
      <Flex align="center" justify="space-between" gap={3}>
        <Stack space={2}>
          <Text size={1} weight="semibold">حركة القراءة خلال الفترة</Text>
          <Text muted size={1}>إجمالي {numberFormatter.format(total)} مشاهدة موزعة حسب اليوم</Text>
        </Stack>
        <ChartUpwardIcon aria-hidden="true" />
      </Flex>
      <Box marginTop={4}>
        <svg viewBox="0 0 100 40" width="100%" height="150" role="img" aria-label="منحنى مشاهدات المقالات اليومية" preserveAspectRatio="none">
          <line x1="0" y1="36" x2="100" y2="36" stroke="currentColor" opacity="0.12" vectorEffect="non-scaling-stroke" />
          <polyline points={points} fill="none" stroke="var(--card-focus-ring-color, oklch(0.49 0.085 187))" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <Flex justify="space-between">
          <Text muted size={0}>{dateFormatter.format(new Date(`${data[0].date.slice(0, 4)}-${data[0].date.slice(4, 6)}-${data[0].date.slice(6, 8)}`))}</Text>
          <Text muted size={0}>{dateFormatter.format(new Date(`${data.at(-1)!.date.slice(0, 4)}-${data.at(-1)!.date.slice(4, 6)}-${data.at(-1)!.date.slice(6, 8)}`))}</Text>
        </Flex>
      </Box>
    </Card>
  );
}

function LoadingState() {
  return (
    <Stack space={4}>
      <Skeleton animated radius={3} style={{ height: 108 }} />
      <Skeleton animated radius={3} style={{ height: 210 }} />
      <Skeleton animated radius={3} style={{ height: 320 }} />
    </Stack>
  );
}

function ErrorState({ error, onRetry }: { error: AnalyticsApiError; onRetry: () => void }) {
  const isConfiguration = error.code === "configuration_required";
  return (
    <Card border padding={5} radius={3} tone={isConfiguration ? "caution" : "critical"}>
      <Flex gap={4} align="flex-start">
        <WarningOutlineIcon aria-hidden="true" />
        <Stack space={4} flex={1}>
          <Stack space={2}>
            <Heading size={2}>{isConfiguration ? "أكمل ربط الإحصائيات" : "تعذّر تحميل الإحصائيات"}</Heading>
            <Text size={1}>{error.message}</Text>
          </Stack>
          {error.missingFields?.length ? (
            <Card padding={3} radius={2} tone="transparent">
              <Text size={1}>المتغيرات المطلوبة: <code dir="ltr">{error.missingFields.join(", ")}</code></Text>
            </Card>
          ) : null}
          <Box><Button icon={RefreshIcon} mode="ghost" onClick={onRetry} text="إعادة المحاولة" /></Box>
        </Stack>
      </Flex>
    </Card>
  );
}

export function AnalyticsTool() {
  const client = useClient({ apiVersion });
  const [days, setDays] = useState(28);
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [error, setError] = useState<AnalyticsApiError | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = client.config().token;
      const response = await fetch(`/api/studio/analytics?days=${days}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      });
      const body = await response.json();
      if (!response.ok) throw body as AnalyticsApiError;
      setData(body as AnalyticsDashboardData);
    } catch (caught) {
      setData(null);
      setError((caught && typeof caught === "object" && "code" in caught)
        ? caught as AnalyticsApiError
        : { code: "provider_error", message: "حدث خطأ غير متوقع أثناء تحميل البيانات." });
    } finally {
      setLoading(false);
    }
  }, [client, days]);

  useEffect(() => { void load(); }, [load]);

  return (
    <Card height="fill" overflow="auto" dir="rtl">
      <Container width={5} padding={[3, 4, 5]} sizing="border">
        <Stack space={5}>
          <Flex align={["flex-start", "center"]} direction={["column", "row"]} gap={4} justify="space-between">
            <Stack space={2}>
              <Flex align="center" gap={2}>
                <ChartUpwardIcon aria-hidden="true" />
                <Heading size={3}>إحصائيات المقالات</Heading>
              </Flex>
              <Text muted size={1}>ما الذي يقرأه الزوار، وكم يتفاعلون معه، ومن أين تأتي المشاركات.</Text>
            </Stack>
            <Flex align="center" gap={2}>
              <Select aria-label="الفترة الزمنية" fontSize={1} value={days} onChange={(event) => setDays(Number(event.currentTarget.value))}>
                <option value={7}>آخر ٧ أيام</option>
                <option value={28}>آخر ٢٨ يوماً</option>
                <option value={90}>آخر ٩٠ يوماً</option>
              </Select>
              <Button aria-label="تحديث البيانات" icon={RefreshIcon} mode="ghost" onClick={() => void load()} disabled={loading} />
            </Flex>
          </Flex>

          {loading ? <LoadingState /> : error ? <ErrorState error={error} onRetry={() => void load()} /> : data ? (
            <Stack space={4}>
              <Card border radius={3}>
                <Grid columns={[2, 2, 5]}>
                  {[
                    ["القرّاء", numberFormatter.format(data.summary.readers)],
                    ["المشاهدات", numberFormatter.format(data.summary.views)],
                    ["متوسط التفاعل", formatDuration(data.summary.averageEngagementSeconds)],
                    ["المشاركات", numberFormatter.format(data.summary.shares)],
                    ["الجلسات", numberFormatter.format(data.summary.sessions)],
                  ].map(([label, value], index) => (
                    <Box key={label} padding={4} style={{ borderInlineStart: index ? "1px solid rgba(127,127,127,.18)" : undefined }}>
                      <Stack space={3}>
                        <Text muted size={1}>{label}</Text>
                        <Heading size={2}>{value}</Heading>
                      </Stack>
                    </Box>
                  ))}
                </Grid>
              </Card>

              <Grid columns={[1, 1, 3]} gap={4}>
                <Box column={[1, 1, 1, 3]}><TrendChart data={data.trend} /></Box>
                <Card border radius={3} padding={4}>
                  <Stack space={4}>
                    <Text size={1} weight="semibold">قنوات المشاركة</Text>
                    {data.channels.length ? data.channels.map((channel) => (
                      <Flex key={channel.channel} align="center" justify="space-between" gap={3}>
                        <Text size={1}>{channelNames[channel.channel] || channel.channel}</Text>
                        <Badge mode="outline" tone="primary">{numberFormatter.format(channel.count)}</Badge>
                      </Flex>
                    )) : <Text muted size={1}>لا توجد مشاركات مسجّلة في هذه الفترة.</Text>}
                  </Stack>
                </Card>
              </Grid>

              <Card border radius={3} overflow="hidden">
                <Box padding={4}>
                  <Flex align="center" justify="space-between" gap={3}>
                    <Stack space={2}>
                      <Text size={1} weight="semibold">أداء المقالات</Text>
                      <Text muted size={1}>مرتبة حسب عدد المشاهدات</Text>
                    </Stack>
                    <Badge mode="outline">{numberFormatter.format(data.articles.length)} مقال</Badge>
                  </Flex>
                </Box>
                {data.articles.length ? (
                  <Box overflow="auto">
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760, textAlign: "right" }}>
                      <thead>
                        <tr style={{ background: "rgba(127,127,127,.07)" }}>
                          {["المقال", "القرّاء", "المشاهدات", "متوسط التفاعل", "أكمل ٩٠٪", "المشاركات"].map((heading) => (
                            <th key={heading} style={{ padding: "12px 16px", fontSize: 12, fontWeight: 600, borderBottom: "1px solid rgba(127,127,127,.18)", whiteSpace: "nowrap" }}>{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.articles.map((article) => (
                          <tr key={article.path}>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)", maxWidth: 360 }}>
                              <Stack space={2}>
                                <Text size={1} weight="medium">{article.title}</Text>
                                <Text muted size={0}>{article.path}</Text>
                              </Stack>
                            </td>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)" }}><Text size={1}>{numberFormatter.format(article.readers)}</Text></td>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)" }}><Text size={1}>{numberFormatter.format(article.views)}</Text></td>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)" }}><Text size={1}>{formatDuration(article.averageEngagementSeconds)}</Text></td>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)" }}><Text muted={article.completionRate === null} size={1}>{article.completionRate === null ? "قيد الإعداد" : percentFormatter.format(article.completionRate / 100)}</Text></td>
                            <td style={{ padding: "14px 16px", borderBottom: "1px solid rgba(127,127,127,.14)" }}><Text size={1}>{numberFormatter.format(article.shares)}</Text></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Box>
                ) : (
                  <Card padding={5} tone="transparent"><Text muted align="center">لا توجد زيارات لمقالات خلال الفترة المحددة بعد.</Text></Card>
                )}
              </Card>

              {data.warnings.length ? (
                <Card border padding={4} radius={3} tone="caution">
                  <Stack space={3}>
                    <Text size={1} weight="semibold">لإظهار كل المؤشرات</Text>
                    {data.warnings.map((warning) => <Text key={warning} size={1}>• {warning}</Text>)}
                  </Stack>
                </Card>
              ) : null}
              <Text muted size={0}>آخر تحديث: {dateTimeFormatter.format(new Date(data.generatedAt))}. البيانات مجمّعة ولا تعرض هوية الزوار.</Text>
            </Stack>
          ) : null}
        </Stack>
      </Container>
    </Card>
  );
}

export const analyticsTool = {
  name: "article-analytics",
  title: "إحصائيات المقالات",
  icon: ChartUpwardIcon,
  component: AnalyticsTool,
};
