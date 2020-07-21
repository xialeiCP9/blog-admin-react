import { createSelector } from 'reselect'
import memoize from 'memoize-one'
import { getCategories } from './categorySelectors'

const memoizeParentCategories = memoize(getParentCategoriesById)

export const getArticle = state => state.article

export const getArticleWithTitleDatas = 
  createSelector([getArticle, getCategories], (article, categories) => {
    if (article) {
      article.titleDatas = memoizeParentCategories(categories, article.category)
    }
    // 查询当前目录的所有父目录
    return article
})

function getParentCategoriesById (categories, id) {
  if (!id) {
    return []
  }
  return categories.reduce((parents, item) => {
    if (item._id === id) {
      parents.unshift(item)
      if (item.parent) {
        return [...getParentCategoriesById(categories, item.parent), ...parents]
      }
    }
    return parents
  }, [])
}
