import React, { Component } from 'react'
import i18n from '../../i18n'
import Icon from '../../components/Icon'
import InputFile from './InputFile'
import Styles from './style.module.less'
import getUploadPlaceholder from '../../utils/getUploadPlaceholder'

class Image extends Component {
  static pluginName = 'image';
  static align = 'left';
  constructor (props) {
    super(props)
    this.inputFile = React.createRef()
  }
  handleImageUpload = () => {
    if (this.inputFile.current) {
      this.inputFile.current.click()
    }
  }
  onImageChanged (file) {
    const placeholder = getUploadPlaceholder(file, this.props.editor.onImageUpload)
    this.props.editor.insertPlaceholder(placeholder)
  }
  render () {
    return (
      <span
        className={Styles['image-wrapper']}
        title={i18n.get('btnImage')}
        onClick={this.handleImageUpload}
      >
        <Icon type="image" />
        <InputFile ref={this.inputFile} onChange={e => {
          e.preventDefault()
          if (e.target.files && e.target.files.length > 0) {
            this.onImageChanged(e.target.files[0])
          }
        }} />
      </span>
    )
  }
}

export default Image
