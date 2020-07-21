import React from 'react'
import { connect } from 'react-redux'
import CategoryForm from './CategoryForm'
import { getCategories } from '../../redux/selectors/categorySelectors'
import { addCategoryAsync } from '../../redux/actions/categoryAction'

function AddCategory (props) {
  const { categories, addCategoryAsync } = props
  const { id } = props.match.params
  const category = categories.find(item => item._id === id)
  return (
    <CategoryForm operate="add" category={category} addCategoryAsync={addCategoryAsync} />
  )
}

export default connect(
  state => ({
    categories: getCategories(state)
  }),
  { addCategoryAsync }
)(AddCategory)