import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const routeByType: Record<string, string[]> = {
  siteSettings: ["/", "/about", "/services", "/portfolio", "/blog", "/contact", "/sitemap.xml", "/llms.txt", "/robots.txt"],
  navigation: ["/", "/about", "/services", "/portfolio", "/blog", "/contact"],
  homePage: ["/"], aboutPage: ["/about"], servicesPage: ["/services"],
  portfolioPage: ["/portfolio"], blogPage: ["/blog"], contactPage: ["/contact"],
  article: ["/blog"], author: ["/blog"], articleCategory: ["/blog"],
  solutionPage: ["/", "/services", "/sitemap.xml", "/llms.txt"],
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Revalidation is not configured." }, { status: 503 });
  const rawBody = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
  if (!(await isValidSignature(rawBody, signature, secret))) return NextResponse.json({ ok: false, error: "Invalid webhook signature." }, { status: 401 });

  let body: { _type?: string; slug?: { current?: string } };
  try { body = JSON.parse(rawBody) as { _type?: string; slug?: { current?: string } }; } catch { return NextResponse.json({ ok: false, error: "Invalid JSON payload." }, { status: 400 }); }
  const types = body._type && routeByType[body._type] ? [body._type] : Object.keys(routeByType);
  const paths = new Set(types.flatMap((type) => routeByType[type]));
  for (const type of types) revalidateTag(type, "max");
  for (const path of paths) revalidatePath(path);
  if (body._type === "solutionPage" && body.slug?.current) revalidatePath(`/services/${body.slug.current}`);
  if (types.some((type) => type === "article" || type === "author" || type === "articleCategory")) revalidatePath("/blog/[slug]", "page");
  return NextResponse.json({ ok: true, revalidatedTypes: types, revalidatedPaths: [...paths] });
}
