import { defineArrayMember, defineField, defineType } from "sanity";

const nonEmpty = (value: unknown) => typeof value === "string" && value.trim() ? true : "This field cannot be empty.";
const hideField = defineField({ name: "isHidden", title: "إخفاء هذا القسم من الموقع", type: "boolean", initialValue: false });

const headingFields = [
  defineField({ name: "eyebrow", title: "النص الصغير فوق العنوان", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
  defineField({ name: "heading", title: "عنوان القسم", type: "string", validation: (r) => r.required().max(140).custom(nonEmpty) }),
];

const stage = (name: string, title: string) => defineField({
  name, title, type: "object", validation: (r) => r.required(), fields: [
    defineField({ name: "title", title: "عنوان المرحلة", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "description", title: "وصف المرحلة", type: "string", validation: (r) => r.required().max(90).custom(nonEmpty) }),
  ],
});

export const homeHeroSection = defineType({
  name: "homeHeroSection", title: "المحتوى الرئيسي للصفحة", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "النص الصغير فوق العنوان", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    defineField({ name: "titleLineOne", title: "السطر الأول من العنوان", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    defineField({ name: "titleLineTwo", title: "السطر المميز من العنوان", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    defineField({ name: "description", title: "الوصف", type: "text", rows: 3, validation: (r) => r.required().max(300).custom(nonEmpty) }),
    defineField({ name: "primaryButton", title: "الزر الرئيسي", type: "controlledLink", validation: (r) => r.required() }),
    defineField({ name: "secondaryButton", title: "الزر الثاني", type: "controlledLink", validation: (r) => r.required() }),
    defineField({ name: "journeyTitle", title: "عنوان رحلة العمل", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    defineField({ name: "journeyDescription", title: "وصف رحلة العمل", type: "text", rows: 2, validation: (r) => r.required().max(180).custom(nonEmpty) }),
    stage("journeyStageOne", "المرحلة الأولى"), stage("journeyStageTwo", "المرحلة الثانية"), stage("journeyStageThree", "المرحلة الثالثة"),
    defineField({ name: "closingBadgeText", title: "النص الختامي", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
  ],
  preview: { select: { title: "titleLineOne", subtitle: "eyebrow" } },
});

export const aboutMethodSection = defineType({
  name: "aboutMethodSection", title: "المنهج والرسالة والرؤية", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "paragraphs", title: "فقرات المنهج", type: "array", of: [defineArrayMember({ type: "text", rows: 4 })], validation: (r) => r.required().min(1).max(3) }),
    defineField({ name: "missionTitle", title: "عنوان الرسالة", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
    defineField({ name: "missionDescription", title: "نص الرسالة", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
    defineField({ name: "visionTitle", title: "عنوان الرؤية", type: "string", validation: (r) => r.required().max(60).custom(nonEmpty) }),
    defineField({ name: "visionDescription", title: "نص الرؤية", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Method — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const principlesSection = defineType({
  name: "principlesSection", title: "المبادئ", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "principles", title: "قائمة المبادئ", type: "array", of: [defineArrayMember({ type: "stringListItem" })], validation: (r) => r.required().min(1).max(6) }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Principles — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const teamSection = defineType({
  name: "teamSection", title: "الفريق", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "members", title: "أعضاء الفريق", type: "array", validation: (r) => r.required().min(1).max(3), of: [defineArrayMember({
      name: "teamMember", title: "عضو في الفريق", type: "object", fields: [
        defineField({ name: "name", title: "الاسم", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
        defineField({ name: "role", title: "المسمى الوظيفي", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
        defineField({ name: "image", title: "صورة العضو", description: "ارفع صورة مربعة أو طولية واضحة. يمكنك ضبط موضع القص بعد الرفع.", type: "editorialImage" }),
        defineField({ name: "initials", title: "الأحرف المختصرة للاسم", description: "اختياري. تظهر بدل الصورة عند عدم رفع صورة.", type: "string", validation: (r) => r.min(1).max(4).custom((value) => value === undefined || nonEmpty(value)) }),
        defineField({ name: "isHidden", title: "إخفاء هذا العضو", type: "boolean", initialValue: false }),
      ], preview: { select: { title: "name", subtitle: "role", media: "image.image" } },
    })] }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Team — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const consultationCtaSection = defineType({
  name: "consultationCtaSection", title: "دعوة طلب الاستشارة", type: "object",
  fields: [hideField,
    defineField({ name: "useGlobalDefault", title: "استخدام نص الاستشارة العام من إعدادات الموقع", type: "boolean", initialValue: true }),
    defineField({ name: "eyebrow", title: "النص الصغير فوق العنوان", type: "string", hidden: ({ parent }) => parent?.useGlobalDefault !== false, validation: (r) => r.max(60) }),
    defineField({ name: "heading", title: "عنوان القسم", type: "string", hidden: ({ parent }) => parent?.useGlobalDefault !== false, validation: (r) => r.max(120) }),
    defineField({ name: "link", title: "الزر", type: "controlledLink", hidden: ({ parent }) => parent?.useGlobalDefault !== false }),
  ], validation: (r) => r.custom((value) => {
    const cta = value as { useGlobalDefault?: boolean; eyebrow?: string; heading?: string; link?: unknown } | undefined;
    return cta?.useGlobalDefault === false && (!cta.eyebrow?.trim() || !cta.heading?.trim() || !cta.link) ? "Complete all custom call-to-action fields or use the global default." : true;
  }),
  preview: { select: { title: "heading", global: "useGlobalDefault", hidden: "isHidden" }, prepare: ({ title, global, hidden }) => ({ title: global ? "Global consultation call to action" : `Call to action — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const servicePackagesSection = defineType({
  name: "servicePackagesSection", title: "باقات خدمات الأعمال", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "description", title: "وصف القسم", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
    defineField({ name: "packages", title: "باقات الخدمات", type: "array", validation: (r) => r.required().min(1).max(6), of: [defineArrayMember({
      name: "servicePackage", title: "باقة خدمة", type: "object", fields: [
        defineField({ name: "label", title: "التصنيف الصغير للباقة", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
        defineField({ name: "title", title: "اسم الباقة", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
        defineField({ name: "description", title: "وصف الباقة", type: "text", rows: 3, validation: (r) => r.required().max(300).custom(nonEmpty) }),
        defineField({ name: "items", title: "الخدمات المشمولة", description: "اختياري. يمكنك حذف جميع العناصر والاكتفاء باسم الباقة ووصفها.", type: "array", of: [defineArrayMember({ type: "stringListItem" })], validation: (r) => r.max(8) }),
        defineField({ name: "isHidden", title: "إخفاء هذه الباقة", type: "boolean", initialValue: false }),
      ], preview: { select: { title: "title", subtitle: "label" } },
    })] }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Service packages — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const marketingServicesSection = defineType({
  name: "marketingServicesSection", title: "الخدمات التسويقية", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "description", title: "وصف القسم", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
    defineField({ name: "services", title: "قائمة الخدمات التسويقية", type: "array", validation: (r) => r.required().min(1).max(12), of: [defineArrayMember({
      name: "marketingService", title: "خدمة تسويقية", type: "object", fields: [
        defineField({ name: "icon", title: "الأيقونة الجاهزة", type: "string", options: { list: ["Palette", "Share2", "Megaphone", "PenTool", "Layout", "Target"] }, validation: (r) => r.required() }),
        defineField({ name: "title", title: "اسم الخدمة", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
        defineField({ name: "description", title: "وصف الخدمة", type: "text", rows: 2, validation: (r) => r.required().max(200).custom(nonEmpty) }),
        defineField({ name: "isHidden", title: "إخفاء هذه الخدمة", type: "boolean", initialValue: false }),
      ], preview: { select: { title: "title", subtitle: "icon" } },
    })] }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Marketing services — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const portfolioListSection = defineType({
  name: "portfolioListSection", title: "قائمة الأعمال", type: "object",
  fields: [hideField, ...headingFields,
    defineField({ name: "description", title: "وصف القسم", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
    defineField({ name: "projects", title: "قائمة الأعمال", type: "array", validation: (r) => r.required().min(1).max(30), of: [defineArrayMember({
      name: "portfolioItem", title: "عمل أو مشروع", type: "object", fields: [
        defineField({ name: "name", title: "اسم المشروع أو العميل", type: "string", validation: (r) => r.required().max(100).custom(nonEmpty) }),
        defineField({ name: "category", title: "التصنيف", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
        defineField({ name: "result", title: "ملخص النتيجة", type: "string", validation: (r) => r.required().max(140).custom(nonEmpty) }),
        defineField({ name: "isHidden", title: "إخفاء هذا العمل", type: "boolean", initialValue: false }),
      ], preview: { select: { title: "name", subtitle: "result" } },
    })] }),
    defineField({ name: "privacyNote", title: "ملاحظة الخصوصية", type: "text", rows: 2, validation: (r) => r.required().max(240).custom(nonEmpty) }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Portfolio — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const blogComingSoonSection = defineType({
  name: "blogComingSoonSection", title: "محتوى المدونة (قريباً)", type: "object",
  fields: [hideField,
    defineField({ name: "statusLabel", title: "النص الصغير فوق العنوان", type: "string", validation: (r) => r.required().max(50).custom(nonEmpty) }),
    defineField({ name: "heading", title: "عنوان القسم", type: "string", validation: (r) => r.required().max(140).custom(nonEmpty) }),
    defineField({ name: "description", title: "الوصف", type: "text", rows: 4, validation: (r) => r.required().max(360).custom(nonEmpty) }),
    defineField({ name: "emailCta", title: "زر التواصل بالبريد", type: "controlledLink", validation: (r) => r.required() }),
    defineField({ name: "topicsHeading", title: "عنوان المواضيع", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    defineField({ name: "topics", title: "المواضيع المخطط لها", type: "array", of: [defineArrayMember({ type: "stringListItem" })], validation: (r) => r.required().min(1).max(12) }),
  ], preview: { select: { title: "heading", hidden: "isHidden" }, prepare: ({ title, hidden }) => ({ title: `Blog — ${title}`, subtitle: hidden ? "Hidden" : "Visible" }) },
});

export const contactSection = defineType({
  name: "contactSection", title: "نصوص التواصل ونموذج الطلب", type: "object",
  fields: [...headingFields,
    defineField({ name: "description", title: "وصف التواصل", type: "text", rows: 3, validation: (r) => r.required().max(260).custom(nonEmpty) }),
    defineField({ name: "form", title: "نصوص نموذج الطلب", type: "object", validation: (r) => r.required(), fields: [
      ...[["nameLabel","عنوان حقل الاسم"],["phoneLabel","عنوان حقل الهاتف"],["companyLabel","عنوان حقل الشركة"],["serviceLabel","عنوان حقل الخدمة"],["servicePlaceholder","النص الافتراضي لاختيار الخدمة"],["messageLabel","عنوان حقل الرسالة"],["submitText","نص زر الإرسال"],["sendingText","النص أثناء الإرسال"],["successHeading","عنوان رسالة النجاح"],["successMessage","نص رسالة النجاح"],["resetText","نص إرسال طلب آخر"],["errorFallback","رسالة الخطأ العامة"]].map(([name, title]) => defineField({ name, title, type: name.includes("Message") || name === "errorFallback" ? "text" : "string", validation: (r) => r.required().max(name === "successMessage" || name === "errorFallback" ? 260 : 100).custom(nonEmpty) })),
      ...[["namePlaceholder","المثال داخل حقل الاسم"],["phonePlaceholder","المثال داخل حقل الهاتف"],["companyPlaceholder","المثال داخل حقل الشركة"],["messagePlaceholder","المثال داخل حقل الرسالة"]].map(([name, title]) => defineField({ name, title, type: "string", validation: (r) => r.max(120) })),
    ] }),
    defineField({ name: "serviceLabels", title: "أسماء الخدمات الظاهرة للزائر", description: "يمكن تعديل الأسماء فقط؛ طريقة إرسال الطلب محمية في الكود.", type: "object", validation: (r) => r.required(), fields: [
      defineField({ name: "firefighting", title: "اسم استشارة إطفاء الحرائق", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
      defineField({ name: "structuring", title: "اسم استشارة الهيكلة الداخلية", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
      defineField({ name: "growth", title: "اسم استشارة النمو", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
      defineField({ name: "marketing", title: "اسم استشارة التسويق", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
      defineField({ name: "other", title: "اسم خيار أخرى", type: "string", validation: (r) => r.required().max(80).custom(nonEmpty) }),
    ] }),
  ],
});

export const sectionObjectTypes = [homeHeroSection, aboutMethodSection, principlesSection, teamSection, consultationCtaSection, servicePackagesSection, marketingServicesSection, portfolioListSection, blogComingSoonSection, contactSection];
