<script setup lang="ts">
import { computed } from 'vue'
import { useImoveis } from '@/composables/useImoveis'

useHead({
  title: 'Carlos Fernandes Imóveis',
  meta: [
    {
      name: 'description',
      content:
        'Compra, venda e locação de imóveis em Teresina e região — atendimento consultivo e transparente.'
    }
  ]
})

const whatsapp = '5586999999999'
const wpp = (msg?: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(
    msg || 'Olá! Tenho interesse em um imóvel.'
  )}`

// dados vindos do composable
const { list } = useImoveis()

// cards para o componente PropertyCard + deep-link para /imoveis?ref=<id>
const cards = computed(() =>
  list.value.map((d) => ({
    titulo: d.titulo,
    tipo: d.tipo,
    local: d.bairro,
    preco: d.preco,
    capa: d.capa,
    tag: d.status,
    href: `/imoveis?ref=${d.id}`,
    kpis: [
      { icon: 'mdi:ruler-square', text: `${d.area}m²` },
      { icon: 'mdi:bed-outline',  text: String(d.quartos) },
      { icon: 'mdi:shower',       text: String(d.banheiros) },
      { icon: 'mdi:car-outline',  text: String(d.vagas) }
    ]
  }))
)

const aboutBullets = [
  { icon: 'ph:seal-check', text: 'Mais de 18 anos de experiência no mercado imobiliário' },
  { icon: 'ph:users-three', text: 'Equipe qualificada e comprometida com você' },
  { icon: 'ph:handshake', text: 'Atendimento personalizado e consultoria gratuita' },
  { icon: 'ph:buildings', text: 'Portfólio diversificado de imóveis' },
  { icon: 'ph:shield-check', text: 'Transparência e segurança em todas as negociações' },
  { icon: 'ph:chart-line-up', text: 'Acompanhamento completo do processo' }
]

const onLead = () => {
  alert('Mensagem enviada! Entraremos em contato em breve.')
}
</script>

<template>
  <div class="bg-brand-black text-slate-100">
    <!-- âncora para o link Início (/#top) -->
    <div id="top" class="anchor"></div>

    <!-- Hero -->
    <div class="reveal inview anim-down" style="--d:.0s">
      <HeroBanner
        badge="CARLOS FERNANDES IMÓVEIS"
        title="Encontre o Imóvel<br/>dos Seus Sonhos"
        subtitle="Imóveis em Teresina e região. Experiência, confiança e o melhor atendimento do mercado."
        primary-href="#imoveis"
        primary-label="Ver Imóveis"
        :secondary-href="wpp('Olá! Tenho interesse em um imóvel.')"
        secondary-label="Falar no WhatsApp"
      />
    </div>

    <!-- Destaques -->
    <section id="imoveis" class="anchor py-16 md:py-20">
      <div class="reveal anim-down" style="--d:.05s">
        <SectionTitle
          title="Imóveis em Destaque"
          subtitle="Confira nossa seleção especial de imóveis premium"
          class="text-slate-100"
        />
      </div>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 items-stretch">
        <div v-for="(c, i) in cards" :key="c.titulo + i" class="reveal anim-up" :style="`--d:${(i*0.09).toFixed(2)}s`">
          <div class="rounded-2xl border border-white/5 bg-brand-surface/40 hover:bg-brand-surface/60 transition">
            <PropertyCard v-bind="c" />
          </div>
        </div>
      </div>

      <!-- Botão que leva para a página /imoveis -->
      <div class="text-center mt-8 reveal anim-scale" style="--d:.24s">
        <UiCtaLink to="/imoveis" label="Ver Todos os Imóveis" icon="ph:arrow-right" size="md" />
      </div>
    </section>

    <!-- Sobre -->
    <section id="sobre" class="anchor py-16 md:py-20 bg-brand-surface">
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 grid md:grid-cols-2 gap-x-10 gap-y-10 md:items-start">
        <div class="reveal anim-right self-start" style="--d:.0s">
          <SectionTitle :center="false" title="Sobre a Carlos Fernandes Imóveis" class="text-slate-900" />
          <p class="text-slate-700 mt-5 leading-relaxed max-w-[62ch]">
            Há mais de <strong class="font-semibold">18 anos</strong> no mercado, a ICF é sinônimo de confiança e
            profissionalismo. Ajudamos famílias a realizarem o sonho do imóvel próprio e
            auxiliamos investidores a encontrarem oportunidades seguras.
          </p>
          <div class="mt-6">
            <UiCtaLink to="/sobre" label="Conheça Nossa História" icon="ph:book-open-text" size="md" />
          </div>
        </div>

        <div class="reveal anim-left grid gap-3 self-start md:mt-[6px]" style="--d:.09s">
          <AboutFeaturePill
            v-for="(f, idx) in aboutBullets"
            :key="idx"
            :icon="f.icon"
            :text="f.text"
            class="bg-white border border-slate-200/80 hover:border-red-300/70"
          />
        </div>
      </div>
    </section>

    <!-- Serviços -->
    <section class="py-16 md:py-20">
      <div class="reveal anim-down" style="--d:.0s">
        <SectionTitle
          title="Nossos Serviços"
          subtitle="Soluções completas para todas as suas necessidades imobiliárias"
          class="text-slate-100"
        />
      </div>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div class="reveal anim-up" style="--d:.06s">
          <ServiceCard
            icon="ph:house-line"
            title="Construção e Venda"
            text="Da obra à escritura: conduzimos todo o ciclo de construção e venda."
            class="bg-brand-surface border border-white/10 hover:border-primary"
          />
        </div>

        <div class="reveal anim-up" style="--d:.12s">
          <ServiceCard
            icon="ph:key"
            title="Locação"
            text="Encontre o imóvel ideal para locação com agilidade e segurança."
            class="bg-brand-surface border border-white/10 hover:border-primary"
          />
        </div>

        <div class="reveal anim-up" style="--d:.18s">
          <ServiceCard
            icon="ph:blueprint"
            title="Lançamentos & Vendas Diretas"
            text="Venda direta do construtor: do projeto à entrega das chaves."
            class="bg-brand-surface border border-white/10 hover:border-primary"
          />
        </div>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="py-16 md:py-20">
      <div class="reveal anim-down" style="--d:.0s">
        <SectionTitle title="O Que Dizem Nossos Clientes" class="text-slate-100" />
      </div>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <div class="reveal anim-up" style="--d:.06s">
          <TestimonialCard
            quote="Excelente atendimento! Processo rápido e transparente."
            author="Ana P."
            class="bg-brand-surface border border-white/10"
          />
        </div>
        <div class="reveal anim-up" style="--d:.12s">
          <TestimonialCard
            quote="Vendi minha casa em menos de 2 semanas."
            author="Marcos R."
            class="bg-brand-surface border border-white/10"
          />
        </div>
        <div class="reveal anim-up" style="--d:.18s">
          <TestimonialCard
            quote="Imóvel incrível, suporte do início ao fim."
            author="Júlia S."
            class="bg-brand-surface border border-white/10"
          />
        </div>
      </div>
    </section>
  </div>
</template>
