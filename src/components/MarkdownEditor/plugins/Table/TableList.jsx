import React , { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './TableList.module.less'

const propTypes = {
  maxRow: PropTypes.number,
  maxCol: PropTypes.number,
  createTableList: PropTypes.func.isRequired,
  visibility: PropTypes.bool
}

const defaultProps = {
  maxRow: 3,
  maxCol: 4,
  visibility: false
}

class TableList extends Component {
  constructor (props) {
    super(props)
    this.liwh = 20
    this.liPadding = 3
    this.state = {
      select: -1
    }
  }
  initState = () => {
    this.setState({
      select: -1
    })
  }
  componentDidUpdate (prevProps) {
    if (this.props.visibility === false && prevProps.visibility !== this.props.visibility) {
      this.initState()
    }
  }
  getList () {
    const { maxRow, maxCol } = this.props
    const list = []
    for (let i = 0 ; i < maxRow * maxCol ; i ++) {
      list.push(i)
    }
    return list
  }
  getWrapWidth () {
    const { maxCol } = this.props
    return maxCol * this.liwh + maxCol * this.liPadding
  }
  handleSelectTable = (e) => {
    const key = e.target.getAttribute('data-key')
    this.setState({
      select: parseInt(key)
    })
  }
  getCRByKey = key => {
    const { maxCol } = this.props
    return {
      row: parseInt(key / maxCol) + 1,
      col: key - parseInt(key / maxCol) * maxCol + 1
    }
  }
  handleClick = () => {
    const { createTableList } = this.props
    const { row, col } = this.getCRByKey(this.state.select)
    createTableList(row, col)
  }
  render () {
    const { select } = this.state
    const selectCol = this.getCRByKey(select).col
    return (
      <ul
        className={[Styles["table-list"], Styles["wrap"]].join(" ")}
        style={{width: this.getWrapWidth()}}
        onMouseMove={this.handleSelectTable}
        onClick={this.handleClick}
      >
        {
          this.getList().map(item => {
            return (
              <li
                key={item}
                data-key={item}
                style={{
                  paddingRight: this.liPadding,
                  paddingBottom: this.liPadding
                }}
              >
                <div
                  data-key={item}
                  style={{
                    width: this.liwh,
                    height: this.liwh
                  }}
                  className={
                    (item <= select && this.getCRByKey(item).col <= selectCol) ?
                    Styles["selected"] : ""
                  }
                ></div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
TableList.propTypes = propTypes
TableList.defaultProps = defaultProps
export default TableList
