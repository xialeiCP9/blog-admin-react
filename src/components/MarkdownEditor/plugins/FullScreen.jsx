import React, {Component} from 'react'
import i18n from '../i18n'
import Icon from '../components/Icon'

class FullScreen extends Component {
  static align = 'right';
  static pluginName = 'full-screen';
  constructor (props) {
    super(props)
    this.state = {
      enable: props.editor.isFullScreen()
    }
  }
  handleClick = () => {
    this.setState({
      enable: !this.state.enable
    }, () => {
      this.props.editor.setState({
        fullScreen: this.state.enable 
      })
    })
  }
  render () {
    const { enable } = this.state
    return (
      <span
        title={i18n.get(enable ? 'btnExitFullScreen' : 'btnFullScreen')}
        onClick={this.handleClick}
      >
        <Icon type={enable ? 'fullscreen-exit' : 'fullscreen'} />
      </span>
    )
  }
}

export default FullScreen
