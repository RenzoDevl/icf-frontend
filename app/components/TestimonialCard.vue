<script setup>
const props = defineProps({
  quote: { type: String, required: true },
  author: { type: String, required: true }
})
</script>

<template>
  <figure class="bg-white rounded-2xl border border-black/5 shadow-md p-6">
    <blockquote class="text-slate-900">“{{ quote }}”</blockquote>
    <figcaption class="text-slate-600 mt-2">— {{ author }}</figcaption>
  </figure>
</template>
