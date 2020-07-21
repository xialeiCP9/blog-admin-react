import React, {Component} from 'react'
import i18n from '../i18n'
import Icon from '../components/Icon'

class Link extends Component {
  static align = 'left';
  static pluginName = 'link';
  handleClick = () => {
    this.props.editor.insertMarkdown('link', {linkUrl: ''})
  }
  render () {
    return (
      <span
        title={i18n.get('btnLink')}
        onClick={this.handleClick}
      >
        <Icon type="link" />
      </span>
    )
  }
}
export default Link
