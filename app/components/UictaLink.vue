<script setup lang="ts">
const props = defineProps<{
  to: string
  label?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg'
}>()

const sz = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-2 text-sm'
    case 'lg': return 'px-5 py-3 text-base'
    default:   return 'px-4 py-2 text-[15px]'
  }
})
</script>

<template>
  <NuxtLink
  :to="to"
  class="inline-flex items-center justify-center gap-2 rounded-[14px] font-semibold
         text-white bg-primary hover:bg-primary-hover shadow transition-colors"
  :class="sz"
>
  <span>{{ label || 'Saiba mais' }}</span>
  <NuxtIcon v-if="icon" :name="icon" />
</NuxtLink>
</template>
