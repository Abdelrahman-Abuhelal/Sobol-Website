import { publicPages, requestOrigin } from "@/lib/agent-discovery";
import { getArticles, getSiteSettingsForMetadata, getSolutionPages } from "@/sanity/lib/data";

const pageDescriptions: Record<string, string> = {
  "/": "نبذة عن سُبُل ومنهجها في تنظيم المشاريع ودعم نموها.",
  "/about": "تعريف بالشركة ومنهج العمل والمبادئ والفريق.",
  "/services": "الخدمات الإدارية والمالية والتشغيلية والتسويقية المتاحة.",
  "/portfolio": "نماذج مختصرة من نتائج الأعمال والمشاريع السابقة.",
  "/blog": "مقالات عملية في الإدارة والعمليات والمالية ونمو الأعمال.",
  "/contact": "بيانات التواصل ونموذج طلب الاستشارة.",
};

export async function GET(request: Request) {
  const [settings, articles, solutionPages] = await Promise.all([
    getSiteSettingsForMetadata(),
    getArticles(),
    getSolutionPages(),
  ]);
  const origin = requestOrigin(request);
  const pageLines = publicPages.map(
    (page) =>
      `- [${page.titleAr}](${origin}${page.path}): ${pageDescriptions[page.path]}`,
  );
  const articleLines = articles.map(
    (article) =>
      `- [${article.title}](${origin}/blog/${article.slug}): ${article.excerpt}`,
  );
  const solutionLines = solutionPages.map(
    (page) =>
      `- [${page.shortTitle}](${origin}/services/${page.slug}): ${page.metaDescription}`,
  );
  const sections = [
    `# ${settings.organizationName}`,
    `> ${settings.defaultSeoDescription}`,
    "",
    "## الصفحات الرئيسية",
    ...pageLines,
    "",
    "## حلول حسب مشكلة المشروع",
    ...solutionLines,
    "",
    "## معلومات أساسية",
    `- الموقع الرسمي: ${settings.publicSiteUrl}`,
    `- الموقع الجغرافي: ${settings.address}`,
    `- البريد الإلكتروني: ${settings.email}`,
    `- الهاتف: ${settings.telephone}`,
    "- اللغة الأساسية: العربية",
    ...(articleLines.length ? ["", "## أحدث المقالات", ...articleLines] : []),
    "",
    "## الوصول المنظم",
    `- [دليل واجهة البرمجة](${origin}/docs/api)`,
    `- [بطاقة خادم MCP](${origin}/.well-known/mcp/server-card.json)`,
    `- [فهرس مهارات الوكلاء](${origin}/.well-known/agent-skills/index.json)`,
  ];

  return new Response(`${sections.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": "ar",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
