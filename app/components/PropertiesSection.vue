<script setup lang="ts">
type Item = {
  id: number|string
  tipo: string
  bairro: string
  titulo: string
  preco: number
  area: number
  quartos: number
  banheiros: number
  vagas: number
  status: 'COMPRAR' | 'ALUGAR'
  capa: string
}

const props = defineProps<{
  title?: string
  subtitle?: string
  items: Item[]

  whatsappBuilder?: (titulo: string) => string
  showCta?: boolean
  ctaHref?: string
  ctaLabel?: string
}>()

const {
  title = 'Imóveis em Destaque',
  subtitle = 'Confira nossa seleção especial de imóveis premium',
  items,
  whatsappBuilder = () => '#',
  showCta = true,
  ctaHref = '/imoveis',
  ctaLabel = 'Ver Todos os Imóveis'
} = props
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="container max-w-[1120px] px-4 sm:px-6 mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight">
          {{ title }}
        </h2>
        <p class="mt-2 text-slate-500">{{ subtitle }}</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PropertyCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          :whatsapp-href="whatsappBuilder(`Olá! Tenho interesse no imóvel: ${item.titulo}.`)"
          class="animate-fade-up"
        />
      </div>

      <div v-if="showCta" class="flex justify-center mt-10">
        <NuxtLink
          :to="ctaHref"
          class="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm animate-scale-in"
        >
          <span>{{ ctaLabel }}</span>
          <Icon name="ph:arrow-right" class="text-white text-xl" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
