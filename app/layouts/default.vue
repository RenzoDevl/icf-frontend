<!-- app/layouts/default.vue -->
<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<template>
  <div class="min-h-dvh flex flex-col bg-brand-black text-slate-100">
    <AppHeader
    />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter creci="Creci-PI 00000" />
  </div>
</template>
