<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  whatsappUrl: { type: String, required: true },
  brand: { type: String, default: 'ICF' },
  subtitle: { type: String, default: 'Imobiliária Carlos Fernandes' },
  ctaLabel: { type: String, default: 'Fale Conosco' }
})

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#imoveis', label: 'Imóveis' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' }
]

const open = ref(false)
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 2 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b',
      scrolled ? 'shadow-sm border-black/10' : 'border-black/10'
    ]"
  >
    <nav class="w-full px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4">
      <a href="#inicio" class="flex items-center gap-3 shrink-0" aria-label="Ir para o início">
        <span class="relative block h-10 w-10 md:h-12 md:w-12 overflow-visible">
          <img
            src="../assets/img/logo.png"
            alt="ICF"
            class="absolute inset-0 block h-full w-full object-contain
                   scale-[1.85] md:scale-[2.05] origin-center
                   select-none pointer-events-none"
            draggable="false"
            decoding="async"
          />
        </span>

        <div class="leading-5">
          <strong class="text-slate-900 text-sm md:text-lg">{{ brand }}</strong>
          <div class="text-[11px] md:text-[13px] text-slate-500 -mt-0.5">{{ subtitle }}</div>
        </div>
      </a>

      <div class="flex items-center gap-4 ml-auto">
        <button
          class="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-50"
          @click="open = !open"
          :aria-expanded="open"
          aria-controls="primary-menu"
          aria-label="Abrir menu"
        >
          <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul class="hidden md:flex items-center gap-1 text-slate-600">
          <li v-for="l in links" :key="l.href">
            <a
              :href="l.href"
              class="px-3 py-2 rounded-full hover:bg-indigo-50 hover:text-slate-900 transition-colors"
            >{{ l.label }}</a>
          </li>
        </ul>

        <a
          :href="whatsappUrl"
          class="hidden md:inline-flex items-center justify-center rounded-[14px] px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </nav>

    <div id="primary-menu" class="md:hidden border-t border-slate-200" v-show="open">
      <div class="px-4 md:px-6 py-3 space-y-2">
        <a
          v-for="l in links"
          :key="l.href"
          :href="l.href"
          class="block px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50"
          @click="open = false"
        >{{ l.label }}</a>

        <a
          :href="whatsappUrl"
          class="mt-2 inline-flex w-full items-center justify-center rounded-[14px] px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          @click="open = false"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </header>
</template>
