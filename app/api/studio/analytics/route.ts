import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { getArticleAnalytics, getMissingAnalyticsConfiguration } from "@/lib/google-analytics";
import type { AnalyticsApiError } from "@/sanity/analytics/types";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(status: number, body: AnalyticsApiError) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!token) {
    return errorResponse(401, {
      code: "authentication_required",
      message: "يلزم تسجيل الدخول إلى Sanity Studio لعرض الإحصائيات.",
    });
  }

  try {
    const sanityClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });
    await sanityClient.users.getById("me");
  } catch {
    return errorResponse(403, {
      code: "forbidden",
      message: "تعذّر التحقق من صلاحية حساب Sanity الحالي.",
    });
  }

  const missingFields = getMissingAnalyticsConfiguration();
  if (missingFields.length) {
    return errorResponse(503, {
      code: "configuration_required",
      message: "يلزم إكمال ربط Google Analytics قبل عرض البيانات.",
      missingFields,
    });
  }

  const requestedDays = Number(request.nextUrl.searchParams.get("days") || 28);
  const days = [7, 28, 90].includes(requestedDays) ? requestedDays : 28;
  try {
    const data = await getArticleAnalytics(days);
    return NextResponse.json(data, { headers: { "Cache-Control": "private, max-age=300" } });
  } catch (error) {
    console.error("Failed to load article analytics", error);
    return errorResponse(502, {
      code: "provider_error",
      message: "تعذّر جلب البيانات من Google Analytics. تحقق من Property ID وصلاحية حساب الخدمة.",
    });
  }
}
