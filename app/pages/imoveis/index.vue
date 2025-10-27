<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from '#imports'
import { useImoveis, type Imovel } from '@/composables/useImoveis'

useHead({ title: 'Todos os Imóveis — ICF' })

const { list } = useImoveis()
const route = useRoute()

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const itens = computed<Imovel[]>(() => list.value)

/* ========= Reveal on scroll ========= */
let io: IntersectionObserver | null = null

onMounted(() => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('inview')
          io?.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12 }
  )
  targets.forEach((el) => io?.observe(el))
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})

/* ========= Scroll até card referenciado ========= */
onMounted(async () => {
  const refId = Number(route.query.ref)
  if (!refId) return
  await nextTick()
  const el = document.getElementById(`card-${refId}`)
  if (!el) return
  const headerH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h')
    ) || 96
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerH - 16
  window.scrollTo({ top, behavior: 'smooth' })
  el.classList.add(
    'ring-2',
    'ring-[var(--primary)]',
    'ring-offset-2',
    'ring-offset-[var(--brand-surface)]'
  )
  setTimeout(
    () =>
      el.classList.remove(
        'ring-2',
        'ring-[var(--primary)]',
        'ring-offset-2',
        'ring-offset-[var(--brand-surface)]'
      ),
    1600
  )
})
</script>

<template>
  <!-- Cabeçalho -->
  <section class="py-14 md:py-16">
    <div
      class="mx-auto max-w-[1120px] px-4 sm:px-6 text-center reveal anim-down"
      style="--d:.0s"
    >
      <h1 class="text-4xl md:text-5xl font-black tracking-[-.02em] text-slate-900">
        Imóveis
      </h1>
      <p class="mt-3 text-slate-600">
        Confira nossa seleção de imóveis 
      </p>
    </div>
  </section>

  <!-- Cards -->
  <section class="pb-16">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6">
      <p class="text-slate-600 reveal anim-fade" style="--d:.05s">
        Encontrados <strong>{{ itens.length }}</strong> imóveis
      </p>

      <div class="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        <article
          v-for="(i, idx) in itens"
          :key="i.id"
          :id="`card-${i.id}`"
          :style="{ '--d': (idx * 0.06).toFixed(2) + 's' }"
          class="reveal anim-up card flex flex-col rounded-[22px] border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <!-- Capa -->
          <div class="overflow-hidden">
            <img
              :src="i.capa"
              :alt="i.titulo"
              class="w-full aspect-[16/9] object-cover transition duration-500 hover:scale-[1.03]"
            />
          </div>

          <!-- Corpo -->
          <div class="p-5 flex flex-col flex-1">
            <!-- Trilha: 1 linha fixa, sem quebra -->
            <div class="meta-row text-sm text-slate-600">
              <span class="meta-chunk">
                <Icon name="ph:house-line" class="ic" />
                <span class="truncate">{{ i.tipo }}</span>
              </span>

              <span class="sep">•</span>

              <span class="meta-chunk grow max-w-[60%]">
                <Icon name="ph:map-pin" class="ic" />
                <!-- i.bairro já inclui ' • Teresina' em alguns casos -->
                <span class="truncate">{{ i.bairro }}</span>
              </span>
            </div>

            <!-- Título: clamp 2 linhas (altura fixa) -->
            <h3 class="title-clamp mt-2 font-semibold text-slate-900 leading-snug">
              {{ i.titulo }}
            </h3>

            <!-- Preço -->
            <div
              class="mt-3 text-primary font-extrabold text-xl reveal anim-fade"
              :style="{ '--d': (idx * 0.06 + 0.10).toFixed(2) + 's' }"
            >
              {{ fmtBRL(i.preco) }}
            </div>

            <!-- Divisor -->
            <div class="mt-4 border-t border-slate-200/70"></div>

            <!-- Specs (altura mínima + ícones fixos) -->
            <div class="mt-3 specs-row">
              <span class="spec">
                <Icon name="ph:ruler" class="ic" />
                <span>{{ i.area }}m²</span>
              </span>
              <span class="spec">
                <Icon name="ph:bed" class="ic" />
                <span>{{ i.quartos }}</span>
              </span>
              <span class="spec">
                <Icon name="ph:shower" class="ic" />
                <span>{{ i.banheiros }}</span>
              </span>
              <span class="spec">
                <Icon name="ph:car" class="ic" />
                <span>{{ i.vagas }}</span>
              </span>
            </div>

            <!-- Botão -->
            <NuxtLink
              :to="{ name: 'imoveis-id-detalhes', params: { id: i.id } }"
              class="mt-auto inline-flex w-full items-center justify-center h-11
                     rounded-[999px] border border-slate-300
                     text-[15px] font-semibold text-primary
                     hover:border-[var(--primary)] hover:bg-primary hover:text-white
                     transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Ver Detalhes
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
[id^="card-"] { scroll-margin-top: var(--header-h); }
.card { min-height: 100%; }

/* ===== Tamanho e baseline dos ícones (TODOS iguais) ===== */
.ic {
  font-size: 18px;
  width: 18px; height: 18px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #64748b; /* slate-500 */
}

/* ===== Meta (tipo • local) — 1 linha fixa, sem wrap ===== */
.meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 20px;     /* 1 linha (line-height ~20px) */
  flex-wrap: nowrap;
  overflow: hidden;
}
.meta-chunk {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  max-width: 40%;
}
.meta-chunk.grow { max-width: 60%; }
.meta-row .sep { color: #94a3b8; flex: 0 0 auto; } /* slate-400 */

/* ===== Título — clamp 2 linhas com altura fixa ===== */
.title-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* 2 linhas de ~1.25rem line-height (leading-snug ~1.375) */
  min-height: calc(1.25rem * 1.375 * 2); /* ~3.44rem */
}

/* ===== Specs — altura mínima consistente ===== */
.specs-row {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 24px;     /* fixa a faixa para todos os cards */
  color: #334155;       /* slate-700 */
  font-size: 0.875rem;  /* text-sm */
}
.spec {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
</style>
