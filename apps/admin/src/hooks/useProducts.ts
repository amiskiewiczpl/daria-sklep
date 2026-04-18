import { Product, ProductProductionType, ProductPublishStatus, mapStatusToLabel } from '@rosna/shared'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { duplicateProduct, listAdminProducts, softDeleteProduct, updateProductStatus } from '../data/adminRepository'

export interface ProductFilters {
  status: 'all' | ProductPublishStatus
  categoryId: 'all' | string
  productionType: 'all' | ProductProductionType
  search: string
}

export const PRODUCT_PAGE_SIZE = 12

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [filters, setFilters] = useState<ProductFilters>({
    status: 'all',
    categoryId: 'all',
    productionType: 'all',
    search: '',
  })
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [busyProductId, setBusyProductId] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setProducts(await listAdminProducts())
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Nie udalo sie pobrac produktow.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    setPage(1)
  }, [filters])

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const normalizedSearch = filters.search.trim().toLowerCase()
        const statusMatches = filters.status === 'all' || product.publishStatus === filters.status
        const categoryMatches = filters.categoryId === 'all' || product.categoryId === filters.categoryId
        const productionMatches = filters.productionType === 'all' || product.productionType === filters.productionType
        const searchMatches =
          !normalizedSearch ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.slug.toLowerCase().includes(normalizedSearch)

        return statusMatches && categoryMatches && productionMatches && searchMatches
      }),
    [filters, products],
  )

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCT_PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCT_PAGE_SIZE, currentPage * PRODUCT_PAGE_SIZE)

  const runProductAction = async (productId: string, action: () => Promise<void>, successText: string) => {
    setBusyProductId(productId)
    setActionMessage(null)

    try {
      await action()
      setActionMessage({ type: 'success', text: successText })
      await refresh()
    } catch (requestError) {
      setActionMessage({
        type: 'error',
        text: requestError instanceof Error ? requestError.message : 'Nie udalo sie wykonac akcji.',
      })
    } finally {
      setBusyProductId(null)
    }
  }

  const changeStatus = (productId: string, status: ProductPublishStatus) =>
    runProductAction(productId, () => updateProductStatus(productId, status), `Status produktu zostal zmieniony na: ${mapStatusToLabel(status)}.`)

  const archiveProduct = (productId: string) =>
    runProductAction(productId, () => softDeleteProduct(productId), 'Produkt zostal zarchiwizowany.')

  const duplicate = (productId: string) =>
    runProductAction(productId, () => duplicateProduct(productId).then(() => undefined), 'Produkt zostal zduplikowany jako draft.')

  const bulkChangeStatus = async (productIds: string[], status: ProductPublishStatus) => {
    setActionMessage(null)
    try {
      await Promise.all(productIds.map((productId) => updateProductStatus(productId, status)))
      setActionMessage({ type: 'success', text: `Zmieniono status ${productIds.length} produktow na: ${mapStatusToLabel(status)}.` })
      await refresh()
    } catch (requestError) {
      setActionMessage({
        type: 'error',
        text: requestError instanceof Error ? requestError.message : 'Nie udalo sie wykonac akcji masowej.',
      })
    }
  }

  return {
    products,
    filteredProducts,
    paginatedProducts,
    filters,
    setFilters,
    page: currentPage,
    pageCount,
    setPage,
    loading,
    error,
    actionMessage,
    busyProductId,
    refresh,
    changeStatus,
    archiveProduct,
    duplicate,
    bulkChangeStatus,
  }
}
