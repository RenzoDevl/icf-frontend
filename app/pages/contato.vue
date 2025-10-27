<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue'

useHead({ title: 'Fale Conosco — ICF' })

const state = reactive({
  nome: '',
  email: '',
  mensagem: ''
})

const telefoneMask = '(86) 99999-9999'
const emailContato = 'contato@cfimóveis.com.br'
const endereco = 'Centro, Teresina – PI'
const whatsapp = '5586999999999'

const wppHref = (msg?: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    msg || 'Olá! Gostaria de informações.'
  )}`

function onSubmit() {
  // Envie para o backend se desejar; por ora, abre um mailto com os dados.
  const assunto = 'Contato pelo site — CFI'
  const corpo = `Nome: ${state.nome}\nE-mail: ${state.email}\n\nMensagem:\n${state.mensagem}`
  window.location.href = `mailto:${emailContato}?subject=${encodeURIComponent(
    assunto
  )}&body=${encodeURIComponent(corpo)}`
}

/* ========= Animations (reveal on scroll) ========= */
let io: IntersectionObserver | null = null

onMounted(() => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('inview')
          io?.unobserve(e.target) // anima uma vez
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
  <div class="bg-brand-surface text-slate-900">
    <!-- Hero -->
    <section class="bg-[linear-gradient(180deg,#f7f8fb,#ffffff)] border-b border-slate-200/60">
      <div
        class="mx-auto max-w-[1120px] px-4 sm:px-6 py-14 md:py-16 text-center reveal anim-down"
        style="--d:.0s"
      >
        <h1 class="text-4xl md:text-5xl font-black tracking-[-.02em]">Fale Conosco</h1>
        <p class="mt-3 text-slate-600">
          Estamos prontos para atender você. Entre em contato pelos canais abaixo.
        </p>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="py-10 md:py-12">
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid md:grid-cols-2 gap-8">
        <!-- Formulário -->
        <div class="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 md:p-6 reveal anim-right" style="--d:.05s">
          <h2 class="text-xl font-semibold text-slate-900">Envie sua Mensagem</h2>
          <form class="mt-4 space-y-4" @submit.prevent="onSubmit">
            <div class="space-y-1">
              <label class="text-xs text-slate-500">Nome Completo *</label>
              <input
                v-model.trim="state.nome"
                type="text"
                required
                class="w-full h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Seu nome"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs text-slate-500">E-mail *</label>
              <input
                v-model.trim="state.email"
                type="email"
                required
                class="w-full h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="seu@email.com"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs text-slate-500">Telefone</label>
              <input
                type="text"
                inputmode="tel"
                class="w-full h-11 rounded-xl border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                :placeholder="telefoneMask"
              />
            </div>

            <div class="space-y-1">
              <label class="text-xs text-slate-500">Mensagem *</label>
              <textarea
                v-model.trim="state.mensagem"
                required
                rows="5"
                class="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Como podemos ajudar você?"
              />
            </div>

            <button
              type="submit"
              class="inline-flex w-full items-center justify-center h-11 rounded-[14px]
                     font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                     transition shadow-sm"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        <!-- Lateral: WhatsApp + contatos -->
        <div class="space-y-5">
          <!-- WhatsApp -->
          <div class="rounded-2xl bg-gradient-to-b from-emerald-600 to-emerald-700 text-white p-5 md:p-6 shadow-sm reveal anim-left" style="--d:.06s">
            <div class="flex items-start gap-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Icon name="ph:whatsapp-logo" class="text-2xl" />
              </span>
              <div>
                <h3 class="text-lg font-semibold">Atendimento via WhatsApp</h3>
                <p class="text-white/90 mt-1">
                  Fale direto com nossa equipe para um atendimento rápido e personalizado.
                </p>
              </div>
            </div>

            <a
              :href="wppHref('Olá! Vim pelo site e gostaria de falar com um corretor.')"
              target="_blank"
              rel="noopener"
              class="mt-4 inline-flex w-full items-center justify-center h-11 rounded-[12px]
                     bg-white/10 hover:bg-white/20 font-semibold transition"
            >
              <Icon name="ph:paper-plane-tilt" class="mr-2" />
              Iniciar Conversa
            </a>
          </div>

          <!-- Cards de contato -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm space-y-4 reveal anim-left" style="--d:.12s">
            <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <Icon name="ph:phone" class="text-slate-700" />
              </span>
              <div class="leading-tight">
                <div class="text-xs text-slate-500">Telefone/WhatsApp</div>
                <div class="font-medium">{{ telefoneMask }}</div>
              </div>
            </div>

            <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <Icon name="ph:envelope" class="text-slate-700" />
              </span>
              <div class="leading-tight">
                <div class="text-xs text-slate-500">E-mail</div>
                <div class="font-medium break-all">{{ emailContato }}</div>
              </div>
            </div>

            <div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <Icon name="ph:map-pin" class="text-slate-700" />
              </span>
              <div class="leading-tight">
                <div class="text-xs text-slate-500">Endereço</div>
                <div class="font-medium">{{ endereco }}</div>
              </div>
            </div>
          </div>

          <!-- Horário -->
          <div class="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm reveal anim-left" style="--d:.18s">
            <h3 class="font-semibold text-slate-900">Horário de Atendimento</h3>
            <ul class="mt-3 space-y-1 text-slate-700">
              <li>Segunda a Sexta: 8h às 18h</li>
              <li>Sábado: 8h às 12h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
