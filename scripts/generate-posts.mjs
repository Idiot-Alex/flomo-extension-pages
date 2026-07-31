import fs from 'node:fs/promises'
import path from 'node:path'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDirectory = path.join('public', 'posts')

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  const attributes = {}

  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const [key, ...values] = line.split(':')
      if (key && values.length) {
        attributes[key.trim()] = values.join(':').trim()
      }
    }
  }

  return {
    attributes,
    content: match ? markdown.slice(match[0].length) : markdown,
  }
}

function createExcerpt(content) {
  return content
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`|~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 150)
}

function formatDate(date) {
  return new Date(`${date}T00:00:00+08:00`).toLocaleDateString('zh-CN')
}

const postIndex = JSON.parse(
  await fs.readFile(path.join(postsDirectory, 'index.json'), 'utf8'),
)

const posts = await Promise.all(postIndex.map(async ({ slug }) => {
  const markdown = await fs.readFile(path.join(postsDirectory, `${slug}.md`), 'utf8')
  const { attributes, content } = parseFrontmatter(markdown)
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content)

  return {
    slug,
    title: attributes.title,
    date: attributes.date,
    updatedDate: attributes.updated || attributes.date,
    displayDate: formatDate(attributes.date),
    displayUpdatedDate: formatDate(attributes.updated || attributes.date),
    category: attributes.category,
    coverImage: attributes.coverImage,
    coverWidth: Number(attributes.coverWidth) || 1200,
    coverHeight: Number(attributes.coverHeight) || 900,
    content: processedContent.toString(),
    excerpt: attributes.excerpt || createExcerpt(content),
    author: attributes.author || 'Flomo Extension',
    index: attributes.index !== 'false',
  }
}))

posts.sort((a, b) => b.date.localeCompare(a.date))

await fs.writeFile(
  path.join(postsDirectory, 'generated.json'),
  `${JSON.stringify(posts, null, 2)}\n`,
)

console.log(`Generated ${posts.length} posts.`)
