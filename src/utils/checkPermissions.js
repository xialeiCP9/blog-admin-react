/* 检测是否满足权限 */
const checkPermissions = (rolePermissions, needPermissions) => {
  // 如果页面不需要权限，就一定满足条件
  if (needPermissions === undefined || needPermissions.length === 0) {
    return true
  }
  // 用户拥有的权限比页面需要的权限多，就一定不满足
  if (rolePermissions.length  < needPermissions.length) {
    return false
  }
  // 检测页面需要的权限，用户是不是都有
  return !needPermissions.some(item => rolePermissions.indexOf(item) < 0)
}

export default checkPermissions