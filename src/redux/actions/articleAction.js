import {
  LOAD_ARTICLE
} from '../action-types'
import { reqArticleById } from '../../api/api'

import async from '../../utils/async'

export const loadArticleAsync = id => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOAD_ARTICLE,
      method: reqArticleById,
      data: id,
      success: resp => {
        console.log('loadArticleAsync success', resp)
        dispatch({type: LOAD_ARTICLE, data: resp.data})
        resolve(resp)
      },
      failed: err => {
        console.log('loadArticleAsync failed', err)
        reject(err)
      }
    })
  })
}