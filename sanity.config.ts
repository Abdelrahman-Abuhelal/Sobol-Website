"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dataset, projectId, siteUrl } from "./sanity/env";
import { presentationResolve } from "./sanity/presentation/resolve";
import { schemaTypes } from "./sanity/schemaTypes";
import { singletonTypes } from "./sanity/singletons";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "إدارة محتوى موقع سُبُل",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure, title: "تحرير المحتوى" }),
    presentationTool({
      title: "معاينة الموقع",
      allowOrigins: [siteUrl, "http://localhost:3000"],
      devMode: process.env.NODE_ENV === "development",
      previewUrl: {
        // Studio is embedded in this Next.js app, so "/" always selects the
        // matching local or production frontend instead of forcing production.
        initial: "/",
        previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
      },
      resolve: presentationResolve,
    }),
    visionTool({ title: "أدوات المطور" }),
  ],
  schema: { types: schemaTypes },
  document: {
    actions: (previousActions, context) => singletonTypes.has(context.schemaType)
      ? previousActions.filter(({ action }) => action !== "delete" && action !== "duplicate")
      : previousActions,
    newDocumentOptions: (previousOptions) => previousOptions.filter(({ templateId }) => !singletonTypes.has(templateId)),
  },
});
