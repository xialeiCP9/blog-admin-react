import { connect } from 'react-redux'
import ArticleListPage from './ArticleListPage'
import { loadArticlesAsync, setArticlesFilter } from '../../redux/actions/articlesAction'
import { setCategoriesFilter } from '../../redux/actions/categoryAction'
import { getArticlesByFilter } from '../../redux/selectors/articlesSelectors'
import { getCategoryTree } from '../../redux/selectors/categorySelectors'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import { LOAD_ARTICLES } from '../../redux/action-types'

const loadingSelector = createLoadingSelector([LOAD_ARTICLES])

export default connect(
  state => ({
    articles: getArticlesByFilter(state),
    categories: getCategoryTree(state),
    isFetching: loadingSelector(state)
  }),
  { loadArticlesAsync, setArticlesFilter, setCategoriesFilter }
)(ArticleListPage)