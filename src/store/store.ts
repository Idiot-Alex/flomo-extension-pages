import { legacy_createStore as createStore, combineReducers } from 'redux'

const initialState = {
  user: {
    email: '',
    plan: '',
    expiredTime: '',
  }
}

const userReducer = (state = initialState, action: any) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
})

const store = createStore(rootReducer)

export default store