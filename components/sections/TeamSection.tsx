import Image from "next/image";
import type { TeamSection as TeamSectionData } from "@/sanity/lib/types";
import { editorialImageUrl } from "@/sanity/lib/image";

function initialsFromName(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("");
}

export function TeamSection({ section }: { section: TeamSectionData }) {
  const members = section.members.filter((item) => !item.isHidden);
  return <section className="py-16 sm:py-20 lg:py-24"><div className="container-custom">
    <div className="mb-10 max-w-2xl"><p className="text-sm font-bold text-primary">{section.eyebrow}</p><h2 className="mt-3 text-3xl font-black text-secondary sm:text-4xl">{section.heading}</h2></div>
    <div className="grid border-y border-[oklch(0.88_0.02_190)] md:grid-cols-3">{members.map((member, index) => {
      const imageSrc = editorialImageUrl(member.image, 240);
      return <div key={member._key} className={`flex items-center gap-4 py-6 ${index > 0 ? "border-t border-[oklch(0.88_0.02_190)] md:border-s md:border-t-0 md:px-7" : "md:pe-7"}`}>
        <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent text-lg font-black text-primary">
          {imageSrc ? <Image src={imageSrc} alt={member.image?.alt || `صورة ${member.name}`} fill sizes="64px" className="object-cover" /> : (member.initials || initialsFromName(member.name))}
        </span>
        <div><h3 className="text-lg font-black text-secondary">{member.name}</h3><p className="mt-1 text-sm text-muted-foreground">{member.role}</p></div>
      </div>;
    })}</div>
  </div></section>;
}
