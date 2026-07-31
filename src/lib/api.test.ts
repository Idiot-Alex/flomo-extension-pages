import { afterEach, describe, expect, it, vi } from 'vitest'
import instance from '@/lib/axios'
import { createAfdianOrder, createAliOrder, createWxOrder, queryOrderStatus } from '@/lib/api'

vi.mock('@/lib/axios', () => ({
  default: {
    post: vi.fn(),
  },
}))

describe('payment API routes', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('keeps the existing payment endpoints and timeout options', async () => {
    vi.mocked(instance.post).mockResolvedValue({ success: true, msg: 'ok' })
    const payload = { orderId: 'order-1' }

    await createWxOrder(payload)
    await createAliOrder(payload)
    await createAfdianOrder(payload)
    await queryOrderStatus(payload)

    expect(instance.post).toHaveBeenNthCalledWith(1, '/api/ltzf/wx/order/create', payload, { timeout: 0 })
    expect(instance.post).toHaveBeenNthCalledWith(2, '/api/zpay/ali/order/create', payload, { timeout: 0 })
    expect(instance.post).toHaveBeenNthCalledWith(3, '/api/afdian/order/create', payload)
    expect(instance.post).toHaveBeenNthCalledWith(4, '/api/order/query', payload, { timeout: 5000 })
  })
})
