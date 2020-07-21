/* 生成占位符 */
import { v4 as uuidv4 } from 'uuid'
import getDecorated from './decorate'

function getUploadPlaceholder (file, onImageUpload) {
  /* 获取占位符字符串 */
  const placeholder = getDecorated('', 'image', {
    target: 'Upload_' + uuidv4(),
    imageUrl: ''
  }).text
  const uploaded = new Promise((resolve, reject) => {
    onImageUpload(file).then(url => {
      resolve(getDecorated('', 'image', {
        target: 'image',
        imageUrl: url
      }).text)
    }).catch(err => {
      reject(err)
    })
  })

  return {placeholder, uploaded}
}

export default getUploadPlaceholder
