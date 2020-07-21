import { connect } from 'react-redux'
import RoleListPage from './RoleListPage'
import { getRoles } from '../../redux/selectors/roleSelectors'
import { getPermissions } from '../../redux/selectors/permissionSelectors'
import { addRoleAsync, updateRoleAsync, deleteRoleAsync } from '../../redux/actions/roleAction'

export default connect(
  state => ({
    roles: getRoles(state),
    permissions: getPermissions(state)
  }),
  { addRoleAsync, updateRoleAsync, deleteRoleAsync }
)(RoleListPage)