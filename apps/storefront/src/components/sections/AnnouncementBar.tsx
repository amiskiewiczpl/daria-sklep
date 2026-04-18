import { useHomepageSections } from '../../hooks/useHomepageSections'

const AnnouncementBar = () => {
  const { sections } = useHomepageSections()
  const announcement = sections.find((section) => section.key === 'announcement_bar')

  return (
    <div className="bg-brand px-4 py-3 text-center text-sm font-medium text-white">
      {announcement?.title ?? 'Dostawa gratis od 200 zl · Eleganckie opakowanie przy kazdym zamowieniu.'}
    </div>
  )
}

export default AnnouncementBar
