// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

const getHeaderH = () => {
  if (typeof window === 'undefined') return 64
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-h')
    .trim()
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 64
}

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    // voltar pelo browser
    if (savedPosition) return savedPosition

    // âncora com offset do header
    if (to.hash) {
      return new Promise((resolve) => {
        const tryFind = (tries = 0) => {
          const el = document.querySelector(to.hash) as HTMLElement | null
          if (el) {
            const headerH = getHeaderH()
            const top = el.getBoundingClientRect().top + window.pageYOffset - headerH
            resolve({ left: 0, top })
          } else if (tries < 20) {
            setTimeout(() => tryFind(tries + 1), 50)
          } else {
            resolve({ left: 0, top: 0 })
          }
        }
        requestAnimationFrame(() => tryFind())
      })
    }

    // 👇 importante: não força scroll aqui
    return false
  }
}
