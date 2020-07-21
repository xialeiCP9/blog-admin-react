import React, { useEffect, useState, useMemo, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import memoize from 'memoize-one'
import menuConfig from '../../config/menuConfig'
import Loading from '../../components/Loading'
import NavLeft from '../../components/NavLeft'
import HeaderTop from '../../components/HeaderTop'
import NoPermission from '../NoPermission'
import Styles from './Main.module.less'
import logo from '../../assets/images/logo.png'
import formatMenuPath from '../../utils/formatMenuPath'
import getRouteList from '../../utils/getRouteList'
import checkPermissions from '../../utils/checkPermissions'

const { Header, Content, Footer, Sider} = Layout
const menuRouteList = getRouteList(formatMenuPath(menuConfig))
const memoizeCheckPermissions = memoize(checkPermissions)
function Main (props) {
  /*const menuList = useMemo(() => formatMenuPath(menuConfig), [])
  const menuRouteList = useMemo(() => getRouteList(menuList), [menuList])*/
  const [collapsed, setCollapsed] = useState(false)
  const onCollapsed = collapsed => {
    setCollapsed(collapsed)
  }
  const { 
    user, 
    loadPermissionsAsync, 
    loadRolesAsync, 
    loadCategoriesAsync,
    loadUsersAsync,
    permissions,
    roles,
    users,
    categories,
    isFetching,
    isSaving
  } = props
  const rolePermissions = useMemo(() => {
    if (user && permissions.length && roles.length) {
      // 根据user的角色，获取对应的permissions
      const role = roles.find(role => role._id === user.role)
      const rps = role.permissions || []
      return permissions.filter(p => rps.indexOf(p._id) >= 0).map(p => p.code)
    }
    return []
  }, [user, permissions, roles])
  useEffect(() => {
    if (user && !permissions.length) {
      loadPermissionsAsync()
    }
  }, [user, loadPermissionsAsync, permissions.length])
  useEffect(() => {
    if (user && !roles.length) {
      loadRolesAsync()
    }
  }, [user, loadRolesAsync, roles.length])
  useEffect(() => {
    if (user && !users.length) {
      loadUsersAsync()
    }
  }, [user, loadUsersAsync, users.length])
  useEffect(() => {
    if (user && !categories.length) {
      loadCategoriesAsync()
    }  
  }, [user,loadCategoriesAsync, categories.length])

  if (!user) {
    return <Redirect to="/login" from="/" />
  }
  return (
    <Loading isLoading={isFetching || isSaving} tip={isFetching ? "正在加载资源，请稍后..." : "正在保存..."}>
      <Layout className={Styles.main}>
        <Sider collapsed={collapsed}>
          <div className={Styles["sider-header"]}>
            <div className={Styles["sider-header-logo"]}>
              <img src={logo} alt="logo" />
            </div>
            <span className={Styles["sider-header-tip"]}
            style={{visibility: collapsed ? "hidden" : "visible"}}>
              博客后台
            </span>
          </div>
          <NavLeft />
        </Sider>
        <Layout className={Styles["right"]}>
          <Header className={Styles["right-header"]}>
            <HeaderTop collapsed={collapsed} onCollapsed={onCollapsed} />
          </Header>
          <Content>
            {
              isFetching
              ?
              ''
              :
              <Suspense fallback={<Loading style={{position: "fixed"}} isLoading={true} tip="界面加载中..." />}>
                <Switch>
                  {
                    menuRouteList.map(item => (
                      <Route path={item.path} key={item.path} render={props => (
                        memoizeCheckPermissions(rolePermissions, item.permissions)
                        ?
                        <item.component {...props} />
                        :
                        <NoPermission {...props} />
                      )} />
                    ))
                  }
                  <Redirect to="/home" />
                </Switch>
              </Suspense>
            }
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Loading>
  )
}

export default Main