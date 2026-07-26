import { defineField, defineType } from "sanity";
import { publicRoutes } from "@/sanity/lib/types";

const nonEmpty = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? true : "This field cannot be empty.";

export const controlledLink = defineType({
  name: "controlledLink",
  title: "زر أو رابط",
  type: "object",
  fields: [
    defineField({ name: "label", title: "النص الظاهر للزائر", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({
      name: "kind", title: "ماذا يحدث عند الضغط؟", type: "string", initialValue: "internal",
      options: { list: [
        { title: "فتح صفحة داخل الموقع", value: "internal" }, { title: "فتح موقع خارجي آمن", value: "https" },
        { title: "إرسال بريد إلكتروني", value: "email" }, { title: "الاتصال برقم هاتف", value: "telephone" },
        { title: "فتح محادثة واتساب", value: "whatsapp" },
      ], layout: "radio" }, validation: (r) => r.required(),
    }),
    defineField({
      name: "internalRoute", title: "اختر صفحة الموقع", type: "string",
      options: { list: publicRoutes.map((value) => ({ title: value === "/" ? "الصفحة الرئيسية" : value, value })) },
      hidden: ({ parent }) => parent?.kind !== "internal",
    }),
    defineField({ name: "url", title: "رابط الموقع الخارجي (HTTPS)", type: "url", hidden: ({ parent }) => parent?.kind !== "https", validation: (r) => r.uri({ scheme: ["https"] }) }),
    defineField({ name: "email", title: "البريد الإلكتروني", type: "string", hidden: ({ parent }) => parent?.kind !== "email", validation: (r) => r.email() }),
    defineField({ name: "emailSubject", title: "عنوان الرسالة", type: "string", hidden: ({ parent }) => parent?.kind !== "email", validation: (r) => r.max(120) }),
    defineField({ name: "telephone", title: "رقم الهاتف", type: "string", hidden: ({ parent }) => parent?.kind !== "telephone", validation: (r) => r.max(30) }),
    defineField({ name: "whatsapp", title: "رقم واتساب", description: "اكتب رمز الدولة مع الرقم.", type: "string", hidden: ({ parent }) => parent?.kind !== "whatsapp", validation: (r) => r.max(30) }),
  ],
  validation: (rule) => rule.custom((value) => {
    if (!value) return true;
    const link = value as { kind?: string; internalRoute?: string; url?: string; email?: string; telephone?: string; whatsapp?: string };
    const destination = link.kind === "internal" ? link.internalRoute : link.kind === "https" ? link.url : link.kind === "email" ? link.email : link.kind === "telephone" ? link.telephone : link.whatsapp;
    return typeof destination === "string" && destination.trim() ? true : "Choose or enter a destination for this link.";
  }),
  preview: { select: { title: "label", subtitle: "kind" } },
});

export const editorialImage = defineType({
  name: "editorialImage", title: "صورة", type: "object",
  fields: [
    defineField({ name: "image", title: "اختر أو ارفع الصورة", type: "image", options: { hotspot: true } }),
    defineField({ name: "alt", title: "وصف الصورة", description: "صف الصورة باختصار لسهولة الوصول وGoogle.", type: "string", validation: (r) => r.custom((value, context) => {
      const parent = context.parent as { image?: unknown } | undefined;
      return parent?.image && (!value || !value.trim()) ? "Alternative text is required when an image is selected." : true;
    }).max(180) }),
    defineField({ name: "fallbackSrc", title: "Temporary local image fallback", type: "string", readOnly: true, hidden: true }),
  ],
  preview: { select: { title: "alt", media: "image" } },
});

export const seo = defineType({
  name: "seo", title: "Google والمشاركة", type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "عنوان الصفحة في Google", type: "string", validation: (r) => r.max(60).custom((v) => v === undefined || nonEmpty(v)) }),
    defineField({ name: "metaDescription", title: "وصف الصفحة في Google", type: "text", rows: 3, validation: (r) => r.max(160).custom((v) => v === undefined || nonEmpty(v)) }),
    defineField({ name: "openGraphTitle", title: "العنوان عند مشاركة الرابط", type: "string", validation: (r) => r.max(70).custom((v) => v === undefined || nonEmpty(v)) }),
    defineField({ name: "openGraphDescription", title: "الوصف عند مشاركة الرابط", type: "text", rows: 3, validation: (r) => r.max(200).custom((v) => v === undefined || nonEmpty(v)) }),
    defineField({ name: "openGraphImage", title: "الصورة عند مشاركة الرابط", type: "editorialImage" }),
    defineField({ name: "noIndex", title: "إخفاء هذه الصفحة من نتائج البحث", type: "boolean", initialValue: false }),
  ],
});

export const ctaContent = defineType({
  name: "ctaContent", title: "دعوة طلب الاستشارة", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "النص الصغير فوق العنوان", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "heading", title: "العنوان الرئيسي", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
    defineField({ name: "link", title: "الزر", type: "controlledLink", validation: (r) => r.required() }),
  ],
});

export const navigationItem = defineType({
  name: "navigationItem", title: "رابط في القائمة", type: "object",
  fields: [
    defineField({ name: "label", title: "اسم الرابط", type: "string", validation: (r) => r.required().max(30).custom(nonEmpty) }),
    defineField({ name: "destination", title: "وجهة الرابط", type: "controlledLink", validation: (r) => r.required() }),
    defineField({ name: "isHidden", title: "إخفاء هذا الرابط", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "label", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const pageIntro = defineType({
  name: "pageIntro", title: "مقدمة الصفحة", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "النص الصغير فوق العنوان", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "heading", title: "عنوان الصفحة الرئيسي", type: "string", validation: (r) => r.required().max(120).custom(nonEmpty) }),
    defineField({ name: "description", title: "وصف المقدمة", type: "text", rows: 4, validation: (r) => r.required().max(400).custom(nonEmpty) }),
    defineField({ name: "image", title: "صورة المقدمة (اختيارية)", type: "editorialImage" }),
  ],
});

export const stringListItem = defineType({
  name: "stringListItem", title: "عنصر", type: "object",
  fields: [
    defineField({ name: "text", title: "النص", type: "string", validation: (r) => r.required().max(180).custom(nonEmpty) }),
    defineField({ name: "isHidden", title: "إخفاء هذا العنصر", type: "boolean", initialValue: false }),
  ], preview: { select: { title: "text", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const sharedObjectTypes = [controlledLink, editorialImage, seo, ctaContent, navigationItem, pageIntro, stringListItem];
