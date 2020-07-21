import React, {Component} from 'react'
import i18n from '../i18n'
import Icon from '../components/Icon'

const NEXT_ACTION = {
  SHOW_ALL: 0,
  SHOW_MD: 1,
  SHOW_HTML: 2
}

class ToggleMode extends Component {
  static pluginName = "toggleMode";
  static align = "right";
  constructor (props) {
    super(props)
    this.state = {
      view: props.editor.state.view
    }
  }
  componentDidMount(){
    this.props.editor.emitter.on('viewChange', this.handleChange)
  }
  componentWillUnmount(){
    this.props.editor.emitter.off('viewChange', this.handleChange)
  }
  handleChange = view => {
    this.setState({
      view
    })
  }
  next () {
    const { view } = this.state
    if (view.html && view.md) {
      return NEXT_ACTION.SHOW_MD
    } else if (!view.html) {
      return NEXT_ACTION.SHOW_HTML
    } else {
      return NEXT_ACTION.SHOW_ALL
    }
  }
  getDisplayInfo () {
    const next = this.next()
    switch(next) {
      case NEXT_ACTION.SHOW_MD:
        return {
          icon:　'keyboard',
          title: 'Editor'
        }
      case NEXT_ACTION.SHOW_HTML:
        return {
          icon: 'visibility',
          title: 'Preview'
        }
      default:
        return {
          icon: 'view-split',
          title: 'All'
        }
    }
  }
  handleClick = () => {
    const next = this.next()
    const {editor} = this.props
    switch(next) {
      case NEXT_ACTION.SHOW_ALL:
        editor.setView({
          html: true,
          md: true
        })
        break
      case NEXT_ACTION.SHOW_MD:
        editor.setView({
          html: false,
          md: true
        })
        break
      default:
        editor.setView({
          html: true,
          md: false
        })
        break
    }
  }
  render () {
    const {icon, title} = this.getDisplayInfo()
    return (
      <span
        title={i18n.get(title)}
        onClick={this.handleClick}
      >
        <Icon type={icon} />
      </span>
    )
  }
}

export default ToggleMode
