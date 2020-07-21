import React, {Component} from 'react'
import i18n from '../i18n'
import Icon from '../components/Icon'

class Clear extends Component {
  static align = 'left';
  static pluginName = 'clear'
  handleClick = () => {
    const { editor } = this.props
    if (editor.getText() === '') {
      return
    }
    if (window.confirm && typeof window.confirm === 'function') {
      const result = window.confirm('确认要清空文档吗?')
      if (result) {
        editor.setText('')
      }
    }
  }
  render () {
    return (
      <span
        title={i18n.get('btnClear')}
        onClick={this.handleClick}
      >
        <Icon type="delete" />
      </span>
    )
  }
}
export default Clear
