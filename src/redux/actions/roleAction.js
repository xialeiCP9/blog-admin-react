import {
  reqRoles,
  reqAddRole,
  reqDeleteRole,
  reqUpdateRole
} from '../../api/api'
import {
  LOAD_ROLES,
  ADD_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
  SET_ROLES_FILTER
} from '../action-types'
import async from '../../utils/async'

export const loadRolesAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOAD_ROLES,
      method: reqRoles,
      data: {},
      success: resp => {
        console.log('loadPermissionsAsync success', resp)
        dispatch({type: LOAD_ROLES, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('loadPermissionsAsync failed', err)
        reject(err)
      }
    })
  })
}

export const addRoleAsync = role => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: ADD_ROLE,
      method: reqAddRole,
      data: role,
      success: resp => {
        dispatch({type: ADD_ROLE, data: resp.data})
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

export const deleteRoleAsync = id => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: DELETE_ROLE,
      method: reqDeleteRole,
      data: id,
      success: resp => {
        dispatch({type: DELETE_ROLE, data: resp.data})
        console.log(resp.data)
        resolve(resp)
      },
      failed: err => {
        console.log('deleteRoleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const updateRoleAsync = role => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: UPDATE_ROLE,
      method: reqUpdateRole,
      data: role,
      success: resp => {
        dispatch({type: UPDATE_ROLE, data: resp.data})
        console.log('updateRoleAsync 更新角色', resp)
        resolve(resp)
      },
      failed: err => {
        console.log('addRoleAsync failed', err)
        reject(err)
      }
    })
  })
}

export const setRoleFilter = filter => ({type: SET_ROLES_FILTER, data: filter})