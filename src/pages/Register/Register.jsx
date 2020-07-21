import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Form, Input, Button, message, Spin } from 'antd'
import { UserOutlined, LockOutlined, WechatFilled, GithubFilled, MailOutlined } from '@ant-design/icons'
import Styles from './Register.module.less'
import logo from '../../assets/images/logo.png'
import { reqValidateUsername } from '../../api/api'

function Register (props) {
  const { user, location, registerAsync, isFetching } = props
  // 已经登录，就跳转到主页
  if (user) {
    return <Redirect to="/" from="/Register" />
  }
  console.log('执行到Register')
  const {pathname} = location
  const doRegister = values => {
    const {username, password, email} = values
    registerAsync({username, password, email}).then(resp => {
      message.success(resp.data.data.msg)
      sessionStorage.setItem('token', resp.data.data.token)
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
              onFinish={doRegister}
            >
              <Form.Item
                name="username"
                rules={[
                  {required: true, message: '请输入用户名'},
                  {min: 3, message: "用户名必须为3-12位"},
                  {max: 12, message: "用户名必须为3-12位"},
                  {pattern: /^[a-zA-Z0-9_!]*$/, message: "用户名应为数字字母下划线感叹号的组合"},
                  ({getFieldValue}) => ({
                    async validator (rule, value) {
                      const result = await reqValidateUsername(value)
                      if (result.data.data && result.data.data.isExit) {
                        return Promise.reject('用户名已存在')
                      }
                      return Promise.resolve()
                    }
                  })
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
              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {required: true, message: "确认密码不能为空"},
                  ({getFieldValue}) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject('密码不一致')
                    }
                  })
                ]}
                >
                <Input.Password placeholder="确认密码" prefix={<LockOutlined />} size="large" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {type: "email", message: "邮箱格式不正确"},
                  {required: true, message: "邮箱不能为空"}
                ]}
                hasFeedback
                >
                <Input placeholder="输入Email" prefix={<MailOutlined />} size="large" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className={Styles["login-form-button"]}>
                  注册
                </Button>
              </Form.Item>
              <p className={Styles["sign-up-msg"]}>
                点击 “注册” 即表示您同意并愿意遵守博客
                用户协议 和 隐私政策 。
              </p>
            </Form>
            <div className={Styles["more-sign"]}>
              <h6>
                社交账号直接注册
              </h6>
              <ul>
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

export default Register
