import axios from 'axios'

export default defineNuxtPlugin((nuxtApp) => {
  const { public: pub } = useRuntimeConfig()

  const instance = axios.create({
    baseURL: (pub.apiBase || 'https://cfi-backend.fly.dev/api').replace(/\/+$/, ''),
    timeout: 15000,
    withCredentials: false
  })

  // request: ex. auth header se precisar
  instance.interceptors.request.use((config) => {
    // const token = useCookie('token').value
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // response: sempre devolver data e normalizar erro
  instance.interceptors.response.use(
    (resp) => resp.data,
    (err) => {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Falha na requisição'
      return Promise.reject(new Error(msg))
    }
  )

  return {
    provide: { axios: instance }
  }
})
