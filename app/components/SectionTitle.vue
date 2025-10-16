<script setup>
const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  center: { type: Boolean, default: true }
})
</script>

<template>
  <div :class="['mx-auto max-w-[1120px] px-4 sm:px-6', center ? 'text-center' : '']">
    <h2 class="font-black tracking-[-.02em] text-[clamp(2rem,4vw,3rem)] text-slate-900">{{ title }}</h2>
    <p v-if="subtitle" class="text-slate-600 mt-2">{{ subtitle }}</p>
  </div>
</template>
