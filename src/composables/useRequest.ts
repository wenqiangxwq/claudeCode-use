import { ref } from 'vue'
import type { AxiosRequestConfig } from 'axios'

interface UseRequestOptions<T> {
  manual?: boolean
  defaultParams?: unknown[]
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useRequest<T = unknown>(
  service: (params?: unknown) => Promise<T>,
  options: UseRequestOptions<T> = {}
) {
  const { manual = false, defaultParams = [], onSuccess, onError } = options

  const loading = ref(false)
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)

  async function run(...params: unknown[]) {
    loading.value = true
    error.value = null

    try {
      const res = await service(...params)
      data.value = res
      onSuccess?.(res)
      return res
    } catch (err) {
      error.value = err as Error
      onError?.(err as Error)
      throw err
    } finally {
      loading.value = false
    }
  }

  if (!manual) {
    run(...defaultParams)
  }

  return {
    loading,
    data,
    error,
    run
  }
}
