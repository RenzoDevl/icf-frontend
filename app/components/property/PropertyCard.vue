<script setup lang="ts">
type Kpi = { icon: string; text: string | number }

const props = withDefaults(defineProps<{
  titulo: string
  tipo: string
  local: string
  preco: string | number
  capa: string
  tag?: string         
  kpis?: Kpi[]         
  href?: string        
}>(), {
  kpis: () => []
})

const precoFormatado = computed(() => {
  if (typeof props.preco === 'number') {
    return props.preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    })
  }
  return props.preco
})

const isExternal = computed(() => !!props.href && !props.href.startsWith('/'))
</script>

<template>
  <article
    class="group flex flex-col h-full rounded-2xl border border-black/5 bg-white shadow-md hover:shadow-lg transition-all duration-200"
  >
    <div class="relative overflow-hidden rounded-2xl rounded-b-none aspect-[16/10] bg-slate-200/60">
      <img
        :src="capa"
        :alt="titulo"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <span
        v-if="tag"
        class="absolute left-3 top-3 inline-flex px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Corpo -->
    <div class="flex-1 p-5">
      <div class="text-slate-500 text-sm">
        {{ tipo }} • {{ local }}
      </div>

      <h3 class="mt-1 font-semibold text-slate-900 leading-snug">
        {{ titulo }}
      </h3>

      <p class="mt-2 font-extrabold text-primary text-lg">
        {{ precoFormatado }}
      </p>

      <ul v-if="kpis.length" class="mt-3 flex flex-wrap gap-4 text-slate-600 text-sm">
        <li v-for="(k, i) in kpis" :key="i" class="inline-flex items-center gap-1">
          <NuxtIcon :name="k.icon" class="text-slate-400" />
          <span>{{ k.text }}</span>
        </li>
      </ul>

      <div class="mt-4">
        <UiButton
          v-if="href"
          :href="href"
          variant="outline"
          class="w-full"
          :target="isExternal ? '_blank' : undefined"
          :rel="isExternal ? 'noopener' : undefined"
        >
          Ver Detalhes
        </UiButton>
      </div>
    </div>
  </article>
</template>
