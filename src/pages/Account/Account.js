import { connect } from 'react-redux'
import AccountPage from './AccountPage'
import { getAuth, getToken } from '../../redux/selectors/authSelectors'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import { updateUserAsync } from '../../redux/actions/userAction'
import { UPDATE_USER } from '../../redux/action-types'

const selector = createLoadingSelector([UPDATE_USER])

export default connect(
  state => ({
    user: getAuth(state),
    token: getToken(state),
    isSaving: selector(state)
  }),
  { updateUserAsync }
)(AccountPage)