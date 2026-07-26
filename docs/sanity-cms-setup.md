# Sanity CMS setup and owner guide

This site uses one embedded Sanity Studio at `/studio`, eight fixed singleton documents, Draft Mode for private preview, and a signed webhook for published updates. The six public URLs remain fixed; editors cannot create routes or visual styles.

## 1. Create the project and dataset

1. Create or select a project at [sanity.io/manage](https://www.sanity.io/manage).
2. Create a dataset named `production`. Keep it private unless there is a deliberate reason to expose it.
3. Copy the project ID from the project settings.
4. Under API settings, create a token with **Viewer** access. This token is only for the Next.js server to read drafts; never prefix it with `NEXT_PUBLIC_` or paste it into Studio code.
5. Generate a long random webhook secret (at least 32 random bytes).

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and replace every placeholder. Add the same values to the production hosting environment:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_URL=https://your-production-origin.example
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAIL=
```

`NEXT_PUBLIC_SITE_URL` must be the canonical origin without a trailing slash. Only the project ID, dataset, and site URL are browser-visible. The token, webhook secret, and Resend key must stay server-only.

Restart the development server after changing environment variables.

## 3. Configure CORS

In Sanity Manage → API → CORS origins, add these origins with **Allow credentials** enabled:

- `http://localhost:3000`
- The exact production origin in `NEXT_PUBLIC_SITE_URL`
- Any fixed deployment preview origin that owners will use with Presentation mode

Do not use wildcard production origins with credentials.

## 4. Run Studio and seed the content

```bash
npm install
npm run dev
npm run seed:sanity
```

Open `http://localhost:3000/studio`. The seed command creates deterministic `siteSettings`, `navigation`, and six page documents, preserves stable section keys, and uploads the five page-intro images. It skips any existing singleton so rerunning it cannot overwrite editor changes.

To intentionally replace all eight singleton documents with repository fallback content:

```bash
SANITY_SEED_FORCE=true npm run seed:sanity
```

On Windows PowerShell use `$env:SANITY_SEED_FORCE='true'; npm run seed:sanity`. Treat force mode as destructive: export or back up the dataset first.

If image upload fails, the website continues to use the repository image fallback. In Studio, open each non-home page, select its Page introduction image, upload the matching file from `public/images/page-intros`, enter the existing Arabic alt text, and publish.

After seeding, inspect and publish all eight documents. Published visitors keep receiving the built-in fallback until a corresponding Sanity document is available.

## 5. Configure the publish webhook

In Sanity Manage → API → Webhooks, create a webhook with:

- URL: `https://your-production-origin.example/api/revalidate`
- Dataset: `production`
- Trigger on: create, update, and delete
- Filter: `_type in ["siteSettings","navigation","homePage","aboutPage","servicesPage","portfolioPage","blogPage","contactPage"]`
- Projection: `{_type}`
- HTTP method: POST
- Secret: the exact `SANITY_REVALIDATE_SECRET`

Enable drafts only if the webhook UI separates draft and published events and the site should revalidate after an unpublish. The endpoint verifies Sanity's signature, rejects unsigned requests, revalidates only the affected page for page documents, and revalidates every public page for global documents.

## 6. Preview and Presentation mode

Open `/studio`, select **Presentation**, and choose a singleton document. Document locations map to `/`, `/about`, `/services`, `/portfolio`, `/blog`, or `/contact`.

Presentation enters Next.js Draft Mode through `/api/draft-mode/enable`. The server-only Viewer token fetches draft content and Visual Editing enables click-to-edit overlays. Use the **Exit preview** control on the site, or visit `/api/draft-mode/disable`, to clear the preview cookie. Normal visitors never receive draft content.

For production Presentation mode, verify that the production origin is in Sanity CORS with credentials and that all five Sanity environment variables are set before deployment.

## 7. Everyday editing

1. Open the relevant singleton in Studio.
2. Edit copy, links, editorial images, SEO, repeated items, or displayed contact/form labels.
3. Use each item's **Hide this item/section** switch when removal should be reversible.
4. Drag approved sections or repeatable items to reorder them. Studio validation prevents duplicate sections and keeps consultation CTAs last.
5. Use Presentation to check desktop/mobile behavior and click-to-edit.
6. Publish. The signed webhook updates the affected live route without a new deployment.

Editors cannot create arbitrary pages, HTML, CSS, layout variants, icons, scripts, or application data. Contact service values, validation, API requests, Resend behavior, and decorative assets remain code-controlled.

To revert content, open the document history in Studio, select the desired revision, restore it, review in Presentation, and publish. Dataset export is recommended before large editorial migrations.

## 8. Invite owners and roles

Invite owners from Sanity Manage → Members. Grant the least privilege offered by the selected plan. Sanity plan capabilities can change, so confirm the current plan before launch: Free plans may provide only broad project roles, while granular/custom content roles and approval workflows can require a paid tier. The Studio UI prevents singleton duplication/deletion, but UI safeguards are not a security boundary; anyone with API write credentials can bypass them. Do not give editors project administrator or token-management access unless required.

## 9. Verification checklist

Before launch:

- All eight singleton documents exist and are published.
- Presentation previews an unpublished edit while a private/incognito request still shows published content.
- Publishing changes the affected live route after the webhook fires.
- The webhook delivery log reports HTTP 200; a request without a valid signature reports HTTP 401.
- `/sitemap.xml`, `/robots.txt`, canonical tags, Open Graph tags, and JSON-LD use the production origin.
- `/contact` submits the unchanged payload to `/api/contact` and all predefined service keys still work.
- `/studio` loads only with configured Sanity values; no server token appears in browser assets or source maps.
- Arabic `lang`, RTL direction, Tajawal, responsive layout, animations, links, and images match the approved site.

## 10. Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run seed:sanity
```

No Sanity deployment command is needed for the embedded Studio because it is built and deployed with Next.js.
