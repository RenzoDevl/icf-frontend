<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, navigateTo } from '#imports'
import { useImoveis, type Imovel } from '@/composables/useImoveis'

const route = useRoute()
const { list } = useImoveis()

const id = computed(() => Number(route.params.id))

const imovel = computed<Imovel | undefined>(() =>
  list.value.find(i => i.id === id.value)
)

if (!imovel.value) {
  // se não achar o imóvel, volta para a listagem
  await navigateTo({ name: 'imoveis' })
}

useHead({
  title: imovel.value
    ? `${imovel.value.titulo} — ICF`
    : 'Imóvel — ICF'
})

const fmtBRL = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// galeria simples: capa + (gallery se existir)
const gallery = computed<string[]>(() => {
  if (!imovel.value) return []
  const more = (imovel.value as any).gallery || []
  return [imovel.value.capa, ...more].filter(Boolean)
})

const whatsapp = '5586999999999'
const wpp = (titulo?: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o imóvel "${titulo || imovel.value?.titulo}" (ID ${id.value}) e gostaria de mais informações.`
  )}`

const goBack = () => navigateTo({ name: 'imoveis' })
</script>

<template>
  <div class="mx-auto max-w-[1120px] px-4 sm:px-6 py-6 md:py-8">
    <!-- voltar -->
    <button
      class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
      @click="goBack"
    >
      <Icon name="ph:arrow-left" />
      Voltar para imóveis
    </button>

    <!-- top: imagem + card contato -->
    <div class="mt-6 grid lg:grid-cols-[1fr,360px] gap-6">
      <!-- galeria -->
      <div>
        <div class="relative rounded-2xl overflow-hidden border border-slate-200 bg-white">
          <img
            :src="gallery[0]"
            :alt="imovel?.titulo"
            class="w-full object-cover"
            style="aspect-ratio: 16/9"
          />
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <img
            v-for="(src, idx) in gallery.slice(0, 6)"
            :key="idx"
            :src="src"
            class="h-28 w-44 object-cover rounded-xl border border-slate-200 bg-white"
            :alt="`Foto ${idx + 1}`"
          />
        </div>
      </div>

      <!-- contato -->
      <aside class="lg:sticky lg:top-[calc(var(--header-h)+16px)]">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 class="text-lg font-semibold text-slate-900">Interessado?</h3>
          <p class="mt-2 text-slate-600">
            Entre em contato!
          </p>

          <div class="mt-4">
            <div class="font-semibold text-slate-900">Carlos Fernandes</div>
            <div class="text-slate-500 text-sm">Responsável pelo imóvel</div>
          </div>

          <a
            :href="wpp(imovel?.titulo)"
            target="_blank"
            class="mt-5 inline-flex w-full items-center justify-center gap-2 h-11 rounded-[999px]
                   bg-primary text-white font-semibold hover:opacity-90 transition"
          >
            <Icon name="ph:chat-circle-dots" />
            Falar no WhatsApp
          </a>
        </div>
      </aside>
    </div>

    <!-- bloco infos -->
    <div
      class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm"
    >
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="text-slate-500 text-sm">
          {{ imovel?.tipo }}
        </div>

        <div class="inline-flex items-center gap-2 text-slate-600">
          <Icon name="ph:map-pin" />
          {{ imovel?.bairro }}
        </div>
      </div>

      <h1 class="mt-2 text-2xl md:text-3xl font-black tracking-[-.02em] text-slate-900">
        {{ imovel?.titulo }}
      </h1>

      <div class="mt-3 text-2xl md:text-3xl font-extrabold text-primary">
        {{ imovel ? fmtBRL(imovel.preco) : '' }}
      </div>

      <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700">
        <div class="inline-flex items-center gap-2">
          <Icon name="ph:ruler" class="text-slate-500" />
          <div>
            <div class="text-xs text-slate-500">Área</div>
            <div class="font-semibold">{{ imovel?.area }}m²</div>
          </div>
        </div>

        <div class="inline-flex items-center gap-2">
          <Icon name="ph:bed" class="text-slate-500" />
          <div>
            <div class="text-xs text-slate-500">Quartos</div>
            <div class="font-semibold">{{ imovel?.quartos }}</div>
          </div>
        </div>

        <div class="inline-flex items-center gap-2">
          <Icon name="ph:shower" class="text-slate-500" />
          <div>
            <div class="text-xs text-slate-500">Banheiros</div>
            <div class="font-semibold">{{ imovel?.banheiros }}</div>
          </div>
        </div>

        <div class="inline-flex items-center gap-2">
          <Icon name="ph:car" class="text-slate-500" />
          <div>
            <div class="text-xs text-slate-500">Vagas</div>
            <div class="font-semibold">{{ imovel?.vagas }}</div>
          </div>
        </div>
      </div>

      <hr class="my-6 border-slate-200" />

      <h3 class="font-semibold text-slate-900 text-lg">Descrição</h3>
      <p class="mt-3 leading-relaxed text-slate-700">
        <!-- Coloque sua descrição real aqui. Para demo: -->
        Linda casa em condomínio fechado, com excelente padrão de acabamento,
        área gourmet e ambientes integrados — perfeita para sua família.
      </p>
    </div>

    <!-- planta -->
    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
      <h3 class="font-semibold text-slate-900 text-lg">Planta do Imóvel</h3>
      <div
        class="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 h-[320px] md:h-[360px]
               flex items-center justify-center"
      >
        <div class="text-center text-slate-500">
          <Icon name="ph:file" class="mx-auto mb-2 text-3xl text-primary" />
          <div>Coloque aqui a planta ou PDF/Imagem do projeto</div>
        </div>
      </div>
    </div>

    <!-- localização -->
    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
      <h3 class="font-semibold text-slate-900 text-lg">Localização</h3>
      <div
        class="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 h-[320px] md:h-[360px]
               flex items-center justify-center"
      >
        <div class="text-center text-slate-600">
          <Icon name="ph:map-pin" class="mx-auto mb-2 text-3xl text-primary" />
          <div>{{ imovel?.bairro }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
