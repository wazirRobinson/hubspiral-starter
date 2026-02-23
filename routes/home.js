const express = require('express')
const router = express.Router()

const siteConfig = require('../config/siteConfig')

/**
 * Canonical portfolio accessor:
 * - Prefer siteConfig.portfolio.projects
 * - Fallback to siteConfig.projects (legacy)
 */
function getProjects() {
  const projects =
    (siteConfig.portfolio && siteConfig.portfolio.projects) ||
    siteConfig.projects ||
    []

  return Array.isArray(projects) ? projects : []
}

function indexBySlug(projects) {
  const map = new Map()
  for (const p of projects) {
    if (!p || !p.slug) continue
    if (!map.has(p.slug)) map.set(p.slug, p)
  }
  return map
}

function getFeaturedProjects() {
  const projects = getProjects()
  const bySlug = indexBySlug(projects)

  // Slug-based featured IDs (canonical)
  const featuredIds =
    (siteConfig.portfolio && siteConfig.portfolio.featuredProjectIds) ||
    siteConfig.featuredProjectIds ||
    []

  const featuredProjectIds = Array.isArray(featuredIds) ? featuredIds : []

  // If featuredProjectIds exists, use it (slug match)
  if (featuredProjectIds.length) {
    const featured = featuredProjectIds
      .map((slug) => bySlug.get(slug))
      .filter(Boolean)

    // Dev-only warning for missing slugs
    if (process.env.NODE_ENV !== 'production') {
      const missing = featuredProjectIds.filter((slug) => !bySlug.has(slug))
      if (missing.length) {
        console.warn(`[home] Missing featured slugs in projects: ${missing.join(', ')}`)
      }
    }

    return featured
  }

  // Fallback: featured flag (supports legacy configs)
  return projects.filter((p) => p && p.featured)
}

router.get('/', (req, res) => {
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  res.render('home', {
    pageTitle: 'HubSpiral | Websites & Apps that Convert',
    metaDescription:
      'HubSpiral builds fast, secure web systems for contractors and real estate operators—designed to generate leads, capture inquiries, and scale.',

    // Services: prefer rich objects; fall back to simple list
    services:
      siteConfig.servicesDetailed ||
      (siteConfig.services || []).map((s) => ({
        title: s,
        desc: 'High-quality build focused on clarity and conversion.',
        bullets: ['Mobile-first', 'Fast delivery', 'CTA-driven'],
      })),

    // Featured for new templates
    featuredProjects,

    // Backward compatible for templates using "featured"
    featured: featuredProjects,
  })
})

module.exports = router
