import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, message } from 'antd'
import { deleteArticleAsync } from '../../redux/actions/articlesAction'

function DelArticle (props) {
  const [visible, setVisible] = useState(true)
  const { deleteArticleAsync } = props
  const id = props.match.params.id
  const cancel = () => {
    setVisible(false)
    props.history.replace('/articles/' + id)
  }
  const del = () => {
    deleteArticleAsync(id).then(resp => {
      message.success("删除文章" + resp.data.title + "成功")
      props.history.replace('/articles')
    }).catch(err => {
      message.error("删除文章失败" + err.msg)
    })
  }
  return (
    <Modal
      visible={visible}
      title="是否确认删除"
      okText="是，确定删除"
      cancelText="否，我要再想想"
      onCancel={cancel}
      onOk={del}
    >
      文章删除后，不能够恢复，是否确认删除?
    </Modal>
  )
}

export default connect(
  null,
  { deleteArticleAsync }
)(DelArticle)