// composables/useImoveis.js
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

  // listar públicos
  async function listar ({ titulo = '', page = 0, size = 30, force = false } = {}) {
    // ❗ antes travava aqui
    if (!force && items.value.length && page === 0 && !titulo) {
      return
    }

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
        capa: ''
      }))

      const covers = await Promise.all(
        base.map(async (imv) => {
          try {
            const c = await getCover({ imovelId: imv.id, tipo: 'imagens' })
            if (c?.coverUrlHq || c?.coverUrl) return c.coverUrlHq || c.coverUrl
          } catch {}
          try {
            const imgs = await listStorage({ imovelId: imv.id, tipo: 'imagens' })
            if (Array.isArray(imgs) && imgs.length) return imgs[0].url
          } catch {}
          return ''
        })
      )

      items.value = base.map((imv, i) => ({ ...imv, capa: covers[i] || '' }))
      pageInfo.value = { ...data, content: undefined }
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
    if (cached) return cached

    try {
      const it = await $fetch(`${apiBase}/imoveis/publicos/${id}`)
      let capa = ''
      try {
        const c = await getCover({ imovelId: id, tipo: 'imagens' })
        capa = c?.coverUrlHq || c?.coverUrl || ''
      } catch {
        try {
          const imgs = await listStorage({ imovelId: id, tipo: 'imagens' })
          capa = Array.isArray(imgs) && imgs.length ? imgs[0].url : ''
        } catch {}
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
