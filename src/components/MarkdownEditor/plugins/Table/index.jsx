import React, { Component } from 'react'
import i18n from '../../i18n'
import Icon from '../../components/Icon'
import DropList from '../../components/DropList'
import TableList from './TableList'
import Styles from './index.module.less'

class Table extends Component {
  static align = 'left';
  static pluginName = 'table'
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }
  handleMouseEnter = () => {
    this.setState({
      show: true
    })
  }
  handleMouseLeave = () => {
    this.setState({
      show: false
    })
  }
  createTableList = (row, col) => {
    console.log(`父组件接收到了row: ${row}, col: ${col}`)
    this.props.editor.insertMarkdown('table', {row, col})
    this.setState({
      show: false
    })
  }
  render () {
    return (
      <span
        title={i18n.get('btnTable')}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={Styles['btnTable']}
      >
        <Icon type="grid" />
        <DropList show={this.state.show}>
          <TableList visibility={this.state.show} createTableList={this.createTableList} maxRow={4} maxCol={6} />
        </DropList>
      </span>
    )
  }
}

export default Table
