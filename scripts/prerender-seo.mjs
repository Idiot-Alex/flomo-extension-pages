import fs from 'node:fs/promises'
import path from 'node:path'

const siteOrigin = 'https://hotstrips.org'
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
      description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。',
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Flomo Extension',
      url: `${siteOrigin}/`,
      downloadUrl: 'https://chromewebstore.google.com/detail/flomo-extension/oepgmpdaajlphmdkepgcgchlmnbpmddf',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Any operating system supported by Google Chrome',
      browserRequirements: 'Requires Google Chrome',
      isAccessibleForFree: true,
      description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。',
    },
  ],
}

const publicRoutes = [
  {
    route: '/',
    title: 'Flomo Extension｜在 Chrome 浏览器里快速记录 Flomo 笔记',
    description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。查看真实界面、安装指南与数据流说明。',
    structuredData: homeStructuredData,
    fallback: '<h1>在 Chrome 浏览器里快速记录 Flomo 笔记</h1><p>无需离开当前网页，即可整理本地草稿，再通过已登录的 flomo 网页保存。</p><h2>一次保存如何完成</h2><ol><li>直接输入内容，或主动把网页选区加入浏览器本地草稿。</li><li>扩展连接当前窗口中已打开、已登录的 flomo 标签页。</li><li>用户点击保存后，扩展把草稿填入 flomo 网页编辑器并触发页面保存按钮。</li><li>回到 flomo 笔记列表确认最终结果。</li></ol><h2>安装前了解实现边界</h2><p><a href="/guide">查看安装与首次保存指南</a>，阅读<a href="/posts/flomo-extension-permissions-data-flow">权限与数据流</a>、<a href="/posts/flomo-extension-save-flow-troubleshooting">保存故障排查</a>和<a href="/posts/flomo-extension-selection-draft-workflow">本地草稿工作流</a>。</p>',
  },
  {
    route: '/guide',
    title: 'Flomo Extension 使用指南 - 安装与使用教程',
    description: '查看 Flomo Extension 的 Chrome 安装步骤、使用方法、常见问题和售后支持。',
    fallback: '<h1>Flomo Extension 使用指南</h1><p>适用于 Chrome 版 v1.30.1，说明扩展账户与 flomo 网页账户的区别，以及本地草稿如何保存。</p><h2>完成第一次保存</h2><ol><li>从 Chrome 扩展商店安装并固定扩展。</li><li>在当前窗口打开 <a href="https://v.flomoapp.com/mine">flomo 全部笔记页面</a>并登录自己的 flomo 账户。</li><li>打开扩展，输入内容或把主动选择的网页文字加入本地草稿。</li><li>点击保存，再回到 flomo 笔记列表确认结果。</li></ol><p>免费模式不要求创建 Flomo Extension 账户；付费权益账户与 flomo 网页账户彼此独立。</p><h2>常见问题</h2><p>保存按钮不可用时，确认 flomo 标签页位于当前窗口。找不到编辑框时，进入“全部笔记”并刷新页面，再重新打开扩展。</p>',
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
    description: '阅读基于 Chrome 版 v1.30.1 源码核验的权限、数据流、保存故障与本地草稿指南。',
  },
  {
    route: '/about',
    title: '关于我们 - Flomo Extension',
    description: '了解 Flomo Extension 的产品目标、独立项目身份、内容原则与联系渠道。',
    ads: false,
    fallback: '<h1>关于 Flomo Extension</h1><p>Flomo Extension 是由独立开发者维护的 Chrome 浏览器扩展，与 flomo 官方不存在隶属、授权或代言关系。</p><h2>内容如何核验</h2><p>当前文档依据 Chrome 版 v1.30.1 的扩展清单、页面脚本、账户接口调用与本地存储实现核对，并明确标注无法由源码单独证明的结论。</p><p><a href="/posts/flomo-extension-permissions-data-flow">查看权限与数据流依据</a>。</p><h2>联系与反馈</h2><p>产品、账户或内容问题可发送邮件至 <a href="mailto:hotstrip.zx@gmail.com">hotstrip.zx@gmail.com</a>。</p>',
  },
  {
    route: '/privacy',
    title: '隐私政策 - Flomo Extension',
    description: '了解 Flomo Extension 如何处理账户信息、Cookies、广告与第三方分析服务。',
    ads: false,
    fallback: '<h1>隐私政策</h1><p>草稿保存在 Chrome 扩展本地存储中；笔记正文不会发送到 Flomo Extension 账户 API，用户发起保存时由已登录的 flomo 网页处理。</p><h2>账户与第三方服务</h2><p>扩展账户服务处理邮箱、登录验证和套餐信息。本站使用 Google Analytics、Microsoft Clarity、Cloudflare 和自托管统计服务；当前未加载 AdSense 广告投放脚本，未来启用广告前会同步更新本政策并配置适用的用户同意机制。</p>',
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
    <nav aria-label="主要导航" style="margin-bottom: 40px"><a href="/">主页</a> · <a href="/guide">使用说明</a> · <a href="/plans">价格套餐</a> · <a href="/posts">文章</a></nav>
    ${content}
    <footer style="margin-top: 64px; padding-top: 24px; border-top: 1px solid #dedbd2"><a href="/about">关于</a> · <a href="/privacy">隐私政策</a> · <a href="/terms">服务条款</a></footer>
  </main>`
}

function createPostsFallback(posts) {
  const items = posts.map((post) => `<article style="margin: 32px 0">
    <h2><a href="/posts/${escapeAttribute(post.slug)}">${escapeHtml(post.title)}</a></h2>
    <p>${escapeHtml(post.excerpt)}</p>
  </article>`).join('')
  return staticShell(`<h1>文章与使用指南</h1><p>收录包含源码核验的产品文档与有来源的产品比较，说明权限、数据流、保存故障、本地草稿和扩展选择。</p>${items}`)
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
const indexablePosts = posts.filter((post) => post.index)

for (const meta of [...publicRoutes, ...noindexRoutes]) {
  const fallback = meta.route === '/posts'
    ? createPostsFallback(indexablePosts)
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
    index: post.index,
    ads: post.index,
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
