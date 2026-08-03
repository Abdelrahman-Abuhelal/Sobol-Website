import { getCliClient } from "sanity/cli";
import { fallbackSolutionPages } from "../content/solution-pages";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-20";
const cliClient = getCliClient({ apiVersion });
const client = process.env.SANITY_SEED_TOKEN
  ? cliClient.withConfig({ token: process.env.SANITY_SEED_TOKEN, useCdn: false })
  : cliClient;

function key(prefix: string, index: number) {
  return `${prefix}-${String(index + 1).padStart(2, "0")}`;
}

async function migrate() {
  for (const [pageIndex, page] of fallbackSolutionPages.entries()) {
    const document = {
      ...page,
      related: undefined,
      _id: `solutionPage-${page.slug}`,
      _type: "solutionPage",
      slug: { _type: "slug", current: page.slug },
      order: page.order ?? pageIndex + 1,
      isHidden: page.isHidden ?? false,
      outcomes: page.outcomes.map((item, index) => ({
        ...item,
        _key: key("outcome", index),
        _type: "solutionOutcome",
      })),
      process: page.process.map((item, index) => ({
        ...item,
        _key: key("step", index),
        _type: "solutionStep",
      })),
      questions: page.questions.map((item, index) => ({
        ...item,
        _key: key("question", index),
        _type: "solutionQuestion",
      })),
    };

    await client.createOrReplace(document);
    console.log(`Migrated ${page.slug}`);
  }

  for (const page of fallbackSolutionPages) {
    await client.patch(`solutionPage-${page.slug}`).set({
      related: page.related.map((slug, index) => ({
        _key: key("related", index),
        _type: "reference",
        _ref: `solutionPage-${slug}`,
      })),
    }).commit();
  }

  await client.patch("siteSettings").set({ publicSiteUrl: "https://www.sobol.ps" }).commit();
  console.log("Updated siteSettings.publicSiteUrl to https://www.sobol.ps");
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
