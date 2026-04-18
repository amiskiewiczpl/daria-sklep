import { Controller, UseFormReturn } from 'react-hook-form'
import { Category, Collection, Material } from '@rosna/shared'
import { FormSection, MultiSelect, Select, StatusSelector, TextInput, Textarea } from '../ui'
import { joinListValue, ProductFormValues, splitListValue } from './productFormSchema'

interface ProductFormSectionsProps {
  form: UseFormReturn<ProductFormValues>
  categories: Category[]
  collections: Collection[]
  materials: Material[]
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-2 text-sm font-medium text-red-700">{message}</p> : null

const toOptionalNumber = (value: string) => (value === '' ? undefined : Number(value))
const toOptionalString = (value: string) => (value === '' ? undefined : value)

export const ProductBasicsSection = ({ form }: Pick<ProductFormSectionsProps, 'form'>) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <FormSection eyebrow="Dane produktu" title="Nazwa i opis">

      <div className="grid gap-4 md:grid-cols-2">
        <TextInput label="Nazwa produktu" error={errors.name?.message} {...register('name')} />
        <TextInput label="Slug" error={errors.slug?.message} {...register('slug')} />
      </div>

      <Textarea label="Krotki opis" className="min-h-24" error={errors.shortDescription?.message} {...register('shortDescription')} />

      <Textarea label="Pelny opis" className="min-h-44" error={errors.description?.message} {...register('description')} />
    </FormSection>
  )
}

export const ProductPricingSection = ({ form }: Pick<ProductFormSectionsProps, 'form'>) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <FormSection eyebrow="Cena" title="Cennik">

      <div className="grid gap-4 md:grid-cols-3">
        <TextInput label="Cena" type="number" min={0} step="0.01" error={errors.price?.message} {...register('price', { valueAsNumber: true })} />
        <TextInput
          label="Cena przed promocja"
          type="number"
          min={0}
          step="0.01"
          error={errors.compareAtPrice?.message}
          {...register('compareAtPrice', { setValueAs: toOptionalNumber })}
        />
        <TextInput label="Waluta" className="uppercase" error={errors.currency?.message} {...register('currency')} />
      </div>
    </FormSection>
  )
}

export const ProductClassificationSection = ({ form, categories, collections }: ProductFormSectionsProps) => {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <FormSection eyebrow="Klasyfikacja" title="Kategoria i kolekcja">

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Kategoria"
          error={errors.categoryId?.message}
          options={[
            { label: 'Wybierz kategorie', value: '' },
            ...categories.map((category) => ({ label: category.name, value: category.id })),
          ]}
          {...register('categoryId')}
        />
        <Select
          label="Kolekcja"
          error={errors.collectionId?.message}
          options={[
            { label: 'Bez kolekcji', value: '' },
            ...collections.map((collection) => ({ label: collection.name, value: collection.id })),
          ]}
          {...register('collectionId', { setValueAs: toOptionalString })}
        />
      </div>
    </FormSection>
  )
}

export const ProductAttributesSection = ({ form, materials }: ProductFormSectionsProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = form
  const selectedMaterials = watch('materials')

  return (
    <FormSection eyebrow="Atrybuty" title="Materialy, rozmiary, kolory i wzory">

      <div className="grid gap-4 md:grid-cols-2">
        <Controller
          control={control}
          name="sizes"
          render={({ field }) => (
            <label>
              <span className="admin-label">Rozmiary, po przecinku</span>
              <input className="admin-input" value={joinListValue(field.value)} onChange={(event) => field.onChange(splitListValue(event.target.value))} />
              <FieldError message={errors.sizes?.message} />
            </label>
          )}
        />
        <Controller
          control={control}
          name="colors"
          render={({ field }) => (
            <label>
              <span className="admin-label">Kolory, po przecinku</span>
              <input className="admin-input" value={joinListValue(field.value)} onChange={(event) => field.onChange(splitListValue(event.target.value))} />
              <FieldError message={errors.colors?.message} />
            </label>
          )}
        />
        <Controller
          control={control}
          name="patterns"
          render={({ field }) => (
            <label>
              <span className="admin-label">Wzory, po przecinku</span>
              <input className="admin-input" value={joinListValue(field.value)} onChange={(event) => field.onChange(splitListValue(event.target.value))} />
              <FieldError message={errors.patterns?.message} />
            </label>
          )}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <label>
              <span className="admin-label">Tagi, po przecinku</span>
              <input className="admin-input" value={joinListValue(field.value)} onChange={(event) => field.onChange(splitListValue(event.target.value))} />
              <FieldError message={errors.tags?.message} />
            </label>
          )}
        />
      </div>

      <MultiSelect
        label="Materialy"
        values={selectedMaterials}
        options={materials.map((material) => ({ label: material.name, value: material.id }))}
        onChange={(next) => setValue('materials', next, { shouldDirty: true, shouldValidate: true })}
        error={errors.materials?.message}
      />
    </FormSection>
  )
}

export const ProductPublishingSection = ({ form }: Pick<ProductFormSectionsProps, 'form'>) => {
  const {
    register,
    watch,
    formState: { errors },
  } = form
  const productionType = watch('productionType')

  return (
    <FormSection eyebrow="Publikacja" title="Status i produkcja">

      <div className="grid gap-4 md:grid-cols-3">
        <Select
          label="Production type"
          error={errors.productionType?.message}
          options={[
            { label: 'In stock', value: 'in_stock' },
            { label: 'Made to order', value: 'made_to_order' },
          ]}
          {...register('productionType')}
        />
        <TextInput
          label="Lead time w dniach"
          type="number"
          min={0}
          disabled={productionType === 'in_stock'}
          error={errors.leadTimeDays?.message}
          {...register('leadTimeDays', { valueAsNumber: true })}
        />
        <Controller
          control={form.control}
          name="status"
          render={({ field }) => (
            <StatusSelector kind="product" value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      <FieldError message={errors.status?.message} />
    </FormSection>
  )
}
