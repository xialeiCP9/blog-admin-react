import React  from 'react'
import Styles from './style.module.less'
import PropTypes from 'prop-types'

const propTypes = {
  onSelect: PropTypes.func.isRequired
}

function HeaderList (props) {
  const handleSelect = (header) => {
    const { onSelect } = props
    if (typeof onSelect === 'function') {
      onSelect(header)
    }
  }
  return (
    <ul className={Styles['ul-wrapper']}>
      <li className={Styles["list-item"]}>
        <h1 onClick={() => handleSelect('h1')}>H1</h1>
      </li>
      <li className={Styles["list-item"]}>
        <h2 onClick={() => handleSelect('h2')}>H2</h2>
      </li>
      <li className={Styles["list-item"]}>
        <h3 onClick={() => handleSelect('h3')}>H3</h3>
      </li>
      <li className={Styles["list-item"]}>
        <h4 onClick={() => handleSelect('h4')}>H4</h4>
      </li>
      <li className={Styles["list-item"]}>
        <h5 onClick={() => handleSelect('h5')}>H5</h5>
      </li>
      <li className={Styles["list-item"]}>
        <h6 onClick={() => handleSelect('h6')}>H6</h6>
      </li>
    </ul>
  )
}
HeaderList.propTypes = propTypes
export default HeaderList
