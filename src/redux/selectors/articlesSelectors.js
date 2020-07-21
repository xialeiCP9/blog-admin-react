import { createSelector } from 'reselect'
import { getAllSubCategoriesByFilter } from './categorySelectors'

export const getArticles = state => state.articles.docs

export const getArticleFilter = state => state.articles.filter

export const getArticlesByFilter = createSelector([getArticles, getArticleFilter, getAllSubCategoriesByFilter], (articles, filter, categories) => {
  if (filter === null) {
    return articles
  }
  if (filter.value) {
    return articles.filter(item => filter.value.test(item.title) || filter.value.test(item.title))
  }
  const ids = categories.map(i => i._id)
  if (filter.category) {
    return articles.filter(item => ids.indexOf(item.category) >= 0)
  }
  return []
})