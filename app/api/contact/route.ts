import { NextResponse } from "next/server";

const serviceLabels: Record<string, string> = {
    firefighting: "استشارة إطفاء الحرائق",
    structuring: "استشارة ترتيب البيت الداخلي",
    growth: "استشارة النمو والتوسع",
    marketing: "استشارة تسويق",
    other: "أخرى",
};

function clean(value: unknown, maxLength: number) {
    return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const website = clean(body.website, 100);

        if (website) {
            return NextResponse.json({ ok: true });
        }

        const name = clean(body.name, 120);
        const phone = clean(body.phone, 50);
        const company = clean(body.company, 160);
        const service = clean(body.service, 60);
        const message = clean(body.message, 3000);

        if (!name || !phone || !serviceLabels[service]) {
            return NextResponse.json(
                { error: "يرجى تعبئة الحقول المطلوبة بشكل صحيح." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const from = process.env.CONTACT_FROM_EMAIL;
        const to = process.env.CONTACT_TO_EMAIL ?? "info@sobol.ps";

        if (!apiKey || !from) {
            console.error("Contact email service is not configured.");
            return NextResponse.json(
                { error: "خدمة البريد غير مهيأة حالياً. يرجى التواصل معنا عبر واتساب." },
                { status: 503 }
            );
        }

        const text = [
            `الاسم الكامل: ${name}`,
            `رقم الهاتف: ${phone}`,
            `الشركة / المشروع: ${company || "غير محدد"}`,
            `الخدمة المطلوبة: ${serviceLabels[service]}`,
            "",
            "تفاصيل إضافية:",
            message || "لا توجد تفاصيل إضافية.",
        ].join("\n");

        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "User-Agent": "sobol-website/1.0",
            },
            body: JSON.stringify({
                from,
                to: [to],
                subject: `طلب استشارة جديد من ${name}`,
                text,
            }),
        });

        if (!resendResponse.ok) {
            const details = await resendResponse.text();
            console.error("Resend email failed:", details);
            return NextResponse.json(
                { error: "تعذر إرسال الطلب الآن. يرجى المحاولة مجدداً أو التواصل عبر واتساب." },
                { status: 502 }
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Contact form failed:", error);
        return NextResponse.json(
            { error: "حدث خطأ غير متوقع. يرجى المحاولة مجدداً." },
            { status: 500 }
        );
    }
}
