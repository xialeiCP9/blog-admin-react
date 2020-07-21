import { lazy } from 'react'

const Home = lazy(() => import('./Home/Home'))
const Article = lazy(() => import('./Article/Article'))
const Category = lazy(() => import('./Category/Category'))
const RoleList = lazy(() => import('./Role/RoleList'))
const Account = lazy(() => import('./Account/Account'))
const UserList = lazy(() => import('./User/UserList'))
const Pie = lazy(() => import('./Charts/Pie'))
const Line = lazy(() => import('./Charts/Line'))
const Bar = lazy(() => import('./Charts/Bar'))
/*import Home from './Home/Home'
import ArticleList from './Article/ArticleList'
import CategoryList from './Category/CategoryList'
import RoleList from './Role/RoleList'
import Personal from './Personal/Personal'
import UserList from './User/UserList'
import Pie from './Charts/Pie'
import Line from './Charts/Line'
import Bar from './Charts/Bar'*/

export {
  Home,
  Article,
  RoleList,
  Category,
  Account,
  UserList,
  Pie,
  Line,
  Bar
}
