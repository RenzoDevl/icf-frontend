<script setup lang="ts">
const props = defineProps({
  whatsappHref: { type: String, default: '#' }
})
</script>

<template>
  <aside class="h-full rounded-2xl border border-black/5 bg-white shadow-sm">
    <div class="p-6">
      <h3 class="text-slate-900 font-semibold">Atendimento via WhatsApp</h3>
      <p class="text-slate-600 mt-1">
        Fale direto com nossa equipe para um atendimento rápido e personalizado.
      </p>

      <a
        :href="whatsappHref"
        target="_blank"
        class="mt-4 inline-flex w-full items-center justify-center gap-2
               rounded-xl bg-emerald-600 hover:bg-emerald-700
               text-white py-3 font-semibold shadow"
      >
        <Icon name="ph:whatsapp-logo-bold" class="text-xl" />
        Iniciar Conversa
      </a>

      <div class="mt-5 grid sm:grid-cols-2 gap-3">
        <div class="rounded-xl border border-slate-200 p-3 flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <<Icon name="ph:phone-bold" class="text-slate-700 text-lg" />
          </span>
          <div>
            <div class="text-xs text-slate-500">Telefone</div>
            <div class="font-medium text-slate-900">(86) 99999-9999</div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 p-3 flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
            <Icon name="ph:envelope-bold" class="text-slate-700 text-lg" />
          </span>
          <div>
            <div class="text-xs text-slate-500">E-mail</div>
            <div class="font-medium text-slate-900">
              contato@.com.br
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 p-3 flex items-center gap-3 sm:col-span-2">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
           <Icon name="ph:map-pin-line-bold" class="text-slate-700 text-lg" />
          </span>
          <div>
            <div class="text-xs text-slate-500">Endereço</div>
            <div class="font-medium text-slate-900">Centro, Teresina – PI</div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
