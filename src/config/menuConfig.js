/**
*  菜单列表
**/
import React from 'react'

/*import Home from '../pages/Home'
import User from '../pages/User'
import Role from '../pages/Role'
import Personal from '../pages/Personal'
import Articles from '../pages/Articles'
import Bar from '../pages/Charts/Bar'
import Pie from '../pages/Charts/Pie'
import Line from '../pages/Charts/Line'*/
import {
  Home,
  UserList,
  RoleList,
  Account,
  Article,
  Category,
  Bar,
  Pie,
  Line
} from '../pages'
import {
  HomeOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserSwitchOutlined,
  FileTextOutlined,
  SnippetsOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons'
const menuList = [
  {
    path: 'home',
    component: Home,
    title: '首页',
    permissions: [],
    icon: <HomeOutlined />
  },
  {
    path: 'users',
    component: UserList,
    title: '用户管理',
    permissions: ['0004'],
    icon: <UsergroupAddOutlined />
  },
  {
    path: 'account',
    component: Account,
    title: '个人中心',
    permissions: [],
    icon: <SettingOutlined />
  },
  {
    path: 'roles',
    component: RoleList,
    title: '角色管理',
    permissions: ['0003'],
    icon: <UserSwitchOutlined />
  },
  {
    path: 'articles',
    component: Article,
    title: '文章管理',
    permissions: ['0001'],
    icon: <SnippetsOutlined />
  },
  {
    path: 'categories',
    component: Category,
    title: '分类管理',
    permissions: ['0005'],
    icon: <FileTextOutlined />
  },
  {
    path: 'charts',
    title: '图表',
    icon: <AreaChartOutlined />,
    children: [
      {
        path: 'bar',
        title: '条形图',
        component: Bar,
        permissions: [],
        icon: <BarChartOutlined />
      },
      {
        path: 'line',
        title: '线形图',
        component: Line,
        permissions: [],
        icon: <LineChartOutlined />
      },
      {
        path: 'pie',
        title: '饼状图',
        component: Pie,
        permissions: [],
        icon: <PieChartOutlined />
      }
    ]
  }
]
export default menuList