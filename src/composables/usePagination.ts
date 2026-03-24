import { ref, computed } from 'vue'

interface PaginationOptions {
  current?: number
  pageSize?: number
}

export function usePagination(options: PaginationOptions = {}) {
  const { current = 1, pageSize = 10 } = options

  const currentPage = ref(current)
  const pageSizeValue = ref(pageSize)

  const pagination = computed(() => ({
    current: currentPage.value,
    pageSize: pageSizeValue.value,
    total: 0
  }))

  function handlePageChange(page: number) {
    currentPage.value = page
  }

  function handleSizeChange(size: number) {
    pageSizeValue.value = size
    currentPage.value = 1
  }

  function resetPagination() {
    currentPage.value = 1
  }

  return {
    currentPage,
    pageSize: pageSizeValue,
    pagination,
    handlePageChange,
    handleSizeChange,
    resetPagination
  }
}
