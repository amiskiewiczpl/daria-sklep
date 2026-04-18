import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-lg bg-white shadow-premium">
        <img src={images[activeIndex]} alt={`Zdjęcie produktu ${activeIndex + 1}`} className="aspect-[4/5] w-full object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-lg border p-1 transition ${
              activeIndex === index ? 'border-brand-accent' : 'border-brand-border hover:border-brand-accent'
            }`}
          >
            <img src={image} alt={`Miniatura ${index + 1}`} className="aspect-square w-full rounded-md object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
