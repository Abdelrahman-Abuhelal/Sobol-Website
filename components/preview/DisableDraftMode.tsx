"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const inPresentation = useIsPresentationTool();
  if (inPresentation) return null;
  return (
    <a href="/api/draft-mode/disable" className="fixed bottom-4 left-4 z-[100] rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground shadow-lg">
      إنهاء المعاينة
    </a>
  );
}
