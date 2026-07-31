import { FLOMO_EXTENSION_WEB_URL } from '@/lib/type'

export interface PageMeta {
  title: string
  description: string
  index?: boolean
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
}

const defaultSocialImage = '/flomo-extension-shot1.png'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function removeMeta(attribute: 'name' | 'property', key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

function toAbsoluteUrl(value: string) {
  return new URL(value, FLOMO_EXTENSION_WEB_URL).toString()
}

export function applyPageMeta(meta: PageMeta, pathname: string) {
  const canonicalUrl = `${FLOMO_EXTENSION_WEB_URL}${pathname === '/' ? '/' : pathname}`
  const imageUrl = toAbsoluteUrl(meta.image || defaultSocialImage)

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('name', 'robots', meta.index === false ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large')
  setMeta('property', 'og:type', meta.type || 'website')
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:image', imageUrl)
  setMeta('property', 'og:image:alt', meta.title)
  setMeta('property', 'og:site_name', 'Flomo Extension')
  setMeta('property', 'og:locale', 'zh_CN')
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:url', canonicalUrl)
  setMeta('name', 'twitter:image', imageUrl)

  if (meta.type === 'article' && meta.publishedTime) {
    setMeta('property', 'article:published_time', meta.publishedTime)
  } else {
    removeMeta('property', 'article:published_time')
  }

  if (meta.type === 'article' && meta.modifiedTime) {
    setMeta('property', 'article:modified_time', meta.modifiedTime)
  } else {
    removeMeta('property', 'article:modified_time')
  }

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  canonical?.setAttribute('href', canonicalUrl)

  const pageStructuredData = meta.structuredData || (meta.index === false ? null : {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: meta.title,
    description: meta.description,
    url: canonicalUrl,
    inLanguage: 'zh-CN',
  })
  const existingStructuredData = document.getElementById('page-structured-data')
  if (!pageStructuredData) {
    existingStructuredData?.remove()
    return
  }

  const structuredData = existingStructuredData || document.createElement('script')
  structuredData.id = 'page-structured-data'
  structuredData.setAttribute('type', 'application/ld+json')
  structuredData.textContent = JSON.stringify(pageStructuredData).replace(/</g, '\\u003c')
  if (!structuredData.parentNode) {
    document.head.appendChild(structuredData)
  }
}
