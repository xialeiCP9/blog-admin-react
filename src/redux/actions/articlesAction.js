import {
  LOAD_ARTICLES,
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  SET_ARTICLES_FILTER
} from '../action-types'
import async from '../../utils/async'
import { reqArticles, reqAddArticle, reqUpdateArticle, reqDeleteArticle } from '../../api/api'

export const loadArticlesAsync = options => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOAD_ARTICLES,
      method: reqArticles,
      data: options,
      success: resp => {
        console.log('loadArticlesAsync success', resp)
        dispatch({type: LOAD_ARTICLES, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('loadArticlesAsync failed', err)
        reject(err)
      }
    })
  })
}

export const addArticleAsync = article => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: ADD_ARTICLE,
      method: reqAddArticle,
      data: article,
      success: resp => {
        console.log('addArticleAsync success', resp)
        dispatch({type: ADD_ARTICLE, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('addArticleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const deleteArticleAsync = id => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: DELETE_ARTICLE,
      method: reqDeleteArticle,
      data: id,
      success: resp => {
        dispatch({type: DELETE_ARTICLE, data: resp.data})
        console.log('deleteArticleAsync 成功', resp.data)
        resolve(resp)
      },
      failed: err => {
        console.log('deleteArticleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const updateArticleAsync = article => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: UPDATE_ARTICLE,
      method: reqUpdateArticle,
      data: article,
      success: resp => {
        dispatch({type: UPDATE_ARTICLE, data: resp.data})
        console.log(resp)
        resolve(resp)
      },
      failed: err => {
        console.log('updateArticleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const setArticlesFilter = filter => ({type: SET_ARTICLES_FILTER, data: filter})