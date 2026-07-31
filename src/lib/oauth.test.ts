import { describe, expect, it, vi } from 'vitest'
import { openOAuthPopup } from '@/lib/oauth'

describe('openOAuthPopup', () => {
  it('ignores unrelated windows and resolves the trusted popup callback', async () => {
    const popup = {
      closed: false,
      close: vi.fn(),
    } as unknown as Window
    vi.spyOn(window, 'open').mockReturnValue(popup)

    let resolved = false
    const resultPromise = openOAuthPopup('https://flomo-extension.hotstrips.org/oauth', 'Google 登录')
    resultPromise.then(() => {
      resolved = true
    })

    window.dispatchEvent(new MessageEvent('message', {
      source: window,
      origin: 'https://flomo-extension.hotstrips.org',
      data: {
        type: 'google-oauth-callback',
        data: { success: true, msg: 'ok' },
      },
    }))
    await Promise.resolve()
    expect(resolved).toBe(false)

    window.dispatchEvent(new MessageEvent('message', {
      source: popup,
      origin: 'https://flomo-extension.hotstrips.org',
      data: {
        type: 'google-oauth-callback',
        data: { success: true, msg: 'ok' },
      },
    }))

    await expect(resultPromise).resolves.toMatchObject({ success: true, msg: 'ok' })
    expect(popup.close).toHaveBeenCalledOnce()
  })
})
