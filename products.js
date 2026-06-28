**
 * DHRITI — Product Management System
 * =====================================
 * To add a new product:
 * 1. Copy any existing product object below
 * 2. Change: id, name, price, image, category, description, features
 * 3. Save the file — the website auto-generates everything else.
 *
 * Image path: put images in the /images/ folder and reference as "images/yourfile.jpg"
 */

const PRODUCTS = [
  // ─── FEATURED / NEW ARRIVALS ──────────────────────────────────────────────
  {
    id: 1,
    name: "Striker Pro Jersey",
    price: "₹1,299",
    priceNum: 1299,
    image: "images/jersey-striker.jpg",
    category: "men",
    tag: "bestseller",
    shortDesc: "Performance-engineered football jersey with moisture-wicking fabric.",
    description:
      "The Striker Pro Jersey is built for athletes who demand the best. Engineered with DryTech® micro-mesh fabric, it wicks sweat 40% faster than standard polyester, keeping you cool during high-intensity matches.",
    features: [
      "DryTech® moisture-wicking fabric",
      "360° stretch for full range of motion",
      "Anti-odour treatment",
      "Reinforced stitching at stress points",
      "Available in S / M / L / XL / XXL",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    newArrival: false,
  },
  {
    id: 2,
    name: "Velocity Track Jacket",
    price: "₹2,199",
    priceNum: 2199,
    image: "images/jacket-velocity.jpg",
    category: "men",
    tag: "new",
    shortDesc: "Lightweight track jacket with reflective details for dawn runs.",
    description:
      "The Velocity Track Jacket is designed for runners who train before sunrise. High-visibility reflective tape on shoulders and cuffs keeps you safe; an ultra-light shell keeps you aerodynamic.",
    features: [
      "Ultra-light ripstop shell (180gsm)",
      "Reflective tape at shoulders & cuffs",
      "Packable into front zip pocket",
      "Mesh-lined underarms for ventilation",
      "Elastic cuffs & hem",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    newArrival: true,
  },
  {
    id: 3,
    name: "Apex Sports Shorts",
    price: "₹799",
    priceNum: 799,
    image: "images/shorts-apex.jpg",
    category: "men",
    tag: "",
    shortDesc: "4-way stretch training shorts with deep side pockets.",
    description:
      "Cut for movement, the Apex Sports Shorts offer unrestricted mobility through a 4-way stretch fabric and a split hem that extends your stride. Deep side pockets secure your phone and keys.",
    features: [
      "4-way stretch polyester blend",
      "Split hem for extended mobility",
      "Deep side pockets (fits iPhone 15 Pro)",
      "Inner compression liner",
      "Machine washable",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: false,
    newArrival: true,
  },
  {
    id: 4,
    name: "Luna Sports Bra",
    price: "₹899",
    priceNum: 899,
    image: "images/bra-luna.jpg",
    category: "women",
    tag: "bestseller",
    shortDesc: "High-impact support bra with breathable back panel.",
    description:
      "Designed for high-impact training, the Luna Sports Bra features a wide under-band for support, a breathable mesh back panel, and sweat-wicking fabric across the chest zone.",
    features: [
      "High-impact support (up to D cup)",
      "Breathable mesh back panel",
      "Removable padded cups",
      "Wide, non-slip straps",
      "Available in XS / S / M / L / XL",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: true,
    newArrival: false,
  },
  {
    id: 5,
    name: "Zephyr Women's Tights",
    price: "₹1,499",
    priceNum: 1499,
    image: "images/tights-zephyr.jpg",
    category: "women",
    tag: "new",
    shortDesc: "Compression tights with hidden waistband pocket.",
    description:
      "The Zephyr Tights combine second-skin compression with a flattering high waist. A hidden pocket at the waistband keeps valuables secure during any workout.",
    features: [
      "80% Nylon / 20% Spandex",
      "High-waist compression fit",
      "Hidden zip pocket at waistband",
      "Squat-proof fabric",
      "UPF 50+ sun protection",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    featured: false,
    newArrival: true,
  },
  {
    id: 6,
    name: "Junior Flash Jersey",
    price: "₹649",
    priceNum: 649,
    image: "images/jersey-junior.jpg",
    category: "kids",
    tag: "new",
    shortDesc: "Durable kids' jersey built for the playground and the pitch.",
    description:
      "The Junior Flash Jersey is designed to keep up with kids — reinforced seams resist tugging and tumbles, while the lightweight fabric stays breathable during 90 minutes of non-stop running.",
    features: [
      "Lightweight polyester (130gsm)",
      "Reinforced seams",
      "Easy-care machine washable",
      "Tagless comfort label",
      "Sizes: 6Y / 8Y / 10Y / 12Y / 14Y",
    ],
    sizes: ["6Y", "8Y", "10Y", "12Y", "14Y"],
    featured: false,
    newArrival: true,
  },
  {
    id: 7,
    name: "ProStrike Football",
    price: "₹1,099",
    priceNum: 1099,
    image: "images/ball-prostrike.jpg",
    category: "equipment",
    tag: "bestseller",
    shortDesc: "FIFA-quality match ball with superior flight stability.",
    description:
      "The ProStrike Football is thermally bonded for consistent shape and features a textured surface for enhanced grip in wet or dry conditions. Suitable for training and official matches.",
    features: [
      "Thermal bonding (no stitching gaps)",
      "Butyl rubber bladder",
      "Textured surface for all conditions",
      "FIFA Quality Pro certified panel geometry",
      "Size 5 (standard match size)",
    ],
    sizes: ["Size 5"],
    featured: true,
    newArrival: false,
  },
  {
    id: 8,
    name: "Titan Gym Gloves",
    price: "₹549",
    priceNum: 549,
    image: "images/gloves-titan.jpg",
    category: "equipment",
    tag: "",
    shortDesc: "Padded palm gloves for heavy lifting with wrist support.",
    description:
      "Built for the iron game, the Titan Gym Gloves feature a gel-padded palm, a neoprene wrist wrap for joint support, and a breathable mesh back to keep hands cool during long sessions.",
    features: [
      "Gel-padded palm for bar comfort",
      "Neoprene wrist wrap (adjustable)",
      "Mesh back panel for ventilation",
      "Anti-slip grip pattern",
      "Available: S / M / L / XL",
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    newArrival: false,
  },
];

// ─── CATEGORY DEFINITIONS ────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "men",       label: "Men's Wear",      icon: "👕", desc: "Performance gear for male athletes" },
  { id: "women",     label: "Women's Wear",    icon: "🏃‍♀️", desc: "Engineered for female performance" },
  { id: "kids",      label: "Kids' Wear",      icon: "⚡", desc: "Durable gear for young athletes" },
  { id: "equipment", label: "Sports Equipment", icon: "🏆", desc: "Professional-grade equipment" },
];

// ─── STORE CONFIG — change these to your details ─────────────────────────────
const STORE_CONFIG = {
  name: "Dhriti",
  ownerEmail: "dalaladrij9002@gmail.com",          // ← CHANGE THIS to your email
  web3formsKey: "9060c6a8-c170-4620-a3f9-97f2a3496d08",   // ← CHANGE THIS after signup at web3forms.com
  currency: "₹",
  whatsapp: "+91XXXXXXXXXX",            // ← CHANGE THIS (optional)
  instagram: "@dhriti_sports",
};