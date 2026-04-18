interface PageHeaderProps {
  kicker: string
  title: string
  lead?: string
  align?: 'center' | 'left'
}

const PageHeader = ({ kicker, title, lead, align = 'center' }: PageHeaderProps) => {
  const alignment = align === 'left' ? 'text-left' : 'mx-auto text-center'
  const leadAlignment = align === 'left' ? '' : 'mx-auto'

  return (
    <div className={`mb-10 max-w-3xl ${alignment}`}>
      <p className="section-kicker">{kicker}</p>
      <h1 className="text-4xl font-semibold leading-tight text-brand sm:text-5xl">{title}</h1>
      {lead ? <p className={`mt-5 max-w-2xl text-base leading-8 text-brand-muted ${leadAlignment}`}>{lead}</p> : null}
    </div>
  )
}

export default PageHeader
