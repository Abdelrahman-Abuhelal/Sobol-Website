## 1. Executive summary

The repository is a small Arabic, RTL marketing website built with Next.js 16 App Router. It has six public pages and one transactional API route. All public pages currently build as static HTML; the contact endpoint renders dynamically.

The correct CMS architecture is a tightly controlled Sanity integration:

- Embed Sanity Studio at `/studio`.
- Model each existing public page as a fixed singleton document. Do not introduce arbitrary page creation yet.
- Keep the existing React components, Tailwind classes, SVGs, animations, breakpoints, and layout composition as the design source of truth.
- Refactor hardcoded strings and arrays into typed props without altering markup.
- Give each page a page-specific section allowlist rather than one universal block builder.
- Keep headers, footers, contact details, and default SEO in global singleton documents.
- Preserve static generation for published content, adding on-demand revalidation after publishing.
- Use Next.js Draft Mode, the Sanity Presentation Tool, and visual-editing overlays for authenticated draft preview.
- Keep the contact submission workflow, form validation, Resend integration, route behavior, service identifiers, analytics, and technical SEO in code.

A critical repository-specific finding: only `HeroSection` is currently rendered from `components/home`. The other six home components are dormant and contain older visual treatments and unsupported marketing statistics. They should not be exposed in the page builder unless the owner separately confirms they are approved production designs.

No source files were modified. The pre-existing changes in `.env.example`, `app/globals.css`, and `components/home/HeroSection.tsx` remain untouched.

---

## 2. Current technical architecture

| Area | Observed fact |
|---|---|
| Framework | Next.js `16.0.7`, App Router |
| React | React and React DOM `19.2.0` |
| Language | TypeScript `5.9.3`; strict mode, no emit, bundler resolution, `@/*` alias |
| Compiler | React Compiler enabled in [next.config.ts](</C:/Users/Abdelraman/Documents/personal-projects/sobol/next.config.ts:3>) |
| Router | `app/` directory only; no Pages Router |
| Styling | Tailwind CSS `4.1.17`, PostCSS plugin, global OKLCH design tokens and `.container-custom` in [globals.css](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/globals.css:1>) |
| UI library | No full component library is installed. [button.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/ui/button.tsx:1>) is a hand-written shadcn-style button. `AI_RULES.md` says shadcn should be used, but there is no `components.json`, Radix, or CVA dependency. |
| Icons | `lucide-react` `0.556.0` |
| Animation | `framer-motion` `12.23.25`; production use is currently the Navbar mobile menu. The hero also uses a custom CSS keyframe. Dormant home components use substantially more Framer Motion. |
| Images | Local assets in `public/`, rendered with `next/image`; no remote image configuration |
| Font | Tajawal through `next/font/google`, Arabic subset, weights 200–900 |
| i18n | Arabic-only; `<html lang="ar" dir="rtl">`; no locale routes or translation files |
| Data fetching | Client `fetch("/api/contact")`; server route calls the Resend HTTP API. No content fetches or server data layer. |
| State | Local `useState` only |
| Rendering | All public pages are statically prerendered. Client components hydrate where needed. `/api/contact` is dynamic request-time server code. |
| Caching | Default static build caching only; no `revalidate`, ISR, cache tags, webhooks, or manual invalidation |
| Existing CMS/database | None |
| Existing external API | Resend email API and Google Analytics |
| Environment handling | `.env.local` is gitignored; three contact-email variables are used |
| Hosting | README recommends Vercel; `.vercel` is ignored. No Vercel config, Dockerfile, Netlify config, or CI workflow exists. Because `/api/contact` is a route handler, deployment requires a Next-capable runtime or a separately hosted API. |
| Testing | No unit, component, integration, E2E, or visual test setup |
| Validation | TypeScript build, ESLint, HTML `required`, honeypot, string trimming/length limits, and manual server validation |
| Package manager | Both `package-lock.json` and `pnpm-lock.yaml` exist, so the authoritative package manager is ambiguous |

Verification results:

- `npm run build`: passed.
- `npm run lint`: passed with one warning about using a raw Google Analytics script instead of `next/script`.
- Build classification: `/`, `/about`, `/services`, `/portfolio`, `/blog`, and `/contact` are static; `/api/contact` is dynamic.
- No current SSR page, ISR page, dynamic public route, or client-only page shell. `/contact` is statically generated and then hydrated because the page is a client component.

---

## 3. Route inventory

All pages use [app/layout.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/layout.tsx:1>), which supplies Tajawal, Arabic RTL direction, default metadata, Google Analytics, and the global WhatsApp button.

### Marketing and content pages

| Route | Source and sections | Content source | CMS decision |
|---|---|---|---|
| `/` | [app/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/page.tsx:1>): `Navbar` → `HeroSection`; global WhatsApp | Hardcoded inside `HeroSection` | Strong CMS candidate. Fixed homepage singleton; only the existing hero is initially allowed. |
| `/about` | [app/about/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/about/page.tsx:1>): Navbar, PageIntro, method/mission/vision, principles, team, ConsultationCTA, Footer | Inline strings plus `principles` and `team` arrays | Strong CMS candidate. Page-specific controlled sections. |
| `/services` | [app/services/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/services/page.tsx:1>): Navbar, PageIntro, business packages, marketing services, ConsultationCTA, Footer | Inline strings plus `packages` and `marketingServices` arrays | Strong CMS candidate. Keep icons and service behavior controlled. |
| `/portfolio` | [app/portfolio/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/portfolio/page.tsx:1>): Navbar, PageIntro, project-result listing, ConsultationCTA, Footer | Inline strings plus `projects` array | Strong CMS candidate. Items should remain embedded until individual case-study pages exist. |
| `/blog` | [app/blog/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/blog/page.tsx:1>): Navbar, PageIntro, coming-soon block, planned topics, Footer | Inline strings plus `topics` array | Manage current editorial placeholder in Sanity. Do not add `blogPost`, authors, or categories until an approved article/listing design and route exist. |

### Utility/contact page

| Route | Source and sections | Content source | CMS decision |
|---|---|---|---|
| `/contact` | [app/contact/page.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/contact/page.tsx:1>): Navbar, PageIntro, contact channels, form, status states, Footer | Hardcoded UI text; local state; client fetch | CMS-manage editorial copy and channel values. Keep component structure, validation, submission state, field names, service keys, and API behavior in code. |

### API/transactional route

| Route | Source | Decision |
|---|---|---|
| `POST /api/contact` | [app/api/contact/route.ts](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/api/contact/route.ts:1>) | Entirely code-controlled. It sanitizes inputs, checks a honeypot, validates stable service keys, and sends email through Resend. Do not move this transactional logic into Sanity. |

There are no:

- Product/application pages.
- Authentication or account pages.
- Dynamic public pages.
- Legal pages.
- Existing admin pages.
- Custom 404 page.
- Route-specific layouts.
- Locale-prefixed routes.

Metadata is inherited globally by every page. No page has its own canonical URL, Open Graph fields, structured data, or route-specific metadata.

---

## 4. Content inventory

| Content area | Definition and renderer | Reuse | Recommendation |
|---|---|---|---|
| Default title, description, favicon | [app/layout.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/layout.tsx:12>) | Global | Default title/description editable in `siteSettings`; favicon/logo remain code-controlled by default. |
| Header logo, links, CTA labels | [Navbar.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/layout/Navbar.tsx:10>) | Every page | Links and labels editable/reorderable/hideable with a maximum of five main links. Logo styling and mobile behavior locked. |
| Footer logo, description, links, address, email, phone, WhatsApp, legal lines | [Footer.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/layout/Footer.tsx:5>) | Five pages | Content editable. Footer layout, icons, year calculation, columns, and classes locked. |
| Floating WhatsApp number, message, label | [WhatsAppButton.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/layout/WhatsAppButton.tsx:3>) | Global | Editable through site settings; visual treatment and icon composition locked. |
| Homepage headline, paragraphs, buttons | [HeroSection.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/HeroSection.tsx:105>) | Homepage only | Editable. |
| Homepage journey title, description, three stages, badge | Same file, nested `GrowthJourney` | Homepage only | Text editable, but stage count and order should remain exactly three because width, color, positioning, and arrows depend on stages `01`–`03`. |
| Page intros | Props passed to [PageIntro.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/layout/PageIntro.tsx:3>) | About, services, portfolio, blog, contact | Eyebrow, title, description, image, and alt editable. |
| About method, mission, vision | Inline in `app/about/page.tsx` | About only | Editable; mission/vision remain a fixed two-card structure. |
| About principles | `principles` array | About only | Embedded array; add/remove/reorder, suggested limit 1–6. |
| Team members | `team` array | About only | Embedded array; add/remove/reorder, limit 1–3 until the existing grid is verified with additional rows. Initials editable or derived. |
| Service packages and included items | `packages` array | Services only | Embedded arrays; add/remove/reorder within limits. Sequence number generated from position. |
| Marketing services | `marketingServices` array | Services only | Embedded array. Text editable; icon chosen only from the six currently implemented Lucide icons. |
| Portfolio projects | `projects` array | Portfolio only | Embedded, add/remove/reorder/hide. No separate document until individual project reuse or detail pages exist. |
| Blog empty state and topics | `topics` array and inline block | Blog only | Editable, embedded. |
| Contact channels | Contact page, Footer, WhatsApp button | Repeated globally | Store once in `siteSettings`. |
| Contact form labels, helper/status text | Contact page | Contact only | Editable content fields are reasonable, but DOM field names, stable option values, required flags, validation, and submission states remain code. |
| Contact service labels and API errors | API route | Operational | Stable keys and validation remain code. Labels may be paired with predefined keys, but editors must not invent new keys. |
| CTA copy and button | [ConsultationCTA.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/layout/ConsultationCTA.tsx:4>) | About, services, portfolio | Reusable global/default CTA content with optional page-level override. |
| Assets | `logo_tr.png`, `sobol.png`, five page-intro WebP files | Various | Migrate editorial page-intro images to Sanity Assets. Keep logo, favicon, decorative SVGs, and framework placeholder assets out of editorial control. |
| Social links | Only WhatsApp is present | Global | Do not create a generic social network collection until more networks actually exist. |

Production has no testimonials, FAQs, pricing plans, customer logos, article documents, authors, categories, Open Graph content, JSON-LD, or locale files.

The dormant home components contain additional hardcoded services, partners, pain points, metrics, ratings, and CTAs, but they are not rendered. In particular, `CTA`, `PainPoints`, and `ValueProposition` contain claims such as client counts, ratings, experience, satisfaction, and growth figures. These conflict with the caution against unsupported statistics in `PRODUCT.md`; they should not be migrated as active content.

---

## 5. Section and component inventory

### Active production components and sections

| Component/section | Current props/content | Dependencies | Page-builder suitability |
|---|---|---|---|
| `Navbar` | No props; hardcoded links, logo, CTA | `next/link`, `next/image`, `usePathname`, `useState`, Framer Motion, Lucide | Global singleton content, not a page-builder block. |
| `HeroSection` | No props; all content hardcoded | Link, Lucide, CSS `.journey-stage`; decorative CSS shapes | Safe homepage-only section after prop extraction. No visual variants currently exist. |
| `GrowthJourney` | Private nested component; `journey` array | CSS animation, fixed width/color logic | Keep nested in hero. Exactly three stages. |
| `PageIntro` | `eyebrow`, `title`, `description`, optional `{src, alt}` image | `next/image`, fixed decorative blobs | Safe fixed intro object. Existing variants: image present or text-only. |
| About method/mission/vision | Inline markup; no component or props | Lucide `Target`, `Heart`; Tailwind | Extract later without changing markup. About-only section. |
| About principles | Inline array list | Lucide `Check` | About-only controlled section. |
| About team | Inline three-column list | Tailwind | About-only controlled section, initially max three members. |
| Service packages | Inline stacked article list | Lucide `Check` | Services-only controlled section. |
| Marketing services | Inline two-column list | Six Lucide icons | Services-only; controlled icon selector. |
| Portfolio list | Inline stacked article list | Lucide `ArrowUpLeft` | Portfolio-only controlled section. |
| Blog coming-soon | Inline two-column block and topics | Lucide `BookOpen`, mail link | Blog-only controlled section. |
| Contact content/form | Inline client UI | React state, Button, client fetch | Page structure code-controlled; content object editable. |
| `ConsultationCTA` | No props; hardcoded copy and link | Link, Lucide | Reusable controlled CTA, at most once per eligible page. |
| `Footer` | No props; hardcoded content | Image, Link, Lucide | Global content, not a builder section. |
| `WhatsAppButton` | No props; URL/message hardcoded | Lucide | Global utility, not a builder section. |
| `Button` | `variant`, `size`, native button props | `cn`, Tailwind | Design-system primitive; completely locked from Sanity. |

### Dormant components

These files have no import path from any current route:

- [AboutExcerpt.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/AboutExcerpt.tsx:1>)
- [CTA.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/CTA.tsx:1>)
- [MarketingServices.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/MarketingServices.tsx:1>)
- [PainPoints.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/PainPoints.tsx:1>)
- [Partners.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/Partners.tsx:1>)
- [ServicesPreview.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/ServicesPreview.tsx:1>)
- [ValueProposition.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/components/home/ValueProposition.tsx:1>)

They contain complete visual designs, but repository evidence does not establish that they are approved current production patterns. Recommended default: exclude all seven from the Studio’s section menu. Preserve the files until the owner makes a separate approval/removal decision.

---

## 6. Editable-content classification

Editors should control:

- Plain text headlines, eyebrows, paragraphs, labels, helper text, and notices.
- Page-intro editorial images and accessible alt text.
- Button and link labels.
- Safe link destinations.
- Navigation and footer link ordering, with limits.
- About principles and team-member content.
- Service/package content and included-item arrays.
- Marketing-service text.
- Portfolio list items.
- Blog planned-topic items.
- Contact details and WhatsApp prefilled message.
- Page-specific and default SEO content.
- Section visibility.
- Reordering of page-specific standalone sections only where allowed.
- Repeated item ordering and visibility.

Controlled choices:

- Internal destination selected from existing routes.
- Link kind: internal, HTTPS, email, telephone, or WhatsApp.
- Marketing-service icon selected from `Palette`, `Share2`, `Megaphone`, `PenTool`, `Layout`, or `Target`.
- `PageIntro` image-present versus text-only variant because that behavior is already implemented.
- Existing service/contact category keys, with editable displayed labels.
- Section types selected only from each page’s allowlist.

Ambiguous cases and defaults:

- Brand logo/favicons: images technically could be editable, but they are brand/design assets. Keep locked.
- Team size: the UI maps an array, but only three members are visually demonstrated. Limit to three until responsive QA approves more.
- Hero journey: repeated content exists, but the implementation is semantically and visually tied to exactly three stages. Keep count and order locked; edit text only.
- Dormant components: exclude until explicitly approved.
- Rich text: do not use Portable Text for these components initially. Existing components render plain paragraphs and headings; arbitrary marks/lists could alter spacing and hierarchy.

---

## 7. Locked-design classification

The following must stay exclusively in code:

- Tailwind classes and arbitrary OKLCH values.
- CSS variables, theme colors, spacing, typography, radii, borders, shadows, and responsive breakpoints.
- Tajawal configuration and RTL direction.
- Decorative background blobs, inline SVG patterns, clip paths, glows, and badges.
- Framer Motion transitions, animation timings, mobile menu behavior, and CSS keyframes.
- `next/image` sizing, `fill`, `sizes`, priority behavior, object fitting, and blend modes.
- Lucide component implementation and stroke widths.
- Section wrappers, containers, grids, column definitions, and composition.
- Button variants and component primitives.
- Contact form field names, required status, validation, honeypot, payload structure, and API handling.
- Stable contact service keys.
- Resend integration and email construction.
- Google Analytics loading and measurement ID handling.
- Route definitions, fixed page IDs, rendering strategy, caching, redirects, and revalidation.
- Sitemap, robots, canonical, and hreflang generation logic.
- Structured-data templates.
- All custom React/HTML/CSS/JavaScript.
- Creation of new visual variants.

Schema fields must never accept CSS classes, color strings, spacing values, HTML, scripts, SVG markup, animation settings, or arbitrary layout data.

---

## 8. Recommended Sanity documents

A fixed-document architecture is safer than a generic creatable `page` type because the repository has no generic public route or approved universal page design.

| Schema | Purpose and fields | Cardinality/consumers |
|---|---|---|
| `siteSettings` | Organization name, default SEO, public site URL, address, email, telephone, WhatsApp number/message, global contact wording | Singleton. Consumed by root layout, Footer, contact page, WhatsApp button, technical structured data. |
| `navigation` | Header links, header CTA, footer links, footer description, copyright text, tagline | Singleton. Arrays embedded. Consumed by Navbar/Footer. |
| `homePage` | Studio title, SEO, one `homeHeroSection` | Singleton; cannot create/delete/duplicate. `/`. |
| `aboutPage` | SEO, required `pageIntro`, ordered allowed sections | Singleton. `/about`. |
| `servicesPage` | SEO, required `pageIntro`, ordered allowed sections | Singleton. `/services`. |
| `portfolioPage` | SEO, required `pageIntro`, ordered allowed sections | Singleton. `/portfolio`. |
| `blogPage` | SEO, required `pageIntro`, ordered allowed sections | Singleton. `/blog`. |
| `contactPage` | SEO, required `pageIntro`, channel intro copy, form labels/messages, predefined service labels | Singleton. `/contact`. |

Common embedded object schemas:

- `seo`
- `editorialImage`
- `controlledLink`
- `navigationItem`
- `ctaContent`
- Page-specific section objects and repeated item objects

Not recommended now:

- Generic `page`.
- `blogPost`, `author`, or `category`.
- `faq`, `testimonial`, `pricingPlan`, `caseStudy`, `service`, or `teamMember` documents.
- Separate reusable media documents.
- Arbitrary global blocks.

Those types lack a current route, approved renderer, or genuine cross-page reuse case.

Validation defaults:

- Required titles and descriptions.
- Trimmed non-empty strings.
- SEO title recommended maximum 60 characters; description maximum 160.
- Alt text required for non-decorative images.
- URLs limited to supported protocols.
- Array bounds matched to the existing components.
- Singleton actions remove create, duplicate, and delete.
- Page-specific custom validation prevents duplicate singleton sections and enforces CTA placement.

---

## 9. Recommended section schemas

| `_type` | Existing renderer | Fields and limits | Visibility/placement |
|---|---|---|---|
| `homeHeroSection` | `HeroSection`/`GrowthJourney` | Eyebrow, two title lines, description, two controlled links, journey title/description, exactly three step text objects, closing badge | Homepage only; required; cannot duplicate or hide if it would remove the page H1. |
| `pageIntro` | `PageIntro` | Eyebrow, H1, description, optional editorial image with required alt | Fixed first field, not freely reorderable; one per internal page. Existing `withImage` and `textOnly` variants only. |
| `aboutMethodSection` | Current first inline About section | Eyebrow, heading, 1–3 paragraphs, mission title/body, vision title/body | About only; max one; hide/show allowed. Mission/vision count locked at two. |
| `principlesSection` | Current About principles section | Eyebrow, heading, principles array 1–6 | About only; max one; items add/remove/reorder. |
| `teamSection` | Current About team section | Eyebrow, heading, members array 1–3; name, role, initials | About only; max one; add/remove/reorder within limit. |
| `servicePackagesSection` | Current Services package list | Eyebrow, heading, intro; packages 1–6; each has label, title, description, items 1–8 | Services only; max one; packages/items reorderable. Numbers generated. |
| `marketingServicesSection` | Current marketing service grid | Eyebrow, heading, description; services 1–12 with title, description, controlled icon key | Services only; max one; add/remove/reorder. |
| `portfolioListSection` | Current portfolio list | Eyebrow, heading, description, projects 1–30, privacy note | Portfolio only; max one; add/remove/reorder. Item numbers generated. |
| `blogComingSoonSection` | Current blog empty state | Icon label, eyebrow, heading, body, email CTA, topics 1–12 | Blog only; max one. |
| `consultationCtaSection` | `ConsultationCTA` | Eyebrow, heading, one controlled link; optional “use global default” | About/services/portfolio initially; max one and final section. Other pages require explicit visual approval. |
| `contactSection` | Current contact channels/form | Channel eyebrow/heading/body; form labels, placeholders, submit/sending/success/error copy; labels for predefined service keys | Contact only; required, exactly once. Structure and behavior locked. |

Every optional builder section gets `isHidden`. Preview titles should combine a human label with the first heading, for example `Services — Three paths according to priority`. `_key` values must be preserved during migrations and localization.

---

## 10. Controlled page-builder design

Recommended document shape:

```text
page singleton
├── internalTitle
├── seo
├── pageIntro            fixed on non-home pages
└── sections[]           page-specific allowed section types only
```

All rendering goes through an exhaustive `_type` switch. Unknown types should be logged in development and render nothing safely in production.

Allowed arrays:

- `aboutPage.sections`: `aboutMethodSection`, `principlesSection`, `teamSection`, optional final `consultationCtaSection`.
- `servicesPage.sections`: `servicePackagesSection`, `marketingServicesSection`, optional final `consultationCtaSection`.
- `portfolioPage.sections`: `portfolioListSection`, optional final `consultationCtaSection`.
- `blogPage.sections`: `blogComingSoonSection`.
- `contactPage`: fixed `contactSection`, not a free array.
- `homePage`: fixed `homeHeroSection` until another currently rendered homepage pattern is approved.

Guardrails:

- No generic block type.
- No Portable Text layout builder.
- No arbitrary page creation.
- No arbitrary internal paths.
- No section-specific class fields.
- Maximum-one validation for singleton sections.
- CTA-last validation.
- Required visible H1.
- Hidden sections filtered before rendering.
- Preview warnings when all substantive sections are hidden.
- Stable singleton document IDs and slugs hidden/read-only.

---

## 11. Reusability model

| Content | Storage decision | Reason |
|---|---|---|
| Contact details | `siteSettings` singleton | Used by Footer, contact page, and WhatsApp utility. |
| Navigation/footer link arrays | Embedded in `navigation` | Globally reused, independently ordered, but items do not need independent documents. |
| Consultation CTA | Global default embedded in `siteSettings` or `navigation`, with optional page override | Genuine reuse across three pages. |
| Hero journey stages | Embedded in hero | Exist only within one visual. |
| Principles/team members | Embedded in About sections | No current independent route or cross-page reuse. |
| Service packages | Embedded in Services section | No current independent service pages; avoids excessive references. |
| Marketing services | Embedded | Only one consuming section. |
| Portfolio projects | Embedded | Current items are short listing rows, not reusable case studies. |
| Blog topics | Embedded | Placeholder-only content. |
| Page-intro images | Sanity image fields | Editorial assets, but not separate documents. |
| Lucide icons | Code constant/controlled enum | Visual implementation must remain locked. |
| Section numbers and footer year | Generated dynamically | Avoid editorial drift. |
| Contact service keys | Code constant | They participate in API validation and email routing. |

---

## 12. Localization plan

Observed architecture:

- Arabic only.
- No locale route segment.
- No translation files.
- No locale middleware.
- Direction is fixed at the root to RTL.
- Metadata is Arabic but shared by every page.
- No canonical or hreflang handling.

Recommendation:

- Do not introduce Sanity localization fields during the initial integration.
- Store the current Arabic strings directly in the page documents.
- Keep `lang="ar"` and `dir="rtl"` in code.
- Preserve the current URLs exactly.

If another language is approved later, use document-level localization, not field-level localization. Page-builder arrays are safer when an entire translated page is drafted and published as one unit. Link translations using a translation-group/reference model, require matching section `_type` signatures and stable logical section IDs, and block publishing when required translated sections are missing. The locale URL strategy must be decided before adding those documents.

---

## 13. SEO plan

### Editable in Sanity

Per page:

- Meta title.
- Meta description.
- Open Graph title and description.
- Open Graph image and alt text.
- Optional no-index editorial flag, restricted to authorized users if permissions allow.
- Page display title/H1, independently from meta title.

Global:

- Default title template.
- Default description.
- Default Open Graph image.
- Organization name and public contact information used by code-generated structured data.

### Remain in code

- `generateMetadata` implementation.
- Canonical URL construction.
- Host/site URL normalization.
- Sitemap and robots generation.
- Hreflang generation if localization is later added.
- Open Graph URL/type rules.
- Redirects and routing.
- Structured-data object shapes and sanitization.
- Organization/WebSite schema generation.
- Image URL transformation.
- Metadata fallbacks.

Current gaps:

- Every route inherits the same title and description.
- No Open Graph or Twitter metadata.
- No canonical links.
- No sitemap or robots files.
- No structured data.

Do not allow editors to enter raw JSON-LD. Generate structured data from validated page and site fields. In draft metadata queries, disable stega encoding; Sanity specifically warns that encoded strings can corrupt titles and meta tags in preview integrations. [Sanity App Router visual-editing guidance](https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router).

---

## 14. Preview and publishing architecture

Recommended default: embedded Studio at `/studio`.

Why it fits:

- One small repository and one deployment.
- Same-origin Presentation preview.
- No second Studio deployment to operate.
- Fixed document locations map cleanly to the six known routes.
- Studio can be excluded from public navigation and marked `noindex`.
- Access remains protected by Sanity authentication.

Preview flow:

1. Presentation Tool opens the corresponding fixed frontend route.
2. `/api/draft-mode/enable` performs the authenticated Sanity handshake.
3. Draft Mode changes the content perspective from published to drafts.
4. Draft responses use content-source-map/stega data.
5. `<VisualEditing />` supplies click-to-edit overlays.
6. `/api/draft-mode/disable` clears the preview cookie.
7. Document location resolvers map the eight singleton documents to their consuming routes.

The official Sanity integration requires a server-only Viewer token for drafts and credentialed CORS entries for the frontend origins. Project ID and dataset can be public browser variables; the read token must never use `NEXT_PUBLIC_`. [Sanity’s current Next.js App Router guide](https://www.sanity.io/docs/nextjs/visual-editing-with-next-js-app-router) and [Presentation Tool configuration](https://www.sanity.io/docs/visual-editing/configuring-the-presentation-tool).

Published delivery:

- Keep published pages statically generated.
- Tag queries by singleton document/page.
- Configure a signed Sanity webhook to trigger on-demand tag/path revalidation after publish/unpublish.
- Draft Mode bypasses the published cache.
- Keep a code fallback during migration so missing CMS documents do not blank the site.

Next.js 16 caveat:

The repository is on Next `16.0.7`. Sanity currently warns of excessive requests and ISR writes when `SanityLive` is mounted broadly on Next.js 16. Their safest published guidance is to upgrade to at least Next 16.2, avoid Cache Components with the current integration, render `SanityLive` only during visual editing, and use webhook/sync-tag revalidation for published traffic. [Sanity’s Next.js 16 advisory](https://www.sanity.io/docs/help/nextjs-16-sanitylive-status).

Therefore:

- Do not mount `SanityLive` globally on the current version.
- Recommended default: upgrade to a verified current 16.x release before enabling live preview, then render live subscriptions only in Draft Mode.
- If the version must remain `16.0.7`, use draft-mode refresh/manual live-event handling and webhook-based published revalidation instead of sitewide `SanityLive`.

---

## 15. Migration plan

1. Define fixed page contracts and capture current screenshots at mobile, tablet, and desktop sizes.
2. Add Sanity project configuration and embedded Studio without changing frontend content.
3. Add common schemas: controlled links, SEO, editorial images, and validation helpers.
4. Add `siteSettings` and `navigation`.
5. Add the six fixed page documents and page-specific section objects.
6. Generate TypeScript types from schemas/queries.
7. Create focused GROQ queries with explicit projections—no full-document spreading.
8. Seed all documents from the current source strings and arrays.
9. Upload the five page-intro images to Sanity and preserve alt text, crop, and aspect behavior.
10. Refactor global components to accept typed content props while retaining exact markup/classes.
11. Refactor inline page sections into typed components one page at a time.
12. Add an exhaustive section renderer.
13. Migrate `/` first, then About, Services, Portfolio, Blog, and Contact.
14. For each page, use `CMS data ?? current code fallback`.
15. Add page-specific metadata generation.
16. Add Draft Mode, Presentation Tool, overlays, and document locations.
17. Add signed on-demand revalidation.
18. Compare CMS-backed pages against the captured production screenshots.
19. Test hidden/reordered sections and array boundary cases.
20. Test published, unpublished, missing-image, missing-document, and broken-reference behavior.
21. Remove hardcoded fallbacks only after every seeded document has been published and verified.
22. Keep dormant components out of migration unless separately approved.

The seed script should use deterministic singleton IDs and section `_key` values so it can be rerun idempotently without duplicating content.

---

## 16. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Page content and markup are tightly coupled in page files | Extract only the exact inline section markup and add typed props; no class or DOM restructuring during CMS work. |
| `/contact` is entirely a client component | Convert the page to a server wrapper that fetches CMS content and pass it to a focused client `ContactForm`. |
| Hero journey assumes three stages | Validate exactly three; generate numbers; lock order. |
| Navbar can overflow if editors add many links | Maximum five main links; test Arabic labels at realistic maximum lengths. |
| Team styling is only demonstrated with three members | Initial maximum of three. Expand only after responsive QA. |
| Dormant sections could be mistaken for approved variants | Exclude them from schemas and Studio structure. |
| Dormant components contain unsupported metrics/claims | Do not seed or expose them. Require evidence and design approval before reuse. |
| Sanity images could change intrinsic ratios/crops | Preserve existing wrappers and `sizes`; require hotspot/crop and alt; validate representative crops. |
| SEO could regress during data migration | Keep code fallbacks; compare rendered metadata; use `stega: false` for metadata. |
| Next 16 live integration can inflate requests | Upgrade to at least supported 16.2, render live subscriptions only in Draft Mode, and use signed webhook revalidation. |
| Missing CMS document could blank a page | Temporary hardcoded fallback and explicit not-found/error logging. |
| Broken internal links | Controlled route/page references and publish validation. |
| Contact labels could diverge from API keys | Keep keys and allowed set in code; expose labels only. |
| Free-plan roles may be too broad | Sanity Free currently provides Administrator and Viewer roles; write-capable Editor/Contributor roles require Growth, and custom roles require Enterprise. Choose the plan before inviting non-admin editors. [Sanity roles](https://www.sanity.io/docs/user-guides/roles), [current pricing](https://www.sanity.io/pricing). |
| Free datasets are public | Published marketing content is suitable for a public dataset, but use Growth if a private dataset is required. Draft access still requires authenticated preview. |
| Concrete-looking values exist in `.env.example` | Replace all example values with unmistakable placeholders during implementation and rotate any value that was ever a real credential. |
| Two lockfiles create dependency drift | Select npm or pnpm before installing Sanity; remove only the non-authoritative lockfile with owner approval. |
| No automated tests | Add focused query/schema/renderer tests and Playwright visual checks as part of integration, without broad test-framework refactoring. |
| Global metadata currently applies to all routes | Add page-specific `generateMetadata` with reliable fallbacks. |
| Footer year is generated during static build | Either accept build-year semantics or isolate year rendering; do not put the year in Sanity. |
| Existing working tree is dirty | Preserve the three current owner-modified files and review overlapping diffs before implementation. |

---

## 17. Exact implementation phases

1. **Scope lock:** approve active sections, package manager, Sanity plan, dataset visibility, and production URL.
2. **Version safety:** update/verify Next 16.x if live preview is desired; rerun build and lint.
3. **Studio shell:** add `/studio`, Sanity config, structure, Presentation Tool, singleton actions.
4. **Schema foundation:** common objects, global documents, page singletons, page-specific section schemas.
5. **Content bootstrap:** deterministic seed script and image upload.
6. **Read layer:** client, image URL builder, queries, generated types, error/fallback policy.
7. **Global content:** site settings, Navbar, Footer, WhatsApp utility.
8. **Homepage:** typed hero content with unchanged design.
9. **Page-by-page migration:** About → Services → Portfolio → Blog.
10. **Contact split:** server content wrapper plus existing client form behavior.
11. **SEO:** route metadata, canonical, Open Graph, sitemap, robots, structured data.
12. **Preview:** Draft Mode, document locations, overlays, secured enable/disable.
13. **Publishing:** signed webhook/tag revalidation.
14. **QA:** schema boundaries, build/lint/tests, visual comparison, accessibility, preview/publish workflow.
15. **Cleanup:** remove fallbacks and obsolete hardcoded data only after production sign-off.

---

## 18. Files expected to change during implementation

Existing files likely to change:

- [package.json](</C:/Users/Abdelraman/Documents/personal-projects/sobol/package.json:1>) and the chosen lockfile
- [next.config.ts](</C:/Users/Abdelraman/Documents/personal-projects/sobol/next.config.ts:1>) for Sanity image host/configuration
- [app/layout.tsx](</C:/Users/Abdelraman/Documents/personal-projects/sobol/app/layout.tsx:1>)
- All six `app/**/page.tsx` files
- `Navbar.tsx`, `Footer.tsx`, `WhatsAppButton.tsx`, `PageIntro.tsx`, `ConsultationCTA.tsx`, and `HeroSection.tsx`
- `.env.example`
- Possibly `eslint.config.mjs` for generated Studio/type files

Expected new files/directories:

```text
app/studio/[[...tool]]/page.tsx
app/api/draft-mode/enable/route.ts
app/api/draft-mode/disable/route.ts
app/api/revalidate/route.ts
app/sitemap.ts
app/robots.ts

components/contact/ContactForm.tsx
components/preview/DisableDraftMode.tsx
components/sections/SectionRenderer.tsx
components/sections/AboutMethodSection.tsx
components/sections/PrinciplesSection.tsx
components/sections/TeamSection.tsx
components/sections/ServicePackagesSection.tsx
components/sections/MarketingServicesSection.tsx
components/sections/PortfolioListSection.tsx
components/sections/BlogComingSoonSection.tsx

sanity.config.ts
sanity.cli.ts
sanity/lib/client.ts
sanity/lib/fetch.ts
sanity/lib/image.ts
sanity/lib/queries.ts
sanity/lib/types.ts
sanity/presentation/resolve.ts
sanity/structure.ts
sanity/schemaTypes/index.ts
sanity/schemaTypes/documents/*
sanity/schemaTypes/objects/*
scripts/seed-sanity.ts
sanity-typegen.json
```

The exact filenames may be consolidated, but the responsibilities should remain separated.

---

## 19. Environment variables expected

Existing:

```text
RESEND_API_KEY
CONTACT_FROM_EMAIL
CONTACT_TO_EMAIL
```

Recommended additions:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
SANITY_REVALIDATE_SECRET
NEXT_PUBLIC_SITE_URL
```

Optional:

```text
NEXT_PUBLIC_SANITY_API_VERSION
NEXT_PUBLIC_SANITY_STUDIO_URL
```

Rules:

- `SANITY_API_READ_TOKEN` must be server-only and Viewer-scoped.
- No write token is needed for frontend rendering.
- No Sanity token should use the `NEXT_PUBLIC_` prefix.
- API version may be a code constant for reproducibility.
- `NEXT_PUBLIC_SITE_URL` should be the canonical production origin, with preview deployments handled explicitly.

---

## 20. Manual steps required from the project owner

- Confirm the production canonical domain.
- Choose npm or pnpm.
- Create or select the Sanity project and dataset.
- Decide public Free dataset versus private Growth dataset.
- Choose the Sanity membership plan and editor roles.
- Create a Viewer API token for draft preview.
- Add `http://localhost:3000`, the production domain, and any approved preview domain to Sanity CORS with credentials.
- Configure the signed publish/unpublish webhook.
- Add all environment variables to local and hosting environments.
- Invite owners/editors with the minimum available role.
- Review and publish the seeded singleton documents.
- Confirm the five page-intro images may be migrated to Sanity.
- Confirm that dormant home components are not approved page-builder choices.
- Validate the preview and publish workflow before hardcoded fallbacks are removed.
- Rotate any credential that may have appeared as a concrete value in `.env.example`.

---

## 21. Questions or unresolved decisions

Recommended defaults are included so implementation does not need to stop:

1. **Are dormant home components approved?**
   Default: no; exclude all of them.

2. **Should editors create new URLs/pages?**
   Default: no. Only the six existing fixed routes get CMS documents.

3. **Should blog articles be introduced?**
   Default: no. Keep the current blog placeholder until article and listing designs are approved.

4. **Embedded or standalone Studio?**
   Default: embedded at `/studio`.

5. **Public or private dataset?**
   Default: public dataset if only published marketing content is stored. Choose Growth/private if business policy requires it.

6. **Localization?**
   Default: Arabic-only initial integration, preserving current URLs and RTL behavior.

7. **Live content behavior on Next 16.0.7?**
   Default: upgrade to a verified current 16.x version before enabling `SanityLive`; otherwise use draft refresh plus webhook revalidation.

8. **Package manager?**
   Default: npm, because the audit and existing `package-lock.json` build successfully, but this should be confirmed before package installation.

9. **Form service choices?**
   Default: labels editable, stable keys and allowed choices code-controlled.

10. **Logo and favicon editing?**
    Default: locked brand assets; only editorial imagery is CMS-managed.
