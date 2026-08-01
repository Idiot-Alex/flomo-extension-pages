import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyPageMeta, type PageMeta } from '@/lib/page-meta'
import { FLOMO_EXTENSION_WEB_URL } from '@/lib/type'

const defaultMeta: PageMeta = {
  title: 'Flomo Extension｜在 Chrome 浏览器里快速记录 Flomo 笔记',
  description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。查看真实界面、安装指南与数据流说明。',
  structuredData: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${FLOMO_EXTENSION_WEB_URL}/#website`,
        url: `${FLOMO_EXTENSION_WEB_URL}/`,
        name: 'Flomo Extension',
        description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。',
        inLanguage: 'zh-CN',
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Flomo Extension',
        url: `${FLOMO_EXTENSION_WEB_URL}/`,
        downloadUrl: 'https://chromewebstore.google.com/detail/flomo-extension/oepgmpdaajlphmdkepgcgchlmnbpmddf',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'Any operating system supported by Google Chrome',
        browserRequirements: 'Requires Google Chrome',
        isAccessibleForFree: true,
        description: '在 Chrome 浏览器当前网页中整理本地草稿，再通过已登录的 flomo 网页保存到自己的账户。',
      },
    ],
  },
}

const pageMeta: Record<string, PageMeta> = {
  '/': defaultMeta,
  '/guide': {
    title: 'Flomo Extension 使用指南 - 安装与使用教程',
    description: '查看 Flomo Extension 的安装步骤、使用方法、常见问题和售后支持。',
  },
  '/plans': {
    title: 'Flomo Extension 套餐与价格',
    description: '比较 Flomo Extension 免费套餐与付费套餐，选择适合自己的使用方式。',
  },
  '/posts': {
    title: 'Flomo Extension 文章与使用指南',
    description: '阅读基于 Chrome 版 v1.30.0 源码核验的权限、数据流、保存故障与本地草稿指南。',
  },
  '/privacy': {
    title: '隐私政策 - Flomo Extension',
    description: '了解 Flomo Extension 如何处理账户信息、Cookies、广告与第三方分析服务。',
  },
  '/terms': {
    title: '服务条款 - Flomo Extension',
    description: '查看 Flomo Extension 的服务范围、使用规则与责任说明。',
  },
  '/about': {
    title: '关于我们 - Flomo Extension',
    description: '了解 Flomo Extension 的产品目标、独立项目身份、内容原则与联系渠道。',
  },
  '/login': {
    title: '登录 - Flomo Extension',
    description: '登录 Flomo Extension 账户。',
    index: false,
  },
  '/register': {
    title: '注册 - Flomo Extension',
    description: '创建 Flomo Extension 账户。',
    index: false,
  },
  '/reset-pwd': {
    title: '重置密码 - Flomo Extension',
    description: '重置 Flomo Extension 账户密码。',
    index: false,
  },
  '/account': {
    title: '我的账户 - Flomo Extension',
    description: '查看 Flomo Extension 账户与套餐信息。',
    index: false,
  },
  '/pay-order': {
    title: '订单支付 - Flomo Extension',
    description: '完成 Flomo Extension 套餐订单支付。',
    index: false,
  },
}

export function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const meta = pageMeta[normalizedPath] || (normalizedPath.startsWith('/posts/') ? pageMeta['/posts'] : null) || {
      title: '页面未找到 - Flomo Extension',
      description: '你访问的页面不存在。',
      index: false,
    }
    applyPageMeta(meta, normalizedPath)
  }, [pathname])

  return null
}
