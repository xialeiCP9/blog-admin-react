/* 权限Reducer */

import { LOAD_PERMISSIONS } from '../action-types'

const initState = {
  filter: null,
  docs: []
}

const permissions = (state = initState, action) => {
  switch(action.type){
    case LOAD_PERMISSIONS:
      return {
        ...state,
        docs: action.data
      }
    default:
      return state
  }
}

export default permissions