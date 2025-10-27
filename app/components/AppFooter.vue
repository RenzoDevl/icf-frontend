<script setup lang="ts">
defineProps<{
  creci?: string
}>()
</script>

<template>
  <footer
    class="pt-12 text-slate-200
           bg-gradient-to-b from-neutral-900 via-neutral-900 to-black"
  >
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6">
      <div class="grid gap-10 md:grid-cols-3">
        <!-- Marca -->
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl
                     bg-white/5 ring-1 ring-white/10"
            >
              <Icon name="ph:buildings-duotone" class="text-slate-200 text-2xl" />
            </span>
            <div>
              <div class="font-semibold text-white leading-none">Carlos Fernandes</div>
              <div class="text-slate-300 text-sm -mt-0.5">
                Carlos Fernandes Imóveis
              </div>
            </div>
          </NuxtLink>

          <p class="mt-4 text-slate-300 max-w-[38ch]">
            Seu imóvel dos sonhos em Teresina e região. Experiência,
            confiança e resultados há mais de <strong class="text-white">18 anos</strong>.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold text-white">Links Rápidos</h4>
          <ul class="mt-3 grid gap-2 text-slate-300">
            <li><NuxtLink to="/" class="hover:text-white">Início</NuxtLink></li>
            <li><NuxtLink to="/imoveis" class="hover:text-white">Imóveis</NuxtLink></li>
            <li><NuxtLink to="/sobre" class="hover:text-white">Sobre Nós</NuxtLink></li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="font-semibold text-white">Contato</h4>
          <ul class="mt-3 grid gap-3 text-slate-300">
            <li class="flex items-center gap-2">
              <Icon name="ph:phone" class="text-slate-200" />
              (86) 99999-9999
            </li>
            <li class="flex items-center gap-2">
              <Icon name="ph:envelope" class="text-slate-200" />
              contato@cf.imóveis.com.br
            </li>
            <li class="flex items-center gap-2">
              <Icon name="ph:map-pin" class="text-slate-200" />
              Centro, Teresina – PI
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-8 border-white/10" />

      <div class="flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-slate-400">
        <span>
          © 2025 Carlos Fernandes Imóveis. Todos os direitos reservados.
          <span v-if="creci"> • {{ creci }}</span>
        </span>
        <span class="opacity-75">cfi.imóveis</span>
      </div>
    </div>
  </footer>
</template>
