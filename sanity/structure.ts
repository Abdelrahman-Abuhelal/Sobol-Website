import type { StructureResolver } from "sanity/structure";
import { singletonDocuments } from "@/sanity/singletons";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("محتوى موقع سُبُل")
    .items(
      singletonDocuments.map((item) =>
        S.listItem()
          .id(item.id)
          .title(item.title)
          .schemaType(item.type)
          .child(S.document().schemaType(item.type).documentId(item.id)),
      ),
    );
