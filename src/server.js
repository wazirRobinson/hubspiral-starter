require('dotenv').config()
// console.log('DATABASE_URL (debug):', process.env.DATABASE_URL)

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const { engine } = require('express-handlebars')

const siteConfig = require('../config/siteConfig')

// Routes
const homeRoutes = require('../routes/home')
const servicesRoutes = require('../routes/services')
const contactRoutes = require('../routes/contact')
const pricingRoutes = require('../routes/pricing')
const checkoutRoutes = require('../routes/checkout')
const checkoutResultRoutes = require('../routes/checkoutResult')
const legalRoutes = require('../routes/legal')
const portfolioRoutes = require('../routes/portfolio')


const app = express()
const port = process.env.PORT || 3002

// --------------------
// 1) View engine
// --------------------
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '../views', 'layouts'),
    partialsDir: path.join(__dirname, '../views', 'partials'),
    helpers: {
      eq: (a, b) => a === b,
    },
  })
)

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '../views'))

// --------------------
// 2) Security headers (Helmet)
// --------------------
if (process.env.NODE_ENV === 'production') {
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'"],
          "form-action": ["'self'"],
          "navigate-to": ["'self'", "https://checkout.stripe.com"],
          "script-src": ["'self'", "https://js.stripe.com"],
          "frame-src": ["'self'", "https://js.stripe.com"],
          "style-src": ["'self'", "https:", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "https:"],
        },
      },
    })
  )
} else {
  app.use(helmet({ contentSecurityPolicy: false }))
}

// --------------------
// 3) Body parsers
// --------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// --------------------
// 4) Static assets
// --------------------
app.use(express.static(path.join(__dirname, '../public')))

// --------------------
// 5) Global template variables (NORMALIZED)
// --------------------
app.use((req, res, next) => {
  res.locals.year = new Date().getFullYear()

  res.locals.assetVersion =
    process.env.ASSET_VERSION ||
    (process.env.NODE_ENV === 'production' ? res.locals.year : Date.now())

  // Keep full config available if needed
  res.locals.config = siteConfig

  /**
   * NORMALIZE "site" across legacy shapes:
   * - Preferred: siteConfig.site
   * - Legacy: siteConfig.site.site (double-nested)
   * - Fallback: siteConfig (top-level)
   */
  const normalizedSite =
    (siteConfig.site && siteConfig.site.site) ||
    siteConfig.site ||
    siteConfig ||
    {}

  res.locals.site = normalizedSite

  /**
   * NORMALIZE NAV across legacy shapes:
   * - siteConfig.site.nav
   * - siteConfig.nav
   * - siteConfig.site.site.nav
   */
  const navCandidate =
    (siteConfig.site && siteConfig.site.nav) ||
    siteConfig.nav ||
    (siteConfig.site && siteConfig.site.site && siteConfig.site.site.nav) ||
    (normalizedSite && normalizedSite.nav) ||
    []

  res.locals.nav = Array.isArray(navCandidate) ? navCandidate : []

  /**
   * NORMALIZE SOCIAL across legacy shapes:
   * - siteConfig.site.social
   * - siteConfig.social
   * - siteConfig.site.site.social
   */
  const socialCandidate =
    (siteConfig.site && siteConfig.site.social) ||
    siteConfig.social ||
    (siteConfig.site && siteConfig.site.site && siteConfig.site.site.social) ||
    (normalizedSite && normalizedSite.social) ||
    {}

  res.locals.site.social = socialCandidate
  res.locals.social = socialCandidate

  // Normalize naming
  if (!res.locals.site.name && res.locals.site.businessName) {
    res.locals.site.name = res.locals.site.businessName
  }

  // Normalize X legacy key
  if (res.locals.site.social) {
    if (!res.locals.site.social.x && res.locals.site.social.twitter) {
      res.locals.site.social.x = res.locals.site.social.twitter
    }
  }

  // CTA + contact (safe defaults)
  res.locals.cta =
    siteConfig.cta || {
      primaryText: 'Request a Quote',
      primaryHref: '/contact',
    }

  res.locals.contact = siteConfig.contact || { email: '' }

  // DEV DEBUG: confirm nav is present
  if (process.env.NODE_ENV !== 'production') {
    console.log('[NAV]', res.locals.nav.map((i) => i.label).join(' | ') || '(empty)')
  }

  next()
})

// --------------------
// 6) Routes
// --------------------
app.use('/', homeRoutes)
app.use('/services', servicesRoutes)
app.use('/contact', contactRoutes)
app.use('/quote', contactRoutes) // alias so /quote works
app.use('/pricing', pricingRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/checkout', checkoutResultRoutes)
app.use('/', legalRoutes)
app.use('/portfolio', portfolioRoutes)


// --------------------
// 7) 404 handler
// --------------------
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// --------------------
// 8) Error handler
// --------------------
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
