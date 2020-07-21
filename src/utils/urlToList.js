/**
* 根据路径，得到所有匹配该路径的父路径
* @params: url
* @return: []
**/
const urlToList = (url) => {
  if (url) {
    const urlList = url.split('/').filter(i => i)
    return urlList.map((item, index) => {
      return `/${urlList.slice(0, index + 1).join('/')}`
    })
  }
  return []
}

export default urlToList