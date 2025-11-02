<!-- components/PropertyCard.vue -->
<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  item: { type: Object, default: null },
  href: { type: String, default: '' }
})

const norm = computed(() => {
  const it = props.item || {}
  const id = it.id ?? it.imovelId ?? null
  return {
    id,
    titulo: it.titulo || 'Imóvel',
    tipo: it.tipo || it.type || '',
    local: it.bairro || it.bairroLabel || it.cidadeLabel || it.endereco?.bairro || it.endereco?.cidade || '',
    preco: it.preco ?? 0,
    capa: it.capa || it.cover || '',
    href: props.href || (id ? `/imoveis/${id}` : '')
  }
})

const imgSrc = ref(norm.value.capa || '')
watch(norm, () => { imgSrc.value = norm.value.capa || '' })

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
    class="group flex flex-col bg-white rounded-2xl overflow-hidden
           border border-black/5 shadow-[0_8px_25px_rgba(15,23,42,.05)]
           transition-all duration-300 hover:border-black/10 hover:shadow-[0_12px_35px_rgba(15,23,42,.13)]"
  >
    <div class="relative aspect-[16/10] bg-slate-100 overflow-hidden">
      <img
        v-if="imgSrc"
        :src="imgSrc"
        :alt="norm.titulo"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
        loading="lazy"
        decoding="async"
        @error="onImgError"
      />
      <div v-else class="absolute inset-0 grid place-items-center text-slate-400 text-xs">
        Sem imagem
      </div>
    </div>

    <div class="flex flex-col gap-2 p-4 sm:p-5 flex-1">
      <div class="flex flex-wrap items-center gap-2 text-slate-600 text-xs sm:text-[13px] min-h-[1.5rem]">
        <span v-if="norm.tipo" class="inline-flex items-center gap-1">
          <Icon name="ph:house-line" class="text-slate-800 text-base" />
          <span class="uppercase tracking-wide text-[.66rem] font-medium">{{ norm.tipo }}</span>
        </span>
        <span v-if="norm.local" class="inline-flex items-center gap-1 text-slate-500 max-w-[58%] truncate">
          <Icon name="ph:map-pin" class="text-slate-700 text-base" />
          <span class="text-[.7rem] truncate">{{ norm.local }}</span>
        </span>
      </div>

      <h3 class="text-slate-900 font-bold text-[1rem] sm:text-[1.05rem] leading-tight line-clamp-2 min-h-[2.6rem]">
        {{ norm.titulo }}
      </h3>

      <p v-if="norm.preco" class="text-[1.25rem] sm:text-[1.35rem] font-extrabold text-slate-900 mt-1">
        {{ brl(norm.preco) }}
      </p>
      <p v-else class="text-slate-400 text-sm mt-1">
        Consulte o valor
      </p>

      <div class="mt-auto pt-3">
        <NuxtLink
          v-if="norm.href"
          :to="norm.href"
          class="inline-flex items-center gap-2 text-sm font-medium text-slate-900 hover:text-slate-950 transition"
        >
          Ver detalhes
          <Icon name="ph:arrow-right" class="text-base" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
