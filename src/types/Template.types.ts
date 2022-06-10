export type TTemplatesCategories =
  | "Menu"
  | "Header"
  | "Content"
  | "Feature"
  | "Call"
  | "Transactional"
  | "Footer";

export interface ITemplate {
  name: string;
  html?: string;
}
