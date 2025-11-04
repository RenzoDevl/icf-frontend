<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useHead, useRuntimeConfig } from '#imports'
import { useStoragePublic } from '@/composables/useStoragePublic'

useHead({
  title: 'Carlos Fernandes Imóveis',
  meta: [{ name: 'description', content: 'Compra, venda e locação de imóveis em Teresina e região — atendimento consultivo e transparente.' }]
})

const whatsapp = '5586999999999'
const wpp = (msg) => `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg || 'Olá! Tenho interesse em um imóvel.')}`

const { $axios } = useNuxtApp()
const { public: pub } = useRuntimeConfig()
const apiBase = (pub.apiBase || 'https://cfi-backend.fly.dev/api').replace(/\/+$/, '')

const storage = useStoragePublic()
const asData = (res) => (res && typeof res === 'object' && 'data' in res ? res.data : res)

function normalizeItem (it) {
  const id = String(it?.id ?? it?._id ?? it?.imovelId ?? '')
  return {
    ...it,
    id,
    cidadeLabel: it?.endereco?.cidade || '',
    bairroLabel: it?.endereco?.bairro || '',
    capa: it?.capaUrl || it?.capa || ''
  }
}

async function fetchHome () {
  // pede 30 para evitar o 500 do backend com size=3 e depois corta para 3
  const data = asData(await $axios.get(`${apiBase}/imoveis/publicos`, { params: { page: 0, size: 30 } }))
  const content = Array.isArray(data?.content) ? data.content : (Array.isArray(data) ? data : [])
  const mapped = content.slice(0, 3).map(normalizeItem)

  for (const imv of mapped) {
    if (imv.capa) continue
    try {
      const cover = asData(await storage.getCover({ imovelId: imv.id, tipo: 'imagens' }))
      if (cover?.coverUrlHq || cover?.coverUrl) {
        imv.capa = cover.coverUrlHq || cover.coverUrl
        continue
      }
      const list = asData(await storage.list({ imovelId: imv.id, tipo: 'imagens' }))
      if (Array.isArray(list) && list.length) imv.capa = list[0]?.url || ''
    } catch {}
  }

  return mapped
}

const { data: homeItems, pending: loading } = await useAsyncData('home-cards', fetchHome, { server: true, lazy: false })

onMounted(async () => {
  if (!Array.isArray(homeItems.value) || !homeItems.value.length) {
    try { homeItems.value = await fetchHome() } catch {}
  }
  await nextTick()
  clientReady.value = true
})

const cards = computed(() =>
  (homeItems.value || []).map((d) => ({
    item: {
      ...d,
      bairro: d.bairroLabel || d.cidadeLabel || d.endereco?.bairro || d.endereco?.cidade || ''
    },
    href: `/imoveis/${d.id}`
  }))
)

// evita mismatch de hidratação: só adiciona "inview" no client
const clientReady = ref(false)
</script>

<template>
  <div class="bg-brand-black text-slate-100">
    <div id="top" class="anchor"></div>

    <div class="reveal anim-down" :class="{ inview: clientReady }" style="--d:.0s">
      <HeroBanner
        badge="CARLOS FERNANDES IMÓVEIS"
        title="Encontre o Imóvel dos Seus Sonhos"
        subtitle="Imóveis em Teresina e região. Experiência, confiança e o melhor atendimento do mercado."
        primary-href="#imoveis"
        primary-label="Ver Imóveis"
        :secondary-href="wpp('Olá! Tenho interesse em um imóvel.')"
        secondary-label="Falar no WhatsApp"
      />
    </div>

    <section id="imoveis" class="anchor py-16 md:py-20">
      <div class="reveal anim-down" :class="{ inview: clientReady }" style="--d:.05s">
        <SectionTitle
          title="Imóveis em Destaque"
          subtitle="Confira nossa seleção especial de imóveis premium"
          class="text-slate-100"
        />
      </div>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 mt-10">
        <p v-if="loading" class="text-center text-slate-400 py-10">Carregando imóveis...</p>
        <p v-else-if="!cards.length" class="text-center text-slate-400 py-10">Nenhum imóvel encontrado.</p>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          <div
            v-for="(c, i) in cards"
            :key="c.item.id || i"
            class="reveal anim-up"
            :class="{ inview: clientReady }"
            :style="`--d:${(i * 0.09).toFixed(2)}s`"
          >
            <div class="rounded-2xl border border-white/5 bg-brand-surface/40 hover:bg-brand-surface/60 transition">
              <PropertyCard :item="c.item" :href="c.href" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 reveal anim-scale" :class="{ inview: clientReady }" style="--d:.24s">
        <UiCtaLink to="/imoveis" label="Ver Todos os Imóveis" icon="ph:arrow-right" size="md" />
      </div>
    </section>

    <section id="sobre" class="anchor py-16 md:py-20 bg-brand-surface">
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-x-10 gap-y-10 md:items-start">
        <div class="reveal anim-right" :class="{ inview: clientReady }" style="--d:.0s">
          <SectionTitle :center="false" title="Sobre a Carlos Fernandes Imóveis" class="text-slate-900" />
          <p class="text-slate-700 mt-5 leading-relaxed max-w-[62ch]">
            Há mais de <strong class="font-semibold">18 anos</strong> no mercado, a ICF é sinônimo de confiança e profissionalismo.
          </p>
          <div class="mt-6">
            <UiCtaLink to="/sobre" label="Conheça Nossa História" icon="ph:book-open-text" size="md" />
          </div>
        </div>

        <div class="reveal anim-left grid gap-3 self-start md:mt-[6px]" :class="{ inview: clientReady }" style="--d:.09s">
          <AboutFeaturePill
            v-for="(f, idx) in [
              { icon: 'ph:seal-check', text: 'Mais de 18 anos de experiência no mercado imobiliário' },
              { icon: 'ph:users-three', text: 'Equipe qualificada e comprometida com você' },
              { icon: 'ph:handshake', text: 'Atendimento personalizado e consultoria gratuita' },
              { icon: 'ph:buildings', text: 'Portfólio diversificado de imóveis' },
              { icon: 'ph:shield-check', text: 'Transparência e segurança em todas as negociações' },
              { icon: 'ph:chart-line-up', text: 'Acompanhamento completo do processo' }
            ]"
            :key="idx"
            :icon="f.icon"
            :text="f.text"
            class="bg-white border border-slate-200/80 hover:border-red-300/70"
          />
        </div>
      </div>
    </section>

    <section class="py-16 md:py-20">
      <div class="reveal anim-down" :class="{ inview: clientReady }" style="--d:.0s">
        <SectionTitle title="O Que Dizem Nossos Clientes" class="text-slate-100" />
      </div>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div class="reveal anim-up" :class="{ inview: clientReady }" style="--d:.06s">
          <TestimonialCard quote="Excelente atendimento! Processo rápido e transparente." author="Ana P." class="bg-brand-surface border border-white/10" />
        </div>
        <div class="reveal anim-up" :class="{ inview: clientReady }" style="--d:.12s">
          <TestimonialCard quote="Vendi minha casa em menos de 2 semanas." author="Marcos R." class="bg-brand-surface border border-white/10" />
        </div>
        <div class="reveal anim-up" :class="{ inview: clientReady }" style="--d:.18s">
          <TestimonialCard quote="Imóvel incrível, suporte do início ao fim." author="Júlia S." class="bg-brand-surface border border-white/10" />
        </div>
      </div>
    </section>
  </div>
</template>
