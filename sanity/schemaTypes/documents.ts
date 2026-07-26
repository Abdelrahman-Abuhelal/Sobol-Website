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

export const contactPage = defineType({
  name: "contactPage", title: "صفحة تواصل معنا", type: "document",
  fields: [
    defineField({ name: "internalTitle", title: "اسم الصفحة", type: "string", initialValue: "صفحة تواصل معنا", readOnly: true, validation: (r) => r.required() }),
    defineField({ name: "pageIntro", title: "مقدمة الصفحة (العنوان الرئيسي)", type: "pageIntro", validation: (r) => r.required() }),
    defineField({ name: "contactSection", title: "نصوص التواصل ونموذج الطلب", type: "contactSection", validation: (r) => r.required() }),
    defineField({ name: "seo", title: "ظهور الصفحة في Google وعند المشاركة", type: "seo" }),
  ], preview: { prepare: () => ({ title: "صفحة تواصل معنا" }) },
});

export const documentTypes = [siteSettings, navigation, homePage, aboutPage, servicesPage, portfolioPage, blogPage, contactPage];
