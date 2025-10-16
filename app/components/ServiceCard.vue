<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  text: string
}>()
</script>

<template>
  <article
    class="h-full rounded-2xl border border-black/5 bg-white shadow-sm
           transition-all duration-200
           hover:shadow-lg hover:border-primary/40"
  >
    <div class="p-5 flex items-start gap-4">
      <div
        class="h-12 w-12 shrink-0 rounded-2xl bg-primary/10
               flex items-center justify-center
               transition-colors duration-200
               group-hover:bg-primary/15"
      >
        <Icon :name="icon" class="text-primary text-2xl" />
      </div>

      <div>
        <h3 class="font-semibold text-slate-900">{{ title }}</h3>
        <p class="mt-1 text-slate-600">{{ text }}</p>
      </div>
    </div>
  </article>
</template>
