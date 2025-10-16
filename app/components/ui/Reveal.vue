<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = withDefaults(defineProps<{
  as?: string
  anim?: 'fade-in'|'fade-up'|'fade-down'|'slide-left'|'slide-right'|'scale-in'|'pop'
  delay?: number
  once?: boolean
  threshold?: number
}>(), {
  as: 'div',
  anim: 'fade-up',
  delay: 0,
  once: true,
  threshold: 0.05, 
})

const el = ref<HTMLElement|null>(null)
let io: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  if (!el.value) return
  el.value.classList.add('opacity-0', 'will-change-transform')

  io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const d = props.delay ? `animation-delay:${props.delay}ms` : ''
        entry.target.setAttribute('style', d)
        entry.target.classList.add(`animate-${props.anim}`)
        entry.target.classList.remove('opacity-0')
        if (props.once) io?.unobserve(entry.target)
      } else if (!props.once) {
        entry.target.classList.remove(`animate-${props.anim}`)
        entry.target.classList.add('opacity-0')
        entry.target.setAttribute('style', '')
      }
    }
  }, {
    threshold: props.threshold,
    rootMargin: '0px 0px -10% 0px', 
  })

  io.observe(el.value)

  const rect = el.value.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  if (rect.top < vh && rect.bottom > 0) {
    el.value.classList.add(`animate-${props.anim}`)
    el.value.classList.remove('opacity-0')
  }
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <component :is="as" ref="el"><slot/></component>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  :host, * { animation: none !important; transition: none !important; }
}
</style>
