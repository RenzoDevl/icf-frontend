// ~/composables/useStoragePublic.js
import { useRuntimeConfig } from '#imports'

export function useStoragePublic (baseFromCaller) {
  const { $axios } = useNuxtApp()
  const { public: pub } = useRuntimeConfig()
  const apiBase = (baseFromCaller || pub.apiBase || 'https://cfi-backend.fly.dev/api').replace(/\/+$/, '')

  const norm = (u) => {
    if (!u) return ''
    try { const url = new URL(u); return url.origin + url.pathname } catch { return String(u).split('?')[0] }
  }
  const dedupe = (arr) => {
    const seen = new Set(), out = []
    for (const u of arr) {
      const k = norm(u)
      if (u && !seen.has(k)) { seen.add(k); out.push(u) }
    }
    return out
  }

  async function getCover ({ imovelId, tipo = 'imagens' } = {}) {
    const resp = await $axios.get(`${apiBase}/storage/cover`, { params: { imovelId: String(imovelId), tipo } })
    const data = resp?.data ?? resp
    return data
  }

  async function list ({ imovelId, tipo = 'imagens' } = {}) {
    const resp = await $axios.get(`${apiBase}/storage/list`, { params: { imovelId: String(imovelId), tipo } })
    const data = resp?.data ?? resp
    return data
  }

  async function gallery ({ imovelId, tipo = 'imagens' } = {}) {
    const c = await getCover({ imovelId, tipo })
    const l = await list({ imovelId, tipo })
    const raw = [
      c?.coverUrlHq,
      c?.coverUrl,
      ...(Array.isArray(l) ? l.map(o => o?.url).filter(Boolean) : [])
    ]
    return dedupe(raw)
  }

  return { getCover, list, gallery }
}
