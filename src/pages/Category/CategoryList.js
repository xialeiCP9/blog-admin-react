import { connect } from 'react-redux'
import CategoryListPage from './CategoryListPage'
import { getSubCategoriesByFilter } from '../../redux/selectors/categorySelectors'
import { setCategoriesFilter } from '../../redux/actions/categoryAction'

export default connect(
  state => ({
    categories : getSubCategoriesByFilter(state)
  }),
  { setCategoriesFilter }
)(CategoryListPage)