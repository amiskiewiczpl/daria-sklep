import { ReactNode } from 'react'
import EmptyState from './EmptyState'

export interface DataTableColumn<T> {
  key: string
  header: ReactNode
  render: (row: T) => ReactNode
  className?: string
}

interface DataTableProps<T> {
  rows: T[]
  columns: DataTableColumn<T>[]
  getRowKey: (row: T) => string
  emptyTitle?: string
  emptyDescription?: string
}

const DataTable = <T,>({ rows, columns, getRowKey, emptyTitle = 'Brak danych', emptyDescription }: DataTableProps<T>) => {
  if (!rows.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <div className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-premium">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-brand-background text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`border-b border-brand-border px-5 py-3 ${column.className ?? ''}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {rows.map((row) => (
              <tr key={getRowKey(row)} className="align-middle transition hover:bg-brand-background/60">
                {columns.map((column) => (
                  <td key={column.key} className={`px-5 py-4 ${column.className ?? ''}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
