// ~/composables/useStoragePublic.js
export function useStoragePublic (baseFromCaller) {
  // se vier do caller, usa; senão tenta runtime; senão hardcode
  const HARDCODE_BASE = 'https://cfi-backend.fly.dev/api'
  let apiBase = baseFromCaller
  if (!apiBase) {
    try {
      const cfg = useRuntimeConfig()
      apiBase = cfg?.public?.apiBase || ''
    } catch (_) {
      apiBase = ''
    }
  }
  if (!apiBase) apiBase = HARDCODE_BASE
  apiBase = apiBase.replace(/\/+$/, '')

  async function getCover ({ imovelId, tipo = 'imagens' }) {
    const qs = new URLSearchParams({ imovelId: String(imovelId), tipo })
    return await $fetch(`${apiBase}/storage/cover?${qs.toString()}`)
  }

  async function list ({ imovelId, tipo = 'imagens' }) {
    const qs = new URLSearchParams({ imovelId: String(imovelId), tipo })
    return await $fetch(`${apiBase}/storage/list?${qs.toString()}`)
  }

  return { getCover, list }
}
