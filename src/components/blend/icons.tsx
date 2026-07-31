import {
  Apple,
  Baby,
  Cookie,
  CupSoda,
  Plug,
  Snowflake,
  SprayCan,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Groceries: Apple,
  Beverages: CupSoda,
  Snacks: Cookie,
  "Household Items": WashingMachine,
  "Frozen Foods": Snowflake,
  Toiletries: SprayCan,
  "Baby Products": Baby,
  Electronics: Plug,
};

export function categoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] ?? Apple;
}