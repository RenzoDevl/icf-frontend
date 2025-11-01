<!-- pages/imoveis/[id].vue -->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from '#imports'
import { useImoveis } from '@/composables/useImoveis'
import { useStoragePublic } from '@/composables/useStoragePublic'

const route = useRoute()
const router = useRouter()

const { buscarPorId } = useImoveis()
const { list: listStorage } = useStoragePublic()

const id = Number(route.params.id)
const imovel = ref(null)
const gallery = ref([])
const plantas = ref([])

try {
  // 1) dados do imóvel (API pública + capa já resolvida)
  const it = await buscarPorId(id)
  imovel.value = it

  // 2) imagens do bucket p/ galeria
  const imgs = await listStorage({ imovelId: id, tipo: 'imagens' })
  const capa = it.capa || ''
  const imgsUrls = Array.isArray(imgs) ? imgs.map(i => i.url) : []

  gallery.value = [
    capa,
    ...imgsUrls.filter(u => u && u !== capa)
  ].filter(Boolean)

  // 3) plantas
  const pls = await listStorage({ imovelId: id, tipo: 'plantas' })
  plantas.value = Array.isArray(pls) ? pls.map(p => p.url).filter(Boolean) : []

  useHead({
    title: it.titulo ? `${it.titulo} — ICF` : 'Imóvel — ICF'
  })
} catch (e) {
  // se não achar -> volta
  await router.push('/imoveis')
}

const fmtBRL = (n) =>
  Number(n || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const whatsapp = '5586999999999'
const wpp = (titulo) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    `Olá! Vi o imóvel "${titulo || imovel.value?.titulo}" (ID ${id}) e gostaria de mais informações.`
  )}`

const goBack = () => router.push('/imoveis')
</script>

<template>
  <div class="mx-auto max-w-[1120px] px-4 sm:px-6 py-6 md:py-8" v-if="imovel">
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
            :alt="imovel.titulo"
            class="w-full object-cover"
            style="aspect-ratio: 16/9"
          />
          <div
            v-if="!gallery.length"
            class="w-full aspect-video grid place-items-center text-slate-400 text-sm"
          >
            Sem imagem
          </div>
        </div>

        <div v-if="gallery.length > 1" class="mt-4 flex flex-wrap gap-3">
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
          <p class="mt-2 text-slate-600">Entre em contato!</p>

          <div class="mt-4">
            <div class="font-semibold text-slate-900">Carlos Fernandes</div>
            <div class="text-slate-500 text-sm">Responsável pelo imóvel</div>
          </div>

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

    <!-- bloco infos -->
    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="text-slate-500 text-sm">
          {{ imovel.tipo }}
        </div>

        <div class="inline-flex items-center gap-2 text-slate-600" v-if="imovel.endereco?.bairro || imovel.endereco?.cidade">
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
    <div v-if="plantas.length" class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
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

    <!-- localização simples -->
    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-7 shadow-sm">
      <h3 class="font-semibold text-slate-900 text-lg">Localização</h3>
      <div
        class="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 h-[320px] md:h-[360px]
               flex items-center justify-center"
      >
        <div class="text-center text-slate-600">
          <Icon name="ph:map-pin" class="mx-auto mb-2 text-3xl text-primary" />
          <div>
            {{ imovel.endereco?.logradouro ? imovel.endereco.logradouro + ', ' + imovel.endereco.numero : '' }}
          </div>
          <div>
            {{ imovel.endereco?.bairro }} {{ imovel.endereco?.cidade ? '· ' + imovel.endereco.cidade : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
