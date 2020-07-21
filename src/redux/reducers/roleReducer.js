/* 角色Reducer */

import { 
  LOAD_ROLES,
  ADD_ROLE, 
  DELETE_ROLE, 
  UPDATE_ROLE,
  SET_ROLES_FILTER
} from '../action-types'

const initState = {
  filter: null,
  docs: []
}

const roles = (state = initState, action) => {
  switch(action.type){
    case LOAD_ROLES:
      return {
        ...state,
        docs: action.data
      }
    case ADD_ROLE:
      return {
        ...state,
        docs: [action.data, ...state.docs]
      }
    case UPDATE_ROLE:
      console.log('update_role action.data', action.data)
      return {
        ...state,
        docs: state.docs.map(t => {
          if (t._id === action.data._id) {
            return action.data
          }
          return t
        })
      }
    case DELETE_ROLE:
      return {
        ...state,
        docs: state.docs.filter(t => t._id !== action.data._id)
      }
    case SET_ROLES_FILTER:
      return {
        ...state,
        filter: action.data
      }
    default:
      return state
  }
}

export default roles