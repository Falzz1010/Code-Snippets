import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content')

export function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(docsDirectory, `${realSlug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`No document found for slug: ${slug}`)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    meta: data,
    content
  }
}

export function getAllDocs() {
  const files = fs.readdirSync(docsDirectory)
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '')
      const { meta } = getDocBySlug(slug)
      return { slug, meta }
    })
}

