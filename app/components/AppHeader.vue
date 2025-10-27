<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from '#app'

defineProps<{
  brand?: string
  subtitle?: string
  whatsappUrl?: string
  ctaLabel?: string
}>()

const router = useRouter()
const open = ref(false)
const scrolled = ref(false)

const onScroll = () => { scrolled.value = window.scrollY > 2 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  router.afterEach(() => { open.value = false })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const links = computed(() => ([
  { to: '/',        label: 'Início' },
  { to: '/imoveis', label: 'Imóveis' },
  { to: '/sobre',   label: 'Sobre' },
  { to: '/contato', label: 'Contato' }
]))
</script>

<template>
  <header
    :class="[
      // topo preto translúcido, sem borda
      'sticky top-0 z-50 text-slate-200 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]',
      scrolled ? 'shadow-sm' : ''
    ]"
  >
    <nav class="relative w-full px-2 md:px-3 h-24 md:h-32 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0 ml-0" aria-label="Ir para o início">
        <span class="relative block shrink-0 overflow-visible h-[clamp(300px,18vw,200px)] w-[clamp(260px,36vw,720px)]">
          <img src="../assets/img/logo.png" alt="ICF" class="absolute inset-0 h-full w-70 object-contain select-none pointer-events-none" decoding="async" draggable="false" />
        </span>
        <div class="leading-5 hidden lg:block">
          <strong class="text-slate-100 text-base xl:text-lg">{{ brand }}</strong>
          <div class="text-[12px] xl:text-[13px] text-slate-400 -mt-0.5">{{ subtitle }}</div>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-4 ml-auto">
        <!-- Botão menu mobile -->
        <button
          class="md:hidden inline-flex items-center justify-center rounded-xl border border-neutral-800/70 p-2.5 text-slate-200 hover:bg-white/5"
          @click="open = !open"
          :aria-expanded="open"
          aria-controls="primary-menu"
          aria-label="Abrir menu"
        >
          <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <!-- Menu desktop -->
        <ul class="hidden md:flex items-center gap-1 text-slate-300">
          <li v-for="l in links" :key="l.to">
            <NuxtLink
              :to="l.to"
              class="px-3 py-2 rounded-full hover:bg-white/10 hover:text-slate-100 transition-colors"
              active-class="text-white bg-white/10"
            >
              {{ l.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- CTA WhatsApp (desktop) -->
        <a
          v-if="whatsappUrl"
          :href="whatsappUrl"
          class="hidden md:inline-flex items-center justify-center rounded-[14px] px-4 py-2 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 shadow-sm transition-colors"
        >
          {{ ctaLabel || 'Falar no WhatsApp' }}
        </a>
      </div>

      <!-- overlay para fechar o menu ao clicar fora (mobile) -->
      <div
        v-if="open"
        class="md:hidden fixed inset-0 z-40 bg-black/40"
        @click="open = false"
      />
    </nav>

    <!-- Menu mobile sem borda superior -->
    <Transition name="menu-slide">
      <div
        v-if="open"
        id="primary-menu"
        class="md:hidden relative z-50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70"
      >
        <div class="px-4 md:px-6 py-3 space-y-2">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="block px-3 py-2 rounded-xl text-slate-200 hover:bg-white/10 hover:text-slate-100"
            active-class="text-white bg-white/10"
          >
            {{ l.label }}
          </NuxtLink>

          <a
            v-if="whatsappUrl"
            :href="whatsappUrl"
            class="mt-2 inline-flex w-full items-center justify-center rounded-[14px] px-4 py-2 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 shadow-sm"
          >
            {{ ctaLabel || 'Falar no WhatsApp' }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-slide-enter-active,
.menu-slide-leave-active { transition: all .22s ease; }
.menu-slide-enter-from,
.menu-slide-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
