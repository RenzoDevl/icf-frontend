// plugins/reveal.client.ts
export default defineNuxtPlugin(() => {
  const run = () => {
    const els = document.querySelectorAll<HTMLElement>('.reveal:not(.inview)')
    if (!els.length) return
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('inview')
          io.unobserve(e.target)
        }
      }
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
  }

  run()
  const router = useRouter()
  router.afterEach(() => requestAnimationFrame(run))
})
