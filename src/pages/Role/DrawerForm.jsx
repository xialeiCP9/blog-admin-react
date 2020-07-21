import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import { Drawer, Form, Input, Button, Modal, message } from 'antd'
import { ExclamationCircleOutlined, SaveOutlined } from '@ant-design/icons'

const propTypes = {
  mode: PropTypes.number.isRequired, // 0-不显示 1-新增 2-编辑
  selectedRole: PropTypes.object,
  setMode: PropTypes.func.isRequired,
  addRoleAsync: PropTypes.func.isRequired,
  updateRoleAsync: PropTypes.func.isRequired
}
const defaultProps = {
  mode: 0
}

function DrawerForm (props) {
  const { mode, setMode, selectedRole, addRoleAsync, updateRoleAsync } = props
  const nameRef = useRef(null)
  const [change, setChange] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      name: mode === 2 ? selectedRole.name : ""
    })
    setChange(false)
  }, [mode, selectedRole, form])

  useEffect(() => {
    nameRef.current.focus()
  })

  const save = async values => {
    let result = null
    if (mode === 1) {
      result = await addRoleAsync({name: values.name})
    } else {
      const role = {
        ...selectedRole,
        name: values.name
      }
      result = await updateRoleAsync(role)
    }
    message.success(result.msg)
    setMode(0)
  }

  const changeValues = (changedValues, allValues) => {
    let change = false
    if (mode === 1) {
       change = changedValues.name.trim() !== ''
    } else {
      change = changedValues.name.trim() !== selectedRole.name && changedValues.name.trim() !== ''
    }
    setChange(change)
  }

  const close = () => {
    if (change) {
      Modal.confirm({
        title: '角色信息有修改，是否确定退出编辑界面？',
        icon: <ExclamationCircleOutlined />,
        content: '点击是，直接退出界面; 点击否，则回到编辑界面',
        onOk () {
          setMode(0)
        },
        onCancel () {
        }
      })
    } else {
      setMode(0)
    }
  }

  return (
    <Drawer
      title={`${mode === 1 ? "新增" : "编辑"}角色`}
      visible={mode !== 0}
      onClose={close}
      getContainer={false}
    >
      <Form
        form={form}
        scrollToFirstError
        name="role-form"
        initialValues={{
          name: mode === 2 ? selectedRole.name : ""
        }}
        onFinish={save}
        onValuesChange={changeValues}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "角色名称不能为空"
            }
          ]}
        >
          <Input
            placeholder="请输入角色名称"
            ref={nameRef}
           />
        </Form.Item>
        <Form.Item>
          <Button 
          disabled={!change}
          type="primary" 
          htmlType="submit" 
          style={{width: "100%"}}><SaveOutlined />保存</Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

DrawerForm.propTypes = propTypes
DrawerForm.defaultProps = defaultProps

export default DrawerForm