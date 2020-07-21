/* 角色Reducer */

import { 
  LOAD_USERS,
  UPDATE_USER,
  SET_USERS_FILTER
} from '../action-types'

const initState = {
  filter: null,
  docs: []
}

const users = (state = initState, action) => {
  switch(action.type){
    case LOAD_USERS:
      return {
        ...state,
        docs: action.data
      }
    case UPDATE_USER:
      return {
        ...state,
        docs: state.docs.map(t => {
          if (t._id === action.data._id) {
            return action.data
          }
          return t
        })
      }
    case SET_USERS_FILTER:
      return {
        ...state,
        filter: action.data
      }
    default:
      return state
  }
}

export default users