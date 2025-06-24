export interface Category {
  _id: string;
  name: string;
  parent?: string | null;
  subcategories?: Category[];
  open?: boolean; // for animation
}
