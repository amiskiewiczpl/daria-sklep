# @rosna/shared

Shared domain layer for Rosna storefront and admin.

## Structure

- `src/domain.ts` - domain types, unions and interfaces.
- `src/helpers.ts` - formatting, labels, slug and sorting helpers.
- `src/schemas.ts` - shared Zod schemas for common validation boundaries.
- `src/index.ts` - public barrel export used by apps.

## Storefront usage

```ts
import { Product, formatPrice, sortProducts } from '@rosna/shared'

const renderPrice = (product: Product) => formatPrice(product.price, product.currency)
const featured = sortProducts(products, 'featured')
```

## Admin usage

```ts
import { productBaseSchema, slugify, mapStatusToLabel } from '@rosna/shared'

const slug = slugify('Lniana koszula Rosna')
const result = productBaseSchema.safeParse(formValues)
const label = mapStatusToLabel('published')
```
