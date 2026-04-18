import { Category, ProductProductionType, ProductPublishStatus, mapStatusToLabel, productPublishStatuses } from '@rosna/shared'
import { ProductFilters } from '../../hooks/useProducts'

interface ProductsFiltersProps {
  filters: ProductFilters
  categories: Category[]
  onChange: (filters: ProductFilters) => void
}

const statuses: Array<'all' | ProductPublishStatus> = ['all', ...productPublishStatuses]
const productionTypes: Array<'all' | ProductProductionType> = ['all', 'in_stock', 'made_to_order']

const ProductsFilters = ({ filters, categories, onChange }: ProductsFiltersProps) => (
  <section className="admin-card mb-6">
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
      <label>
        <span className="admin-label">Szukaj</span>
        <input
          className="admin-input"
          value={filters.search}
          placeholder="Nazwa lub slug"
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </label>
      <label>
        <span className="admin-label">Status</span>
        <select
          className="admin-input"
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value as ProductFilters['status'] })}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === 'all' ? 'Wszystkie' : mapStatusToLabel(status)}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="admin-label">Kategoria</span>
        <select className="admin-input" value={filters.categoryId} onChange={(event) => onChange({ ...filters, categoryId: event.target.value })}>
          <option value="all">Wszystkie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="admin-label">Produkcja</span>
        <select
          className="admin-input"
          value={filters.productionType}
          onChange={(event) => onChange({ ...filters, productionType: event.target.value as ProductFilters['productionType'] })}
        >
          {productionTypes.map((productionType) => (
            <option key={productionType} value={productionType}>
              {productionType === 'all' ? 'Wszystkie' : productionType}
            </option>
          ))}
        </select>
      </label>
    </div>
  </section>
)

export default ProductsFilters
