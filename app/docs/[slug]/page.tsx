import { MDXRemote } from 'next-mdx-remote/rsc'
import { getDocBySlug } from '@/lib/mdx'
import { notFound } from 'next/navigation'

export default async function DocPage({ params }: { params: { slug: string } }) {
  try {
    const { content, meta } = getDocBySlug(params.slug)

    return (
      <article className="prose dark:prose-invert max-w-none">
        <h1>{meta.title}</h1>
        <MDXRemote source={content} />
      </article>
    )
  } catch (error) {
    notFound()
  }
}
