import { Sidebar } from '@/components/docs/sidebar'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  )
}
