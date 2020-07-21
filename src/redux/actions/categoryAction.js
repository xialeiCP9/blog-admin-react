import {
  reqCategories,
  reqAddCategory,
  reqDeleteCategory,
  reqUpdateCategory
} from '../../api/api'
import {
  LOAD_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_CATEGORIES_FILTER
} from '../action-types'
import async from '../../utils/async'

export const loadCategoriesAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOAD_CATEGORIES,
      method: reqCategories,
      data: {},
      success: resp => {
        console.log('loadPermissionsAsync success', resp)
        dispatch({type: LOAD_CATEGORIES, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('loadPermissionsAsync failed', err)
        reject(err)
      }
    })
  })
}

export const addCategoryAsync = role => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: ADD_CATEGORY,
      method: reqAddCategory,
      data: role,
      success: resp => {
        dispatch({type: ADD_CATEGORY, data: resp.data})
        console.log(resp)
        resolve(resp)
      },
      failed: err => {
        console.log('addRoleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const deleteCategoryAsync = id => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: DELETE_CATEGORY,
      method: reqDeleteCategory,
      data: id,
      success: resp => {
        dispatch({type: DELETE_CATEGORY, data: resp.data})
        console.log(resp)
        resolve(resp)
      },
      failed: err => {
        console.log('addRoleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const updateCategoryAsync = category => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: UPDATE_CATEGORY,
      method: reqUpdateCategory,
      data: category,
      success: resp => {
        dispatch({type: UPDATE_CATEGORY, data: resp.data})
        console.log(resp)
        resolve(resp)
      },
      failed: err => {
        console.log('addRoleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const setCategoriesFilter = filter => ({type: SET_CATEGORIES_FILTER, data: filter})