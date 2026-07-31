import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import store from '@/store/store'
import { PayOrder } from '@/components/PayOrder'
import { queryOrderStatus } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  queryOrderStatus: vi.fn(),
}))

function renderPayOrder(state?: unknown) {
  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: '/pay-order', state }]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <PayOrder />
      </MemoryRouter>
    </Provider>,
  )
}

describe('PayOrder', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('shows a recoverable empty state when opened without order data', () => {
    renderPayOrder()

    expect(screen.getByText('没有需要支付的订单')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '去选择套餐' })).toBeInTheDocument()
  })

  it('keeps the existing order query payload contract', async () => {
    vi.mocked(queryOrderStatus).mockResolvedValue({
      success: true,
      msg: 'pending',
      data: { paySt: 0 },
    })
    const view = renderPayOrder({
      orderId: 'order-1',
      channel: 'wx',
      title: 'Flomo Extension 套餐',
      price: 1.9,
      data: { QRcode_url: 'https://example.com/code.png' },
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(queryOrderStatus).toHaveBeenCalledWith({ orderId: 'order-1' })
    view.unmount()
  })
})
