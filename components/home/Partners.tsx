const partners = [
    "محلات العروج للتجارة العامة",
    "الصوباني هوم بلس",
    "ميرفيلا للتطريز اليدوي",
    "عيادات ألماس لطب وزراعة الأسنان",
    "عيادات بريميوم لتجميل وزراعة الأسنان",
    "لمار كيك آند سويت",
    "مكتب د. سناء طوطح للمحاماة",
    "شركة أحبار الغريب",
];

export function Partners() {
    return (
        <section className="py-16 border-t" style={{ backgroundColor: '#DCEEE7' }}>
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary">شركاء النجاح</h2>
                    <p className="text-muted-foreground mt-2">نفخر بثقة عملائنا في مختلف القطاعات</p>
                </div>

                <ul className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-70 cursor-default list-none p-0 m-0">
                    {partners.map((partner, i) => (
                        <li
                            key={i}
                            className="px-6 py-4 bg-white rounded-lg text-lg font-semibold text-secondary transition-all text-center"
                            style={{ color: '#006989' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#FD8B51'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#006989'}
                        >
                            {partner}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
