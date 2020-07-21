import {
  LOGIN,
  LOGOUT
} from '../action-types'
import { reqAuthByToken, reqLogin, reqRegister } from '../../api/api'
import async from '../../utils/async'

/* 自动登录 */
export const autoLoginAsync = token => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOGIN,
      method: reqAuthByToken,
      data: token,
      success: resp => {
        dispatch({type: LOGIN, data: resp.data.data})
        resolve({msg: '获取用户信息成功'})
      },
      failed: err => {
        console.log('autoLoginAsyncfailed', err)
        reject(err)
      }
    })
  })
}

/* 登录 */
export const loginAsync = ({username, password}) => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOGIN,
      method: reqLogin,
      data: {username, password},
      success: resp => {
        dispatch({type: LOGIN, data: resp.data.data})
        console.log('loginAsync', resp)
        resolve(resp)
      },
      failed: err => {
        reject(err)
      }
    })
  })
}

/* 注册 */
export const registerAsync = ({username, password, email}) => dispatch => {
  return new Promise((resolve, reject) => {
    async({
      dispatch,
      type: LOGIN,
      method: reqRegister,
      data: {username, password, email},
      success: resp => {
        dispatch({type: LOGIN, data: resp.data.data})
        console.log('registerAsync', resp.data.data)
        resolve(resp)
      },
      failed: err => {
        reject(err)
      }
    })
  })
}

/* 退出登录 */
export const logout = () => dispatch =>  {
  // 删除token
  sessionStorage.removeItem('token')
  localStorage.removeItem('token')
  dispatch({type: LOGOUT})
}