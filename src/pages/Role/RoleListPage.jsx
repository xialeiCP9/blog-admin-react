import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Modal, message } from 'antd'
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import Styles from './RoleListPage.module.less'
import DrawerForm from './DrawerForm'
import PermissionTransfer from './PermissionTransfer'

const propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })),
  addRoleAsync: PropTypes.func.isRequired,
  updateRoleAsync: PropTypes.func.isRequired,
  deleteRoleAsync: PropTypes.func.isRequired
}

function RoleListPage (props) {
  const { roles, permissions, addRoleAsync, updateRoleAsync, deleteRoleAsync } = props
  const [selectedRole, setSelectedRole] = useState(roles[0])
  const [mode, setMode] = useState(0)
  const edit = item => {
    setSelectedRole(item)
    setMode(2)
  }
  const delRole = (e, item) => {
    e.stopPropagation()
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>是否确认删除角色“
          <span style={{fontWeight: 700, color: "rgba(22, 234, 234)"}}>{item.name}</span>” ???
          <br /> 注意!!!&emsp;删除后不可恢复
        </p>),
      onOk () {
        deleteRoleAsync(item._id).then(resp => {
          console.log(roles)
          setSelectedRole(roles.find(r => r._id !== item._id))
          message.success(`角色${resp.data.name}删除成功`)
        }).catch(err => {
          console.log('delete err', err)
          message.error(<span>删除{item.name}失败!<pre>{err.msg}</pre></span>)
        })
      },
      onCancel () {

      }
    })
  }
  return (
    <Card
      className={Styles["main-card"]}
      title="角色管理"
      bordered={false}
      extra={
        <Button type="dashed" onClick={() => setMode(1)}><PlusOutlined />增加角色</Button>
      }
      bodyStyle={{display: "flex", height: "calc(100% - 60px)"}}
    >
      <section className={Styles["card-role-list"]}>
        <p className={Styles["role-list-title"]}>角色列表</p>
        <ul>
          {
            roles.map(item => (
              <li 
                key={item._id}
                title="双击编辑角色信息"
                className={selectedRole._id === item._id ? Styles["active"] : ''}
                onClick={() => setSelectedRole(item)}
                onDoubleClick={() => edit(item)}
                >
                  {item.name}
                  <span className={Styles["li-operation"]} title="删除角色" onClick={e => delRole(e, item)}>
                    <DeleteOutlined />删除
                  </span>
              </li>
            ))
          }
        </ul>
      </section>
      <section className={Styles["card-permission"]}>
        <PermissionTransfer permissions={permissions} role={selectedRole} updateRoleAsync={updateRoleAsync}  />
      </section>
      <DrawerForm mode={mode} selectedRole={selectedRole} 
        setMode={setMode} addRoleAsync={addRoleAsync} updateRoleAsync={updateRoleAsync}
       />
    </Card>
  )
}

RoleListPage.propTypes = propTypes

export default RoleListPage