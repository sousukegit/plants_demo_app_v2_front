import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'


export async function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiUrl as string,

    headers: token ? { 'Content-Type': 'application/json', 'x-csrf-token': token } : {},

    query: options?.query || {},

  }

  const body = options?.body
  defaults.body = body ? snakecaseKeys(<object>body, { deep: true }) : null

  const params = options?.params
  defaults.params = params ? snakecaseKeys(<object>params, { deep: true }) : {}

  defaults.credentials = 'include'

  const convertOptions = defu(options, defaults)

  return useFetch(url, convertOptions)
}