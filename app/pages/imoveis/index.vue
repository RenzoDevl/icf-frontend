<!-- pages/imoveis/index.vue -->
<script setup>
import { computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useHead } from '#imports'
import { useImoveis } from '@/composables/useImoveis'
import { useStoragePublic } from '@/composables/useStoragePublic'

useHead({ title: 'Todos os Imóveis' })

const { items, listar, loading } = useImoveis()
const storage = useStoragePublic()
const route = useRoute()

const fmtBRL = (n) =>
  Number(n || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

const itens = computed(() => items.value || [])

if (process.server) {
  await listar({ page: 0, size: 60 })
}

async function preencherCapas () {
  const faltando = (items.value || []).filter(i => !i?.capa)
  for (const imv of faltando) {
    try {
      const c = await storage.getCover({ imovelId: imv.id, tipo: 'imagens' })
      if (c?.coverUrlHq || c?.coverUrl) {
        imv.capa = c.coverUrlHq || c.coverUrl
        continue
      }
      const lst = await storage.list({ imovelId: imv.id, tipo: 'imagens' })
      if (Array.isArray(lst) && lst.length) {
        imv.capa = lst[0]?.url || ''
      }
    } catch {}
  }
}

let io = null

onMounted(async () => {
  if (!items.value?.length) {
    await listar({ page: 0, size: 60 })
  }
  await preencherCapas()

  const refId = String(route.query.ref || '')
  if (refId) {
    await nextTick()
    const el = document.getElementById(`card-${refId}`)
    if (el) {
      const headerH =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 96
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - headerH - 16
      window.scrollTo({ top, behavior: 'smooth' })
      el.classList.add('ring-2', 'ring-[var(--primary)]')
      setTimeout(
        () => el.classList.remove('ring-2', 'ring-[var(--primary)]'),
        1600
      )
    }
  }

  const targets = Array.from(document.querySelectorAll('.reveal'))
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('inview')
          io?.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12 }
  )
  targets.forEach((el) => io?.observe(el))
})

onBeforeUnmount(() => {
  io?.disconnect()
  io = null
})
</script>

<template>
  <section class="py-14 md:py-16">
    <div
      class="mx-auto max-w-[1120px] px-4 sm:px-6 text-center reveal anim-down"
      style="--d:.0s"
    >
      <h1 class="text-4xl md:text-5xl font-black tracking-[-.02em] text-slate-900">
        Imóveis
      </h1>
      <p class="mt-3 text-slate-600">
        Confira nossa seleção de imóveis
      </p>
    </div>
  </section>

  <section class="pb-16">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6">
      <p class="text-slate-600 reveal anim-fade" style="--d:.05s">
        <span v-if="loading">Carregando...</span>
      </p>

      <div
        v-if="!loading && !itens.length"
        class="mt-8 py-16 text-center text-slate-400"
      >
        Nenhum imóvel encontrado.
      </div>

      <div
        v-else
        class="mt-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch"
      >
        <article
          v-for="(i, idx) in itens"
          :key="i.id"
          :id="`card-${i.id}`"
          :style="{ '--d': (idx * 0.06).toFixed(2) + 's' }"
          class="reveal anim-up card flex flex-col rounded-[22px] border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <div class="overflow-hidden">
            <img
              :src="i.capa || '/placeholder-imovel.jpg'"
              :alt="i.titulo"
              class="w-full aspect-[16/9] object-cover transition duration-500 hover:scale-[1.03]"
            />
          </div>

          <div class="p-5 flex flex-col flex-1">
            <div class="flex items-center gap-3 text-sm text-slate-600">
              <span class="inline-flex items-center gap-1">
                <Icon name="ph:house-line" class="text-base text-slate-500" />
                {{ i.tipo || 'Imóvel' }}
              </span>
              <span class="text-slate-400">•</span>
              <span class="inline-flex items-center gap-1 truncate max-w-[60%]">
                <Icon name="ph:map-pin" class="text-base text-slate-500" />
                <span class="truncate">
                  {{ i.bairro || i.endereco?.bairro || i.endereco?.cidade || '—' }}
                </span>
              </span>
            </div>

            <h3 class="mt-2 font-semibold text-slate-900 leading-snug">
              {{ i.titulo }}
            </h3>

            <div
              class="mt-3 text-primary font-extrabold text-xl reveal anim-fade"
              :style="{ '--d': (idx * 0.06 + 0.10).toFixed(2) + 's' }"
            >
              {{ fmtBRL(i.preco) }}
            </div>

            <NuxtLink
              :to="{ name: 'imoveis-id', params: { id: i.id } }"
              class="mt-auto inline-flex w-full items-center justify-center h-11
                     rounded-[999px] border border-slate-300
                     text-[15px] font-semibold text-primary
                     hover:border-[var(--primary)] hover:bg-primary hover:text-white
                     transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Ver Detalhes
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
[id^="card-"] { scroll-margin-top: var(--header-h); }
.card { min-height: 100%; }
</style>
