import { legacy_createStore as createStore, combineReducers } from 'redux'

const userKey = 'login_user'
const initialUserState = localStorage.getItem(userKey) ? JSON.parse(localStorage.getItem(userKey) || '') : {
  email: '',
  plan: '',
  expiredTime: '',
}

const userReducer = (state = initialUserState, action: any) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
})

const store = createStore(rootReducer)

store.subscribe(() => {
  localStorage.setItem(userKey, JSON.stringify(store.getState().user))
})

export default store