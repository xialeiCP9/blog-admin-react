import React from 'react'
import { Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'

function CutPic (props) {
  const { title, token, updateUserAsync, user } = props
  const imgCropProps = {
    modalTitle: '裁剪图片',
    modalOk: '确定',
    modalCancel: '取消',
    grid: true
  }
  const handleChange = (file, fileList, event) => {
    if (file.file.status !== 'uploading') {
      const url = file.file.response.data.file.url
      const newUser = {
        ...user,
        avatar: url
      }
      updateUserAsync(newUser).then(resp => {

      }).catch(err => {

      })
    }
  }
  const beforeUpload = file => {
    const isLt2M = file.size / 1024 / 1024 < 2
    return isLt2M
  }
  return (
    <ImgCrop rotate {...imgCropProps}>
      <Upload {...props}
        showUploadList={false}
        action="/admin/api/upload"
        headers={{Authorization: 'Bearer ' + token}}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        <Button>
          <UploadOutlined /> {title}
        </Button>
      </Upload>
    </ImgCrop>
  )
}

export default CutPic