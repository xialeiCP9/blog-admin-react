import { createSelector } from 'reselect'
import memoize from 'memoize-one'

const memoizeGetFlatSubCategories = memoize(getFlatSubCategories)
const memoizeGetParentCategories = memoize(getParentCategories)

export const getCategories = state => state.categories.docs

export const getCategoryFilter = state => state.categories.filter

// 获取当前目录的子目录
export const getSubCategoriesByFilter = createSelector([getCategories, getCategoryFilter], (datas, filter) => {
  if (!filter || !filter._id) {
    return datas.filter(item => !item.parent).map(item => {
      return {
        ...item,
        count: datas.filter(t => t.parent === item._id).length
      }
    })
  } 
  return datas.filter(item => item.parent === filter._id).map(item => {
      return {
        ...item,
        count: datas.filter(t => t.parent === item._id).length
      }
  })
})

//转换目录为树结构
export const getCategoryTree = createSelector([getCategories], datas => {
  const list = datas.flatMap(item => {
    const t = {...item}
    t.label = t.name
    t.value = t._id
    return t
  })
  const getSubList = (list) => {
    list.forEach(t => {
      const filterArr = list.filter(i => i.parent === t._id)
      if (filterArr.length > 0) {
        t.children = filterArr
      }
    })
  }
  getSubList(list)
  return list.filter(i => !i.parent)
})

export const getCategoryTreeByFilter = createSelector([getCategories, getCategoryFilter], (datas, filter) => {
  const list = datas.flatMap(item => ({...item}))
  let current = {}
  list.forEach(t => {
    const filterArr = list.filter(i => i.parent === t._id)
    if (filterArr.length > 0) {
      t.children = filterArr
    }
    if (filter) {
      if (filter._id === t._id){
        current = t
      }
    }
  })
  return filter ? [current] : list.filter(i => !i.parent)
})

// 获取当前目录的父目录
export const getParentCategoriesByFilter = createSelector(
  [getCategories, getCategoryFilter], (datas, filter) => {
  return memoizeGetParentCategories(datas, filter)
})

// 获取当前目录的全部子目录
export const getAllSubCategoriesByFilter = createSelector(
    [getCategories, getCategoryFilter, getCategoryTreeByFilter], 
    (datas, filter, tree) => {
  if (!filter) {
    return datas
  }
  //获取当前分类全部子类（包括自身)
  return memoizeGetFlatSubCategories(tree)
})

// Utils
function getFlatSubCategories (categories) {
  return categories.reduce((children, t) => {
    children.push(t)
    if (t.children) {
      return children.concat(getFlatSubCategories(t.children))
    }
    return children
  }, [])
}

function getParentCategories (categories, id) {
  return categories.reduce((parents, t) => {
    if (t._id === id) {
      parents.unshift(t)
      if (t.parent) {
        return [...getParentCategories(categories, t.parent), ...parents]
      }
    }
    return parents
  }, [])
}