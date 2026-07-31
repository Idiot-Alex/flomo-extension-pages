import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import CryptoJS from 'crypto-js'
import store from '@/store/store'
import { Login } from '@/components/Login'
import { login } from '@/lib/api'

vi.mock('@/lib/api', () => ({
  login: vi.fn(),
  oauthGoogleLogin: vi.fn(),
}))

vi.mock('@/lib/oauth', () => ({
  openOAuthPopup: vi.fn(),
}))

describe('Login', () => {
  it('keeps the existing email and SHA-256 password request contract', async () => {
    vi.mocked(login).mockResolvedValue({ success: false, msg: 'invalid credentials' })
    const user = userEvent.setup()

    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Login />
        </MemoryRouter>
      </Provider>,
    )

    const submitButton = screen.getByRole('button', { name: '登录' })
    expect(submitButton).toBeDisabled()

    await user.type(screen.getByLabelText('邮箱'), 'reader@example.com')
    await user.type(screen.getByLabelText('密码'), 'secret1')
    await user.click(submitButton)

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'reader@example.com',
        password: CryptoJS.SHA256('secret1').toString(),
      })
    })
  })
})
