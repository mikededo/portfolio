#! /usr/bin/env bun
import matter from 'gray-matter'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const baseUrl = 'https://mikededo.com'
const blogDir = path.join(process.cwd(), 'src', 'blog')
const sitemapPath = path.join(process.cwd(), 'static', 'sitemap.xml')

const blogFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'))

const urls = [
  { lastmod: new Date().toISOString(), loc: `${baseUrl}/` }
]

for (const file of blogFiles) {
  const filePath = path.join(blogDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(content)

  if (data.date) {
    const slug = file.replace(/\.mdx$/, '')
    urls.push({
      lastmod: new Date(data.date).toISOString(),
      loc: `${baseUrl}/blog/${slug}`
    })
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`

fs.writeFileSync(sitemapPath, sitemap, 'utf-8')
console.log(`Sitemap generated with ${urls.length} URLs`)
