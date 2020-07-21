import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'
import { getCategories } from '../../redux/selectors/categorySelectors'
import { updateCategoryAsync } from '../../redux/actions/categoryAction'

function AddCategory (props) {
  const { categories, updateCategoryAsync } = props
  const { id } = props.match.params
  const category = categories.find(item => item._id === id)
  const parent = categories.find(item => item._id === category.parent)
  return (
    <CategoryForm operate="update" category={category} parent={parent} updateCategoryAsync={updateCategoryAsync} />
  )
}

export default connect(
  state => ({
    categories: getCategories(state)
  }),
  { updateCategoryAsync }
)(AddCategory)