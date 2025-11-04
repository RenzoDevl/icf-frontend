<!-- pages/imoveis/[id].vue -->
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'
import { useImoveis } from '@/composables/useImoveis'
import { useStoragePublic } from '@/composables/useStoragePublic'

const route = useRoute()
const router = useRouter()
const id = String(route.params.id)

const { buscarPorId } = useImoveis()
const storage = useStoragePublic()

const { data: imovel, pending } = await useAsyncData(
  `imovel-${id}`,
  () => buscarPorId(id),
  { server: true, lazy: false }
)

if (!pending.value && !imovel.value) {
  await router.push({ name: 'imoveis' })
}

const { data: cover } = await useAsyncData(
  `imovel-${id}-cover`,
  () => storage.getCover({ imovelId: id, tipo: 'imagens' }).catch(() => ({})),
  { server: true }
)

const { data: imgs } = await useAsyncData(
  `imovel-${id}-imgs`,
  () => storage.list({ imovelId: id, tipo: 'imagens' }).catch(() => []),
  { server: true }
)

const normalize = (u) => {
  try {
    const url = new URL(u)
    return url.origin + url.pathname
  } catch {
    return String(u || '').split('?')[0]
  }
}

const coverUrl = computed(() => {
  const raw = [
    imovel.value?.capaUrl,
    imovel.value?.capa,
    cover.value?.coverUrlHq,
    cover.value?.coverUrl
  ].filter(Boolean)
  return raw.length ? raw[0] : ''
})

const coverKeys = computed(() => {
  const all = [
    imovel.value?.capaUrl,
    imovel.value?.capa,
    cover.value?.coverUrlHq,
    cover.value?.coverUrl
  ].filter(Boolean)
  return new Set(all.map(normalize))
})

const imagesOnly = computed(() => {
  const list = Array.isArray(imgs.value) ? imgs.value.map(i => i?.url).filter(Boolean) : []
  const seen = new Set()
  const out = []
  for (const u of list) {
    const k = normalize(u)
    if (k && !seen.has(k) && !coverKeys.value.has(k)) {
      seen.add(k)
      out.push(u)
    }
  }
  return out
})

const viewerList = computed(() => {
  const c = coverUrl.value ? [coverUrl.value] : []
  return [...c, ...imagesOnly.value]
})

useHead(() => ({
  title: imovel.value?.titulo ? `${imovel.value.titulo} — ICF` : 'Imóvel — ICF'
}))

const fmtBRL = (n) =>
  Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const whatsapp = '5586999999999'
const wpp = (titulo) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o imóvel "${titulo || imovel.value?.titulo}" (ID ${id}) e gostaria de mais informações.`
  )}`

const goBack = () => router.push({ name: 'imoveis' })

const showViewer = ref(false)
const viewerIndex = ref(0)
const openViewer = (idx = 0) => { if (!viewerList.value.length) return; viewerIndex.value = idx; showViewer.value = true }
const closeViewer = () => { showViewer.value = false }
const prevImg = () => { const t = viewerList.value.length; if (!t) return; viewerIndex.value = (viewerIndex.value - 1 + t) % t }
const nextImg = () => { const t = viewerList.value.length; if (!t) return; viewerIndex.value = (viewerIndex.value + 1) % t }
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
        <div>
          <div
            class="relative rounded-2xl overflow-hidden border border-slate-200 bg-white cursor-pointer"
            @click="openViewer(0)"
          >
            <img
              v-if="coverUrl"
              :src="coverUrl"
              :alt="imovel.titulo"
              class="w-full object-cover"
              style="aspect-ratio: 16/9"
            />
            <div v-else class="w-full aspect-video grid place-items-center text-slate-400 text-sm">
              Sem imagem
            </div>
          </div>

          <div v-if="imagesOnly.length" class="mt-4 flex flex-wrap gap-3">
            <img
              v-for="(src, idx) in imagesOnly.slice(0, 6)"
              :key="idx"
              :src="src"
              class="h-28 w-44 object-cover rounded-xl border border-slate-200 bg-white cursor-pointer"
              :alt="`Foto ${idx + 1}`"
              @click="openViewer(idx + 1)"
            />
          </div>
        </div>

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

        <hr class="my-6 border-slate-200" />

        <h3 class="font-semibold text-slate-900 text-lg">Descrição</h3>
        <p class="mt-3 leading-relaxed text-slate-700">
          {{ imovel.descricao || 'Imóvel disponível. Entre em contato para mais detalhes.' }}
        </p>
      </div>

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

  <Teleport to="body">
    <div
      v-if="showViewer"
      class="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center gap-4 p-4"
    >
      <button class="absolute top-4 right-4 text-white/90 text-3xl leading-none" @click="closeViewer">
        &times;
      </button>

      <button
        v-if="viewerList.length > 1"
        class="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        @click="prevImg"
      >
        <Icon name="ph:caret-left" size="28" />
      </button>

      <div class="max-w-[95vw] max-h-[82vh] flex items-center justify-center">
        <img
          :src="viewerList[viewerIndex]"
          class="max-h-[82vh] max-w-[95vw] object-contain rounded-xl"
          :alt="imovel?.titulo"
        />
      </div>

      <button
        v-if="viewerList.length > 1"
        class="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        @click="nextImg"
      >
        <Icon name="ph:caret-right" size="28" />
      </button>

      <div v-if="viewerList.length > 1" class="md:hidden flex gap-3 mt-2">
        <button class="px-4 py-2 rounded-full bg-white/10 text-white" @click="prevImg">Anterior</button>
        <button class="px-4 py-2 rounded-full bg-white/10 text-white" @click="nextImg">Próxima</button>
      </div>
    </div>
  </Teleport>
</template>
