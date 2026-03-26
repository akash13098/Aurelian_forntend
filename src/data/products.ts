export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  concern: string[];
  shortDescription: string;
  description: string;
  howToUse: string;
  ingredients: string;
  clinicalResults: string;
  images: string[];
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "24K Gold & Squalane Serum",
    slug: "24k-gold-squalane-serum",
    price: 1299,
    originalPrice: 1599,
    category: "Serums",
    concern: ["Anti-Aging", "Hydration", "Radiance"],
    shortDescription: "Luxurious anti-aging serum infused with pure gold leaf and plant-derived squalane.",
    description: "Our signature elixir combines the timeless opulence of 24-karat gold with deeply nourishing plant squalane. This lightweight yet potent serum penetrates deep into the skin's layers, delivering unparalleled hydration and a luminous, youthful glow. Each bottle contains micro-particles of pure gold leaf that reflect light beautifully on the skin.",
    howToUse: "After cleansing, apply 3-4 drops to face and neck. Gently press into skin using upward motions. Use morning and evening before moisturizer. Allow 30 seconds to absorb before applying next product.",
    ingredients: "Aqua, Squalane, Gold (24K), Hyaluronic Acid, Niacinamide, Vitamin E, Jojoba Oil, Rosehip Seed Oil, Peptide Complex, Aloe Vera Extract",
    clinicalResults: "94% reported visibly firmer skin after 4 weeks. 89% noticed improved radiance within 2 weeks. Dermatologist tested on all skin types.",
    images: ["/placeholder.svg"],
    badge: "Bestseller",
    rating: 4.8,
    reviews: 342,
    inStock: true,
  },
  {
    id: "2",
    name: "Emerald Clay Detox Mask",
    slug: "emerald-clay-detox-mask",
    price: 899,
    originalPrice: 1099,
    category: "Cleansers",
    concern: ["Detox", "Pore Care", "Oil Control"],
    shortDescription: "Deep-cleansing mask with French green clay and ceremonial-grade matcha.",
    description: "A ritual of purification. Our Emerald Clay Detox Mask draws out impurities and excess oil with the power of French green clay, while ceremonial-grade matcha provides antioxidant protection. The result is skin that feels deeply cleansed yet never stripped—balanced, refined, and luminous.",
    howToUse: "Apply an even layer to clean, dry skin avoiding the eye area. Leave on for 10-15 minutes until semi-dry. Rinse with lukewarm water using gentle circular motions. Use 2-3 times per week.",
    ingredients: "Kaolin, French Green Clay (Montmorillonite), Matcha (Camellia Sinensis), Aloe Barbadensis Leaf Juice, Chamomile Extract, Tea Tree Oil, Witch Hazel, Glycerin",
    clinicalResults: "91% experienced reduced pore appearance after 3 weeks. 87% reported smoother skin texture. Non-comedogenic formula.",
    images: ["/placeholder.svg"],
    badge: "New",
    rating: 4.6,
    reviews: 178,
    inStock: true,
  },
  {
    id: "3",
    name: "Royal Sun Shield SPF 50+",
    slug: "royal-sun-shield-spf-50",
    price: 749,
    category: "Sunscreens",
    concern: ["Sun Protection", "Anti-Aging", "Hydration"],
    shortDescription: "Weightless, invisible UV protection with a dewy, skin-like finish.",
    description: "Protection has never felt this luxurious. Our Royal Sun Shield delivers broad-spectrum SPF 50+ PA++++ protection in an ultra-light, invisible formula that doubles as a primer. Infused with ceramides and centella asiatica, it strengthens the skin barrier while shielding against UVA/UVB rays and blue light.",
    howToUse: "Apply generously as the last step of your morning skincare routine. Reapply every 2-3 hours when exposed to direct sunlight. Can be worn under makeup.",
    ingredients: "Ethylhexyl Methoxycinnamate, Zinc Oxide, Titanium Dioxide, Ceramide NP, Centella Asiatica Extract, Niacinamide, Hyaluronic Acid, Vitamin E",
    clinicalResults: "SPF 50+ PA++++ verified by independent lab testing. Zero white cast on all skin tones. 96% found it comfortable for all-day wear.",
    images: ["/placeholder.svg"],
    rating: 4.9,
    reviews: 521,
    inStock: true,
  },
  {
    id: "4",
    name: "Midnight Rose Cleansing Balm",
    slug: "midnight-rose-cleansing-balm",
    price: 999,
    category: "Cleansers",
    concern: ["Cleansing", "Hydration", "Sensitive Skin"],
    shortDescription: "Melting balm-to-oil cleanser infused with Damascus rose and vitamin E.",
    description: "Transform your cleansing ritual into a moment of indulgence. This velvet-soft balm melts into a luxurious oil upon contact, dissolving makeup, sunscreen, and impurities effortlessly. Damascus rose petals soothe and hydrate, leaving skin impossibly soft and delicately scented.",
    howToUse: "Scoop a small amount with the included golden spatula. Massage onto dry skin in circular motions for 60 seconds. Add water to emulsify, then rinse thoroughly. Follow with water-based cleanser if double cleansing.",
    ingredients: "Cetyl Ethylhexanoate, Rosa Damascena Flower Oil, Vitamin E, Shea Butter, Jojoba Esters, Sunflower Seed Oil, Chamomile Extract, Rosemary Leaf Extract",
    clinicalResults: "98% effectively removed all traces of makeup. 92% reported softer skin after first use. pH-balanced formula suitable for sensitive skin.",
    images: ["/placeholder.svg"],
    badge: "Editor's Pick",
    rating: 4.7,
    reviews: 256,
    inStock: true,
  },
  {
    id: "5",
    name: "The Royal Glow Vitamin C Concentrate",
    slug: "royal-glow-vitamin-c",
    price: 1499,
    originalPrice: 1799,
    category: "Serums",
    concern: ["Brightening", "Anti-Aging", "Dark Spots"],
    shortDescription: "20% stabilized Vitamin C with ferulic acid for unmatched radiance.",
    description: "Reveal your skin's inner royalty. This potent concentrate harnesses 20% L-Ascorbic Acid stabilized with Ferulic Acid and Vitamin E for maximum efficacy and shelf stability. Watch dark spots fade, fine lines soften, and an unmistakable glow emerge within weeks of consistent use.",
    howToUse: "Apply 4-5 drops to clean skin every morning. Wait 1 minute before applying moisturizer and sunscreen. Store in a cool, dark place. Use within 3 months of opening.",
    ingredients: "L-Ascorbic Acid (20%), Ferulic Acid, Vitamin E, Hyaluronic Acid, Propanediol, Ethoxydiglycol, Panthenol, Centella Asiatica",
    clinicalResults: "97% saw brighter skin in 28 days. 85% reduction in dark spot visibility after 8 weeks. Stabilized formula maintains potency for 90 days.",
    images: ["/placeholder.svg"],
    badge: "Award Winner",
    rating: 4.9,
    reviews: 412,
    inStock: true,
  },
  {
    id: "6",
    name: "The Complete Royal Ritual Set",
    slug: "complete-royal-ritual-set",
    price: 3999,
    originalPrice: 5545,
    category: "Combos",
    concern: ["Complete Care", "Anti-Aging", "Radiance"],
    shortDescription: "The complete 4-step skincare ritual at an exclusive price.",
    description: "Experience the full Aurelian ritual. This curated set includes our four hero products—Cleansing Balm, Gold Serum, Vitamin C Concentrate, and Sun Shield—presented in a bespoke emerald gift box. Save over ₹1,500 and discover the transformative power of a complete royal skincare regimen.",
    howToUse: "Evening: Start with the Cleansing Balm, follow with the Gold Serum. Morning: Apply Vitamin C Concentrate, wait 1 minute, then finish with Sun Shield. Consistency is the key to royal skin.",
    ingredients: "See individual product pages for complete ingredient lists.",
    clinicalResults: "Users of the complete ritual reported 3x better results than using individual products alone. 99% satisfaction rate in our 12-week clinical trial.",
    images: ["/placeholder.svg"],
    badge: "Best Value",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
];

export const categories = ["All", "Serums", "Cleansers", "Sunscreens", "Combos"];
export const concerns = ["Anti-Aging", "Hydration", "Radiance", "Brightening", "Detox", "Pore Care", "Oil Control", "Sun Protection", "Dark Spots", "Sensitive Skin", "Complete Care", "Cleansing"];
