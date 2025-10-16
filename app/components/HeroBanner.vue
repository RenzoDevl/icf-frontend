<script setup lang="ts">
const props = defineProps({
  badge: { type: String, default: 'IMOBILIÁRIA CARLOS FERNANDES' },
  title: { type: String, required: true }, 
  subtitle: {
    type: String,
    default:
      'Apartamentos, casas e salas comerciais em Teresina e região. Experiência, confiança e o melhor atendimento do mercado.'
  },
  primaryHref: { type: String, default: '#imoveis' },
  primaryLabel: { type: String, default: 'Ver Imóveis' },
  secondaryHref: { type: String, default: '#' },
  secondaryLabel: { type: String, default: 'Falar no WhatsApp' }
})
</script>

<template>
  <section
    id="inicio"
    class="relative isolate overflow-hidden text-white
           bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#1E3A8A]"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -z-10 right-[-15%] top-[-10%] h-[70vw] w-[70vw]
             rounded-full bg-white/10 blur-3xl"
      style="
        mask: radial-gradient(closest-side, #000 55%, transparent 60%);
        -webkit-mask: radial-gradient(closest-side, #000 55%, transparent 60%);
      "
    />

    <div class="container py-16 md:py-20 lg:py-24">
      <div class="pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-20">
        <div class="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 ring-1 ring-white/15">
          <Icon name="mdi:office-building-outline" class="h-5 w-5 text-white/90" />
          <span class="text-[13px] font-semibold tracking-wide">{{ badge }}</span>
        </div>

        <h1
          class="mt-6 font-black leading-[1.12]
                 tracking-[-0.015em]
                 text-[clamp(2.2rem,5.3vw,4.2rem)]"
          v-html="title"
        />

        <p class="mt-5 max-w-[62ch] text-white/95 text-base md:text-lg">
          {{ subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <a
            :href="primaryHref"
            class="inline-flex items-center justify-center rounded-2xl
                   bg-black/30 px-6 py-3 text-white font-semibold
                   shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_8px_24px_rgba(0,0,0,.18)]
                   transition duration-200 ease-out
                   hover:-translate-y-[1px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_12px_28px_rgba(0,0,0,.22)]
                   active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_6px_18px_rgba(0,0,0,.16)]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {{ primaryLabel }}
          </a>

          <a
            :href="secondaryHref"
            class="inline-flex items-center gap-2 rounded-2xl
                   bg-white/05 px-6 py-3 text-white font-semibold
                   ring-1 ring-white/20
                   transition duration-200 ease-out
                   hover:bg-white/10 hover:-translate-y-[1px]
                   active:translate-y-[1px]
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <Icon name="mdi:whatsapp" class="h-5 w-5" />
            <span>{{ secondaryLabel }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
