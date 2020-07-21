/**
* markdown 编辑器的实现
**/
import React from 'react'
import PropTypes from 'prop-types'
import Editor from './editor'
import FullScreen from './plugins/FullScreen'
import Table from './plugins/Table'
import Clear from './plugins/Clear'
import Link from './plugins/Link'
import Fonts from './plugins/Fonts'
import Header from './plugins/Header'
import Image from './plugins/Image'
import ToggleMode from './plugins/ToggleMode'
Editor.use(Header)
Editor.use(Fonts)
Editor.use(Table)
Editor.use(Link)
Editor.use(Image)
Editor.use(Clear)
Editor.use(ToggleMode)
Editor.use(FullScreen)

const propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onImageUpload: PropTypes.func
}

const defaultProps = {
  style: {height: 450}
}

function MarkdownEditor (props) {
  return (
    <Editor style={props.style} text={props.value} onChange={props.onChange} onImageUpload={props.onImageUpload} />
  )
}

MarkdownEditor.propTypes = propTypes
MarkdownEditor.defaultProps = defaultProps
export default MarkdownEditor
