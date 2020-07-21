/* 文章列表Reducer */

import { 
  LOAD_ARTICLES,
  ADD_ARTICLE, 
  UPDATE_ARTICLE, 
  DELETE_ARTICLE,
  SET_ARTICLES_FILTER
} from '../action-types'

const initState = {
  filter: null,
  docs: []
}

const articles = (state = initState, action) => {
  switch(action.type){
    case LOAD_ARTICLES:
      return {
        ...state,
        docs: action.data
      }
    case ADD_ARTICLE:
      return {
        ...state,
        docs: [action.data, ...state.docs]
      }
    case UPDATE_ARTICLE:
      return {
        ...state,
        docs: state.docs.map(t => {
          if (t._id === action.data._id) {
            return action.data
          }
          return t
        })
      }
    case DELETE_ARTICLE:
      return {
        ...state,
        docs: state.docs.filter(t => t._id !== action.data._id)
      }
    case SET_ARTICLES_FILTER:
      return {
        ...state,
        filter: action.data
      }
    default:
      return state
  }
}

export default articles