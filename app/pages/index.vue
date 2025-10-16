<script setup>
useHead({
  title: 'ICF — Imobiliária Carlos Fernandes',
  meta: [
    {
      name: 'description',
      content: 'Compra, venda e locação de imóveis em Teresina e região — atendimento consultivo e transparente.'
    }
  ]
})

const whatsapp = '5586999999999'
const wpp = (msg) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg || 'Olá! Tenho interesse em um imóvel.')}`

const destaques = [
  {
    id: 1,
    tipo: 'Apartamento',
    bairro: 'Parque Piauí • Teresina',
    titulo: 'Apartamento de Luxo com Vista Panorâmica',
    preco: 450000,
    area: 120,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    status: 'COMPRAR',
    capa: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 2,
    tipo: 'Casa',
    bairro: 'Ininga • Teresina',
    titulo: 'Casa Moderna com Piscina e Jardim',
    preco: 850000,
    area: 280,
    quartos: 4,
    banheiros: 3,
    vagas: 3,
    status: 'COMPRAR',
    capa: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1400&auto=format&fit=crop'
  },
  {
    id: 3,
    tipo: 'Sala Comercial',
    bairro: 'Centro • Teresina',
    titulo: 'Sala Comercial no Centro Empresarial',
    preco: 320000,
    area: 85,
    quartos: 1,
    banheiros: 1,
    vagas: 2,
    status: 'COMPRAR',
    capa: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop'
  }
]

const cards = computed(() =>
  destaques.map((d) => ({
    titulo: d.titulo,
    tipo: d.tipo,
    local: d.bairro,
    preco: d.preco,
    capa: d.capa,
    tag: d.status,  // não exibimos visualmente, mas mantive caso queira reaproveitar
    href: `/imoveis?ref=${d.id}`,
    kpis: [
      { icon: 'mdi:ruler-square', text: `${d.area}m²` },
      { icon: 'mdi:bed-outline', text: d.quartos },
      { icon: 'mdi:shower', text: d.banheiros },
      { icon: 'mdi:car-outline', text: d.vagas }
    ]
  }))
)

const aboutBullets = [
  { icon: 'ph:seal-check',   text: 'Mais de 15 anos de experiência no mercado imobiliário' },
  { icon: 'ph:users-three',  text: 'Equipe qualificada e comprometida com você' },
  { icon: 'ph:handshake',    text: 'Atendimento personalizado e consultoria gratuita' },
  { icon: 'ph:buildings',    text: 'Portfólio diversificado de imóveis' },
  { icon: 'ph:shield-check', text: 'Transparência e segurança em todas as negociações' },
  { icon: 'ph:chart-line-up',text: 'Acompanhamento completo do processo' }
]

const onLead = (payload) => {
  console.log('Lead:', payload)
  alert('Mensagem enviada! Entraremos em contato em breve.')
}
</script>

<template>
  <div>
    <AppHeader :whatsapp-url="wpp('Olá! Vim pelo site e quero falar com um corretor.')" />

    <HeroBanner
      badge="IMOBILIÁRIA CARLOS FERNANDES"
      title="Encontre o Imóvel<br/>dos Seus Sonhos"
      subtitle="Apartamentos, casas e salas comerciais em Teresina e região. Experiência, confiança e o melhor atendimento do mercado."
      primary-href="#imoveis"
      primary-label="Ver Imóveis"
      :secondary-href="wpp('Olá! Tenho interesse em um imóvel.')"
      secondary-label="Falar no WhatsApp"
    />

    <section id="imoveis" class="py-16 md:py-20">
      <UiReveal anim="fade-down">
        <SectionTitle title="Imóveis em Destaque" subtitle="Confira nossa seleção especial de imóveis premium" />
      </UiReveal>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10 items-stretch">
        <UiReveal v-for="(c, i) in cards" :key="c.titulo + i" anim="fade-up" :delay="i * 90">
          <PropertyCard v-bind="c" />
        </UiReveal>
      </div>

      <UiReveal anim="scale-in" :delay="240">
        <div class="text-center mt-8">
          <UiCtaLink to="/imoveis" label="Ver Todos os Imóveis" icon="ph:arrow-right" size="md" />
        </div>
      </UiReveal>
    </section>

    <section id="sobre" class="py-16 md:py-20 bg-slate-100">
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-10 items-start">
        <UiReveal anim="slide-right">
          <div>
            <SectionTitle :center="false" title="Sobre a Imobiliária Carlos Fernandes" />
            <p class="text-slate-600 mt-3 max-w-[60ch]">
              Há mais de 15 anos no mercado, a ICF é sinônimo de confiança e profissionalismo.
              Ajudamos famílias a realizarem o sonho do imóvel próprio e auxiliamos investidores
              a encontrarem oportunidades seguras.
            </p>

            <div class="mt-5">
              <UiCtaLink to="/sobre" label="Conheça Nossa História" icon="ph:book-open-text" size="md" />
            </div>
          </div>
        </UiReveal>

        <UiReveal anim="slide-left" :delay="90">
          <div class="grid gap-3">
            <AboutFeaturePill v-for="(f, idx) in aboutBullets" :key="idx" :icon="f.icon" :text="f.text" />
          </div>
        </UiReveal>
      </div>
    </section>

    <section class="py-16 md:py-20">
      <UiReveal anim="fade-down">
        <SectionTitle title="Nossos Serviços" subtitle="Soluções completas para todas as suas necessidades imobiliárias" />
      </UiReveal>

      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <UiReveal anim="fade-up" :delay="60">
          <ServiceCard icon="ph:house-line" title="Venda e Compra" text="Acompanhamos da avaliação à escritura." />
        </UiReveal>
        <UiReveal anim="fade-up" :delay="120">
          <ServiceCard icon="ph:key" title="Locação" text="Encontre o imóvel ideal para alugar." />
        </UiReveal>
        <UiReveal anim="fade-up" :delay="180">
          <ServiceCard icon="ph:chart-line-up" title="Captação de Imóveis" text="Divulgue seu imóvel e alcance potenciais clientes." />
        </UiReveal>
      </div>
    </section>

    <section class="py-16 md:py-20">
      <UiReveal anim="fade-down">
        <SectionTitle title="O Que Dizem Nossos Clientes" />
      </UiReveal>
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        <UiReveal anim="fade-up" :delay="60"><TestimonialCard quote="Excelente atendimento! Processo rápido e transparente." author="Ana P." /></UiReveal>
        <UiReveal anim="fade-up" :delay="120"><TestimonialCard quote="Vendi minha casa em menos de 2 semanas." author="Marcos R." /></UiReveal>
        <UiReveal anim="fade-up" :delay="180"><TestimonialCard quote="Imóvel incrível, suporte do início ao fim." author="Júlia S." /></UiReveal>
      </div>
    </section>

    <section id="contato" class="py-16 md:py-20">
      <div class="mx-auto max-w-[1120px] px-4 sm:px-6 grid gap-6 md:grid-cols-2">
        <UiReveal anim="slide-right"><ContactForm @submit="onLead" /></UiReveal>
        <UiReveal anim="slide-left" :delay="90"><ContactAside :whatsapp-href="wpp('Olá! Gostaria de mais informações.')" /></UiReveal>
      </div>
    </section>

    <AppFooter creci="Creci-PI 00000" />
  </div>
</template>
