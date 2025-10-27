<script setup lang="ts">
type Kpi = { icon: string; text: string } | string | number

const props = defineProps<{
  item?: {
    titulo: string
    tipo: string
    bairro: string
    preco: number | string
    capa: string
    status?: string
    area?: number
    quartos?: number
    banheiros?: number
    vagas?: number
  } | null
  titulo?: string
  tipo?: string
  local?: string
  preco?: number | string
  capa?: string
  tag?: string
  href?: string
  kpis?: Kpi[]
}>()

const norm = computed(() => {
  const it = props.item
  const preco = it?.preco ?? props.preco ?? 0

  const kpis =
    props.kpis ??
    (it
      ? ([
          { icon: 'mdi:ruler-square', text: `${it.area ?? 0}m²` },
          { icon: 'mdi:bed-outline', text: it.quartos ?? 0 },
          { icon: 'mdi:shower', text: it.banheiros ?? 0 },
          { icon: 'mdi:car-outline', text: it.vagas ?? 0 }
        ] as Kpi[])
      : [])

  return {
    titulo: it?.titulo ?? props.titulo ?? '',
    tipo: it?.tipo ?? props.tipo ?? '',
    local: it?.bairro ?? props.local ?? '',
    preco,
    capa: it?.capa ?? props.capa ?? '',
    href: props.href ?? '#',
    kpis
  }
})

const brl = (v: number | string) =>
  Number(v || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  })

const fallback =
  'https://images.unsplash.com/photo-1560185008-b033106af2b2?q=80&w=1400&auto=format&fit=crop'

const imgSrc = ref(norm.value.capa || fallback)
watch(norm, () => {
  imgSrc.value = norm.value.capa || fallback
})
function onImgError() {
  imgSrc.value = fallback
}
</script>

<template>
  <article
    class="group h-full flex flex-col bg-white rounded-2xl overflow-hidden
           border border-black/20 transition-all duration-300
           hover:border-black hover:shadow-[0_12px_30px_rgba(0,0,0,.18)]"
  >
    <div class="relative bg-slate-100 aspect-[16/10] overflow-hidden">
      <img
        :src="imgSrc"
        :alt="norm.titulo"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        decoding="async"
        loading="lazy"
        @error="onImgError"
      />
    </div>

    <div class="flex-1 p-4 md:p-5">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-600 text-sm">
        <span class="inline-flex items-center gap-1.5">
          <Icon name="ph:house-line" class="text-black" />
          {{ norm.tipo }}
        </span>
        <span class="inline-flex items-center gap-1.5">
          <Icon name="ph:map-pin" class="text-black" />
          {{ norm.local }}
        </span>
      </div>

      <h3 class="mt-2 font-bold text-slate-900 leading-snug">
        {{ norm.titulo }}
      </h3>

      <p class="mt-2 text-[1.25rem] md:text-[1.35rem] font-extrabold text-black">
        {{ brl(norm.preco) }}
      </p>

      <ul
        v-if="norm.kpis?.length"
        class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-slate-600 text-[0.95rem]"
      >
        <li v-for="(k, i) in norm.kpis" :key="i" class="inline-flex items-center gap-1.5">
          <Icon v-if="(k as any).icon" :name="(k as any).icon" class="text-black" />
          <span>{{ (k as any).text ?? k }}</span>
        </li>
      </ul>
    </div>

    <div class="p-4 md:p-5 pt-0">
      <!-- Botão outline PRETO sem preencher no hover -->
      <UiButton
        :href="norm.href"
        variant="outline"
        class="w-full border-black text-black
               hover:bg-transparent hover:text-black hover:border-black
               focus-visible:ring-2 focus-visible:ring-black/15"
      >
        Ver Detalhes
      </UiButton>
    </div>
  </article>
</template>
