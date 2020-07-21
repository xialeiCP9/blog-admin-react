import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Input, Checkbox, Button, Spin, message } from 'antd'
import { UserOutlined, LockOutlined, WeiboCircleFilled, WechatFilled, GithubFilled } from '@ant-design/icons'
import Styles from './Login.module.less'
import logo from '../../assets/images/logo.png'

function Login (props) {
  const { user, location, loginAsync, isFetching } = props
  // 已经登录，就跳转到主页
  if (user) {
    return <Redirect to="/" from="/login" />
  }
  const {pathname} = location
  const doLogin = values => {
    const {username, password, remember} = values
    loginAsync({username, password}).then(resp => {
      message.success(resp.data.data.msg)
      if (remember) {
        localStorage.setItem('token', resp.data.data.token)
      } else {
        sessionStorage.setItem('token', resp.data.data.token)
      }
    }).catch(err => {
      message.error(err.response.data.msg)
    })
  }
  return (
    <Spin spinning={isFetching} size="large">
      <div className={Styles.wrapper}>
        <div className={Styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={Styles["main"]}>
          <h4 className={Styles.title}>
            <div className={Styles["normal-title"]}>
              <Link to="/login" className={Styles[pathname === '/login' ? 'active' : '']}>登录</Link>
              <b>·</b>
              <Link to="/register" className={Styles[pathname === '/register' ? 'active' : '']}>注册</Link>
            </div>
          </h4>
          <div className={Styles["js-sign-in-container"]}>
            <Form
              name="sign-in-form"
              initialValues={{
                remember: true
              }}
              scrollToFirstError
              onFinish={doLogin}
            >
              <Form.Item
                name="username"
                rules={[
                  {required: true, message: '请输入用户名'},
                  {min: 3, message: "用户名必须为3-12位"},
                  {max: 12, message: "用户名必须为3-12位"},
                  {pattern: /^[a-zA-Z0-9_!]*$/, message: "用户名应为数字字母下划线感叹号的组合"}
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="用户名" 
                  size="large"
                  autoFocus
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={
                  [
                    {required: true, message: "请输入密码"},
                    {min: 3, message: "密码必须3-20位"},
                    {max: 20, message: "密码必须3-20位"}
                  ]
                }
                >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="输入密码"
                  size="large"
                />
              </Form.Item>
              <Form.Item className={Styles['login-form-checkout']}>
                <Form.Item name="remember" valuePropName="checked" style={{float: 'left', 'marginBottom': 0}}>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Link to="/" style={{float: 'right'}}>忘记密码?</Link>
              </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" className={Styles["login-form-button"]}>
                    登录
                  </Button>
                </Form.Item>
            </Form>
            <div className={Styles["more-sign"]}>
              <h6>
                社交账号登录
              </h6>
              <ul>
                <li><Link to="/"><WeiboCircleFilled /></Link></li>
                <li><Link to="/"><WechatFilled /></Link></li>
                <li><Link to="/"><GithubFilled /></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default Login
