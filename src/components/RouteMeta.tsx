import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { applyPageMeta, type PageMeta } from '@/lib/page-meta'

const defaultMeta: PageMeta = {
  title: 'Flomo Extension - 无需会员，在任意网页轻松记录灵感',
  description: '使用 Flomo Extension 在浏览网页时快速记录想法，并同步到你的 Flomo 账户。支持 Chrome。',
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
    title: 'Flomo Extension 文章与使用技巧',
    description: '阅读 Flomo、网页记录和浏览器扩展相关的使用技巧与产品动态。',
  },
  '/privacy': {
    title: '隐私政策 - Flomo Extension',
    description: '了解 Flomo Extension 如何处理和保护用户信息。',
  },
  '/terms': {
    title: '服务条款 - Flomo Extension',
    description: '查看 Flomo Extension 的服务范围、使用规则与责任说明。',
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
    const meta = pageMeta[pathname] || (pathname.startsWith('/posts/') ? pageMeta['/posts'] : null) || {
      title: '页面未找到 - Flomo Extension',
      description: '你访问的页面不存在。',
      index: false,
    }
    applyPageMeta(meta, pathname)
  }, [pathname])

  return null
}
