<!-- pages/imoveis/[id].vue -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useImoveis } from '@/composables/useImoveis'
import { useStoragePublic } from '@/composables/useStoragePublic'

const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)

const { buscarPorId } = useImoveis()
const { list: listStorage } = useStoragePublic()

// 1) imóvel (SSR)
const { data: imovel, pending } = await useAsyncData(
  `imovel-${id}`,
  () => buscarPorId(id),
  { server: true, lazy: false }
)

// se não achou, manda pra listagem
if (!pending.value && !imovel.value) {
  await router.push({ name: 'imoveis' })
}

// 2) imagens e plantas
const { data: imgs } = await useAsyncData(
  `imovel-${id}-imgs`,
  () => listStorage({ imovelId: id, tipo: 'imagens' }).catch(() => []),
  { server: true }
)

const { data: pls } = await useAsyncData(
  `imovel-${id}-plantas`,
  () => listStorage({ imovelId: id, tipo: 'plantas' }).catch(() => []),
  { server: true }
)

// galeria
const gallery = computed(() => {
  const capa = imovel.value?.capa || ''
  const extras = Array.isArray(imgs.value)
    ? imgs.value.map((i: any) => i.url || i.coverUrl || i.coverUrlHq).filter(Boolean)
    : []
  return [capa, ...extras.filter((u) => u && u !== capa)].filter(Boolean)
})

// plantas prontas
const plantas = computed(() =>
  Array.isArray(pls.value)
    ? pls.value.map((p: any) => p.url || p.coverUrl || p.coverUrlHq).filter(Boolean)
    : []
)

useHead(() => ({
  title: imovel.value?.titulo ? `${imovel.value.titulo} — ICF` : 'Imóvel — ICF'
}))

const fmtBRL = (n: number | string) =>
  Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const whatsapp = '5586999999999'
const wpp = (titulo?: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o imóvel "${titulo || imovel.value?.titulo}" (ID ${id}) e gostaria de mais informações.`
  )}`

// usa name pra respeitar baseURL
const goBack = () => router.push({ name: 'imoveis' })

/* ===== viewer ===== */
const showViewer = ref(false)
const viewerIndex = ref(0)

const openViewer = (idx = 0) => {
  if (!gallery.value.length) return
  viewerIndex.value = idx
  showViewer.value = true
}
const closeViewer = () => {
  showViewer.value = false
}
const prevImg = () => {
  const total = gallery.value.length
  if (!total) return
  viewerIndex.value = (viewerIndex.value - 1 + total) % total
}
const nextImg = () => {
  const total = gallery.value.length
  if (!total) return
  viewerIndex.value = (viewerIndex.value + 1) % total
}
</script>

<template>
  <div class="mx-auto max-w-[1120px] px-4 sm:px-6 py-6 md:py-8">
    <div v-if="pending" class="py-20 text-center text-slate-400">
      Carregando imóvel...
    </div>

    <div v-else-if="!imovel" class="py-20 text-center text-slate-400">
      Imóvel não encontrado.
      <div class="mt-4">
        <button class="inline-flex items-center gap-2 text-primary" @click="goBack">
          <Icon name="ph:arrow-left" />
          Voltar para imóveis
        </button>
      </div>
    </div>

    <div v-else>
      <button
        class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
        @click="goBack"
      >
        <Icon name="ph:arrow-left" />
        Voltar para imóveis
      </button>

      <div class="mt-6 grid lg:grid-cols-[1fr,360px] gap-6">
        <!-- galeria -->
        <div>
          <div
            class="relative rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer"
            @click="openViewer(0)"
          >
            <img
              v-if="gallery.length"
              :src="gallery[0]"
              :alt="imovel.titulo"
              class="w-full object-cover"
              style="aspect-ratio: 16/9"
            />
            <div v-else class="w-full aspect-video grid place-items-center text-slate-400 text-sm">
              Sem imagem
            </div>
          </div>

          <div v-if="gallery.length > 1" class="mt-4 flex flex-wrap gap-3">
            <img
              v-for="(src, idx) in gallery.slice(0, 6)"
              :key="idx"
              :src="src"
              class="h-28 w-44 object-cover rounded-xl border border-slate-200 bg-white cursor-pointer"
              :alt="`Foto ${idx + 1}`"
              @click="openViewer(idx)"
            />
          </div>
        </div>

        <!-- contato -->
        <aside class="lg:sticky lg:top-[calc(var(--header-h)+16px)]">
          <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900">Interessado?</h3>
            <p class="mt-2 text-slate-600">Entre em contato!</p>

            <a
              :href="wpp(imovel.titulo)"
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

      <!-- infos -->
      <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <div class="text-slate-500 text-sm">
            {{ imovel.tipo }}
          </div>

          <div
            v-if="imovel.endereco?.bairro || imovel.endereco?.cidade"
            class="inline-flex items-center gap-2 text-slate-600"
          >
            <Icon name="ph:map-pin" />
            {{ imovel.endereco?.bairro || imovel.endereco?.cidade }}
          </div>
        </div>

        <h1 class="mt-2 text-2xl md:text-3xl font-black tracking-[-.02em] text-slate-900">
          {{ imovel.titulo }}
        </h1>

        <div class="mt-3 text-2xl md:text-3xl font-extrabold text-primary">
          {{ fmtBRL(imovel.preco) }}
        </div>

        <div class="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700">
          <div v-if="imovel.area" class="inline-flex items-center gap-2">
            <Icon name="ph:ruler" class="text-slate-500" />
            <div>
              <div class="text-xs text-slate-500">Área</div>
              <div class="font-semibold">{{ imovel.area }}m²</div>
            </div>
          </div>
          <div v-if="imovel.quartos" class="inline-flex items-center gap-2">
            <Icon name="ph:bed" class="text-slate-500" />
            <div>
              <div class="text-xs text-slate-500">Quartos</div>
              <div class="font-semibold">{{ imovel.quartos }}</div>
            </div>
          </div>
          <div v-if="imovel.banheiros" class="inline-flex items-center gap-2">
            <Icon name="ph:shower" class="text-slate-500" />
            <div>
              <div class="text-xs text-slate-500">Banheiros</div>
              <div class="font-semibold">{{ imovel.banheiros }}</div>
            </div>
          </div>
          <div v-if="imovel.vagas" class="inline-flex items-center gap-2">
            <Icon name="ph:car" class="text-slate-500" />
            <div>
              <div class="text-xs text-slate-500">Vagas</div>
              <div class="font-semibold">{{ imovel.vagas }}</div>
            </div>
          </div>
        </div>

        <hr class="my-6 border-slate-200" />

        <h3 class="font-semibold text-slate-900 text-lg">Descrição</h3>
        <p class="mt-3 leading-relaxed text-slate-700">
          {{ imovel.descricao || 'Imóvel disponível. Entre em contato para mais detalhes.' }}
        </p>
      </div>

      <!-- plantas -->
      <div
        v-if="plantas.length"
        class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm"
      >
        <h3 class="font-semibold text-slate-900 text-lg">Plantas / Projetos</h3>
        <div class="mt-4 flex flex-wrap gap-4">
          <img
            v-for="(p, i) in plantas"
            :key="i"
            :src="p"
            class="h-[240px] rounded-xl border border-slate-200 bg-slate-50 object-contain"
            :alt="`Planta ${i + 1}`"
          />
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
            <div>
              {{
                imovel.endereco?.logradouro
                  ? imovel.endereco.logradouro + ', ' + imovel.endereco.numero
                  : ''
              }}
            </div>
            <div>
              {{ imovel.endereco?.bairro }}
              {{ imovel.endereco?.cidade ? '· ' + imovel.endereco.cidade : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL / VIEWER -->
  <Teleport to="body">
    <div
      v-if="showViewer"
      class="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center gap-4 p-4"
    >
      <button
        class="absolute top-4 right-4 text-white/90 text-3xl leading-none"
        @click="closeViewer"
      >
        &times;
      </button>

      <button
        v-if="gallery.length > 1"
        class="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        @click="prevImg"
      >
        <Icon name="ph:caret-left" size="28" />
      </button>

      <div class="max-w-[95vw] max-h-[82vh] flex items-center justify-center">
        <img
          :src="gallery[viewerIndex]"
          class="max-h-[82vh] max-w-[95vw] object-contain rounded-xl"
          :alt="imovel?.titulo"
        />
      </div>

      <button
        v-if="gallery.length > 1"
        class="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        @click="nextImg"
      >
        <Icon name="ph:caret-right" size="28" />
      </button>

      <!-- mobile controls -->
      <div v-if="gallery.length > 1" class="md:hidden flex gap-3 mt-2">
        <button class="px-4 py-2 rounded-full bg-white/10 text-white" @click="prevImg">
          Anterior
        </button>
        <button class="px-4 py-2 rounded-full bg-white/10 text-white" @click="nextImg">
          Próxima
        </button>
      </div>
    </div>
  </Teleport>
</template>
