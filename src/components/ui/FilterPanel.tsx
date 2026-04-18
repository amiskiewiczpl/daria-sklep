import { ProductCategorySlug, ProductMaterial, ProductStatus, ShopFilterOptions, ShopFilters } from '../../types'

interface FilterPanelProps {
  filters: ShopFilters
  options: ShopFilterOptions
  onChange: (filters: ShopFilters) => void
  onClear: () => void
  isMobile?: boolean
}

const chipClass = 'min-h-10 rounded-lg border border-brand-border px-4 py-2 text-sm transition hover:border-brand-accent'

const renderToggleItem = (label: string, active: boolean, onToggle: () => void, key: string) => (
  <button
    key={key}
    type="button"
    onClick={onToggle}
    className={`${chipClass} ${active ? 'border-brand-accent bg-brand-accent/10 text-brand' : 'bg-white text-brand'}`}
  >
    {label}
  </button>
)

const FilterPanel = ({ filters, options, onChange, onClear, isMobile }: FilterPanelProps) => {
  const toggleArrayValue = <T extends string>(items: T[], value: T): T[] =>
    items.includes(value) ? items.filter((item) => item !== value) : [...items, value]

  const updateCategory = (category: ProductCategorySlug) =>
    onChange({ ...filters, categories: toggleArrayValue(filters.categories, category) })

  const updateMaterial = (material: ProductMaterial) =>
    onChange({ ...filters, materials: toggleArrayValue(filters.materials, material) })

  const updateSize = (size: string) => onChange({ ...filters, sizes: toggleArrayValue(filters.sizes, size) })
  const updateStatus = (status: ProductStatus) => onChange({ ...filters, statuses: toggleArrayValue(filters.statuses, status) })
  const updateColor = (color: string) => onChange({ ...filters, colors: toggleArrayValue(filters.colors, color) })
  const updatePattern = (pattern: string) => onChange({ ...filters, patterns: toggleArrayValue(filters.patterns, pattern) })
  const toggleNew = () => onChange({ ...filters, onlyNew: !filters.onlyNew })

  return (
    <div className={`${isMobile ? 'space-y-7' : 'space-y-9'} rounded-lg border border-brand-border bg-white p-6 shadow-premium`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="section-kicker">Filtry</p>
          <p className="text-xl font-semibold">Dopasuj ofertę</p>
        </div>
        <button type="button" onClick={onClear} className="text-sm font-semibold text-brand-accent underline-offset-2 hover:underline">
          Wyczyść
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Kategoria</p>
          <div className="flex flex-wrap gap-3">
            {options.categories.map((category: ProductCategorySlug) =>
              renderToggleItem(category, filters.categories.includes(category), () => updateCategory(category), `category-${category}`)
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Materiał</p>
          <div className="flex flex-wrap gap-3">
            {options.materials.map((material: ProductMaterial) =>
              renderToggleItem(material, filters.materials.includes(material), () => updateMaterial(material), `material-${material}`)
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Rozmiar</p>
          <div className="flex flex-wrap gap-3">
            {options.sizes.map((size: string) => renderToggleItem(size, filters.sizes.includes(size), () => updateSize(size), `size-${size}`))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Typ sprzedaży</p>
          <div className="flex flex-wrap gap-3">
            {options.statuses.map((status: ProductStatus) =>
              renderToggleItem(status === 'in-stock' ? 'Dostępne' : 'Made to order', filters.statuses.includes(status), () => updateStatus(status), `status-${status}`)
            )}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Kolor</p>
          <div className="flex flex-wrap gap-3">
            {options.colors.map((color: string) => renderToggleItem(color, filters.colors.includes(color), () => updateColor(color), `color-${color}`))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase text-brand-accent">Wzór</p>
          <div className="flex flex-wrap gap-3">
            {options.patterns.map((pattern: string) => renderToggleItem(pattern, filters.patterns.includes(pattern), () => updatePattern(pattern), `pattern-${pattern}`))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border border-brand-border bg-brand-background px-4 py-4">
          <div>
            <p className="text-sm font-semibold">Nowości</p>
            <p className="text-sm text-brand-muted">Tylko produkty z etykietą nowość.</p>
          </div>
          <button
            type="button"
            onClick={toggleNew}
            className={`${chipClass} ${filters.onlyNew ? 'border-brand-accent bg-brand-accent/10 text-brand' : 'bg-white text-brand'}`}
          >
            {filters.onlyNew ? 'Tak' : 'Nie'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
