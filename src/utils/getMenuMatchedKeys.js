/**
* 获取符合path的所有路径
* @params: flatPaths 全部路径数组
* @params: paths 根据当前路径获取到的路径数组
* @return: [] 符合的路径数组
**/
import {pathToRegexp} from 'path-to-regexp'

const getMenuMatchedKeys = (flatMenus, paths) => {
  const flatPaths = flatMenus.map(item => item.path)
  return paths.reduce((matchedKeys, path) => {
    return matchedKeys.concat(flatPaths.filter(item => pathToRegexp(item).test(path)))
  }, [])
}

export default getMenuMatchedKeys