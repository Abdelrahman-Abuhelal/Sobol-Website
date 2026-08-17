"use client";

import { useState } from "react";
import { BriefcaseBusiness, Building2, Mail, MessageSquareText, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactSection } from "@/sanity/lib/types";

type ContactResponse = { ok?: boolean; error?: string };

async function readContactResponse(response: Response, fallback: string): Promise<ContactResponse> {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) throw new Error(fallback);
  let result: unknown;
  try { result = await response.json(); } catch { throw new Error(fallback); }
  if (!result || typeof result !== "object") throw new Error(fallback);
  return result as ContactResponse;
}

export function ContactForm({ content }: { content: ContactSection }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const copy = content.form;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("sending"); setErrorMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await readContactResponse(response, copy.errorFallback);
      if (!response.ok || result.ok !== true) throw new Error(result.error || copy.errorFallback);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : copy.errorFallback);
      setStatus("error");
    }
  };

  if (status === "success") return <div className="rounded-[2rem] border border-[oklch(0.84_0.045_150)] bg-[oklch(0.96_0.035_150)] py-12 text-center"><h3 className="text-2xl font-bold text-green-800 mb-2">{copy.successHeading}</h3><p className="text-green-700">{copy.successMessage}</p><Button onClick={() => setStatus("idle")} variant="ghost" className="mt-6 text-green-700 hover:text-green-800 hover:bg-green-100">{copy.resetText}</Button></div>;

  return <div className="rounded-[2rem] border border-[oklch(0.86_0.025_190)] bg-[oklch(0.995_0.004_175)] p-6 shadow-[0_20px_60px_oklch(0.36_0.055_210/0.08)] sm:p-9"><form onSubmit={handleSubmit} className="space-y-6">
    <div className="pointer-events-none absolute size-px overflow-hidden opacity-0" aria-hidden="true"><label htmlFor="website">الموقع الإلكتروني</label><input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="grid gap-6 md:grid-cols-2"><div className="space-y-2"><label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700"><User className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.nameLabel}</label><input type="text" id="name" name="name" autoComplete="name" placeholder={copy.namePlaceholder} required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" /></div><div className="space-y-2"><label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700"><Mail className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.emailLabel || "البريد الإلكتروني"}</label><input type="email" id="email" name="email" autoComplete="email" dir="ltr" placeholder={copy.emailPlaceholder} required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" /></div></div>
    <div className="grid gap-6 md:grid-cols-2"><div className="space-y-2"><label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700"><Phone className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.phoneLabel}</label><input type="tel" id="phone" name="phone" autoComplete="tel" dir="ltr" placeholder={copy.phonePlaceholder} required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" /></div><div className="space-y-2"><label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-700"><Building2 className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.companyLabel}</label><input type="text" id="company" name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" /></div></div>
    <div className="space-y-2"><label htmlFor="service" className="flex items-center gap-2 text-sm font-medium text-gray-700"><BriefcaseBusiness className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.serviceLabel}</label><select id="service" name="service" required className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white font-sans" defaultValue=""><option value="" disabled>{copy.servicePlaceholder}</option><option value="firefighting">{content.serviceLabels.firefighting}</option><option value="structuring">{content.serviceLabels.structuring}</option><option value="growth">{content.serviceLabels.growth}</option><option value="marketing">{content.serviceLabels.marketing}</option><option value="other">{content.serviceLabels.other}</option></select></div>
    <div className="space-y-2"><label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700"><MessageSquareText className="size-4 text-primary/80" strokeWidth={1.8} aria-hidden="true" />{copy.messageLabel}</label><textarea id="message" name="message" placeholder={copy.messagePlaceholder} rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea></div>
    <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={status === "sending"}>{status === "sending" ? copy.sendingText : copy.submitText}</Button>
    {status === "error" && <p className="text-center text-sm font-medium text-red-700" role="alert">{errorMessage}</p>}
  </form></div>;
}
