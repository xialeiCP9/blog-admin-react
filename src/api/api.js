/**
统一接口处理
*/
import axios from 'axios'
import {
  API_HOSTNAME,
  API_POSITION,
  API_WEATHER
} from '../config/API'

// 请求天气方法
export const reqWeather = position => axios.get(`${API_WEATHER}/${position}`)
// 请求地址方法
export const reqPosition = () => axios.get(API_POSITION)

// 请求登录
export const reqLogin = user => axios.post(`${API_HOSTNAME}/login`, user)
// 请求注册
export const reqRegister = user => axios.post(`${API_HOSTNAME}/register`, user)
// 根据token获取用户信息
export const reqAuthByToken = token => axios.post(`${API_HOSTNAME}/authtoken`, {token})
// 根据username判断用户名是否已被注册过
export const reqValidateUsername = username => axios.post(`${API_HOSTNAME}/repeatability`, {username})
// 邮箱验证
export const reqValidateEmail = ({email, _id, username}) => axios.post(`${API_HOSTNAME}/sendmail`, {email, _id, username})
// 判断用户是否激活
export const reqActiveEmail = id => axios.get(`${API_HOSTNAME}/check/${id}`)
/* 修改密码 */
export const reqChangePwd = ({username, password, newPassword}) => axios.post(`${API_HOSTNAME}/changepwd`, {username, password, newPassword})

const $http = axios.create({
  baseURL: API_HOSTNAME
})

$http.interceptors.request.use(config => {
  // 读取token
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, err => {
  Promise.reject(err)
})

$http.interceptors.response.use(resp => {
  console.log(resp)
  if (resp.data.code === 0) {
    return resp.data.data
  } else {
    return null
  }
}, err => {
  return Promise.reject(err.response.data)
})
/* 获取全部权限 */
export const reqPermissions = () => $http.get('/rest/permissions')
/* 获取全部角色 */
export const reqRoles = () => $http.get('/rest/roles')
/* 增加角色 */
export const reqAddRole = role => $http.post('/rest/roles', role)
/* 删除角色 */
export const reqDeleteRole = id => $http.delete('/rest/roles/' + id)
/* 更新角色 */
export const reqUpdateRole = role => $http.put('/rest/roles', role)
/* 获取全部目录 */
export const reqCategories = () => $http.get('/rest/categories')
/* 增加目录 */
export const reqAddCategory = category => $http.post('/rest/categories', category)
/* 删除目录 */
export const reqDeleteCategory = id => $http.delete('/rest/categories/' + id)
/* 更新目录 */
export const reqUpdateCategory = category => $http.put('/rest/categories', category)
/* 获取用户 */
export const reqUsers = (options) => $http({
  url: '/rest/users',
  method: 'GET',
  params: options
})
/* 更新用户信息 */
export const reqUpdateUser = user => $http.put('/rest/users', user)
/* 查询文章列表 */
export const reqArticles = (options) => $http({
  url: '/rest/articles',
  method: 'GET',
  params: options
})
/* 根据文章ID查询文章 */
export const reqArticleById = id => $http.get('/rest/articles/' + id)
/* 添加文章 */
export const reqAddArticle = article => $http.post('/rest/articles', article)
/* 更新文章 */
export const reqUpdateArticle = article => $http.put('/rest/articles', article)
/* 删除文章 */
export const reqDeleteArticle = id => $http.delete('/rest/articles/' + id)
/* 上传图片接口 */
export const reqUploadImg = file => $http.post('/upload', file)
