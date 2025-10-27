<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

useHead({
  title: 'Sobre — Carlos Fernandes Construtor',
  meta: [
    {
      name: 'description',
      content:
        'Carlos Fernandes — Construtor de casas residenciais há mais de 18 anos. Construção e venda direta com transparência, qualidade e compromisso em Teresina e região.'
    }
  ]
})

const valores = [
  { icon: 'ph:heart',        titulo: 'Compromisso',   texto: 'Dedicação total em cada casa, do projeto à entrega das chaves.' },
  { icon: 'ph:target',       titulo: 'Excelência',    texto: 'Padrões elevados de qualidade, prazos claros e acabamento superior.' },
  { icon: 'ph:circles-four', titulo: 'Transparência', texto: 'Negociações claras, contratos objetivos e acompanhamento do cliente.' },
  { icon: 'ph:medal',        titulo: 'Experiência',   texto: 'Mais de 18 anos construindo casas residenciais com portfólio sólido.' }
]

/* ===== reveal on scroll (mesmo do contato) ===== */
let io: IntersectionObserver | null = null
onMounted(() => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
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
  <!-- HERO -->
  <section class="relative overflow-hidden bg-brand-surface" aria-label="Sobre a Carlos Fernandes Construtor">
    <!-- imagem de fundo com overlay -->
    <div
      class="absolute inset-0"
      aria-hidden="true"
      style="
        background-image: url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed1?q=80&w=1920&auto=format&fit=crop');
        background-size: cover;
        background-position: center;
      "
    />
    <div class="absolute inset-0 bg-black/35" aria-hidden="true"></div>

    <!-- conteúdo do hero -->
    <div class="relative mx-auto max-w-[1120px] px-4 sm:px-6 min-h-[360px] md:min-h-[500px] flex flex-col justify-center">
      <span class="reveal anim-down text-white/90 text-sm font-medium tracking-wide" style="--d:.0s">
        Carlos Fernandes Construtor
      </span>

      <h1 class="mt-4 text-4xl md:text-5xl font-black tracking-[-.02em] text-white reveal anim-down" style="--d:.05s">
        Sobre Nós
      </h1>

      <p class="mt-2 max-w-[56ch] text-white/90 text-lg reveal anim-down" style="--d:.10s">
        Construindo <strong class="text-white">casas residenciais</strong> há
        <strong class="text-white"> 18 anos</strong>, com seriedade, transparência e
        um padrão de qualidade que você vê e sente.
      </p>

      <!-- badge “18” (sem +) -->
      <div
        class="mt-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-slate-900 shadow reveal anim-up"
        style="--d:.16s"
      >
        <span
          class="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-bold px-2"
        >
          18
        </span>
        anos construindo com qualidade
      </div>
    </div>
  </section>

  <!-- HISTÓRIA -->
  <section class="bg-brand-surface">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6 py-12 md:py-16">
      <div class="reveal anim-down" style="--d:.0s">
        <h2 class="text-3xl md:text-4xl font-black tracking-[-.01em] text-slate-900">
          Nossa História
        </h2>
        <p class="mt-2 text-slate-600">Uma trajetória construída com dedicação e confiança</p>
      </div>

      <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 reveal anim-up" style="--d:.08s">
        <p class="text-slate-700 leading-relaxed">
          A <strong class="text-slate-900">Carlos Fernandes Construtor</strong> nasceu com um objetivo claro:
          entregar <strong>casas residenciais</strong> com excelente custo-benefício, acabamento de alto
          padrão e total clareza em cada etapa. Fundada por Carlos Fernandes — profissional com
          <strong class="font-semibold"> mais de 18 anos</strong> de experiência, a empresa cresceu sustentada por
          valores sólidos e relacionamento próximo com cada família.
        </p>

        <p class="mt-5 text-slate-700 leading-relaxed">
          Ao longo dessa jornada, assinamos projetos residenciais em diversos bairros,
          ajudando famílias a conquistarem a casa própria com segurança e tranquilidade.
          Nossos pilares permanecem os mesmos:
          <strong class="font-semibold"> transparência, profissionalismo e dedicação</strong>.
        </p>

        <p class="mt-5 text-slate-700 leading-relaxed">
          Hoje, seguimos entregando casas com prazos bem definidos, materiais de qualidade
          e um processo de acompanhamento claro — do terreno à entrega das chaves.
        </p>
      </div>
    </div>
  </section>

  <!-- MISSÃO & VISÃO -->
  <section class="bg-brand-surface">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6 pb-8 md:pb-12">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 reveal anim-right" style="--d:.0s">
          <h3 class="text-xl font-semibold text-slate-900">Nossa Missão</h3>
          <p class="mt-2 text-slate-700 leading-relaxed">
            Construir e vender <strong class="text-slate-900">casas residenciais</strong> que unam segurança,
            conforto e estética, com <strong class="text-slate-900">atendimento consultivo</strong> e
            <strong class="text-slate-900"> transparência</strong> do orçamento à entrega.
          </p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 reveal anim-left" style="--d:.06s">
          <h3 class="text-xl font-semibold text-slate-900">Nossa Visão</h3>
          <p class="mt-2 text-slate-700 leading-relaxed">
            Ser referência em Teresina e região pela
            <strong class="text-slate-900"> qualidade construtiva</strong>,
            <strong class="text-slate-900"> cumprimento de prazos</strong> e
            <strong class="text-slate-900"> relacionamento</strong> com o cliente na construção de casas.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- VALORES -->
  <section class="bg-brand-surface pb-16 md:pb-20">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6">
      <div class="reveal anim-down text-center" style="--d:.0s">
        <h2 class="text-3xl md:text-4xl font-black tracking-[-.01em] text-slate-900">
          Nossos Valores
        </h2>
        <p class="mt-2 text-slate-600">
          Os princípios que guiam nosso trabalho diariamente
        </p>
      </div>

      <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(v, i) in valores"
          :key="i"
          class="rounded-2xl border border-slate-200 bg-white p-6 text-center hover:shadow-sm transition reveal anim-up"
          :style="`--d:${(i*0.08 + 0.06).toFixed(2)}s`"
        >
          <div class="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon :name="v.icon" class="text-xl" />
          </div>
          <h3 class="font-semibold text-slate-900">{{ v.titulo }}</h3>
          <p class="mt-2 text-slate-700 text-sm leading-relaxed">{{ v.texto }}</p>
        </div>
      </div>

      <div class="mt-10 text-center reveal anim-scale" style="--d:.36s">
        <NuxtLink
          to="/imoveis"
          class="inline-flex items-center justify-center gap-2 rounded-[999px]
                 px-5 h-11 font-semibold text-white bg-primary hover:opacity-95 transition shadow-sm"
        >
          <Icon name="ph:house-line" />
          Ver Casas Disponíveis
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
