<script setup>
const emit = defineEmits(['submit'])
const onSubmit = (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  emit('submit', data)
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-black/5 shadow-md p-6">
    <h2 class="text-xl font-extrabold text-slate-900">Entre em Contato</h2>
    <p class="text-slate-600">Estamos prontos para atender você.</p>

    <form class="mt-4 grid gap-3" @submit="onSubmit">
      <input name="nome" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600" placeholder="Seu nome" />
      <input name="email" type="email" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600" placeholder="seu@email.com" />
      <textarea name="mensagem" rows="4" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-600" placeholder="Como podemos ajudar?"></textarea>
      <button type="submit" class="inline-flex w-full items-center justify-center rounded-[14px] px-4 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow">
        Enviar Mensagem
      </button>
    </form>
  </div>
</template>
