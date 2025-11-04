// ~/composables/useImoveis.js
import { useState, useRuntimeConfig } from '#imports'

export function useImoveis () {
  const { $axios } = useNuxtApp()
  const { public: pub } = useRuntimeConfig()
  const apiBase = (pub.apiBase || 'https://cfi-backend.fly.dev/api').replace(/\/+$/, '')

  const items    = useState('imoveis-items',   () => [])
  const pageInfo = useState('imoveis-page',    () => ({ page: 0, size: 20, totalElements: 0, totalPages: 0 }))
  const loading  = useState('imoveis-loading', () => false)
  const error    = useState('imoveis-error',   () => null)

  const normalizeId = (it) => it?.id ?? it?._id ?? it?.imovelId ?? null

  async function listarPublicos ({ page = 0, size = 20, titulo = '', force = false } = {}) {
    if (!force && items.value.length && page === 0 && !titulo) return items.value
    loading.value = true
    error.value = null
    try {
      const params = { page, size }
      if (titulo) params.titulo = titulo

      const data = await $axios.get(`${apiBase}/imoveis/publicos`, { params })
      const content = Array.isArray(data?.content) ? data.content : (Array.isArray(data) ? data : [])

      items.value = content.map(it => ({
        ...it,
        id: String(normalizeId(it) ?? ''),
        cidadeLabel: it?.endereco?.cidade || '',
        bairroLabel: it?.endereco?.bairro || '',
        capa: it?.capaUrl || it?.capa || ''
      }))

      pageInfo.value = {
        page, size,
        totalElements: data?.totalElements ?? items.value.length,
        totalPages: data?.totalPages ?? 1
      }

      return items.value
    } catch (e) {
      console.error(e)
      error.value = e?.message || 'Falha ao listar imóveis públicos'
      items.value = []
      return items.value
    } finally {
      loading.value = false
    }
  }

  async function buscarPorId (id) {
    if (!id) throw new Error('ID é obrigatório')
    const realId = String(id)
    loading.value = true
    error.value = null
    try {
      const it = await $axios.get(`${apiBase}/imoveis/${encodeURIComponent(realId)}`)
      const normId = String(normalizeId(it) ?? realId)
      return { id: normId, ...it, capa: it?.capaUrl || it?.capa || '' }
    } catch (e) {
      console.error(e)
      error.value = e?.message || 'Falha ao buscar imóvel'
      throw e
    } finally {
      loading.value = false
    }
  }

  const listar = listarPublicos
  return { items, pageInfo, loading, error, listarPublicos, listar, buscarPorId }
}
