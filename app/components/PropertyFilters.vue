<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'search', payload: {
    finalidade: string
    tipo: string
    min: number | null
    max: number | null
    cidade: string
  }): void
}>()

// Opções
const finalidades = [
  { label: 'Todas', value: 'todas' },
  { label: 'Comprar', value: 'comprar' },
  { label: 'Alugar', value: 'alugar' }
]
const tipos = [
  { label: 'Todos', value: 'todos' },
  { label: 'Casa', value: 'casa' },
  { label: 'Apartamento', value: 'apartamento' },
  { label: 'Sala Comercial', value: 'sala-comercial' }
]

// Modelos
const finalidade = ref('todas')
const tipo = ref('todos')
const min = ref<string>('0')
const max = ref<string>('0')
const cidade = ref('')

// helpers
const toNum = (v: string) => {
  const n = Number((v || '0').toString().replace(/\D/g, ''))
  return Number.isFinite(n) ? n : 0
}

const doSearch = () => {
  emit('search', {
    finalidade: finalidade.value,
    tipo: tipo.value,
    min: toNum(min.value) || null,
    max: toNum(max.value) || null,
    cidade: cidade.value.trim()
  })
}
</script>

<template>
  <div class="rounded-2xl border border-black/5 bg-white/80 backdrop-blur-sm shadow-sm p-4 md:p-5">
    <div class="grid md:grid-cols-5 gap-3 md:gap-4 items-end">
      <div>
        <label class="text-sm font-medium text-slate-700">Finalidade</label>
        <div class="relative mt-1">
          <Icon name="ph:flag-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select v-model="finalidade"
            class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40">
            <option v-for="opt in finalidades" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium text-slate-700">Tipo</label>
        <div class="relative mt-1">
          <Icon name="ph:buildings-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select v-model="tipo"
            class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40">
            <option v-for="opt in tipos" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
          <Icon name="ph:caret-down-bold" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium text-slate-700">Preço Mínimo</label>
        <div class="relative mt-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 select-none">R$</span>
          <input v-model="min" inputmode="numeric"
            class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
            placeholder="0" />
        </div>
      </div>

      <div>
        <label class="text-sm font-medium text-slate-700">Preço Máximo</label>
        <div class="relative mt-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 select-none">R$</span>
          <input v-model="max" inputmode="numeric"
            class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
            placeholder="0" />
        </div>
      </div>

      <div class="md:col-span-1">
        <label class="text-sm font-medium text-slate-700">Cidade/Bairro</label>
        <div class="flex gap-2 mt-1">
          <div class="relative flex-1">
            <Icon name="ph:map-pin-duotone" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input v-model="cidade" placeholder="Ex: Teresina"
              class="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800
                     focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40" />
          </div>

          <button @click="doSearch"
            class="shrink-0 inline-flex items-center gap-2 rounded-xl px-3.5 md:px-4 py-2.5
                   bg-blue-600 text-white font-semibold hover:bg-blue-700
                   transition shadow-sm active:scale-[.98]">
            <Icon name="ph:magnifying-glass-bold" class="text-white" />
            <span class="hidden md:inline">Buscar Imóveis</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
