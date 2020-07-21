import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import Styles from './Loading.module.less'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  tip: PropTypes.string
}

const defaultProps = {
  isLoading: false,
  tip: ''
}

function Loading (props) {
  const { isLoading, tip, style } = props
  console.log(style)
  return (
    <div className={Styles.wrapper}>
      <div className={[Styles.back, isLoading ? Styles.show : ''].join(' ')} style={style}>
        <div className={Styles.spin}>
          <LoadingOutlined spin={isLoading} />
          <span className={Styles.tip}>{tip}</span>
        </div>
      </div>
      {props.children}
    </div>
  )
}

Loading.propTypes = propTypes
Loading.defaultProps = defaultProps

export default Loading
