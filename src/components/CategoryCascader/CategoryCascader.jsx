import React, { useState, useEffect } from 'react'
import { Cascader } from 'antd'
import PropTypes from 'prop-types'

const propTypes = {
  className: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.name
  })),
  defaultValue: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func
}

function CategoryCascader (props) {
  const {categories, defaultValue, onSelect} = props
  const [value, setValue] = useState('')
  const handleChange = v => {
    setValue(v)
    onSelect(v.length ? v[v.length - 1] : '')
  }
  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  return (
    <Cascader
      {...props}
      value={value}
      options={categories}
      onChange={handleChange}
      changeOnSelect
    />
  )
}

CategoryCascader.propTypes = propTypes

export default CategoryCascader