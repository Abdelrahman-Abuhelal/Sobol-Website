import { createReadStream, existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCliClient } from "sanity/cli";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-07-20";
const cliClient = getCliClient({ apiVersion });
const client = process.env.SANITY_SEED_TOKEN
  ? cliClient.withConfig({ token: process.env.SANITY_SEED_TOKEN, useCdn: false })
  : cliClient;
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(readFileSync(resolve(root, "content/fallback-content.json"), "utf8"));
const force = process.argv.includes("--force") || process.env.SANITY_SEED_FORCE === "true";

async function uploadEditorialImage(editorialImage) {
  if (!editorialImage?.fallbackSrc) return editorialImage;
  const localPath = resolve(root, "public", editorialImage.fallbackSrc.replace(/^\//, ""));
  if (!existsSync(localPath)) {
    console.warn(`Image not found, keeping local fallback: ${editorialImage.fallbackSrc}`);
    return editorialImage;
  }
  const asset = await client.assets.upload("image", createReadStream(localPath), { filename: localPath.split(/[\\/]/).at(-1) });
  return { ...editorialImage, image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } };
}

function prepareArrayTypes(document) {
  if (document._type === "aboutPage") {
    for (const section of document.sections) if (section._type === "teamSection") section.members = section.members.map((item) => ({ _type: "teamMember", ...item }));
  }
  if (document._type === "servicesPage") {
    for (const section of document.sections) {
      if (section._type === "servicePackagesSection") section.packages = section.packages.map((item) => ({ _type: "servicePackage", ...item }));
      if (section._type === "marketingServicesSection") section.services = section.services.map((item) => ({ _type: "marketingService", ...item }));
    }
  }
  if (document._type === "portfolioPage") for (const section of document.sections) if (section._type === "portfolioListSection") section.projects = section.projects.map((item) => ({ _type: "portfolioItem", ...item }));
}

async function prepareDocument(source) {
  const document = structuredClone(source);
  prepareArrayTypes(document);
  if (document.pageIntro?.image) document.pageIntro.image = await uploadEditorialImage(document.pageIntro.image);
  if (document.defaultOpenGraphImage) document.defaultOpenGraphImage = await uploadEditorialImage(document.defaultOpenGraphImage);
  if (document.hero?.journeyStages) {
    const [one, two, three] = document.hero.journeyStages;
    document.hero.journeyStageOne = { title: one.title, description: one.description };
    document.hero.journeyStageTwo = { title: two.title, description: two.description };
    document.hero.journeyStageThree = { title: three.title, description: three.description };
    delete document.hero.journeyStages;
  }
  return document;
}

for (const source of Object.values(content)) {
  const existing = await client.fetch(`*[_id == $id][0]{_id}`, { id: source._id });
  if (existing && !force) { console.log(`Skipped ${source._id}: it already exists. Use --force to replace it.`); continue; }
  const document = await prepareDocument(source);
  await client.createOrReplace(document);
  console.log(`${existing ? "Replaced" : "Created"} ${source._id}`);
}

console.log("Sanity seed completed.");
