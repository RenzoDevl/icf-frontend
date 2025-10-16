<script setup lang="ts">
const props = defineProps<{
  as?: 'a'|'button'
  href?: string
  variant?: 'primary'|'outline'
  block?: boolean
}>()

const base =
  'inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold transition shadow-sm'

const map: Record<string,string> = {
  primary: 'text-white bg-primary hover:bg-primary-hover',
  outline:  'text-primary border border-primary/20 hover:bg-primary/10'
}
</script>

<template>
  <component
    :is="as ?? (href ? 'a' : 'button')"
    :href="href"
    :class="[base, map[variant ?? 'primary'], block && 'w-full']"
  >
    <slot />
  </component>
</template>
