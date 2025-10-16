<script setup lang="ts">
const props = defineProps<{ cols?: 1|2|3|4 }>()
const map = {
  1:'grid-cols-1',
  2:'grid-cols-1 md:grid-cols-2',
  3:'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4:'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
}
</script>

<template>
  <div :class="['grid gap-5 md:gap-6', map[cols ?? 3]]">
    <slot />
  </div>
</template>
