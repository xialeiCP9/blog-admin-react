import { connect } from 'react-redux'
import AuthProvider from './AuthProvider'
import { autoLoginAsync } from '../../redux/actions/authAction'
import { LOGIN } from '../../redux/action-types'
import { getToken, getAuth } from '../../redux/selectors/authSelectors'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'

const loadingSelector = createLoadingSelector([LOGIN])

export default connect(
  state => ({
    token: getToken(state),
    user: getAuth(state),
    isFetching: loadingSelector(state)
  }),
  {autoLoginAsync}
)(AuthProvider)