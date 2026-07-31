import fs from 'node:fs/promises'
import path from 'node:path'

const siteOrigin = 'https://hotstrips.org'
const distDirectory = 'dist'
const adsenseReviewMode = process.env.ADSENSE_REVIEW_MODE !== 'false'
const requiredIndexablePostSlugs = [
  'what-is-flomo',
  'flomo-plus-extension',
]

const staticIndexableRoutes = [
  '/',
  '/plans',
  '/guide',
  '/posts',
  '/about',
  '/privacy',
  '/terms',
]

const staticNoindexRoutes = [
  '/login',
  '/register',
  '/reset-pwd',
  '/account',
  '/pay-order',
  '/404',
]

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function routeFile(route) {
  return route === '/'
    ? path.join(distDirectory, 'index.html')
    : path.join(distDirectory, `${route.slice(1)}.html`)
}

async function readRoute(route) {
  return fs.readFile(routeFile(route), 'utf8')
}

async function checkPage(route, indexable) {
  const html = await readRoute(route)
  const canonicalUrl = `${siteOrigin}${route === '/' ? '/' : route}`

  assert(html.includes(`<link rel="canonical" href="${canonicalUrl}" />`), `${route}: canonical 不正确`)
  assert(!html.includes('flomo-extension-pages.hotstrips.org'), `${route}: 仍包含旧主域`)
  if (adsenseReviewMode) {
    assert(!html.includes('pagead2.googlesyndication.com'), `${route}: 审核期不应加载 AdSense 广告脚本`)
  }

  if (indexable) {
    assert(html.includes('content="index, follow, max-image-preview:large"'), `${route}: 缺少 index robots`)
    assert(html.includes('id="page-structured-data"'), `${route}: 缺少结构化数据`)
    return
  }

  assert(html.includes('content="noindex, nofollow, noarchive"'), `${route}: 缺少 noindex robots`)
  assert(!html.includes('id="page-structured-data"'), `${route}: noindex 页面不应保留结构化数据`)
}

const posts = JSON.parse(
  await fs.readFile(path.join(distDirectory, 'posts', 'generated.json'), 'utf8'),
)

for (const slug of requiredIndexablePostSlugs) {
  const post = posts.find((item) => item.slug === slug)
  assert(post, `缺少文章 ${slug}`)
  assert(post.index !== false, `${slug}: 应恢复索引`)
}

const indexablePostRoutes = posts
  .filter((post) => post.index !== false)
  .map((post) => `/posts/${post.slug}`)
const noindexPostRoutes = posts
  .filter((post) => post.index === false)
  .map((post) => `/posts/${post.slug}`)

for (const route of [...staticIndexableRoutes, ...indexablePostRoutes]) {
  await checkPage(route, true)
}

for (const route of [...staticNoindexRoutes, ...noindexPostRoutes]) {
  await checkPage(route, false)
}

const sitemap = await fs.readFile(path.join(distDirectory, 'sitemap.xml'), 'utf8')
for (const route of [...staticIndexableRoutes, ...indexablePostRoutes]) {
  const url = `${siteOrigin}${route === '/' ? '/' : route}`
  assert(sitemap.includes(`<loc>${url}</loc>`), `sitemap 缺少 ${route}`)
}

for (const route of [...staticNoindexRoutes, ...noindexPostRoutes]) {
  const url = `${siteOrigin}${route}`
  assert(!sitemap.includes(`<loc>${url}</loc>`), `sitemap 不应包含 ${route}`)
}

console.log(`SEO output verified: ${staticIndexableRoutes.length + indexablePostRoutes.length} indexable routes, ${staticNoindexRoutes.length + noindexPostRoutes.length} noindex routes, AdSense review mode ${adsenseReviewMode ? 'on' : 'off'}.`)
