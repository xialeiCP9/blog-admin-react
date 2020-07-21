import React from 'react'
import './font.less'
import PropTypes from 'prop-types'

const propTypes = {
  type: PropTypes.string
}

function Icon (props) {
  return (
    <i className={`rmel-iconfont rmel-icon-${props.type}`} />
  )
}
Icon.propTypes = propTypes

export default Icon
