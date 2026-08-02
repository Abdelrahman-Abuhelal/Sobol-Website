import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { editorialImageUrl } from "@/sanity/lib/image";

type BodyImage = { alt: string; fallbackSrc?: string; image?: { asset?: { _ref?: string; _id?: string; url?: string } } };

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-6 text-[1.075rem] leading-[2] text-[oklch(0.34_0.035_220)] sm:text-lg">{children}</p>,
    h2: ({ children }) => <h2 className="mb-5 mt-14 scroll-mt-24 text-3xl font-black leading-[1.35] tracking-[-0.025em] text-secondary">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-4 mt-10 scroll-mt-24 text-2xl font-extrabold leading-[1.4] text-secondary">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-9 rounded-2xl bg-[oklch(0.95_0.025_178)] px-6 py-5 text-xl font-medium leading-9 text-secondary sm:px-8">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-7 list-disc space-y-3 pr-6 text-lg leading-8 marker:text-primary">{children}</ul>,
    number: ({ children }) => <ol className="my-7 list-decimal space-y-3 pr-6 text-lg leading-8 marker:font-bold marker:text-primary">{children}</ol>,
  },
  marks: {
    externalLink: ({ children, value }) => <a href={value?.href} target="_blank" rel="noreferrer" className="font-bold text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary">{children}</a>,
  },
  types: {
    editorialImage: ({ value }: { value: BodyImage }) => {
      const src = editorialImageUrl(value, 1200);
      if (!src) return null;
      return <figure className="my-10"><div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-muted"><Image src={src} alt={value.alt || ""} fill sizes="(max-width: 900px) 100vw, 820px" className="object-cover" /></div>{value.alt && <figcaption className="mt-3 text-center text-sm leading-6 text-muted-foreground">{value.alt}</figcaption>}</figure>;
    },
  },
};

export function ArticleBody({ value }: { value: Array<Record<string, unknown>> }) {
  return <div className="max-w-none"><PortableText value={value as never} components={components} /></div>;
}
