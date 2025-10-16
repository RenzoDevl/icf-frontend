<script setup lang="ts">
const props = defineProps<{
  icon?: string
  text: string
}>()
</script>

<template>
  <div
    class="flex items-center gap-3 rounded-2xl bg-white border border-slate-200/80
           py-4 px-4 sm:px-5 text-slate-700 shadow-sm"
  >
    <div
      class="inline-flex h-9 w-9 items-center justify-center rounded-xl
             bg-blue-50 text-blue-600"
    >
      <Icon :name="icon || 'ph:check-circle'" class="text-[18px]" />
    </div>
    <p class="font-medium">{{ text }}</p>
  </div>
</template>
