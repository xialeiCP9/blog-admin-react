import React, {useCallback, useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import formatMenuPath from '../../utils/formatMenuPath'
import getFlatMenuKeys from '../../utils/getFlatMenuKeys'
import urlToList from '../../utils/urlToList'
import getMenuMatchedKeys from '../../utils/getMenuMatchedKeys'
import menus from '../../config/menuConfig'
const { SubMenu } = Menu
/**
* 将menuList格式化
**/
const menuList = formatMenuPath(menus)
const flatMenuKeys = getFlatMenuKeys(menuList)
const renderMenuList = menuList => (
  menuList.map(item => {
    if (item.children) {
      return (
        <SubMenu key={item.path} title={
          <span>
            {item.icon}
            <span>{item.title}</span>
          </span>
        }>
          { renderMenuList(item.children) }
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      </Menu.Item>
    )
  })
)

function NavLeft (props) {
  /* 获取当前路径 */
  const location = useLocation()
  const selectedKeys = useCallback(getMenuMatchedKeys, [location.pathname, menus])
  /*console.log('flatMenuKeys',flatMenuKeys)
  console.log('urlToList(location.pathname)',urlToList(location.pathname))
  console.log('matchedKeys',selectedKeys(flatMenuKeys, urlToList(location.pathname)))*/
  const [openKeys, setOpenKeys] = useState(selectedKeys(flatMenuKeys, urlToList(location.pathname)))
  const handleOpenChange = (openKeys) => {
    /*console.log('handleOpenChange()', openKeys)*/
    setOpenKeys(openKeys)
  }
  /* 使用redirect跳转时，需要重新计算openKeys */
  useEffect(() => {
    handleOpenChange(selectedKeys(flatMenuKeys, urlToList(location.pathname)))
  }, [location.pathname, selectedKeys])
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={ selectedKeys(flatMenuKeys, urlToList(location.pathname)) }
      openKeys={ openKeys }
      onOpenChange={ handleOpenChange }
      >
      {
        renderMenuList(menuList)
      }
    </Menu>
  )
}

export default NavLeft
