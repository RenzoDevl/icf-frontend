<script setup>
const emit = defineEmits(['submit'])
const onSubmit = (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  emit('submit', data)
}
</script>

<template>
  <!-- borda PRETA e sem sombra -->
  <div class="bg-white rounded-2xl border border-black/10 p-6">
    <h2 class="text-xl font-extrabold text-slate-900">Entre em Contato</h2>
    <p class="text-slate-600">Estamos prontos para atender você.</p>

    <form class="mt-4 grid gap-3" @submit="onSubmit">
      <!-- inputs com borda PRETA e sem sombra -->
      <input
        name="nome"
        class="w-full rounded-2xl border border-black/20 bg-white px-4 py-3 outline-none
               focus:ring-4 focus:ring-black/10 focus:border-black transition"
        placeholder="Seu nome"
      />
      <input
        name="email"
        type="email"
        class="w-full rounded-2xl border border-black/20 bg-white px-4 py-3 outline-none
               focus:ring-4 focus:ring-black/10 focus:border-black transition"
        placeholder="seu@email.com"
      />
      <textarea
        name="mensagem"
        rows="4"
        class="w-full rounded-2xl border border-black/20 bg-white px-4 py-3 outline-none
               focus:ring-4 focus:ring-black/10 focus:border-black transition"
        placeholder="Como podemos ajudar?"
      ></textarea>

      <!-- CTA permanece vermelho (sem sombra) -->
      <button
        type="submit"
        class="inline-flex w-full items-center justify-center rounded-[14px] px-4 py-3 font-semibold
               text-white bg-red-600 hover:bg-red-700 transition"
      >
        Enviar Mensagem
      </button>

      <!-- (Opcional) Botão WhatsApp continua VERDE, sem sombra -->
      <!--
      <a
        href="https://wa.me/5586999999999?text=Olá!%20Quero%20falar%20com%20um%20corretor."
        target="_blank" rel="noopener"
        class="inline-flex w-full items-center justify-center rounded-[14px] px-4 py-3 font-semibold
               text-white bg-green-600 hover:bg-green-700 transition"
      >
        Falar no WhatsApp
      </a>
      -->
    </form>
  </div>
</template>
