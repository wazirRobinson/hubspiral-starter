require('dotenv').config()
console.log('DATABASE_URL (debug):', process.env.DATABASE_URL)

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const { engine } = require('express-handlebars')

const siteConfig = require('./config/siteConfig')

// Routes
const homeRoutes = require('./routes/home')
const servicesRoutes = require('./routes/services')
const contactRoutes = require('./routes/contact')
const pricingRoutes = require('./routes/pricing')
const checkoutRoutes = require('./routes/checkout')
const checkoutResultRoutes = require('./routes/checkoutResult')
const legalRoutes = require('./routes/legal')
const debugRoutes = require('./routes/debug')
const portfolioRoutes = require('./routes/portfolio')
const dbHealthRoutes = require('./routes/dbHealth')
const app = express()

// PORT
const port = process.env.PORT || 3002

// --------------------
// 1) View engine MUST be registered before any routes render views
// --------------------
app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
      eq: (a, b) => a === b,
    },
  })
)


app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

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
// 3) Body parsers (MUST be before routes that read req.body)
// --------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// --------------------
// 4) Static assets (CSS, images, favicon)
// --------------------
app.use(express.static(path.join(__dirname, 'public')))

// --------------------
// 5) Global template variables (available in ALL .handlebars views)
// --------------------
app.use((req, res, next) => {
  res.locals.site = siteConfig
  res.locals.year = new Date().getFullYear()

  // Cache-busting for CSS/JS:
  // In production set ASSET_VERSION=2026-01-23 (or git hash) in .env
  res.locals.assetVersion =
    process.env.ASSET_VERSION ||
    (process.env.NODE_ENV === 'production' ? res.locals.year : Date.now())

  next()
})

// --------------------
// 6) Routes
// --------------------
app.use('/', homeRoutes)
app.use('/services', servicesRoutes)
app.use('/contact', contactRoutes)
app.use('/pricing', pricingRoutes)
app.use('/checkout', checkoutRoutes)
app.use('/checkout', checkoutResultRoutes)
app.use('/', legalRoutes)
app.use('/', debugRoutes)
app.use('/portfolio', portfolioRoutes)
app.use('/db-health', dbHealthRoutes)
// --------------------
// 7) 404 handler (ALWAYS last "normal" handler)
// --------------------
app.use((req, res) => {
  res.status(404)
  res.render('404')
})

// --------------------
// 8) Error handler (ALWAYS last)
// --------------------
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

