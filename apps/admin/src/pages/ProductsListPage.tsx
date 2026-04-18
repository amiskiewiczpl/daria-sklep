import { ProductPublishStatus, mapStatusToLabel } from '@rosna/shared'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductsFilters, ProductsTable } from '../components/products'
import { AdminPageHeader, EmptyState, LoadingState } from '../components/ui'
import { useProductOptions } from '../hooks/useProductOptions'
import { PRODUCT_PAGE_SIZE, useProducts } from '../hooks/useProducts'

const bulkStatuses: ProductPublishStatus[] = ['published', 'hidden', 'draft', 'archived']

const ProductsListPage = () => {
  const { categories } = useProductOptions()
  const {
    filteredProducts,
    paginatedProducts,
    filters,
    setFilters,
    page,
    pageCount,
    setPage,
    loading,
    error,
    actionMessage,
    busyProductId,
    changeStatus,
    archiveProduct,
    duplicate,
    bulkChangeStatus,
  } = useProducts()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [bulkStatus, setBulkStatus] = useState<ProductPublishStatus>('published')

  const runBulkAction = async () => {
    if (!selectedIds.length) return
    await bulkChangeStatus(selectedIds, bulkStatus)
    setSelectedIds([])
  }

  if (loading) return <LoadingState label="Ladowanie produktow..." />

  return (
    <div>
      <AdminPageHeader
        eyebrow="Katalog"
        title="Produkty"
        description="Produkcyjna lista katalogu z filtrowaniem, wyszukiwaniem, paginacja i szybkimi akcjami publikacji."
        actions={
          <Link className="admin-button" to="/admin/products/new">
            Dodaj produkt
          </Link>
        }
      />

      <ProductsFilters filters={filters} categories={categories} onChange={setFilters} />

      <section className="mb-6 flex flex-col gap-4 rounded-lg border border-brand-border bg-white p-4 shadow-premium lg:flex-row lg:items-center lg:justify-between">
        <div className="text-sm text-brand-muted">
          Wyniki: <span className="font-semibold text-brand">{filteredProducts.length}</span>
          <span className="mx-2">/</span>
          Strona {page} z {pageCount}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-brand-muted">Zaznaczone: {selectedIds.length}</p>
          <select className="admin-input min-w-44" value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value as ProductPublishStatus)}>
            {bulkStatuses.map((status) => (
              <option key={status} value={status}>
                {mapStatusToLabel(status)}
              </option>
            ))}
          </select>
          <button className="admin-button-secondary" type="button" disabled={!selectedIds.length} onClick={() => void runBulkAction()}>
            Zastosuj masowo
          </button>
        </div>
      </section>

      {error ? <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</p> : null}
      {actionMessage ? (
        <p
          className={`mb-6 rounded-lg border p-4 text-sm ${
            actionMessage.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {actionMessage.text}
        </p>
      ) : null}

      {paginatedProducts.length ? (
        <>
          <ProductsTable
            products={paginatedProducts}
            selectedIds={selectedIds}
            busyProductId={busyProductId}
            onSelectionChange={setSelectedIds}
            onChangeStatus={(productId, status) => void changeStatus(productId, status)}
            onDuplicate={(productId) => void duplicate(productId)}
            onArchive={(productId) => void archiveProduct(productId)}
          />
          <Pagination
            page={page}
            pageCount={pageCount}
            total={filteredProducts.length}
            onPageChange={setPage}
          />
        </>
      ) : (
        <EmptyState
          title="Brak produktow"
          description="Dodaj pierwszy produkt albo zmien filtry listy."
          action={<Link className="admin-button" to="/admin/products/new">Dodaj produkt</Link>}
        />
      )}
    </div>
  )
}

const Pagination = ({
  page,
  pageCount,
  total,
  onPageChange,
}: {
  page: number
  pageCount: number
  total: number
  onPageChange: (page: number) => void
}) => {
  const start = total ? (page - 1) * PRODUCT_PAGE_SIZE + 1 : 0
  const end = Math.min(page * PRODUCT_PAGE_SIZE, total)

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-lg border border-brand-border bg-white p-4 shadow-premium sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-brand-muted">
        Pokazano {start}-{end} z {total}
      </p>
      <div className="flex gap-2">
        <button className="admin-button-secondary" type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Poprzednia
        </button>
        <button className="admin-button-secondary" type="button" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          Nastepna
        </button>
      </div>
    </div>
  )
}

export default ProductsListPage
