import { combineReducers } from 'redux'

import article from './articleReducer'
import articles from './articlesReducer'
import categories from './categoryReducer'
import loading from './loadingReducer'
import permissions from './permissionReducer'
import roles from './roleReducer'
import users from './userReducer'
import auth from './authReducer'

const rootReducers = combineReducers({
  article,
  articles,
  categories,
  loading,
  permissions,
  roles,
  users,
  auth
})

export default rootReducers