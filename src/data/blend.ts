export const BUSINESS = {
  name: "Blend Supermarket",
  phone: "08062840158",
  phoneIntl: "2348062840158",
  email: "info@brandvergent.com",
  address: "No. 1 Victor Anoje Street, Igboelerin, Okokomaiko, Ojo, Lagos",
  hours: "Mon - Sat: 7:00am - 9:00pm • Sunday: 10:00am - 7:00pm",
};

export const naira = (value: number) =>
  `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  emoji: string;
  rating: number;
  tag?: "deal" | "new";
};

export const CATEGORIES = [
  { name: "Groceries", emoji: "🥬", items: 320 },
  { name: "Beverages", emoji: "🥤", items: 145 },
  { name: "Snacks", emoji: "🍪", items: 210 },
  { name: "Household Items", emoji: "🧺", items: 176 },
  { name: "Frozen Foods", emoji: "🧊", items: 98 },
  { name: "Toiletries", emoji: "🧴", items: 132 },
  { name: "Baby Products", emoji: "🍼", items: 87 },
  { name: "Electronics", emoji: "🔌", items: 64 },
];

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Mama Gold Rice 50kg", category: "Groceries", price: 78500, oldPrice: 85000, emoji: "🍚", rating: 4.8, tag: "deal" },
  { id: "p2", name: "Golden Penny Semovita 10kg", category: "Groceries", price: 12400, emoji: "🌾", rating: 4.6 },
  { id: "p3", name: "Devon King's Oil 5L", category: "Groceries", price: 14900, oldPrice: 16500, emoji: "🫗", rating: 4.7, tag: "deal" },
  { id: "p4", name: "Peak Milk Powder 900g", category: "Groceries", price: 9800, emoji: "🥛", rating: 4.9, tag: "new" },
  { id: "p5", name: "Coca-Cola Pack of 12", category: "Beverages", price: 4800, oldPrice: 5400, emoji: "🥤", rating: 4.5, tag: "deal" },
  { id: "p6", name: "Chivita 100% Juice 1L", category: "Beverages", price: 2100, emoji: "🧃", rating: 4.4, tag: "new" },
  { id: "p7", name: "Pringles Original 165g", category: "Snacks", price: 3600, emoji: "🥔", rating: 4.6 },
  { id: "p8", name: "Digestive Biscuits Family Pack", category: "Snacks", price: 2750, oldPrice: 3200, emoji: "🍪", rating: 4.3, tag: "deal" },
  { id: "p9", name: "Hypo Bleach 1.5L", category: "Household Items", price: 1850, emoji: "🧼", rating: 4.5 },
  { id: "p10", name: "Ariel Detergent 900g", category: "Household Items", price: 4200, emoji: "🧺", rating: 4.7, tag: "new" },
  { id: "p11", name: "Frozen Chicken Whole 1.2kg", category: "Frozen Foods", price: 8900, oldPrice: 9900, emoji: "🍗", rating: 4.8, tag: "deal" },
  { id: "p12", name: "Titus Frozen Fish 1kg", category: "Frozen Foods", price: 7600, emoji: "🐟", rating: 4.6 },
  { id: "p13", name: "Dettol Soap 4-in-1", category: "Toiletries", price: 3400, emoji: "🧴", rating: 4.7 },
  { id: "p14", name: "Oral-B Toothpaste 140g", category: "Toiletries", price: 1950, emoji: "🪥", rating: 4.4, tag: "new" },
  { id: "p15", name: "Cussons Baby Wipes x80", category: "Baby Products", price: 2650, oldPrice: 3100, emoji: "🍼", rating: 4.8, tag: "deal" },
  { id: "p16", name: "Rechargeable LED Lamp", category: "Electronics", price: 15500, emoji: "💡", rating: 4.5, tag: "new" },
];

export const REVIEWS = [
  {
    name: "Chinelo Okafor",
    location: "Okokomaiko, Lagos",
    rating: 5,
    text: "Blend Supermarket has become my go-to for monthly shopping. Prices are honest and delivery to Ojo took less than two hours.",
  },
  {
    name: "Tunde Adeyemi",
    location: "Alaba, Lagos",
    rating: 5,
    text: "The frozen foods section is always fresh and well packaged. Their customer service on WhatsApp is fast and friendly.",
  },
  {
    name: "Blessing Eze",
    location: "Igboelerin, Lagos",
    rating: 4,
    text: "I love that I can track my order. Everything arrived complete, and the baby products were exactly what I ordered.",
  },
];

export const FAQS = [
  {
    q: "Do you deliver across Lagos?",
    a: "Yes. We deliver same-day within Ojo, Okokomaiko, Alaba and Festac, and next-day to every other part of Lagos. Delivery fees are calculated at checkout based on your location.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept debit cards, bank transfers, USSD and cash on delivery. All online payments are processed through a secure, encrypted checkout.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely. Every order comes with a tracking ID sent by SMS and email so you can follow it from packing to your doorstep.",
  },
  {
    q: "What is your return policy?",
    a: "Perishable items can be returned on delivery if they are not fresh. Other items can be returned within 7 days with the original receipt.",
  },
  {
    q: "Do you offer bulk or wholesale pricing?",
    a: "Yes. Restaurants, offices and event planners get special wholesale rates. Call 08062840158 to speak with our bulk sales desk.",
  },
];