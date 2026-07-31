import fs from 'node:fs/promises'
import path from 'node:path'

const siteOrigin = 'https://flomo-extension-pages.hotstrips.org'
const defaultImage = `${siteOrigin}/flomo-extension-shot1.png`
const distDirectory = 'dist'
const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: 'Flomo Extension',
      description: '在 Chrome 浏览器当前网页中快速记录想法，并同步到自己的 Flomo 账户。',
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Flomo Extension',
      url: `${siteOrigin}/`,
      downloadUrl: 'https://chromewebstore.google.com/detail/flomo-extension/oepgmpdaajlphmdkepgcgchlmnbpmddf',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Google Chrome',
      isAccessibleForFree: true,
      description: '在 Chrome 浏览器当前网页中快速记录想法，并同步到自己的 Flomo 账户。',
    },
  ],
}

const publicRoutes = [
  {
    route: '/',
    title: 'Flomo Extension｜在 Chrome 浏览器里快速记录 Flomo 笔记',
    description: '在 Chrome 浏览器当前网页中快速记录想法，并同步到自己的 Flomo 账户。查看真实产品界面、安装指南、套餐说明与使用技巧。',
    structuredData: homeStructuredData,
    fallback: '<h1>在 Chrome 浏览器里快速记录 Flomo 笔记</h1><p>无需离开当前网页，即可写下想法并同步到自己的 Flomo 账户。</p><h2>了解 Flomo Extension</h2><p><a href="/guide">查看安装与使用指南</a>，或阅读<a href="/posts">浏览器记录与 Flomo 使用文章</a>。</p>',
  },
  {
    route: '/guide',
    title: 'Flomo Extension 使用指南 - 安装与使用教程',
    description: '查看 Flomo Extension 的 Chrome 安装步骤、使用方法、常见问题和售后支持。',
    fallback: '<h1>Flomo Extension 使用指南</h1><p>从 Chrome 扩展商店安装 Flomo Extension，登录账户后即可在当前网页打开扩展并记录想法。</p><h2>开始使用</h2><ol><li>确认浏览器为 Google Chrome。</li><li>从 Chrome 扩展商店完成安装。</li><li>打开扩展并登录账户。</li><li>写下笔记并保存到 Flomo。</li></ol>',
  },
  {
    route: '/plans',
    title: 'Flomo Extension 套餐与价格',
    description: '比较 Flomo Extension 免费套餐与付费套餐，了解当前权益并选择适合自己的使用方式。',
    ads: false,
    fallback: '<h1>Flomo Extension 套餐与价格</h1><p>比较当前免费使用方式与付费套餐权益。实际价格、次数和服务范围以本页面展示及下单确认信息为准。</p>',
  },
  {
    route: '/posts',
    title: 'Flomo Extension 文章与使用指南',
    description: '阅读浏览器记录、Flomo 使用方法与扩展选择相关的实用指南。',
  },
  {
    route: '/about',
    title: '关于我们 - Flomo Extension',
    description: '了解 Flomo Extension 的产品目标、独立项目身份、内容原则与联系渠道。',
    ads: false,
    fallback: '<h1>关于 Flomo Extension</h1><p>Flomo Extension 是由独立开发者维护的 Chrome 浏览器扩展，与 flomo 官方不存在隶属、授权或代言关系。</p><h2>联系与反馈</h2><p>产品、账户或内容问题可发送邮件至 <a href="mailto:flomo-extension@idiotalex.com">flomo-extension@idiotalex.com</a>。</p>',
  },
  {
    route: '/privacy',
    title: '隐私政策 - Flomo Extension',
    description: '了解 Flomo Extension 如何处理账户信息、Cookies、广告与第三方分析服务。',
    ads: false,
    fallback: '<h1>隐私政策</h1><p>本政策说明 Flomo Extension 在提供账户、同步、支付、统计和广告服务时如何处理信息，以及您可以如何联系我们行使相关权利。</p><h2>第三方服务</h2><p>本站使用 Google AdSense、Google Analytics、Microsoft Clarity、Cloudflare 和自托管统计服务，详情以完整隐私政策为准。</p>',
  },
  {
    route: '/terms',
    title: '服务条款 - Flomo Extension',
    description: '查看 Flomo Extension 的服务范围、使用规则与责任说明。',
    ads: false,
    fallback: '<h1>服务条款</h1><p>本条款说明 Flomo Extension 的服务范围、账户规则、套餐与退款处理、知识产权和责任边界。</p>',
  },
]

const noindexRoutes = [
  ['/login', '登录 - Flomo Extension', '登录 Flomo Extension 账户。'],
  ['/register', '注册 - Flomo Extension', '创建 Flomo Extension 账户。'],
  ['/reset-pwd', '重置密码 - Flomo Extension', '重置 Flomo Extension 账户密码。'],
  ['/account', '我的账户 - Flomo Extension', '查看 Flomo Extension 账户与套餐信息。'],
  ['/pay-order', '订单支付 - Flomo Extension', '完成 Flomo Extension 套餐订单支付。'],
].map(([route, title, description]) => ({ route, title, description, index: false }))

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeAttribute(value) {
  return escapeHtml(value)
}

function upsertMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}=["']${escapedKey}["'][^>]*>`, 'i')
  const tag = `<meta ${attribute}="${escapeAttribute(key)}" content="${escapeAttribute(content)}" />`
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function setCanonical(html, canonicalUrl) {
  const tag = `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`
  const expression = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function setStructuredData(html, data) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  const script = `<script id="page-structured-data" type="application/ld+json">${json}</script>`
  const expression = /<script\s+id=["']page-structured-data["'][^>]*>[\s\S]*?<\/script>/i
  return expression.test(html) ? html.replace(expression, script) : html.replace('</head>', `    ${script}\n  </head>`)
}

function removeStructuredData(html) {
  return html.replace(/\s*<script\s+id=["']page-structured-data["'][^>]*>[\s\S]*?<\/script>/i, '')
}

function setFallback(html, fallback) {
  if (!fallback) {
    return html
  }
  return html.replace(/<div\s+id=["']root["']><\/div>/i, `<div id="root">${fallback}</div>`)
}

function removeAdSense(html) {
  return html.replace(/\s*<script\s+[^>]*src=["'][^"']*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js[^"']*["'][^>]*><\/script>/i, '')
}

function createPageHtml(baseHtml, meta, fallback = '') {
  const canonicalUrl = `${siteOrigin}${meta.route === '/' ? '/' : meta.route}`
  const image = meta.image ? new URL(meta.image, siteOrigin).toString() : defaultImage
  let html = baseHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`)
  html = upsertMeta(html, 'name', 'description', meta.description)
  html = upsertMeta(html, 'name', 'robots', meta.index === false ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large')
  html = upsertMeta(html, 'property', 'og:type', meta.type || 'website')
  html = upsertMeta(html, 'property', 'og:url', canonicalUrl)
  html = upsertMeta(html, 'property', 'og:title', meta.title)
  html = upsertMeta(html, 'property', 'og:description', meta.description)
  html = upsertMeta(html, 'property', 'og:image', image)
  html = upsertMeta(html, 'property', 'og:image:alt', meta.title)
  html = upsertMeta(html, 'name', 'twitter:card', 'summary_large_image')
  html = upsertMeta(html, 'name', 'twitter:url', canonicalUrl)
  html = upsertMeta(html, 'name', 'twitter:title', meta.title)
  html = upsertMeta(html, 'name', 'twitter:description', meta.description)
  html = upsertMeta(html, 'name', 'twitter:image', image)
  if (meta.type === 'article' && meta.publishedTime) {
    html = upsertMeta(html, 'property', 'article:published_time', meta.publishedTime)
  }
  if (meta.type === 'article' && meta.modifiedTime) {
    html = upsertMeta(html, 'property', 'article:modified_time', meta.modifiedTime)
  }
  html = setCanonical(html, canonicalUrl)
  html = meta.index === false
    ? removeStructuredData(html)
    : setStructuredData(html, meta.structuredData || {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: meta.title,
        description: meta.description,
        url: canonicalUrl,
        inLanguage: 'zh-CN',
      })
  if (meta.index === false || meta.ads === false) {
    html = removeAdSense(html)
  }
  return setFallback(html, fallback)
}

function staticShell(content) {
  return `<main style="max-width: 760px; margin: 0 auto; padding: 64px 24px; font-family: Georgia, 'Songti SC', serif; line-height: 1.75; color: #141413">
    <nav aria-label="主要导航" style="margin-bottom: 40px"><a href="/">首页</a> · <a href="/guide">使用说明</a> · <a href="/posts">文章</a> · <a href="/about">关于</a></nav>
    ${content}
  </main>`
}

function createPostsFallback(posts) {
  const items = posts.map((post) => `<article style="margin: 32px 0">
    <h2><a href="/posts/${escapeAttribute(post.slug)}">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.excerpt)}</p>
  </article>`).join('')
  return staticShell(`<h1>文章与使用指南</h1><p>围绕浏览器记录、Flomo 使用方法与扩展选择，提供经过核对的步骤、场景和限制说明。</p>${items}`)
}

function createPostFallback(post) {
  return staticShell(`<article>
    <p><a href="/posts">返回文章列表</a></p>
    <h1>${escapeHtml(post.title)}</h1>
    <p>作者：${escapeHtml(post.author)} · 发布于 <time datetime="${escapeAttribute(post.date)}">${escapeHtml(post.displayDate)}</time> · 更新于 <time datetime="${escapeAttribute(post.updatedDate)}">${escapeHtml(post.displayUpdatedDate)}</time></p>
    ${post.content}
  </article>`)
}

async function writeRoute(baseHtml, meta, fallback = '') {
  const html = createPageHtml(baseHtml, meta, fallback)
  if (meta.route === '/') {
    await fs.writeFile(path.join(distDirectory, 'index.html'), html)
    return
  }

  const routeFile = path.join(distDirectory, `${meta.route.slice(1)}.html`)
  await fs.mkdir(path.dirname(routeFile), { recursive: true })
  await fs.writeFile(routeFile, html)
}

const baseHtml = await fs.readFile(path.join(distDirectory, 'index.html'), 'utf8')
const posts = JSON.parse(await fs.readFile(path.join(distDirectory, 'posts', 'generated.json'), 'utf8'))

for (const meta of [...publicRoutes, ...noindexRoutes]) {
  const fallback = meta.route === '/posts'
    ? createPostsFallback(posts)
    : meta.fallback
      ? staticShell(meta.fallback)
      : ''
  await writeRoute(baseHtml, meta, fallback)
}

for (const post of posts) {
  const route = `/posts/${post.slug}`
  const articleUrl = `${siteOrigin}${route}`
  const image = new URL(post.coverImage, siteOrigin).toString()
  await writeRoute(baseHtml, {
    route,
    title: `${post.title} - Flomo Extension`,
    description: post.excerpt,
    image,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedDate,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image,
          datePublished: post.date,
          dateModified: post.updatedDate,
          author: {
            '@type': 'Organization',
            name: post.author,
            url: `${siteOrigin}/about`,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Flomo Extension',
            url: siteOrigin,
          },
          mainEntityOfPage: articleUrl,
          inLanguage: 'zh-CN',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '首页', item: `${siteOrigin}/` },
            { '@type': 'ListItem', position: 2, name: '文章', item: `${siteOrigin}/posts` },
            { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
          ],
        },
      ],
    },
  }, createPostFallback(post))
}

const notFoundHtml = createPageHtml(baseHtml, {
  route: '/404',
  title: '页面未找到 - Flomo Extension',
  description: '你访问的页面不存在。',
  index: false,
}, staticShell('<p>404 · 页面不存在</p><h1>没有找到这个页面</h1><p><a href="/">返回首页</a></p>'))
await fs.writeFile(path.join(distDirectory, '404.html'), notFoundHtml)

console.log(`Prerendered ${publicRoutes.length + noindexRoutes.length + posts.length} routes and 404.html.`)
