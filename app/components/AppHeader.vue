<!-- components/AppHeader.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRouter } from '#app'

const props = defineProps({
  brand: { type: String, default: 'Carlos Fernandes Imóveis' },
  subtitle: { type: String, default: '' },
  whatsappUrl: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Falar no WhatsApp' }
})

const router = useRouter()
const open = ref(false)
const scrolled = ref(false)

const links = computed(() => ([
  { to: '/',        label: 'Início' },
  { to: '/imoveis', label: 'Imóveis' },
  { to: '/sobre',   label: 'Sobre' },
  { to: '/contato', label: 'Contato' }
]))

const onScroll = () => {
  scrolled.value = window.scrollY > 2
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  router.afterEach(() => {
    // fecha menu quando navegar
    open.value = false
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

function toggleMenu () {
  open.value = !open.value
}
function closeMenu () {
  open.value = false
}
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 text-slate-200 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60',
      scrolled ? 'shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]' : ''
    ]"
  >
    <nav class="relative w-full px-2 md:px-3 h-24 md:h-32 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0 ml-0" aria-label="Ir para o início">
        <span class="relative block shrink-0 overflow-visible h-[clamp(300px,18vw,200px)] w-[clamp(260px,36vw,720px)]">
          <img
            src="../assets/img/logo.png"
            alt="ICF"
            class="absolute inset-0 h-full w-70 object-contain select-none pointer-events-none"
            decoding="async"
            draggable="false"
          />
        </span>
        <div class="leading-5 hidden lg:block">
          <strong class="text-slate-100 text-base xl:text-lg">{{ props.brand }}</strong>
          <div class="text-[12px] xl:text-[13px] text-slate-400 -mt-0.5">{{ props.subtitle }}</div>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-4 ml-auto">
        <!-- Desktop menu -->
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

        <!-- CTA Desktop -->
        <a
          v-if="props.whatsappUrl"
          :href="props.whatsappUrl"
          class="hidden md:inline-flex items-center justify-center rounded-[14px] px-4 py-2 font-semibold text-black bg-emerald-400 hover:bg-emerald-300 shadow-sm transition-colors"
        >
          {{ props.ctaLabel }}
        </a>

        <!-- Botão mobile -->
        <button
          class="md:hidden inline-flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-50 h-11 w-11"
          @click="toggleMenu"
          :aria-expanded="open"
          aria-label="Abrir menu"
        >
          <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- MOBILE OVERLAY: FIXO, SOBREPOE, NÃO EMPURRA NADA -->
    <transition name="fade-menu">
      <div
        v-if="open"
        class="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm md:hidden"
        @click.self="closeMenu"
      >
        <!-- painel -->
        <div
          class="absolute top-0 left-0 right-0 rounded-b-3xl bg-[#0b0b0c]/95 border-b border-white/5
                 pt-4 pb-6 px-4 space-y-3 shadow-2xl translate-y-0"
        >
          <div class="flex items-center justify-between gap-2 mb-2">
            <p class="text-sm font-medium text-slate-100/80">Navegação</p>
            <button
              class="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              @click="closeMenu"
              aria-label="Fechar menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-2">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="block w-full rounded-xl px-3 py-2.5 bg-white/0 text-slate-100 hover:bg-white/5 transition"
              active-class="bg-white/10 text-white"
              @click="closeMenu"
            >
              {{ l.label }}
            </NuxtLink>
          </nav>

          <a
            v-if="props.whatsappUrl"
            :href="props.whatsappUrl"
            class="inline-flex w-full items-center justify-center rounded-xl px-3 py-2.5 bg-emerald-400 text-black font-semibold mt-2"
            @click="closeMenu"
          >
            {{ props.ctaLabel }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity .18s ease;
}
.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
}
</style>
