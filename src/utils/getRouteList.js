/* */
const getRouteList = menuData => {
  return menuData.reduce((keys, item) => {
    if (item.children) {
      return keys.concat(getRouteList(item.children))
    }
    keys.push(item)
    return keys
  }, [])
}
export default getRouteList