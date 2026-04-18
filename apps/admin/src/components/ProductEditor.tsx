import { zodResolver } from '@hookform/resolvers/zod'
import { AdminProductFormValues, Category, Collection, Material, Product, canProductBePublic } from '@rosna/shared'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { saveProduct } from '../data/adminRepository'
import {
  ProductAttributesSection,
  ProductBasicsSection,
  ProductClassificationSection,
  ProductPricingSection,
  ProductPublishingSection,
} from './product-form/ProductFormSections'
import { ProductFormValues, productFormSchema } from './product-form/productFormSchema'
import { ProductImagesManager } from './product-images'
import { FormSection, PrimaryButton, SecondaryButton, StatusBadge, Toggle } from './ui'

interface ProductEditorProps {
  product?: Product
  categories: Category[]
  collections: Collection[]
  materials: Material[]
  onSaved: (productId: string) => void
}

const productToForm = (
  product: Product | undefined,
  categories: Category[],
  materials: Material[],
): ProductFormValues => {
  const materialIds = product?.materials
    ? materials.filter((material) => product.materials.includes(material.slug as never)).map((material) => material.id)
    : []
  const patterns = Array.from(new Set((product?.variants ?? []).map((variant) => variant.pattern).filter(Boolean))) as string[]

  return {
    id: product?.id,
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    shortDescription: product?.shortDescription ?? '',
    description: product?.description ?? '',
    price: product?.price ?? 0,
    compareAtPrice: product?.compareAtPrice,
    currency: product?.currency ?? 'PLN',
    categoryId: product?.categoryId ?? categories[0]?.id ?? '',
    collectionId: product?.collectionId,
    productionType: product?.productionType ?? 'in_stock',
    leadTimeDays: product?.leadTimeDays ?? 21,
    status: product?.publishStatus ?? 'draft',
    isNew: product?.isNew ?? false,
    isBestSeller: product?.isBestSeller ?? false,
    isFeatured: product?.isFeatured ?? false,
    sortOrder: 0,
    sizes: product?.sizes ?? ['XS', 'S', 'M', 'L'],
    colors: product?.colors ?? [],
    patterns,
    materials: materialIds,
    tags: product?.tags ?? [],
  }
}

const ProductEditor = ({ product, categories, collections, materials, onSaved }: ProductEditorProps) => {
  const [searchParams] = useSearchParams()
  const defaultValues = useMemo(() => productToForm(product, categories, materials), [categories, materials, product])
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [savingMode, setSavingMode] = useState<'publish' | 'draft' | null>(null)

  const isSaving = Boolean(savingMode)
  const isEditMode = Boolean(product?.id)
  const previewRequested = searchParams.get('preview') === '1'
  const watchedValues = form.watch()
  const canBePublic = canProductBePublic({ publishStatus: watchedValues.status })

  const handleSave = async (values: ProductFormValues, mode: 'publish' | 'draft' = 'publish') => {
    setSavingMode(mode)
    setMessage(null)

    try {
      const payload: AdminProductFormValues = {
        ...values,
        status: mode === 'draft' ? 'draft' : values.status,
        compareAtPrice: values.compareAtPrice || undefined,
        collectionId: values.collectionId || undefined,
        leadTimeDays: values.productionType === 'made_to_order' ? values.leadTimeDays : undefined,
      }
      const productId = await saveProduct(payload)

      const savedValues = { ...values, id: productId, status: payload.status }
      form.reset(savedValues)
      setMessage({
        type: 'success',
        text: mode === 'draft' ? 'Draft produktu zostal bezpiecznie zapisany.' : 'Produkt zostal zapisany.',
      })
      onSaved(productId)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Nie udalo sie zapisac produktu.',
      })
    } finally {
      setSavingMode(null)
    }
  }

  const handleDraftSave = form.handleSubmit((values) => handleSave(values, 'draft'))

  return (
    <form onSubmit={form.handleSubmit((values) => handleSave(values, 'publish'))} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        <ProductBasicsSection form={form} />
        <ProductPricingSection form={form} />
        <ProductClassificationSection form={form} categories={categories} collections={collections} materials={materials} />
        <ProductAttributesSection form={form} categories={categories} collections={collections} materials={materials} />
        <ProductPublishingSection form={form} />
        <ProductImagesManager productId={product?.id} images={product?.imageItems ?? []} onChanged={() => product?.id && onSaved(product.id)} />
      </div>

      <aside className="space-y-6">
        <FormSection eyebrow={isEditMode ? 'Edit mode' : 'Create mode'} title="Zapis produktu" className="sticky top-6">
          <div>
            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {form.formState.isDirty ? 'Masz niezapisane zmiany.' : 'Wszystkie zapisane zmiany sa zsynchronizowane z formularzem.'}
            </p>
          </div>

          <div className="rounded-lg border border-brand-border bg-brand-background p-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={watchedValues.status} />
              <span className="text-xs text-brand-muted">
                {canBePublic ? 'Po zapisie produkt moze byc publiczny.' : 'Storefront nie pokaze tego produktu.'}
              </span>
            </div>
          </div>

          <PrimaryButton type="submit" className="w-full" disabled={isSaving}>
            {savingMode === 'publish' ? 'Zapisywanie...' : 'Zapisz produkt'}
          </PrimaryButton>
          <SecondaryButton type="button" className="w-full" disabled={isSaving} onClick={() => void handleDraftSave()}>
            {savingMode === 'draft' ? 'Zapisywanie draftu...' : 'Bezpieczny save draft'}
          </SecondaryButton>

          <div className="grid gap-3">
            {[
              ['isNew', 'New'],
              ['isBestSeller', 'Bestseller'],
              ['isFeatured', 'Featured'],
            ].map(([key, label]) => {
              const fieldName = key as 'isNew' | 'isBestSeller' | 'isFeatured'
              return (
                <Toggle
                  key={key}
                  label={label}
                  checked={Boolean(watchedValues[fieldName])}
                  onChange={(checked) => form.setValue(fieldName, checked, { shouldDirty: true, shouldValidate: true })}
                />
              )
            })}
          </div>

          {message ? (
            <p
              className={`rounded-lg border p-3 text-sm ${
                message.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-red-200 bg-red-50 text-red-800'
              }`}
            >
              {message.text}
            </p>
          ) : null}
        </FormSection>

        <FormSection eyebrow={previewRequested ? 'Preview mode' : 'Preview admina'} title={watchedValues.name || 'Nazwa produktu'}>
          <div>
            <p className="mt-2 text-sm leading-6 text-brand-muted">
              {watchedValues.shortDescription || 'Krotki opis produktu pojawi sie tutaj przed publikacja.'}
            </p>
          </div>
          <div className="rounded-lg border border-brand-border bg-brand-background p-4 text-sm">
            <p className="font-semibold">{Number(watchedValues.price || 0).toLocaleString('pl-PL')} {watchedValues.currency || 'PLN'}</p>
            <p className="mt-2 text-brand-muted">
              {canBePublic ? 'Publiczny po zapisie jako published.' : 'Bezpieczny podglad roboczy w adminie.'}
            </p>
          </div>
        </FormSection>
      </aside>
    </form>
  )
}

export default ProductEditor
