import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDocBySlug } from '@/lib/mdx'

export default async function DocsPage() {
  const { content, meta } = getDocBySlug('index')
  
  return (
    <article className="prose dark:prose-invert max-w-none">
      <h1>{meta.title}</h1>
      <MDXRemote source={content} />
    </article>
  )
}
