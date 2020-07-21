import { connect } from 'react-redux'

import Login from './Login'
import { loginAsync } from '../../redux/actions/authAction'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import { getAuth } from '../../redux/selectors/authSelectors'
import { LOGIN } from '../../redux/action-types'

const selector = createLoadingSelector([LOGIN])

export default connect(
  state => ({user: getAuth(state), isFetching: selector(state)}),
  {loginAsync}
)(Login)
