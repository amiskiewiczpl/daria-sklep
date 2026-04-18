import { useNavigate } from 'react-router-dom'
import ProductEditor from '../components/ProductEditor'
import { AdminPageHeader, LoadingState } from '../components/ui'
import { useProductOptions } from '../hooks/useProductOptions'

const ProductCreatePage = () => {
  const navigate = useNavigate()
  const { categories, collections, materials, loading, error } = useProductOptions()

  if (loading) return <LoadingState label="Ladowanie formularza produktu..." />

  return (
    <div>
      <AdminPageHeader
        eyebrow="Katalog"
        title="Nowy produkt"
        description="Utworz produkt, ustaw status publikacji, atrybuty, materialy i zdjecia produktowe."
      />
      {error ? <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{error}</p> : null}
      <ProductEditor categories={categories} collections={collections} materials={materials} onSaved={(productId) => navigate(`/admin/products/${productId}`)} />
    </div>
  )
}

export default ProductCreatePage
