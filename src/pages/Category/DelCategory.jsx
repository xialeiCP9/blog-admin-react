import React from 'react'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { getCategories } from '../../redux/selectors/categorySelectors'
import { deleteCategoryAsync } from '../../redux/actions/categoryAction'

function DelCategory (props) {
  const { categories, deleteCategoryAsync } = props
  let category = categories.find(item => item._id === props.match.params.id)
  const cancel = () => {
    props.history.replace('/categories')
  }
  const handleDel = () => {
    deleteCategoryAsync(category._id).then(resp => {
      category = resp.data
      message.success('删除目录' + category.name + "成功")
      props.history.replace('/categories')
    }).catch(err => {
      console.log(err)
      message.error('删除目录"' + category.name  + '"失败,' + err.msg)
      props.history.replace('/categories')
    })
  }
  return (
    <Modal
      title="确认删除"
      visible={true}
      okText="是, 删除"
      cancelText="否, 我再想想"
      onCancel={cancel}
      onOk={handleDel}
    >
      是否确认删除目录<span style={{fontSize: 20, color: "red", fontWeight: "bold"}}>{category ? category.name : ''}</span>
    </Modal>
  )
}

export default connect(
  state => ({
    categories: getCategories(state)
  }),
  { deleteCategoryAsync }
)(DelCategory)
