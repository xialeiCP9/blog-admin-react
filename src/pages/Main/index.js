import { connect } from 'react-redux'
import Main from './Main'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import { getAuth } from '../../redux/selectors/authSelectors'
import { getPermissions } from '../../redux/selectors/permissionSelectors'
import { getRoles } from '../../redux/selectors/roleSelectors'
import { getCategories } from '../../redux/selectors/categorySelectors'
import { getUsers } from '../../redux/selectors/userSelectors'
import { loadPermissionsAsync } from '../../redux/actions/permissionAction'
import { loadRolesAsync } from '../../redux/actions/roleAction'
import { loadCategoriesAsync } from '../../redux/actions/categoryAction'
import { loadUsersAsync } from '../../redux/actions/userAction'
import { 
  LOAD_PERMISSIONS, 
  LOAD_ROLES, ADD_ROLE, DELETE_ROLE, UPDATE_ROLE,
  LOAD_CATEGORIES, DELETE_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY,
  LOAD_USERS, UPDATE_USER
} from '../../redux/action-types'

const loadingSelectors = createLoadingSelector([LOAD_PERMISSIONS, LOAD_ROLES, LOAD_CATEGORIES, LOAD_USERS])
const savingSelectors = createLoadingSelector([
  ADD_ROLE, DELETE_ROLE, UPDATE_ROLE, UPDATE_USER, DELETE_CATEGORY, ADD_CATEGORY, UPDATE_CATEGORY
])

export default connect(
  state => ({
    user: getAuth(state),
    permissions: getPermissions(state),
    roles: getRoles(state),
    categories: getCategories(state),
    users: getUsers(state),
    isFetching: loadingSelectors(state),
    isSaving: savingSelectors(state)
  }),
  {loadPermissionsAsync, loadRolesAsync, loadCategoriesAsync, loadUsersAsync}
)(Main)