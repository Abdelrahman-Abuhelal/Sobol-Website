import { defineArrayMember, defineField, defineType } from "sanity";

type SectionValue = { _type?: string };
const nonEmpty = (value: unknown) => typeof value === "string" && value.trim() ? true : "This field cannot be empty.";

function validateSections(value: SectionValue[] | undefined, requireType?: string) {
  if (!value) return requireType ? "At least one section is required." : true;
  const types = value.map((section) => section._type).filter(Boolean);
  if (new Set(types).size !== types.length) return "Each approved section can appear at most once.";
  const ctaIndex = types.indexOf("consultationCtaSection");
  if (ctaIndex >= 0 && ctaIndex !== types.length - 1) return "The consultation call to action must remain the last section.";
  if (requireType && !types.includes(requireType)) return `The required ${requireType} section is missing.`;
  return true;
}

const pageFields = (title: string, sections: string[], requiredSection?: string) => [
  defineField({ name: "internalTitle", title: "اسم الصفحة", type: "string", initialValue: title, readOnly: true, validation: (r) => r.required() }),
  defineField({ name: "pageIntro", title: "مقدمة الصفحة (العنوان الرئيسي)", type: "pageIntro", validation: (r) => r.required() }),
  defineField({
    name: "sections", title: "أقسام الصفحة", description: "يمكنك سحب الأقسام لتغيير ترتيبها. يجب أن يبقى قسم طلب الاستشارة أخيراً.",
    type: "array", of: sections.map((type) => defineArrayMember({ type })),
    validation: (r) => r.required().custom((value) => validateSections(value as SectionValue[] | undefined, requiredSection)),
  }),
  defineField({ name: "seo", title: "ظهور الصفحة في Google وعند المشاركة", type: "seo" }),
];

export const siteSettings = defineType({
  name: "siteSettings", title: "إعدادات الموقع", type: "document",
  groups: [
    { name: "general", title: "معلومات عامة", default: true },
    { name: "contact", title: "بيانات التواصل" },
    { name: "seo", title: "Google والمشاركة" },
    { name: "cta", title: "دعوة الاستشارة" },
  ],
  fields: [
    defineField({ name: "organizationName", title: "اسم المؤسسة", group: "general", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
    defineField({ name: "publicSiteUrl", title: "رابط الموقع", group: "general", type: "url", validation: (r) => r.required().uri({ scheme: ["https", "http"] }) }),
    defineField({ name: "address", title: "العنوان", group: "contact", type: "string", validation: (r) => r.required().max(160).custom(nonEmpty) }),
    defineField({ name: "email", title: "البريد الإلكتروني", group: "contact", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "telephone", title: "رقم الهاتف", group: "contact", type: "string", validation: (r) => r.required().max(30).custom(nonEmpty) }),
    defineField({ name: "whatsappNumber", title: "رقم واتساب", description: "اكتب رمز الدولة مع الرقم.", group: "contact", type: "string", validation: (r) => r.required().max(30).custom(nonEmpty) }),
    defineField({ name: "whatsappMessage", title: "الرسالة الجاهزة في واتساب", group: "contact", type: "text", rows: 3, validation: (r) => r.required().max(300).custom(nonEmpty) }),
    defineField({ name: "whatsappLabel", title: "نص زر واتساب", group: "contact", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
    defineField({ name: "defaultSeoTitle", title: "عنوان الموقع الافتراضي في Google", group: "seo", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
    defineField({ name: "defaultSeoDescription", title: "وصف الموقع الافتراضي في Google", group: "seo", type: "text", rows: 3, validation: (r) => r.required().max(160).custom(nonEmpty) }),
    defineField({ name: "defaultOpenGraphImage", title: "الصورة الافتراضية عند مشاركة الرابط", group: "seo", type: "editorialImage" }),
    defineField({ name: "consultationCta", title: "دعوة طلب الاستشارة المستخدمة في الموقع", group: "cta", type: "ctaContent", validation: (r) => r.required() }),
  ], preview: { prepare: () => ({ title: "إعدادات الموقع" }) },
});

export const navigation = defineType({
  name: "navigation", title: "القائمة الرئيسية والتذييل", type: "document",
  groups: [
    { name: "header", title: "أعلى الموقع", default: true },
    { name: "footer", title: "أسفل الموقع" },
  ],
  fields: [
    defineField({ name: "headerLinks", title: "روابط القائمة الرئيسية", description: "يمكن إضافة خمسة روابط كحد أقصى حتى يبقى التصميم سليماً.", group: "header", type: "array", of: [defineArrayMember({ type: "navigationItem" })], validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "headerCta", title: "زر طلب الاستشارة", group: "header", type: "controlledLink", validation: (r) => r.required() }),
    defineField({ name: "mobileHeaderCtaLabel", title: "نص زر الاستشارة على الهاتف", group: "header", type: "string", validation: (r) => r.required().max(40).custom(nonEmpty) }),
    defineField({ name: "footerLinks", title: "روابط أسفل الموقع", group: "footer", type: "array", of: [defineArrayMember({ type: "navigationItem" })], validation: (r) => r.required().min(1).max(8) }),
    defineField({ name: "footerDescription", title: "وصف المؤسسة أسفل الموقع", group: "footer", type: "text", rows: 3, validation: (r) => r.required().max(280).custom(nonEmpty) }),
    defineField({ name: "footerLinksHeading", title: "عنوان عمود الروابط", group: "footer", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "footerContactHeading", title: "عنوان عمود التواصل", group: "footer", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "footerTagline", title: "العبارة القصيرة أسفل الموقع", group: "footer", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
    defineField({ name: "copyrightWording", title: "نص حقوق النشر", description: "تتم إضافة السنة تلقائياً.", group: "footer", type: "string", validation: (r) => r.required().max(140).custom(nonEmpty) }),
  ], preview: { prepare: () => ({ title: "القائمة الرئيسية والتذييل" }) },
});

export const homePage = defineType({
  name: "homePage", title: "الصفحة الرئيسية", type: "document",
  fields: [
    defineField({ name: "internalTitle", title: "اسم الصفحة", type: "string", initialValue: "الصفحة الرئيسية", readOnly: true, validation: (r) => r.required() }),
    defineField({ name: "hero", title: "المحتوى الرئيسي للصفحة", type: "homeHeroSection", validation: (r) => r.required() }),
    defineField({ name: "seo", title: "ظهور الصفحة في Google وعند المشاركة", type: "seo" }),
  ], preview: { prepare: () => ({ title: "الصفحة الرئيسية" }) },
});

export const aboutPage = defineType({ name: "aboutPage", title: "صفحة من نحن", type: "document", fields: pageFields("صفحة من نحن", ["aboutMethodSection", "principlesSection", "teamSection", "consultationCtaSection"]), preview: { prepare: () => ({ title: "صفحة من نحن" }) } });
export const servicesPage = defineType({ name: "servicesPage", title: "صفحة الخدمات", type: "document", fields: pageFields("صفحة الخدمات", ["servicePackagesSection", "marketingServicesSection", "consultationCtaSection"]), preview: { prepare: () => ({ title: "صفحة الخدمات" }) } });
export const portfolioPage = defineType({ name: "portfolioPage", title: "صفحة أعمالنا", type: "document", fields: pageFields("صفحة أعمالنا", ["portfolioListSection", "consultationCtaSection"], "portfolioListSection"), preview: { prepare: () => ({ title: "صفحة أعمالنا" }) } });
export const blogPage = defineType({ name: "blogPage", title: "صفحة المدونة", type: "document", fields: pageFields("صفحة المدونة", ["blogComingSoonSection"], "blogComingSoonSection"), preview: { prepare: () => ({ title: "صفحة المدونة" }) } });

const validSlug = (value: { current?: string } | undefined) => {
  if (!value?.current) return true;
  return /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value.current)
    ? true
    : "استخدم كلمات مفصولة بشرطة فقط، من دون مسافات أو رموز.";
};

export const author = defineType({
  name: "author", title: "الكتّاب والمراجعون", type: "document",
  fields: [
    defineField({ name: "name", title: "الاسم", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
    defineField({ name: "slug", title: "الرابط المختصر", type: "slug", options: { source: "name", maxLength: 80 }, validation: (r) => r.required().custom(validSlug) }),
    defineField({ name: "role", title: "الصفة المهنية", type: "string", validation: (r) => r.required().max(120).custom(nonEmpty) }),
    defineField({ name: "bio", title: "نبذة قصيرة تثبت الخبرة", type: "text", rows: 4, validation: (r) => r.required().min(40).max(500).custom(nonEmpty) }),
    defineField({ name: "expertise", title: "مجالات الخبرة", type: "array", of: [defineArrayMember({ type: "string" })], validation: (r) => r.required().min(1).max(8) }),
    defineField({ name: "image", title: "الصورة", type: "editorialImage" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image.image" } },
});

export const articleCategory = defineType({
  name: "articleCategory", title: "تصنيفات المقالات", type: "document",
  fields: [
    defineField({ name: "title", title: "اسم التصنيف", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
    defineField({ name: "slug", title: "الرابط المختصر", type: "slug", options: { source: "title", maxLength: 60 }, validation: (r) => r.required().custom(validSlug) }),
    defineField({ name: "description", title: "وصف التصنيف", type: "text", rows: 3, validation: (r) => r.max(240) }),
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});

export const article = defineType({
  name: "article", title: "المقالات", type: "document",
  groups: [
    { name: "content", title: "المقال", default: true },
    { name: "geo", title: "تهيئة البحث والذكاء الاصطناعي" },
    { name: "publishing", title: "النشر" },
  ],
  fields: [
    defineField({ name: "title", title: "عنوان المقال", group: "content", type: "string", validation: (r) => r.required().min(20).max(100).custom(nonEmpty) }),
    defineField({ name: "slug", title: "رابط المقال", description: "أنشئه من العنوان ثم راجعه قبل النشر. لا تغيّره بعد مشاركة المقال.", group: "publishing", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required().custom(validSlug) }),
    defineField({ name: "excerpt", title: "ملخص بطاقة المقال", group: "content", type: "text", rows: 3, validation: (r) => r.required().min(80).max(240).custom(nonEmpty) }),
    defineField({ name: "directAnswer", title: "الإجابة المباشرة", description: "فقرة موجزة تجيب عن السؤال الرئيسي بوضوح وتظهر قرب بداية المقال.", group: "geo", type: "text", rows: 5, validation: (r) => r.required().min(80).max(500).custom(nonEmpty) }),
    defineField({ name: "featuredImage", title: "الصورة الرئيسية", group: "content", type: "editorialImage", validation: (r) => r.required() }),
    defineField({ name: "author", title: "الكاتب", group: "publishing", type: "reference", to: [{ type: "author" }], validation: (r) => r.required() }),
    defineField({ name: "reviewer", title: "المراجع المتخصص", group: "geo", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", title: "التصنيفات", group: "publishing", type: "array", of: [defineArrayMember({ type: "reference", to: [{ type: "articleCategory" }] })], validation: (r) => r.required().min(1).max(3).unique() }),
    defineField({ name: "publishedAt", title: "تاريخ النشر", group: "publishing", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "تاريخ آخر مراجعة", description: "حدّثه عندما تتغير المعلومات، وليس عند تصحيح خطأ إملائي بسيط.", group: "geo", type: "datetime" }),
    defineField({ name: "featured", title: "إبراز المقال في صفحة المدونة", group: "publishing", type: "boolean", initialValue: false }),
    defineField({
      name: "body", title: "محتوى المقال", group: "content", type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "فقرة", value: "normal" }, { title: "عنوان رئيسي داخل المقال", value: "h2" },
            { title: "عنوان فرعي", value: "h3" }, { title: "اقتباس", value: "blockquote" },
          ],
          lists: [{ title: "نقاط", value: "bullet" }, { title: "خطوات مرقمة", value: "number" }],
          marks: {
            decorators: [{ title: "عريض", value: "strong" }, { title: "مائل", value: "em" }],
            annotations: [{
              name: "externalLink", title: "رابط موثوق", type: "object",
              fields: [defineField({ name: "href", title: "الرابط", type: "url", validation: (r) => r.required().uri({ scheme: ["https"] }) })],
            }],
          },
        }),
        defineArrayMember({ type: "editorialImage" }),
      ],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "faqs", title: "أسئلة وأجوبة مرتبطة بالمقال", description: "أضف الأسئلة التي يطرحها العملاء فعلاً. يجب أن تظهر الإجابات نفسها داخل الصفحة.", group: "geo", type: "array", of: [
        defineArrayMember({
          name: "faq", title: "سؤال وجواب", type: "object",
          fields: [
            defineField({ name: "question", title: "السؤال", type: "string", validation: (r) => r.required().min(15).max(180).custom(nonEmpty) }),
            defineField({ name: "answer", title: "الإجابة", type: "text", rows: 4, validation: (r) => r.required().min(40).max(600).custom(nonEmpty) }),
          ], preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ], validation: (r) => r.max(8),
    }),
    defineField({
      name: "sources", title: "المصادر", description: "أضف المصادر الأساسية التي تدعم الأرقام والادعاءات.", group: "geo", type: "array", of: [
        defineArrayMember({
          name: "articleSource", title: "مصدر", type: "object",
          fields: [
            defineField({ name: "title", title: "اسم المصدر", type: "string", validation: (r) => r.required().max(180).custom(nonEmpty) }),
            defineField({ name: "publisher", title: "الجهة الناشرة", type: "string", validation: (r) => r.max(120) }),
            defineField({ name: "url", title: "الرابط", type: "url", validation: (r) => r.required().uri({ scheme: ["https"] }) }),
            defineField({ name: "accessedAt", title: "تاريخ الاطلاع", type: "date" }),
          ], preview: { select: { title: "title", subtitle: "publisher" } },
        }),
      ], validation: (r) => r.max(20),
    }),
    defineField({ name: "seo", title: "Google والمشاركة", group: "geo", type: "seo" }),
  ],
  orderings: [{ title: "الأحدث أولاً", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", author: "author.name", date: "publishedAt", media: "featuredImage.image" },
    prepare: ({ title, author, date, media }) => ({ title, subtitle: [author, date ? new Date(date).toLocaleDateString("ar") : "غير منشور"].filter(Boolean).join(" · "), media }),
  },
});

export const contactPage = defineType({
  name: "contactPage", title: "صفحة تواصل معنا", type: "document",
  fields: [
    defineField({ name: "internalTitle", title: "اسم الصفحة", type: "string", initialValue: "صفحة تواصل معنا", readOnly: true, validation: (r) => r.required() }),
    defineField({ name: "pageIntro", title: "مقدمة الصفحة (العنوان الرئيسي)", type: "pageIntro", validation: (r) => r.required() }),
    defineField({ name: "contactSection", title: "نصوص التواصل ونموذج الطلب", type: "contactSection", validation: (r) => r.required() }),
    defineField({ name: "seo", title: "ظهور الصفحة في Google وعند المشاركة", type: "seo" }),
  ], preview: { prepare: () => ({ title: "صفحة تواصل معنا" }) },
});

export const documentTypes = [siteSettings, navigation, homePage, aboutPage, servicesPage, portfolioPage, blogPage, contactPage, article, author, articleCategory];
