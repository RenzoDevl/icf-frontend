<script setup lang="ts">
defineProps<{
  creci?: string
}>()
</script>

<template>
  <footer class="bg-slate-800 text-slate-200 pt-12">
    <div class="mx-auto max-w-[1120px] px-4 sm:px-6">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 ring-1 ring-blue-500/30"
            >
              <Icon name="ph:buildings-duotone" class="text-blue-400 text-2xl" />
            </span>
            <div>
              <div class="font-semibold text-white leading-none">ICF</div>
              <div class="text-slate-400 text-sm -mt-0.5">
                Imobiliária Carlos Fernandes
              </div>
            </div>
          </NuxtLink>

          <p class="mt-4 text-slate-400 max-w-[38ch]">
            Seu imóvel dos sonhos em Teresina e região. Experiência,
            confiança e resultados há mais de 15 anos.
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-white">Links Rápidos</h4>
          <ul class="mt-3 grid gap-2 text-slate-300">
            <li><NuxtLink to="/" class="hover:text-white">Início</NuxtLink></li>
            <li><NuxtLink to="/imoveis" class="hover:text-white">Imóveis</NuxtLink></li>
            <li><NuxtLink to="/sobre" class="hover:text-white">Sobre Nós</NuxtLink></li>
            <li><NuxtLink to="/contato" class="hover:text-white">Contato</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white">Contato</h4>
          <ul class="mt-3 grid gap-3 text-slate-300">
            <li class="flex items-center gap-2">
              <NuxtIcon name="ph:phone" class="text-slate-400" />
              (86) 99999-9999
            </li>
            <li class="flex items-center gap-2">
              <NuxtIcon name="ph:envelope" class="text-slate-400" />
              contato@imobiliariaicf.com.br
            </li>
            <li class="flex items-center gap-2">
              <NuxtIcon name="ph:map-pin" class="text-slate-400" />
              Centro, Teresina – PI
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-8 border-slate-700" />

      <div class="flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-slate-400">
        <span>
          © 2025 Imobiliária Carlos Fernandes. Todos os direitos reservados.
          <span v-if="creci"> • {{ creci }}</span>
        </span>
        <span class="opacity-60">icf.imobiliaria</span>
      </div>
    </div>
  </footer>
</template>
