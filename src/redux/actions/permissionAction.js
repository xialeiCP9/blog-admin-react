import {
  LOAD_PERMISSIONS
} from '../action-types'
import {
  reqPermissions
} from '../../api/api'
import async from '../../utils/async'

export const loadPermissionsAsync = () => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOAD_PERMISSIONS,
      method: reqPermissions,
      data: {},
      success: resp => {
        console.log('loadPermissionsAsync success', resp)
        dispatch({type: LOAD_PERMISSIONS, data: resp.data})
        resolve()
      },
      failed: err => {
        console.log('loadPermissionsAsync failed', err)
        reject(err)
      }
    })
  })
}
