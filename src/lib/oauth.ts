import type { ApiRes } from '@/lib/type'
import { API_BASE_URL } from '@/lib/axios'

const oauthTimeoutMs = 5 * 60 * 1000

function getOrigin(url: string) {
  try {
    return new URL(url, window.location.origin).origin
  } catch {
    return null
  }
}

export function openOAuthPopup(url: string, title: string): Promise<ApiRes> {
  return new Promise((resolve, reject) => {
    const popup = window.open(url, title, 'width=600,height=600')
    if (!popup) {
      reject(new Error('登录窗口被浏览器拦截，请允许弹窗后重试'))
      return
    }

    const allowedOrigins = new Set(
      [window.location.origin, getOrigin(API_BASE_URL), getOrigin(url)].filter(
        (origin): origin is string => Boolean(origin),
      ),
    )

    let settled = false
    const closeTimer = window.setInterval(() => {
      if (!settled && popup.closed) {
        finish(() => reject(new Error('登录窗口已关闭')))
      }
    }, 500)
    const timeoutTimer = window.setTimeout(() => {
      finish(() => reject(new Error('登录等待超时，请重试')))
    }, oauthTimeoutMs)

    const cleanup = () => {
      settled = true
      window.removeEventListener('message', handleMessage)
      window.clearInterval(closeTimer)
      window.clearTimeout(timeoutTimer)
    }

    const finish = (callback: () => void) => {
      if (settled) {
        return
      }
      cleanup()
      callback()
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== popup || !allowedOrigins.has(event.origin)) {
        return
      }

      if (event.data?.type === 'google-oauth-callback') {
        finish(() => resolve(event.data.data as ApiRes))
        popup.close()
      } else if (event.data?.type === 'google-oauth-error') {
        const message = event.data.error || 'Google 登录失败'
        finish(() => reject(new Error(message)))
        popup.close()
      }
    }

    window.addEventListener('message', handleMessage)
  })
}
