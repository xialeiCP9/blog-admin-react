/* 目录列表Reducer */

import { 
  LOAD_CATEGORIES,
  ADD_CATEGORY, 
  UPDATE_CATEGORY, 
  DELETE_CATEGORY,
  SET_CATEGORIES_FILTER
} from '../action-types'

const initState = {
  filter: null,
  docs: []
}

const categories = (state = initState, action) => {
  switch(action.type){
    case LOAD_CATEGORIES:
      return {
        ...state,
        docs: action.data
      }
    case ADD_CATEGORY:
      return {
        ...state,
        docs: [action.data, ...state.docs]
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        docs: state.docs.map(t => {
          if (t._id === action.data._id) {
            return action.data
          }
          return t
        })
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        docs: state.docs.filter(t => t._id !== action.data._id)
      }
    case SET_CATEGORIES_FILTER:
      return {
        ...state,
        filter: action.data
      }
    default:
      return state
  }
}

export default categories