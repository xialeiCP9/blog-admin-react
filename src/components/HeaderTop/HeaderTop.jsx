import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Avatar, Dropdown, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, BellOutlined, 
  SettingOutlined, SnippetsOutlined, LogoutOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Styles from './HeaderTop.module.less'

const propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapsed: PropTypes.func.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func
}
const defaultProps = {
  collapsed: false
}

function HeaderTop (props) {
  const { collapsed, onCollapsed, user, logout } = props
  const menu = (
    <Menu>
      <Menu.Item key="/account">
        <Link to="/account">
          <span>
            <SettingOutlined />
            <span className={Styles["dropdown-item"]}>个人中心</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="/article">
        <Link to="/articles">
          <span>
            <SnippetsOutlined />
            <span className={Styles["dropdown-item"]}>我的文章</span>
          </span>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/logout">
        <div onClick={() => logout()}>
          <LogoutOutlined />
          <span className={Styles["dropdown-item"]}>退出登录</span>
        </div>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className={Styles.header}>
      <span className={Styles["header-trigger"]} onClick={() => onCollapsed(!collapsed)}>
        {
          collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
        }
      </span>
      <div style={{flex: "1 1 0%"}}></div>
      <div className={Styles["header-index-right"]}>
        <span className={Styles["header-index-action"]}>
          <Badge count={5} offset={[10, 0]}>
            <BellOutlined />
          </Badge>
        </span>
        
        <Dropdown overlay={menu}>
          <span className={Styles["header-index-action"]}>
            <Avatar src={user.avatar} alt="avatar" size={38} />
            <span className={Styles["header-index-name"]}>{user.username}</span>
          </span>
        </Dropdown>
        
      </div>
    </div>
  )
}

HeaderTop.propTypes = propTypes
HeaderTop.defaultProps =defaultProps

export default HeaderTop