import React from 'react'
import {Link} from 'react-router-dom'
import { Result, Button } from 'antd'

export default function NoPermission (props) {
  return (
    <Result
      style={{width: '100%', height: '90%'}}
      status="403"
      title="403"
      subTitle="对不起，您没有权限访问该界面，请联系管理员"
      extra={<Button type="primary"><Link to="/">返回首页</Link></Button>}
    />
  )
}
