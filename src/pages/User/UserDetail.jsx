import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Input, Form, Button, Select, Avatar, Switch, Row, Col, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  roles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.name,
    permissions: PropTypes.arrayOf(PropTypes.string)
  })),
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.avatar,
    isValid: PropTypes.bool,
    role: PropTypes.string
  }),
  updateUserAsync: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  setSelectedUser: PropTypes.func,
  setVisible: PropTypes.func
}

const defaultProps = {
  user: {
    _id: '',
    username: '',
    email: '',
    avatar: '',
    isValid: false,
    role: ''
  },
  visible: false,
  permissions: [],
  roles: []
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

function UserDetail (props) {
  const { user, roles, permissions, updateUserAsync, visible, setSelectedUser, setVisible } = props
  const [form] = Form.useForm()
  const [rolePermissions, setRolePermissions] = useState([])
  const [change, setChange] = useState(false) //判断值是否有修改
  const handleClose = () => {
    if (change) {
      Modal.confirm({
        title: '用户信息有修改，是否确定退出编辑界面？',
        icon: <ExclamationCircleOutlined />,
        content: '点击是，直接退出界面; 点击否，则回到编辑界面',
        onOk () {
          setVisible(false)
          setTimeout(() => setSelectedUser(null), 500)
        },
        onCancel () {
        }
      })
    } else {
      setVisible(false)
      setTimeout(() => setSelectedUser(null), 500)
    }
  }
  const handleChange = (changedValues, allValues) => {
    // 如果是修改了用户，同步修改权限列表
    if (changedValues.role) {
      let userPermissions = roles.find(item => item._id === changedValues.role).permissions
      userPermissions = userPermissions || []
      setRolePermissions(permissions.filter(item => userPermissions.includes(item._id)))
    }
    if (allValues.role !== user.role || allValues.isValid !== user.isValid) {
      setChange(true)
    } else {
      setChange(false)
    }
  }
  /* 保存用户信息 */
  const handleSave = () => {
    const newUser = {
      ...user,
      ...form.getFieldsValue()
    }
    updateUserAsync(newUser).then(resp => {
      message.success(resp.msg)
      setVisible(false)
      setTimeout(() => setSelectedUser(null), 500)
    }).catch(err => {
      message.error(err.msg)
      setVisible(false)
      setTimeout(() => setSelectedUser(null), 500)
    })
  }
  useEffect(() => {
    form.setFieldsValue({
      username: user ? user.username : '',
      email: user ? user.email : '',
      role: user ? user.role : '',
      isValid: user ? user.isValid : false
    })
  }, [user, form])
  useEffect(() => {
    if (user) {
      let userPermissions = roles.find(item => item._id === user.role).permissions
      userPermissions = userPermissions || []
      setRolePermissions(permissions.filter(item => userPermissions.includes(item._id)))
    }
  }, [user, permissions, roles])
  return (
    <Drawer
      title={`${user ? user.username : ''}的详细信息`}
      width={500}
      visible={visible}
      onClose={handleClose}
      bodyStyle={{
        display: "flex"
      }}
      footer={
        <div style={{width: "100%", textAlign: "right"}}>
          <Button type="primary" disabled={!change} onClick={handleSave} style={{width: "40%", marginRight: 10}}>提交</Button>
          <Button style={{width: "40%"}} onClick={handleClose}>取消</Button>
        </div>
      }
      getContainer={false}
    >
      <section style={{padding: "10px 20px"}}><Avatar size={48} src={user ? user.avatar : ''} /></section>
      <section style={{flex: 1}}>
        <Form
          name="user_form"
          form={form}
          {...layout}
          initialValues={{
            username: user ? user.username : '',
            email: user ? user.email : '',
            role: user ? user.role : '',
            isValid: user ? user.isValid : false
          }}
          onValuesChange={handleChange}
        >
          <Form.Item
            label="用户名"
            name="username"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="是否启用"
            name="isValid"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
          <Form.Item
            label="角色"
            name="role"
          >
            <Select>
            {
              roles.map(item => (
                <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
              ))
            }
            </Select>
          </Form.Item>
        </Form>
        <Row style={{color: 'black'}}>
          <Col span={layout.labelCol.span} style={{textAlign: "right", paddingRight: 8}}>角色权限:</Col>
          <Col span={layout.wrapperCol.span} style={{
            minHeight: 60,
            maxHeight: 200, 
            overflowY: "scroll", 
            border: "1px solid #1DA57A",
            borderRadius: 6
          }}>
            <ul style={{marginLeft: 10}}>
              {
                rolePermissions.map(item => (
                  <li key={item._id}>{item.name}</li>
                ))
              }
            </ul>
          </Col>
        </Row>
      </section>
    </Drawer>
  )
}

UserDetail.propTypes = propTypes
UserDetail.defaultProps = defaultProps

export default UserDetail