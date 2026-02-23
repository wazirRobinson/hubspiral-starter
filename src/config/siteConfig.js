// src/config/siteConfig.js

// --------------------
// 1) Projects (canonical data objects)
// --------------------
const projects = [
  {
    slug: "digital-business-card",
    title: "Digital Business Card",
    client: "Local Service Business",
    summary: "A mobile-first digital card with QR sharing and a quote CTA.",

    problem:
      "Client needed a fast, professional way to share contact info on-site and turn quick conversations into quote requests.",
    solution: [
      "Built a lightweight mobile-first page designed for quick scanning and instant comprehension.",
      "Added QR-friendly sharing for in-person handoffs and referrals.",
      "Placed a single clear primary CTA to /quote to capture leads without distraction.",
    ],
    outcome: [
      "Prospects can save contact info in seconds on mobile.",
      "Visitors are guided to one conversion action (request a quote).",
      "A simple page that looks credible and loads fast during real-world use.",
    ],

    stack: ["Node.js", "Express", "Handlebars", "Tailwind"],
    highlights: ["QR-ready", "Fast load", "Lead CTA"],
    role: "Full-stack build",
    year: "2026",
    featured: true,
  },

  {
    slug: "starter-portfolio",
    title: "Starter Portfolio Template",
    client: "Freelancer",
    summary: "A clean portfolio layout with project detail pages and CTAs.",
    problem:
      "Needed a professional web presence that builds trust fast, without adding complexity or making updates painful.",
    solution: [
      "Created a clean multi-page structure with clear page hierarchy.",
      "Made project content config-driven.",
      "Kept CTAs consistent and conversion-first.",
    ],
    outcome: [
      "Projects updated quickly from config.",
      "Visitors understand services without hunting.",
      "Simple but premium feel.",
    ],
    stack: ["Node.js", "Handlebars", "Tailwind"],
    highlights: ["Clean layout", "Easy updates", "CTA-driven"],
    featured: true,
  },
]

// --------------------
// 2) Nav + social (site-level)
// --------------------
const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
]

// 🔗 DEFAULT SOCIAL LINKS (MAIN PLATFORMS)
const social = {
  x: "https://x.com",
  linkedin: "https://www.linkedin.com",
  instagram: "https://www.instagram.com",
}

// --------------------
// 3) Portfolio module (canonical)
// --------------------
const featuredProjectIds = projects.filter(p => p.featured).map(p => p.slug)

const portfolio = {
  projects,
  featuredProjectIds,
}

// --------------------
// 4) Final config export
// --------------------
const siteConfig = {
  site: {
    name: "HubSpiral",
    businessName: "HubSpiral",
    tagline: "Custom websites that convert — fast, clean, and mobile-first.",
    domain: "hubspiral.com",
    brandColorClass: "text-indigo-600",
    nav,
    social,
  },

  contact: {
    email: "wr@hubspiral.com",
    phone: "503-381-3014",
  },

  cta: {
    primaryText: "Request a Quote",
    primaryHref: "/quote",
    secondaryText: "View Portfolio",
    secondaryHref: "/portfolio",
  },

  services: [
    {
      title: "Custom Website Builds",
      desc: "Fast, responsive websites tailored to your business.",
      bullets: ["Mobile-first", "SEO-ready", "Clean UI"],
    },
    {
      title: "Landing Pages + Funnels",
      desc: "Focused pages designed to generate leads.",
      bullets: ["Clear messaging", "Strong CTA", "Conversion layout"],
    },
  ],

  // ✅ Canonical
  portfolio,

  // Legacy-safe aliases
  projects,
  featuredProjectIds,
  portfolioList: projects,
}

module.exports = siteConfig
