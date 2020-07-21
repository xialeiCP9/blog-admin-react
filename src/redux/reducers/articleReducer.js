/* 加载文章内容 */
/* 文章列表Reducer */

import { 
  LOAD_ARTICLE
} from '../action-types'

const initState = null

const articles = (state = initState, action) => {
  switch(action.type){
    case LOAD_ARTICLE:
      return action.data
    default:
      return state
  }
}

export default articles