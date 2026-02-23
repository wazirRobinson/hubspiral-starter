const express = require('express')
const router = express.Router()

const siteConfig = require('../config/siteConfig')

function getProjects() {
  // Canonical (new)
  if (siteConfig.portfolio && Array.isArray(siteConfig.portfolio.projects)) {
    return siteConfig.portfolio.projects
  }

  // Legacy (older)
  if (Array.isArray(siteConfig.projects)) return siteConfig.projects

  // Legacy alias you used in some configs
  if (Array.isArray(siteConfig.portfolio)) return siteConfig.portfolio
  if (Array.isArray(siteConfig.portfolioList)) return siteConfig.portfolioList

  return []
}

// Portfolio grid
router.get('/', (req, res) => {
  const projects = getProjects()

  res.render('portfolio', {
    pageTitle: 'Portfolio | HubSpiral',
    metaDescription: 'Selected projects showcasing custom web systems.',
    projects, // ✅ ALWAYS pass this
  })
})

// Case study
router.get('/:slug', (req, res) => {
  const { slug } = req.params
  const projects = getProjects()
  const project = projects.find((p) => p && p.slug === slug)

  if (!project) {
    return res.status(404).render('404', {
      pageTitle: 'Not Found',
      metaDescription: 'Project not found.',
      message: 'Project not found.',
    })
  }

  res.render('case-study', {
    pageTitle: `${project.title} | HubSpiral`,
    metaDescription: project.summary || 'Project case study.',
    project,
  })
})

module.exports = router
