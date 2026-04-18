import { Product } from '@rosna/shared'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductEditor from '../components/ProductEditor'
import { ConfirmDialog, EmptyState, LoadingState, PageHeader, SecondaryButton, DangerButton } from '../components/ui'
import { getAdminProduct, updateProductStatus } from '../data/adminRepository'
import { useProductOptions } from '../hooks/useProductOptions'

const ProductEditPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [productLoading, setProductLoading] = useState(true)
  const [productError, setProductError] = useState<string | null>(null)
  const [archiveOpen, setArchiveOpen] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const { categories, collections, materials, loading: optionsLoading, error: optionsError } = useProductOptions()

  const loadProduct = useCallback(async () => {
    if (!productId) return

    setProductLoading(true)
    setProductError(null)
    try {
      setProduct(await getAdminProduct(productId))
    } catch (error) {
      setProductError(error instanceof Error ? error.message : 'Nie udalo sie pobrac produktu.')
    } finally {
      setProductLoading(false)
    }
  }, [productId])

  useEffect(() => {
    void loadProduct()
  }, [loadProduct])

  if (productLoading || optionsLoading) return <LoadingState label="Ladowanie produktu..." />

  const archiveProduct = async () => {
    if (!product) return

    setArchiving(true)
    try {
      await updateProductStatus(product.id, 'archived')
      setArchiveOpen(false)
      navigate('/admin/products')
    } catch (error) {
      setProductError(error instanceof Error ? error.message : 'Nie udalo sie zarchiwizowac produktu.')
    } finally {
      setArchiving(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Katalog"
        title={product ? `Edycja: ${product.name}` : 'Edycja produktu'}
        description="Zmien tresci, ceny, status publikacji, galerie oraz atrybuty produktu."
        actions={
          <>
            <SecondaryButton type="button" onClick={() => navigate('/admin/products')}>
              Wroc do listy
            </SecondaryButton>
            {product ? (
              <DangerButton type="button" onClick={() => setArchiveOpen(true)}>
                Archiwizuj
              </DangerButton>
            ) : null}
          </>
        }
      />
      {productError || optionsError ? (
        <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{productError ?? optionsError}</p>
      ) : null}
      {product ? (
        <ProductEditor product={product} categories={categories} collections={collections} materials={materials} onSaved={() => void loadProduct()} />
      ) : (
        <EmptyState title="Nie znaleziono produktu" description="Produkt nie istnieje albo nie masz dostepu do jego edycji." />
      )}
      <ConfirmDialog
        open={archiveOpen}
        danger
        loading={archiving}
        title="Zarchiwizowac produkt?"
        description="Produkt zostanie wycofany z pracy operacyjnej i nie bedzie widoczny publicznie."
        confirmLabel="Archiwizuj"
        onConfirm={() => void archiveProduct()}
        onCancel={() => setArchiveOpen(false)}
      />
    </div>
  )
}

export default ProductEditPage
