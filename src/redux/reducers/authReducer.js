/* 登录 */
import { LOGIN, LOGOUT, UPDATE_AUTH } from '../action-types'

const initState = {
  token: null,
  user: null
}

const auth = (state = initState, action) => {
  switch(action.type){
    case LOGIN:
      return {
        ...state,
        token: action.data.token,
        user: action.data.user
      }
    case LOGOUT:
      return {
        token: null,
        user: null
      }
    case UPDATE_AUTH:
      return {
        ...state,
        user: action.data._id === state.user._id ? action.data : state.user
      }
    default:
      return state
  }
}

export default auth