module.exports = {
  businessName: 'HubSpiral',
  tagline: 'Websites & Apps that convert',
  contactEmail: '',

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Portfolio', href: '/portfolio' },
    // MVP uses /quote, but keep /contact in nav if you want
    { label: 'Contact', href: '/quote' },
  ],

  // Keep your existing simple services list (no break)
  services: [
    'Business Websites',
    'Web Applications',
    'Ecommerce Solutions',
  ],

  // NEW: richer services objects for the new home template (optional but supported)
  servicesDetailed: [
    {
      title: 'Business Websites',
      desc: 'Fast, professional sites built to capture leads and establish credibility.',
      bullets: ['Mobile-first', 'SEO-ready structure', 'Clear CTA flow'],
    },
    {
      title: 'Web Applications',
      desc: 'Custom tools and workflows that save time and scale operations.',
      bullets: ['Intake systems', 'Automation-ready', 'Built to expand'],
    },
    {
      title: 'Ecommerce Solutions',
      desc: 'Sell products/services with secure payments and clean checkout flows.',
      bullets: ['Stripe-ready', 'Product setup', 'Order flow'],
    },
  ],

  // Core website systems (no ecommerce). IDs stay stable for checkout routing.
  pricing: [
    {
      id: 'starter',
      name: 'Foundation System',
      price: 2500,
      description:
        'A fast, professional foundation that establishes credibility and captures leads — built to scale without rebuilds.',
      features: [
        'Conversion-focused homepage layout',
        'Services/offer section + clear CTA flow',
        'Lead capture contact form + email routing',
        'Mobile-first responsive build',
        'SEO-ready page structure (titles, headings, metadata)',
        'Performance pass (clean, lightweight build)',
        'Secure deployment-ready setup (best-practice headers in production)',
      ],
      idealFor: [
        'Local service businesses',
        'Solo operators and contractors',
        'New brands that need credibility fast',
        'Businesses that need leads, not fluff',
      ],
    },

    {
      id: 'business',
      name: 'Growth System (Recommended)',
      price: 5000,
      description:
        'A complete growth site engineered to convert traffic into leads and support expansion — without becoming a maintenance nightmare.',
      features: [
        'Everything in Foundation System',
        'Multi-page architecture (services, proof, FAQs, contact)',
        'Conversion structure across pages (CTAs, sections, hierarchy)',
        'Advanced lead capture fields (budget, timeline, service type)',
        'Analytics + tracking setup (as provided by client)',
        'Copy/layout guidance to improve clarity and conversion',
        'Stronger performance optimization + clean handoff',
      ],
      idealFor: [
        'Established service businesses',
        'Multi-service companies',
        'Businesses investing in marketing',
        'Operators who need a scalable web system',
      ],
    },

    {
      id: 'growth',
      name: 'Business Platform',
      price: 7500,
      description:
        'A custom business platform built as infrastructure — for payments, workflows, and systems that evolve over time (quote-first scope).',
      features: [
        'Everything in Growth System',
        'Custom backend logic (scoped to project needs)',
        'Stripe payment flows when applicable (checkout/session-based)',
        'Operational workflow support (intake, routing, automation-ready structure)',
        'Architecture designed for future expansion (accounts/dashboards later if needed)',
        'Security-first defaults + production hardening',
        'Technical documentation + maintainable structure',
      ],
      idealFor: [
        'Businesses with internal workflows',
        'Operators selling services/products with payments',
        'Teams planning future platform expansion',
        'Founders building systems, not just pages',
      ],
    },
  ],

  ecommerceAddon: {
    name: 'Ecommerce Add-On',
    startingAt: 2500,
    description: 'Ecommerce functionality can be added to any website package.',
    includes: [
      'Secure payment integration (Stripe or similar)',
      'Up to 10 products',
      'Product management setup',
      'Checkout and order flow configuration',
      'Basic training for managing products',
    ],
    optionalAddons: [
      'Additional products',
      'Shipping and tax automation',
      'Subscription or recurring payments',
      'Inventory integrations',
    ],
  },

  addons: [
    {
      id: 'project-gallery',
      name: 'Project Gallery / Portfolio System',
      summary: 'A fast, filterable project gallery to show before/after work, builds, and results.',
    },
    {
      id: 'reviews-proof',
      name: 'Reviews + Proof Module',
      summary: 'Testimonials, star ratings, and proof blocks for higher conversion.',
    },
    {
      id: 'service-area-map',
      name: 'Service Area Map',
      summary: 'Map + coverage zones + location pages for local SEO.',
    },
    {
      id: 'estimate-intake',
      name: 'Estimate / Quote Intake Upgrade',
      summary: 'Better lead forms (budget, timeline, job type) + email routing.',
    },
    {
      id: 'scheduler',
      name: 'Call Scheduling',
      summary: 'Embedded scheduling (Calendly-style) + pre-qualification questions.',
    },
    {
      id: 'payments-deposits',
      name: 'Stripe Deposits / Retainers',
      summary: 'Collect deposits for estimates, retainers, or packages.',
    },
    {
      id: 'crm-integration',
      name: 'CRM / Pipeline Integration',
      summary: 'Push leads into your CRM (HubSpot, Jobber, etc.) with tags + tracking.',
    },
    {
      id: 'sms-followup',
      name: 'SMS Follow-up Automation',
      summary: 'Auto-text confirmations and follow-ups (Twilio-style workflows).',
    },
  ],

  // Portfolio (upgraded: problem/solution/outcome + optional conversion fields)
  portfolio: [
    {
      id: 'remodel-leads',
      title: 'Contractor Lead Generation Site',
      type: 'Lead Generation',
      summary: 'High-conversion site for a residential remodeling company.',
      stack: ['Node.js', 'Express', 'Handlebars'],
      slug: 'contractor-lead-gen',
      featured: true,

      // NEW FIELDS
      problem:
        'The contractor was relying on referrals and inconsistent social posts. When homeowners did find them, the site didn’t answer the basics (services, service area, process, timeline), so visitors bounced or called with vague questions.',
      solution:
        'Built a conversion-first contractor site with clear service pages, trust blocks (process, FAQs, proof), and a quote intake flow that captures job type, timeline, and location before the first call. The CTA path stays visible and repeats at decision points so leads never get “stuck.”',
      outcome: [
        'More qualified calls (scope + timeline + location captured upfront)',
        'Less time wasted on price shoppers and vague inquiries',
        'A site that supports ads, referrals, and Google traffic without redesign',
      ],

      // Optional but helpful for case-study polish
      services: ['Lead Gen Website', 'Service Pages', 'Quote Intake', 'Conversion Copy Structure'],
      timeline: '5 days',
      scope: 'Multi-page contractor site + quote-first CTA flow',
    },

    {
      id: 'property-intake',
      title: 'Real Estate Intake System',
      type: 'Internal Tool',
      summary: 'Custom intake workflow for property acquisitions.',
      stack: ['Node.js', 'Express'],
      slug: 'real-estate-intake',
      featured: true,

      // NEW FIELDS
      problem:
        'Deal info was scattered across texts, emails, and spreadsheets. Properties were being evaluated inconsistently, with missing repair notes, unclear ARV assumptions, and no standard “go/no-go” checklist.',
      solution:
        'Created a simple intake + evaluation workflow that standardizes how deals get captured: property details, photos, rehab notes, comps/ARV assumptions, and decision flags. The flow is lightweight, fast to use, and designed to expand into dashboards later without rebuilding.',
      outcome: [
        'Cleaner deal intake (fewer missing fields and fewer follow-up messages)',
        'Faster screening and clearer decisions on which leads to pursue',
        'A repeatable evaluation process that scales to more leads and more team members',
      ],

      services: ['Internal Intake Tool', 'Workflow Design', 'Standardized Fields', 'Expandable Architecture'],
      timeline: '7 days',
      scope: 'Acquisitions intake + evaluation workflow (config-first)',
    },

    {
      id: 'service-payments',
      title: 'Stripe Deposit Flow',
      type: 'Payments',
      summary: 'Secure deposit checkout for service-based quotes.',
      stack: ['Stripe', 'Node.js'],
      slug: 'stripe-deposits',
      featured: false,

      // NEW FIELDS
      problem:
        'The business was losing momentum after quotes: customers agreed verbally, but payments lagged. Invoicing links were inconsistent, and collecting deposits required manual follow-up and extra admin time.',
      solution:
        'Implemented a clean deposit checkout flow using Stripe so customers can pay immediately after approval. The flow supports service deposits/retainers, keeps language clear (what the deposit covers), and routes users back into the next step (schedule / intake / confirmation).',
      outcome: [
        'Faster deposits collected (less chasing, less admin)',
        'A more professional buying experience that builds trust',
        'More predictable cash flow for scheduling labor and materials',
      ],

      services: ['Stripe Checkout', 'Deposit / Retainer Flow', 'Confirmation UX', 'Conversion Messaging'],
      timeline: '2–3 days',
      scope: 'Payment flow + post-payment next-step routing',
    },
  ],

  // ------------------------------------------------------------------
  // MVP COMPAT LAYER (NEW)
  // These are aliases so the new routes/views work immediately.
  // ------------------------------------------------------------------

  // New templates expect: site, contact, cta
  site: {
    name: 'HubSpiral',
    tagline: 'Websites & Apps that convert',
    domain: 'hubspiral.com',
    brandColorClass: 'text-indigo-600',
  },

  contact: {
    email: 'hello@hubspiral.com',
  },

  cta: {
    primaryText: 'Request a Quote',
    primaryHref: '/quote',
    secondaryText: 'View Portfolio',
    secondaryHref: '/portfolio',
  },

  // New routes expect: projects (we alias to portfolio)
  // (Do NOT duplicate the array manually — just reference via route code)
  // If you prefer to keep it in config, you can duplicate it, but not required.
};
