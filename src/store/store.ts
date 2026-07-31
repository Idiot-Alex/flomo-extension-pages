import { legacy_createStore as createStore, combineReducers } from 'redux'
import type { UserInfo } from '@/lib/type'
import { CLEAR_USER, SET_USER, type UserAction } from '@/store/actions'

export const userStorageKey = 'login_user'

export const emptyUserState: UserInfo = {
  email: '',
  plan: '',
  expiredTime: '',
}

function loadInitialUser(): UserInfo {
  if (typeof window === 'undefined') {
    return emptyUserState
  }

  try {
    const storedUser = window.localStorage.getItem(userStorageKey)
    if (!storedUser) {
      return emptyUserState
    }

    return {
      ...emptyUserState,
      ...JSON.parse(storedUser),
    }
  } catch {
    window.localStorage.removeItem(userStorageKey)
    return emptyUserState
  }
}

export const userReducer = (state = loadInitialUser(), action: UserAction): UserInfo => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      }
    case CLEAR_USER:
      return emptyUserState
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
})

const store = createStore(rootReducer)

store.subscribe(() => {
  if (typeof window === 'undefined') {
    return
  }

  const user = store.getState().user
  if (user.email) {
    window.localStorage.setItem(userStorageKey, JSON.stringify(user))
  } else {
    window.localStorage.removeItem(userStorageKey)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
