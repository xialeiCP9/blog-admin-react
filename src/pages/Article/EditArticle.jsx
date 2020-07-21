import React from 'react'

import ArticleEditor from './ArticleEditor'


function EditArticle (props) {
  const id = props.match.params.id
  console.log("编辑界面")
  return (
    <ArticleEditor operate="update" id={id} />
  )
}

export default EditArticle