import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components/ui/button'

describe('Button loading state', () => {
  it('shows progress text and prevents repeated clicks while loading', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button loading loadingText="提交中" onClick={onClick}>
        提交
      </Button>,
    )

    const button = screen.getByRole('button', { name: '提交中' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
