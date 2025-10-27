// app/plugins/reveal.server.ts
export default defineNuxtPlugin((nuxtApp) => {
  // no-op: apenas para o SSR não quebrar quando vê v-reveal
  nuxtApp.vueApp.directive('reveal', {
    // Vue SSR procura por getSSRProps; retornamos um objeto vazio
    getSSRProps() {
      return {};
    }
  });
});
