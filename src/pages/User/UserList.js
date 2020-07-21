import { connect } from 'react-redux'
import UserListPage from './UserListPage'
import { getUsers } from '../../redux/selectors/userSelectors'
import { getRoles } from '../../redux/selectors/roleSelectors'
import { getPermissions } from '../../redux/selectors/permissionSelectors'
import { loadUsersAsync, updateUserAsync } from '../../redux/actions/userAction'
import { LOAD_USERS } from '../../redux/action-types'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'

const loadingSelector = createLoadingSelector([LOAD_USERS])

export default connect(
  state => ({
    users: getUsers(state),
    roles: getRoles(state),
    permissions: getPermissions(state),
    isFetching: loadingSelector(state)
  }),
  { loadUsersAsync, updateUserAsync }
)(UserListPage)