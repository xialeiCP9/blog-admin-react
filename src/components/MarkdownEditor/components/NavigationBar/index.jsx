import React, {Component} from 'react'
import Styles from './style.module.less'

class NavigationBar extends Component {
  
  render () {
    return (
      <nav className={Styles["rc-md-navigation"]}>
        <div className={[Styles["navigation-nav"], Styles["left"]].join(" ")}>
          <div className={Styles["button-wrap"]}>
            {this.props.left}
          </div>
        </div>
        <div className={[Styles["navigation-nav"], Styles["right"]].join(" ")}>
          <div className={Styles["button-wrap"]}>
            {this.props.right}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavigationBar
