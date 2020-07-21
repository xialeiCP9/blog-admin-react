import HeaderTop from './HeaderTop'
import { connect } from 'react-redux'
import { getAuth } from '../../redux/selectors/authSelectors'
import { logout } from '../../redux/actions/authAction'

export default connect(
  state => ({user: getAuth(state)}),
  {logout}
)(HeaderTop)