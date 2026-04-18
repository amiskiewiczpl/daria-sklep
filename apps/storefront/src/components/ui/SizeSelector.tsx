interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string
  onChange: (value: string) => void
}

const SizeSelector = ({ sizes, selectedSize, onChange }: SizeSelectorProps) => {
  return (
    <div>
      <p className="section-kicker">Rozmiar</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={`min-h-12 rounded-lg border px-4 py-3 text-sm font-medium transition ${
              selectedSize === size
                ? 'border-brand-accent bg-brand-accent/10 text-brand'
                : 'border-brand-border bg-white text-brand hover:border-brand-accent'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
