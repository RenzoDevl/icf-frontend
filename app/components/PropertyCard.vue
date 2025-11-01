<!-- components/PropertyCard.vue -->
<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: null
  },
  href: {
    type: String,
    default: ''
  }
})

const norm = computed(() => {
  const it = props.item || {}
  const id = it.id ?? it.imovelId ?? null

  return {
    id,
    titulo: it.titulo || '',
    tipo: it.tipo || '',
    local: it.bairro || it.endereco?.bairro || it.endereco?.cidade || '',
    preco: it.preco ?? 0,
    capa: it.capa || '',
    href: props.href || (id ? `/imoveis/${id}` : '')
  }
})

const imgSrc = ref(norm.value.capa || '')
watch(norm, () => {
  imgSrc.value = norm.value.capa || ''
})

function onImgError () {
  imgSrc.value = ''
}

const brl = (v) =>
  Number(v || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  })
</script>

<template>
  <article
    class="group h-full flex flex-col bg-white rounded-2xl overflow-hidden
           border border-black/10 transition-all duration-300
           hover:border-black/40 hover:shadow-[0_12px_30px_rgba(0,0,0,.08)]"
  >
    <div v-if="imgSrc" class="relative bg-slate-100 aspect-[16/10] overflow-hidden">
      <img
        :src="imgSrc"
        :alt="norm.titulo"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        @error="onImgError"
      />
    </div>
    <div v-else class="h-3"></div>

    <div class="flex-1 p-4 md:p-5">
      <div class="flex flex-wrap items-center gap-3 text-slate-600 text-sm">
        <span v-if="norm.tipo" class="inline-flex items-center gap-1.5">
          <Icon name="ph:house-line" class="text-black" />
          {{ norm.tipo }}
        </span>
        <span v-if="norm.local" class="inline-flex items-center gap-1.5">
          <Icon name="ph:map-pin" class="text-black" />
          {{ norm.local }}
        </span>
      </div>

      <h3 class="mt-2 font-bold text-slate-900 leading-snug">
        {{ norm.titulo || 'Imóvel' }}
      </h3>

      <p v-if="norm.preco" class="mt-2 text-[1.25rem] md:text-[1.35rem] font-extrabold text-black">
        {{ brl(norm.preco) }}
      </p>
    </div>

    <div v-if="norm.href" class="p-4 md:p-5 pt-0">
      <NuxtLink
        :to="norm.href"
        class="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline"
      >
        Ver detalhes
        <Icon name="ph:arrow-right" />
      </NuxtLink>
    </div>
  </article>
</template>
