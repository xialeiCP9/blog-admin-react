/**
* 将routes中的path格式化成完整路径
* @params: routes
* @return: menuRoutes
**/
const formatMenuPath = (routes, parentPath = '/') => (
  routes.map(route => {
    const result = {
      ...route,
      path: `${parentPath}${route.path}`
    }
    if (route.children) {
      result.children = formatMenuPath(route.children, `${parentPath}${route.path}/`)
    }
    return result
  })
)
export default formatMenuPath