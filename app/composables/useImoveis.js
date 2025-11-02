import { useRuntimeConfig, useState } from '#imports'
import { useStoragePublic } from '~/composables/useStoragePublic'

export function useImoveis () {
  const { public: pub } = useRuntimeConfig()
  const apiBase = (pub.apiBase || '').replace(/\/+$/, '')
  const { getCover, list: listStorage } = useStoragePublic()

  const items = useState('imoveis-items', () => [])
  const pageInfo = useState('imoveis-page', () => ({}))
  const loading = useState('imoveis-loading', () => false)
  const error = useState('imoveis-error', () => null)

  async function listar ({ titulo = '', page = 0, size = 30, force = false } = {}) {
    if (process.meta.client && !force && items.value.length && page === 0 && !titulo) return

    loading.value = true
    error.value = null
    try {
      const qs = new URLSearchParams({ page, size })
      if (titulo) qs.set('titulo', titulo)

      const data = await $fetch(`${apiBase}/imoveis/publicos?${qs.toString()}`)
      const content = Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data) ? data : []

      const base = content.map(it => ({
        ...it,
        cidadeLabel: it.endereco?.cidade || '',
        bairroLabel: it.endereco?.bairro || '',
        capa: it.capa || ''
      }))

      items.value = base
      pageInfo.value = { ...data, content: undefined }

      if (process.meta.client) {
        const toFill = items.value.filter(i => !i.capa)
        for (const imv of toFill) {
          try {
            const c = await getCover({ imovelId: imv.id, tipo: 'imagens' })
            if (c?.coverUrlHq || c?.coverUrl) {
              imv.capa = c.coverUrlHq || c.coverUrl
              continue
            }
            const imgs = await listStorage({ imovelId: imv.id, tipo: 'imagens' })
            if (Array.isArray(imgs) && imgs.length) {
              imv.capa = imgs[0].url
            }
          } catch {}
        }
      }
    } catch (e) {
      console.error(e)
      error.value = e?.data?.message || e?.message || 'Falha ao listar imóveis'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  async function buscarPorId (id) {
    const cached = items.value.find(i => i.id === id)
    if (cached && cached.capa) return cached

    try {
      const it = await $fetch(`${apiBase}/imoveis/publicos/${id}`)
      let capa = cached?.capa || ''
      if (!capa && process.meta.client) {
        try {
          const c = await getCover({ imovelId: id, tipo: 'imagens' })
          capa = c?.coverUrlHq || c?.coverUrl || ''
        } catch {
          try {
            const imgs = await listStorage({ imovelId: id, tipo: 'imagens' })
            capa = Array.isArray(imgs) && imgs.length ? imgs[0].url : ''
          } catch {}
        }
      }
      return { ...it, capa }
    } catch (e) {
      error.value = e?.data?.message || e?.message || 'Falha ao buscar imóvel'
      throw e
    }
  }

  return {
    items,
    pageInfo,
    loading,
    error,
    listar,
    buscarPorId
  }
}
