import { documentTypes } from "@/sanity/schemaTypes/documents";
import { sharedObjectTypes } from "@/sanity/schemaTypes/objects/common";
import { sectionObjectTypes } from "@/sanity/schemaTypes/objects/sections";

export const schemaTypes = [...documentTypes, ...sharedObjectTypes, ...sectionObjectTypes];
