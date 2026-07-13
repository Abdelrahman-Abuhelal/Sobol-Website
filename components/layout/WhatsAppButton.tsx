import { MessageCircle, Phone } from "lucide-react";

const whatsappUrl = new URL("https://wa.me/970568060330");
whatsappUrl.searchParams.set(
    "text",
    "مرحباً، أود الاستفسار عن خدمات سُبُل لتطوير الأعمال."
);

export function WhatsAppButton() {
    return (
        <a
            href={whatsappUrl.toString()}
            target="_blank"
            rel="noreferrer"
            className="group fixed bottom-5 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-[oklch(0.7_0.17_145)] text-[oklch(0.985_0.006_145)] shadow-[0_12px_32px_oklch(0.28_0.06_145/0.28)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:bg-[oklch(0.64_0.17_145)] hover:shadow-[0_16px_36px_oklch(0.28_0.06_145/0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.58_0.15_145)] focus-visible:ring-offset-4 sm:bottom-7 sm:right-7 sm:size-16"
            aria-label="تواصل مع سُبُل عبر واتساب"
        >
            <MessageCircle className="size-8 sm:size-9" strokeWidth={1.8} aria-hidden="true" />
            <Phone
                className="absolute size-3.5 -rotate-12 sm:size-4"
                strokeWidth={2.6}
                aria-hidden="true"
            />
            <span className="pointer-events-none absolute right-full me-3 hidden whitespace-nowrap rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
                تواصل عبر واتساب
            </span>
        </a>
    );
}
