// public/js/site.js
// Back-to-top: show only after scrolling a bit.
// Safe no-op if button doesn't exist.
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('backToTop')
  if (!btn) return

  const toggle = () => {
    // show after user scrolls down 400px
    if (window.scrollY > 400) {
      btn.style.display = 'inline-flex'
    } else {
      btn.style.display = 'none'
    }
  }

  toggle()
  window.addEventListener('scroll', toggle, { passive: true })
})
