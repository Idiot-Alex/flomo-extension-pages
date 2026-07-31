import { FLOMO_EXTENSION_WEB_URL } from '@/lib/type'

export interface PageMeta {
  title: string
  description: string
  index?: boolean
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export function applyPageMeta(meta: PageMeta, pathname: string) {
  const canonicalUrl = `${FLOMO_EXTENSION_WEB_URL}${pathname === '/' ? '/' : pathname}`

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('name', 'robots', meta.index === false ? 'noindex, nofollow' : 'index, follow')
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:url', canonicalUrl)

  const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  canonical?.setAttribute('href', canonicalUrl)
}
