import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6 text-center text-foreground">
        <div>
          <h1 className="text-2xl font-black">Sanity Studio is not configured</h1>
          <p className="mt-3 text-muted-foreground">Add the Sanity project ID and dataset environment variables, then restart the development server.</p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
