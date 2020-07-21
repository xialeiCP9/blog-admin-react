import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import CategoryList from './CategoryList'
import AddCategory from './AddCategory'
import DelCategory from './DelCategory'
import UpdateCategory from './UpdateCategory'

function Category (props) {
  return (
    <Fragment>
      <Route path="/categories" component={CategoryList} />
      <Route path="/categories/:id/add" component={AddCategory} />
      <Route path="/categories/:id/del" component={DelCategory} />
      <Route path="/categories/:id/edit" component={UpdateCategory} />
    </Fragment>
  )
}

export default Category