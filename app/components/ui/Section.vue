<script setup lang="ts">
const props = defineProps<{
  id?: string
  title?: string
  subtitle?: string
  pad?: 'sm'|'md'|'lg'
}>()
const pad = { sm:'py-8 md:py-12', md:'py-12 md:py-16', lg:'py-16 md:py-24' }[props.pad ?? 'md']
</script>

<template>
  <section :id="id" class="scroll-mt-24">
    <div class="container">
      <div :class="pad">
        <header v-if="title || subtitle" class="mb-6 md:mb-10 text-center">
          <h2 v-if="title" class="font-extrabold leading-tight
             text-2xl sm:text-3xl md:text-4xl">{{ title }}</h2>
          <p v-if="subtitle" class="mt-2 text-slate-600 max-w-[70ch] mx-auto">
            {{ subtitle }}
          </p>
        </header>
        <slot />
      </div>
    </div>
  </section>
</template>
