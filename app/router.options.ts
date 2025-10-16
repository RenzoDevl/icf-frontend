import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  hashMode: false,

  scrollBehavior (to, from, savedPosition) {
    const headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    ) || 64

    if (savedPosition) return savedPosition

    if (to.hash) {
      const el = document.querySelector(to.hash) as HTMLElement | null
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - headerH
        return { left: 0, top }
      }
    }
    return { left: 0, top: 0 }
  }
}
