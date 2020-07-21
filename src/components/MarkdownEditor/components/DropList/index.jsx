import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './style.module.less'

const propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
}

class DropList extends Component {

  handleClose = (e) => {
    e.stopPropagation()
    const { onClose } = this.props
    if (typeof onClose === 'function') {
      onClose()
    }
  }
  render () {
    return (
      <div
        style={this.props.style}
        className={[this.props.className, Styles['droplist-wrap'], this.props.show ? Styles['show'] : ''].join(" ")}
        onClick={this.handleClose}
      >
        {this.props.children}
      </div>
    )
  }
}
DropList.propTypes = propTypes

export default DropList
