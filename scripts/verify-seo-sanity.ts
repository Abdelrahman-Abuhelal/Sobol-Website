import { getCliClient } from "sanity/cli";

async function verify() {
  const client = getCliClient({
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-20",
  });
  const result = await client.fetch<{
    solutionCount: number;
    siteUrl: string | null;
    slugs: string[];
  }>(`{
    "solutionCount": count(*[_type == "solutionPage" && !(_id in path("drafts.**"))]),
    "siteUrl": *[_id == "siteSettings"][0].publicSiteUrl,
    "slugs": *[_type == "solutionPage" && !(_id in path("drafts.**"))] | order(order asc).slug.current
  }`);
  console.log(JSON.stringify(result, null, 2));
  if (result.solutionCount !== 7) throw new Error(`Expected 7 solution pages, found ${result.solutionCount}.`);
  if (result.siteUrl !== "https://www.sobol.ps") throw new Error(`Unexpected canonical URL: ${result.siteUrl}`);
}

verify().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
