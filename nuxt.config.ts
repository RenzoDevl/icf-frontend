// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

const base = '/icf-frontend/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  plugins: ['~/plugins/reveal.client.ts'],

  modules: ['@nuxt/icon'],

  app: {
    baseURL: base,
    head: {
      titleTemplate: '%s — CFI',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: base + 'favicon.svg' },
        { rel: 'icon', type: 'image/png', href: base + 'favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: base + 'favicon-16x16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/x-icon', href: base + 'favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: base + 'apple-touch-icon.png' },
        { rel: 'manifest', href: base + 'site.webmanifest?v=3' }
      ],
      meta: [{ name: 'theme-color', content: '#ffffff' }]
    }
  },

  runtimeConfig: {
    public: {
      // força o remoto em dev também
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://cfi-backend.fly.dev/api'
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 4000
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/', '/contato', '/sobre']
    },
    routeRules: {
      '/imoveis': { prerender: false },
      '/icf-frontend/imoveis': { prerender: false }
    }
  }
})
