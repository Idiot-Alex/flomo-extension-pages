import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LtzfWxPlan } from '@/components/LtzfWxPlan'
import { ZpayAliPlan } from '@/components/ZpayAliPlan'
import { createAliOrder, createWxOrder } from '@/lib/api'
import store from '@/store/store'
import { clearUser, setUser } from '@/store/actions'

vi.mock('@/lib/api', () => ({
  createAliOrder: vi.fn(),
  createWxOrder: vi.fn(),
}))

function renderPlan(component: React.ReactNode) {
  return render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {component}
      </MemoryRouter>
    </Provider>,
  )
}

async function chooseAnnualPlan() {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: '立即购买' }))
  const payButtons = await screen.findAllByRole('button', { name: '去支付' })
  await user.click(payButtons[2])
}

const annualOrder = {
  email: 'buyer@example.com',
  title: 'Flomo Extension【Pay】套餐 - 一年',
  month: 12,
  price: 9.9,
  returnUrl: 'https://flomo-extension-pages.hotstrips.org',
}

describe('payment plan request contracts', () => {
  beforeEach(() => {
    store.dispatch(setUser({ email: 'buyer@example.com' }))
  })

  afterEach(() => {
    store.dispatch(clearUser())
    vi.clearAllMocks()
  })

  it('sends the payable price and legacy return URL in the WeChat order payload', async () => {
    vi.mocked(createWxOrder).mockResolvedValue({ success: false, msg: 'test stop' })
    renderPlan(<LtzfWxPlan />)

    await chooseAnnualPlan()

    await waitFor(() => {
      expect(createWxOrder).toHaveBeenCalledWith(annualOrder)
    })
  })

  it('sends the payable price and legacy return URL in the Alipay order payload', async () => {
    vi.mocked(createAliOrder).mockResolvedValue({ success: false, msg: 'test stop' })
    renderPlan(<ZpayAliPlan />)

    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: '立即购买' }))
    expect(screen.getByLabelText('参考价 ¥60，当前价 ¥9.9')).toBeInTheDocument()
    const payButtons = await screen.findAllByRole('button', { name: '去支付' })
    await user.click(payButtons[2])

    await waitFor(() => {
      expect(createAliOrder).toHaveBeenCalledWith(annualOrder)
    })
  })

  it('locks every WeChat option while the selected order is being created', async () => {
    let finishOrder: ((value: { success: boolean; msg: string }) => void) | undefined
    vi.mocked(createWxOrder).mockImplementation(() => new Promise((resolve) => {
      finishOrder = resolve
    }))
    const user = userEvent.setup()
    renderPlan(<LtzfWxPlan />)

    await user.click(screen.getByRole('button', { name: '立即购买' }))
    const payButtons = await screen.findAllByRole('button', { name: '去支付' })
    await user.click(payButtons[2])

    const pendingButton = await screen.findByRole('button', { name: '生成中' })
    expect(pendingButton).toBeDisabled()
    screen.getAllByRole('button', { name: '去支付' }).forEach((button) => {
      expect(button).toBeDisabled()
    })

    finishOrder?.({ success: false, msg: 'test stop' })
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: '去支付' })).toHaveLength(3)
    })
  })
})
