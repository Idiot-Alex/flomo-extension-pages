import fs from 'node:fs/promises'
import path from 'node:path'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const siteOrigin = 'https://flomo-extension-pages.hotstrips.org'
const postsDirectory = path.join('public', 'posts')

const staticPages = [
  { route: '/', source: 'src/components/LandingPage.tsx' },
  { route: '/plans', source: 'src/components/Plans.tsx' },
  { route: '/guide', source: 'src/components/Guide.tsx' },
  { route: '/posts', source: 'src/components/Posts.tsx' },
  { route: '/about', source: 'src/components/About.tsx' },
  { route: '/privacy', source: 'src/components/Privacy.tsx' },
  { route: '/terms', source: 'src/components/Terms.tsx' },
]

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  const attributes = {}

  if (!match) {
    return attributes
  }

  for (const line of match[1].split(/\r?\n/)) {
    const [key, ...values] = line.split(':')
    if (key && values.length) {
      attributes[key.trim()] = values.join(':').trim()
    }
  }

  return attributes
}

async function getLastModified(source) {
  try {
    const { stdout } = await execFileAsync('git', ['log', '-1', '--format=%cs', '--', source])
    const date = stdout.trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date
    }
  } catch {
    // Fall back to the file timestamp in build environments without git history.
  }

  const stats = await fs.stat(source)
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(stats.mtime)
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const postIndex = JSON.parse(await fs.readFile(path.join(postsDirectory, 'index.json'), 'utf8'))
const staticUrls = await Promise.all(staticPages.map(async ({ route, source }) => ({
  route,
  lastModified: await getLastModified(source),
})))

const postUrls = await Promise.all(postIndex.map(async ({ slug }) => {
  const source = path.join(postsDirectory, `${slug}.md`)
  const markdown = await fs.readFile(source, 'utf8')
  const attributes = parseFrontmatter(markdown)
  return {
    route: `/posts/${slug}`,
    lastModified: attributes.updated || attributes.date || await getLastModified(source),
  }
}))

const urls = [...staticUrls, ...postUrls].map(({ route, lastModified }) => [
  '  <url>',
  `    <loc>${escapeXml(`${siteOrigin}${route}`)}</loc>`,
  `    <lastmod>${lastModified}</lastmod>`,
  '  </url>',
].join('\n')).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await fs.writeFile(path.join('public', 'sitemap.xml'), sitemap)
console.log(`Generated sitemap with ${staticUrls.length + postUrls.length} URLs.`)
