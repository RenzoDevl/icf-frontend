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
    <!-- Ícone em vermelho -->
    <div
      class="inline-flex h-9 w-9 items-center justify-center rounded-xl
             bg-red-50 text-red-600 ring-1 ring-red-100/80"
      aria-hidden="true"
    >
      <Icon :name="icon || 'ph:check-circle'" class="text-[18px]" />
    </div>

    <p class="font-medium">{{ text }}</p>
  </div>
</template>
