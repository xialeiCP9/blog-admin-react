import React from 'react'
import { Tabs, Form, Input, Button, Avatar, message } from 'antd'
import Styles from './AccountPage.module.less'
import CutPic from '../../components/CutPic/CutPic'
import ChangePassword from './ChangePassword'

function AccountPage (props) {
  const { user, token, updateUserAsync } = props
  const save = values => {
    const newUser = {
      ...user,
      ...values
    }
    updateUserAsync(newUser).then(resp => {
      message.success(resp.msg)
    }).catch(err => {
      message.error(err.msg)
    })
  }
  return (
    <section className={Styles.main}>
      <Tabs tabPosition="left" className={Styles["main-tabs"]}>
        <Tabs.TabPane key="1" tab="基本设置">
          <div className={Styles["settings-right"]}>
            <div className={Styles["settings-right-title"]}>
              基本设置
            </div>
            <div className={Styles["settings-base-view"]}>
              <div className={Styles["base-view-left"]}>
                <Form
                  layout="vertical"
                  name="user_form"
                  initialValues={{
                    username: user.username,
                    email: user.email,
                    introduction: user.introduction
                  }}
                  onFinish={save}
                >
                  <Form.Item 
                    label="邮箱" 
                    name="email"
                    rules={[
                      {required: true, message: "请输入您的邮箱!"}
                    ]}
                  >
                    <Input type="email" placeholder="请输入您的邮箱" />
                  </Form.Item>
                  <Form.Item 
                    label="用户名" 
                    name="username"
                    rules={[
                      {required: true, message: "请输入您的用户名!"}
                    ]}
                  >
                    <Input placeholder="请输入您的用户名" />
                  </Form.Item>
                  <Form.Item 
                    label="个人简介" 
                    name="introduction"
                  >
                    <Input.TextArea placeholder="个人简介" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      更新基本信息
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className={Styles["base-view-right"]}>
                <div className={Styles["base-view-avatar-title"]}>
                  头像
                </div>
                <Avatar src={user.avatar} className={Styles["base-view-avatar"]} />
                <CutPic {...props} title="更换头像" token={token} user={user} updateUserAsync={updateUserAsync} />
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="修改密码">
          <div className={Styles["settings-right"]}>
            <div className={Styles["settings-right-title"]}>
              修改密码
            </div>
            <ChangePassword email={user.email} _id={user._id} username={user.username} />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </section>
  )
}

export default AccountPage