<script setup lang="ts">
useHead({ title: 'Todos os Imóveis — ICF' })

// estado dos filtros (pode ligar no seu fetch real)
const finalidade = ref<'Todas'|'Comprar'|'Alugar'>('Todas')
const tipo = ref<'Todos'|'Casa'|'Apartamento'|'Sala Comercial'>('Todos')
const precoMin = ref(0)
const precoMax = ref(0)
const cidade = ref('')

const search = () => {
  // troque por sua busca real
  console.log('buscar', {
    finalidade: finalidade.value,
    tipo: tipo.value,
    precoMin: precoMin.value,
    precoMax: precoMax.value,
    cidade: cidade.value,
  })
}
</script>

<template>
  <div>
    <AppHeader :whatsapp-url="'https://wa.me/5586999999999?text=Olá!'" />

    <section class="bg-[linear-gradient(180deg,#eef3ff,#f7f9ff)] border-b border-slate-200/60">
      <div class="container mx-auto max-w-[1120px] px-4 sm:px-6 py-14">
        <UiReveal anim="fade-down">
          <h1 class="text-3xl md:text-4xl font-black tracking-[-.015em] text-slate-900">
            Todos os Imóveis
          </h1>
        </UiReveal>
        <UiReveal anim="fade-up" :delay="80">
          <p class="mt-2 text-slate-600">
            Navegue por nosso catálogo completo de imóveis disponíveis
          </p>
        </UiReveal>
      </div>
    </section>

    <section class="py-6">
      <div class="container mx-auto max-w-[1120px] px-4 sm:px-6">
        <FiltersBar
          v-model:finalidade="finalidade"
          v-model:tipo="tipo"
          v-model:precoMin="precoMin"
          v-model:precoMax="precoMax"
          v-model:cidade="cidade"
          @search="search"
        />
      </div>
    </section>

    <section class="pb-16">
      <div class="container mx-auto max-w-[1120px] px-4 sm:px-6">
        <p class="text-slate-600 mb-4">
          Encontrados <strong>6</strong> imóveis
        </p>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UiReveal v-for="n in 6" :key="n" anim="fade-up" :delay="n * 60">
            <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
              <div class="aspect-[16/9] bg-slate-100"></div>
              <div class="p-4">
                <div class="text-xs text-slate-500 mb-1">Apartamento • Parque Piauí</div>
                <h3 class="font-semibold text-slate-900">Título de Imóvel de Demonstração</h3>
                <div class="mt-3 text-blue-600 font-bold">R$ 450.000</div>
                <button class="mt-4 inline-flex w-full justify-center rounded-[14px] border border-blue-200/60 h-11 text-blue-700 hover:bg-blue-50 transition">
                  Ver Detalhes
                </button>
              </div>
            </div>
          </UiReveal>
        </div>
      </div>
    </section>

    <AppFooter creci="Creci-PI 00000" />
  </div>
</template>
