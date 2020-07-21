/**
* 将对象数组，转换为一维数组
* @params: [Object]
* @params: []
**/
const getFlatMenuKeys = (menuData) => (
 menuData.reduce((keys, item) => {
    keys.push(item)
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children))
    }
    return keys
  }, [])
)

export default getFlatMenuKeys