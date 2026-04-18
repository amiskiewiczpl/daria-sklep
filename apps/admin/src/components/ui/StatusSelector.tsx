import {
  HomepagePublishStatus,
  ProductPublishStatus,
  homepagePublishStatuses,
  homepageStatusDescriptions,
  mapHomepageStatusToLabel,
  mapStatusToLabel,
  productPublishStatuses,
  productStatusDescriptions,
} from '@rosna/shared'

type StatusSelectorProps =
  | {
      kind: 'product'
      value: ProductPublishStatus
      onChange: (status: ProductPublishStatus) => void
      className?: string
    }
  | {
      kind: 'homepage'
      value: HomepagePublishStatus
      onChange: (status: HomepagePublishStatus) => void
      className?: string
    }

const StatusSelector = (props: StatusSelectorProps) => {
  const options = props.kind === 'product' ? productPublishStatuses : homepagePublishStatuses
  const description =
    props.kind === 'product'
      ? productStatusDescriptions[props.value]
      : homepageStatusDescriptions[props.value]

  return (
    <label className={props.className}>
      <span className="admin-label">Status publikacji</span>
      <select
        className="admin-input"
        value={props.value}
        onChange={(event) => {
          const nextStatus = event.target.value
          if (props.kind === 'product') {
            props.onChange(nextStatus as ProductPublishStatus)
            return
          }
          props.onChange(nextStatus as HomepagePublishStatus)
        }}
      >
        {options.map((status) => (
          <option key={status} value={status}>
            {props.kind === 'product' ? mapStatusToLabel(status as ProductPublishStatus) : mapHomepageStatusToLabel(status as HomepagePublishStatus)}
          </option>
        ))}
      </select>
      <p className="mt-2 text-xs leading-5 text-brand-muted">{description}</p>
    </label>
  )
}

export default StatusSelector
