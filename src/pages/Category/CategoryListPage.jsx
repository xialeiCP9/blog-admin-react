import React, { useState } from 'react'
import { Button, Tooltip, List, Breadcrumb } from 'antd'
import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons'
import Styles from './CategoryListPage.module.less'

function CategoryListPage (props) {
  const { categories, setCategoriesFilter } = props
  const [bars, setBars] = useState([])
  const showCategories = (category, isBar) => {
    if (isBar) {
      if (category) {
        const index = bars.findIndex(item => item._id === category._id)
        setBars(bars.slice(0, index + 1))
      } else {
        setBars([])
      }
    } else {
      console.log(bars)
      setBars([...bars, category])
    }
    setCategoriesFilter(category)
  }
  const addCategory = (e, _id) => {
    e.stopPropagation()
    const len = bars.length
    const id = _id ? _id : (len > 0 ? bars[len - 1]._id : '00000')
    const url = '/categories/' + id + '/add'
    props.history.push(url)
  }
  const delCategory = (e, _id) => {
    e.stopPropagation()
    props.history.push(`/categories/${_id}/del`)
  }
  const updateCategory = (e, _id) => {
    e.stopPropagation()
    props.history.push(`/categories/${_id}/edit`)
  }
  return (
    <div className={Styles["main"]}>
      <Breadcrumb className={Styles["breadcrumb"]}>
        <Breadcrumb.Item 
          onClick={() => showCategories(null, true)} 
          className={Styles["breadcrumb-bar"]}>一级目录</Breadcrumb.Item>
        {
          bars.map(bar => (
            <Breadcrumb.Item key={bar._id} 
              onClick={() => showCategories(bar, true)} 
              className={Styles["breadcrumb-bar"]}>{bar.name}</Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
      <List
        className={Styles["list"]}
        header={
          <Tooltip placement="topRight" title="点击增加目录">
            <Button type="dashed" onClick={e => addCategory(e)}><PlusOutlined /></Button>
          </Tooltip>
        }
        dataSource={categories}
        renderItem={item => (
          <List.Item className={Styles["list-item"]} onClick={() => showCategories(item, false)}>
            {item.name}
            <span className={Styles["list-item-tip"]}>{item.count}</span>
            <div className={Styles["list-item-button-group"]}>
              <Button type="dashed" onClick={(e) => addCategory(e, item._id)}><PlusOutlined /></Button>
              <Button type="danger" onClick={(e) => delCategory(e, item._id)}><MinusOutlined /></Button>
              <Button type="primary" onClick={(e) => updateCategory(e, item._id)}><EditOutlined /></Button>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default CategoryListPage