// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

const getHeaderH = () => {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-h').trim()
  const n = parseFloat(v)
  return Number.isFinite(n) ? n : 64
}

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition

    const headerH = getHeaderH()

    if (to.hash) {
      return new Promise((resolve) => {
        const tryFind = (tries = 0) => {
          const el = document.querySelector(to.hash) as HTMLElement | null
          if (el) {
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

    // sem hash: sempre ir ao topo ao trocar de rota
    return { left: 0, top: 0 }
  }
}
