import type { EditField } from "@/components/admin/inline-edit-modal";

export interface ModelEditConfig {
  model: string;
  label: string;
  fields: EditField[];
}

const seaPackageFields: EditField[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "priceFrom", label: "Price From ($)", type: "number" },
  { key: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { key: "duration", label: "Duration", type: "text" },
  { key: "boatType", label: "Boat Type", type: "text" },
  { key: "maxGuests", label: "Max Guests", type: "number" },
];

const stayFields: EditField[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "priceFrom", label: "Price From ($)", type: "number" },
  { key: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { key: "location", label: "Location", type: "text" },
];

const spotFields: EditField[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { key: "location", label: "Location", type: "text" },
];

const tripFields: EditField[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "priceFrom", label: "Price From ($)", type: "number" },
  { key: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { key: "location", label: "Location", type: "text" },
  { key: "duration", label: "Duration", type: "text" },
];

const experienceFields: EditField[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "priceFrom", label: "Price From ($)", type: "number" },
  { key: "coverImage", label: "Cover Image URL", type: "image", placeholder: "https://..." },
  { key: "location", label: "Location", type: "text" },
];

const addonFields: EditField[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "price", label: "Price ($)", type: "number" },
];

export const EDIT_CONFIGS: Record<string, ModelEditConfig> = {
  SeaPackage: { model: "SeaPackage", label: "Sea Package", fields: seaPackageFields },
  Stay: { model: "Stay", label: "Stay", fields: stayFields },
  Spot: { model: "Spot", label: "Spot", fields: spotFields },
  Trip: { model: "Trip", label: "Trip", fields: tripFields },
  Experience: { model: "Experience", label: "Experience", fields: experienceFields },
  AddOn: { model: "AddOn", label: "Add-On", fields: addonFields },
};

export function getEditConfig(model: string): ModelEditConfig | undefined {
  return EDIT_CONFIGS[model];
}
