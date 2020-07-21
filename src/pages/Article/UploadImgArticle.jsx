import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Upload, message } from 'antd'
import Styles from './UploadImgArticle.module.less'
import { reqUploadImg } from '../../api/api'
import { updateArticleAsync } from '../../redux/actions/articlesAction'
import { getArticle } from '../../redux/selectors/articleSelectors'

function UploadImgArticle (props) {
  const [visible, setVisible] = useState(true)
  const [imgUrl, setImgUrl] = useState(null)
  const [file, setFile] = useState(null)
  const { updateArticleAsync, article } = props
  const id = props.match.params.id
  const ImgButton = (
    <div className={Styles["upload-box"]} style={imgUrl && {"backgroundImage": `url(${imgUrl})`}}>
      {imgUrl ? '' : '点此上传图片，若选择照片，请选横拍照片'}
    </div>
  )
  const cancel = () => {
    setVisible(false)
    props.history.replace('/articles/' + id)
  }
  const beforeUpload = file => {
    if (file.type.includes('image')) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        setImgUrl(e.target.result)
        setFile(file)
      }
    } else {
      message.error("上传的文件非图片")
    }
    return false
  }
  const upload = async () => {
    if (!file) {
      message.error("请选择一张图片")
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await reqUploadImg(formData)
      const url = res.file.url
      await updateArticleAsync({
        ...article,
        bgImg: url,
        updateAt: new Date().getTime()
      })
      message.success("文章配图成功")
    } catch (err) {
      
    } finally{
      props.history.replace('/articles/' + id)
    }
  }
  return (
    <Modal
      style={{"maxWidth": "960px", "padding": "20px"}}
      width="100%"
      visible={visible}
      title="上传图片"
      cancelText="取消"
      onCancel={cancel}
      okText="确认"
      onOk={upload}
    >
      <Upload
        className={Styles["upload"]}
        name="articleBg"
        listType="picture"
        showUploadList={false}
        beforeUpload={beforeUpload}
       >
        {ImgButton}
      </Upload>
    </Modal>
  )
}

export default connect(
  state => ({
    article: getArticle(state)
  }),
  { updateArticleAsync }
)(UploadImgArticle)