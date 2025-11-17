import type { BoardType } from "../types/data";

export const boardTypes:BoardType[] = [
  { code: "FB", name: "Full Board" }, // Breakfast, Lunch & Dinner included
  { code: "HB", name: "Half Board" }, // Breakfast & one meal included
  { code: "NB", name: "No Board" }, // No meals included
];
