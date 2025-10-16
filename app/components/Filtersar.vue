<script setup lang="ts">
type Finalidade = 'Todas' | 'Comprar' | 'Alugar'
type Tipo = 'Todos' | 'Casa' | 'Apartamento' | 'Sala Comercial'

const props = defineProps<{
  finalidade: Finalidade
  tipo: Tipo
  precoMin: number
  precoMax: number
  cidade: string
}>()

const emit = defineEmits<{
  (e:'update:finalidade', v:Finalidade):void
  (e:'update:tipo', v:Tipo):void
  (e:'update:precoMin', v:number):void
  (e:'update:precoMax', v:number):void
  (e:'update:cidade', v:string):void
  (e:'search'):void
}>()

const fins: Finalidade[] = ['Todas','Comprar','Alugar']
const tipos: Tipo[] = ['Todos','Casa','Apartamento','Sala Comercial']

const fmt = (v:number) => `R$ ${Intl.NumberFormat('pt-BR').format(v)}`
</script>

<template>
  <div
    class="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 md:p-5 shadow-sm"
  >
    <div class="grid gap-3 md:grid-cols-12">
      <label class="md:col-span-2">
        <span class="block text-xs font-medium text-slate-500 mb-1">
          Finalidade
        </span>
        <div class="relative">
          <select
            class="w-full rounded-[14px] border-slate-200 bg-white pl-10 pr-8 h-11 outline-none ring-0 focus:border-blue-500"
            :value="props.finalidade"
            @change="emit('update:finalidade', ($event.target as HTMLSelectElement).value as Finalidade)"
          >
            <option v-for="f in fins" :key="f" :value="f">{{ f }}</option>
          </select>
          <Icon name="mdi:flag-outline" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Icon name="mdi:chevron-down" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </label>

      <label class="md:col-span-3">
        <span class="block text-xs font-medium text-slate-500 mb-1">Tipo</span>
        <div class="relative">
          <select
            class="w-full rounded-[14px] border-slate-200 bg-white pl-10 pr-8 h-11 outline-none focus:border-blue-500"
            :value="props.tipo"
            @change="emit('update:tipo', ($event.target as HTMLSelectElement).value as Tipo)"
          >
            <option v-for="t in tipos" :key="t" :value="t">{{ t }}</option>
          </select>
          <Icon name="mdi:home-outline" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Icon name="mdi:chevron-down" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </label>

      <label class="md:col-span-2">
        <span class="block text-xs font-medium text-slate-500 mb-1">Preço Mínimo</span>
        <div class="relative">
          <input
            type="number"
            min="0"
            class="w-full rounded-[14px] border-slate-200 bg-white pl-10 pr-3 h-11 outline-none focus:border-blue-500"
            :value="props.precoMin"
            @input="emit('update:precoMin', +($event.target as HTMLInputElement).value || 0)"
          />
          <Icon name="ph:currency-dollar" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{{ fmt(precoMin) }}</span>
        </div>
      </label>

      <label class="md:col-span-2">
        <span class="block text-xs font-medium text-slate-500 mb-1">Preço Máximo</span>
        <div class="relative">
          <input
            type="number"
            min="0"
            class="w-full rounded-[14px] border-slate-200 bg-white pl-10 pr-3 h-11 outline-none focus:border-blue-500"
            :value="props.precoMax"
            @input="emit('update:precoMax', +($event.target as HTMLInputElement).value || 0)"
          />
          <Icon name="ph:currency-dollar" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{{ fmt(precoMax) }}</span>
        </div>
      </label>

      <label class="md:col-span-2">
        <span class="block text-xs font-medium text-slate-500 mb-1">Cidade/Bairro</span>
        <div class="relative">
          <input
            type="text"
            placeholder="Ex: Teresina"
            class="w-full rounded-[14px] border-slate-200 bg-white pl-10 pr-3 h-11 outline-none focus:border-blue-500"
            :value="props.cidade"
            @input="emit('update:cidade', ($event.target as HTMLInputElement).value)"
          />
          <Icon name="mdi:map-marker-outline" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </label>

      <div class="md:col-span-1 flex items-end">
        <button
          class="w-full inline-flex items-center justify-center gap-2 rounded-[14px] h-11 px-4 font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[.98] transition"
          @click="emit('search')"
        >
          <Icon name="mdi:magnify" size="18" />
          Buscar Imóveis
        </button>
      </div>
    </div>
  </div>
</template>
