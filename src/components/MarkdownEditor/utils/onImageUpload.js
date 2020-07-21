/* 解析图片，将图片读取为base64 */
/**
* @param {file} 文件流
* @return Promise 
**/
function onImageUpload (file) {
  return new Promise((resolve, reject) => {
    if (file.type.includes('image')) {
      /* 图片才处理，否则报错 */
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = e => {
        const src = e.target.result
        resolve(src)
      }
    } else {
      reject('非图片')
    }
  })
}

export default onImageUpload
