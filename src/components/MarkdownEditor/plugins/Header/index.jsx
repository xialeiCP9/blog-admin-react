import React, { Component } from 'react'
import i18n from '../../i18n'
import Icon from '../../components/Icon'
import DropList from '../../components/DropList'
import HeaderList from './HeaderList'
import Styles from './index.module.less'

class Header extends Component {
  static pluginName = "header";
  static align = "left";
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }
  show = () => {
    this.setState({
      show: true
    })
  }
  hide = () => {
    this.setState({
      show: false
    })
  }
  onSelect = (header) => {
    this.props.editor.insertMarkdown(header)
    this.setState({
      show: false
    })
  }
  render () {
    return (
      <span
        className={Styles["btn-header"]}
        title={i18n.get('btnHeader')}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        <Icon type="font-size" />
        <DropList show={this.state.show}>
          <HeaderList show={this.state.show} onSelect={this.onSelect} />
        </DropList>
      </span>
    )
  }
}
export default Header
