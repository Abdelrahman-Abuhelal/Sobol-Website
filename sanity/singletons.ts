export const singletonDocuments = [
  { id: "siteSettings", type: "siteSettings", title: "⚙️ إعدادات الموقع وبيانات التواصل" },
  { id: "navigation", type: "navigation", title: "🧭 القائمة الرئيسية والتذييل" },
  { id: "homePage", type: "homePage", title: "🏠 الصفحة الرئيسية" },
  { id: "aboutPage", type: "aboutPage", title: "👥 صفحة من نحن" },
  { id: "servicesPage", type: "servicesPage", title: "🧩 صفحة الخدمات" },
  { id: "portfolioPage", type: "portfolioPage", title: "💼 صفحة أعمالنا" },
  { id: "blogPage", type: "blogPage", title: "📝 صفحة المدونة" },
  { id: "contactPage", type: "contactPage", title: "✉️ صفحة تواصل معنا" },
] as const;

export const singletonTypes: Set<string> = new Set(singletonDocuments.map((item) => item.type));
