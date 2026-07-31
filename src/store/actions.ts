import type { UserInfo } from '@/lib/type'

export const SET_USER = 'SET_USER' as const
export const CLEAR_USER = 'CLEAR_USER' as const

export const setUser = (user: Partial<UserInfo>) => {
  return {
    type: SET_USER,
    payload: user,
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  }
}

export type UserAction = ReturnType<typeof setUser> | ReturnType<typeof clearUser>
