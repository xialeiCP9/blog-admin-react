import {
  LOAD_USERS,
  UPDATE_USER,
  UPDATE_AUTH,
  SET_USERS_FILTER
} from '../action-types'
import {
  reqUsers,
  reqUpdateUser
} from '../../api/api'
import async from '../../utils/async'

export const loadUsersAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      method: reqUsers,
      type: LOAD_USERS,
      data: {},
      success: resp => {
        console.log('loadUsersAsync()success', resp)
        dispatch({type: LOAD_USERS, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('loadUsersAsync()failed', err)
        reject(err)
      }
    })
  })
}

export const updateUserAsync = user => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: UPDATE_USER,
      method: reqUpdateUser,
      data: user,
      success: resp => {
        dispatch({type: UPDATE_USER, data: resp.data})
        dispatch({type: UPDATE_AUTH, data: resp.data})
        console.log('updateUserAsync()更新用户', resp)
        resolve(resp)
      },
      failed: err => {
        console.log('updateUserAsync()failed', err)
        reject(err)
      }
    })
  })
}

export const setUserFilter = filter => ({type: SET_USERS_FILTER, data: filter})