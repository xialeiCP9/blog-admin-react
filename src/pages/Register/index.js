import { connect } from 'react-redux'
import Register from './Register'
import { registerAsync } from '../../redux/actions/authAction'
import createLoadingSelector from '../../redux/selectors/createLoadingSelector'
import { getAuth } from '../../redux/selectors/authSelectors'
import { LOGIN } from '../../redux/action-types'

const selector = createLoadingSelector([LOGIN])

export default connect(
  state => ({user: getAuth(state), isFetching: selector(state)}),
  {registerAsync}
)(Register)
