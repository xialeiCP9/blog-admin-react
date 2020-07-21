import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Drawer, Button, Form, Input, message } from 'antd'

const propTypes = {
  category: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    parent: PropTypes.string
  }),
  addCategoryAsync: PropTypes.func,
  updateCategoryAsync: PropTypes.func,
  operate: PropTypes.oneOf(['add', 'update'])
}

function CategoryForm (props) {
  const history = useHistory()
  const inputNameRef = useRef(null)
  const [form] = Form.useForm()
  const { category, operate, updateCategoryAsync, addCategoryAsync, parent } = props
  const [visible, setVisible] = useState(true)
  const [modify, setModify] = useState(false)
  const close = () => {
    setVisible(false)
  }
  const handleVisibleChange = visible => {
    if (!visible)
      history.replace('/categories')
  }
  const isModify = (changedValues, allValues) => {
    let change = false
    const {name, desc} = allValues
    switch(operate) {
      case 'add':
        if(name.trim() === '' && desc.trim() === '') {
          change = false
        } else {
          change = true
        }
        break;
      case 'update':
        if(name === category.name && desc === category.desc) {
          change = false
        } else {
          change = true
        }
        break;
      default:
        break;
    }
    if (change !== modify) {
      setModify(change)
    }
  }
  const save = () => {
    form.validateFields().then(values => {
      let data
      switch (operate) {
        case 'add':
          if (category) {
            data = {
              ...values,
              parent: category._id
            }
          } else {
            delete values.parent
            data = {
              ...values
            }
          }
          addCategoryAsync(data).then(resp => {
            message.success("分类添加成功")
            close()
          }).catch(err => {
            message.error("分类添加失败, " + err.msg)
          })
          break;
        case 'update':
          if (category.parent) {
            data = {
              ...category,
              ...values,
              parent: category.parent
            }
          } else {
            delete values.parent
            data = {...category, ...values}
          }
          updateCategoryAsync(data).then(resp => {
            message.success("分类更新成功")
            close()
          }).catch(err => {
            message.error("分类更新失败, " + err.msg)
          })
          break;
        default:
          break;
      }
    })
  }
  useEffect(() => {
    inputNameRef.current.focus()
  }, [])
  return (
    <Drawer
      title="增加目录"
      getContainer={false}
      width={356}
      visible={visible}
      footer={
        <div style={{float: "right"}}>
          <Button type="primary" onClick={save} disabled={!modify}>确认</Button>
          <Button style={{"margin": "0 10px"}} onClick={close}>取消</Button>
        </div>
      }
      onClose={close}
      afterVisibleChange={handleVisibleChange}
      >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{
          parent: operate === 'add' ? (category ? category.name : '') : (parent ? parent.name : ''),
          name: operate === 'update' ? category.name : '',
          desc: operate === 'update' ? category.desc: ''
        }}
        onValuesChange={isModify}
      >
        <Form.Item
          label="上级分类"
          name="parent"
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="分类名称"
          name="name"
          rules={[
            {required: true, message: "分类名称不能为空"}
          ]}
        >
          <Input ref={inputNameRef} placeholder="分类名称" />
        </Form.Item>
        <Form.Item
          label="分类描述"
          name="desc"
        >
          <Input.TextArea rows={6} placeholder="分类描述" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}

CategoryForm.propTypes = propTypes

export default CategoryForm