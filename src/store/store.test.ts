import { describe, expect, it } from 'vitest'
import { clearUser, setUser } from '@/store/actions'
import { emptyUserState, userReducer } from '@/store/store'

describe('userReducer', () => {
  it('stores returned user information without dropping defaults', () => {
    const state = userReducer(emptyUserState, setUser({ email: 'reader@example.com' }))

    expect(state).toEqual({
      email: 'reader@example.com',
      plan: '',
      expiredTime: '',
    })
  })

  it('clears the in-memory user during logout', () => {
    const loggedInState = {
      email: 'reader@example.com',
      plan: 'pro',
      expiredTime: '2026-12-31',
    }

    expect(userReducer(loggedInState, clearUser())).toEqual(emptyUserState)
  })
})
