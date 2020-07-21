import React from 'react'

import ArticleEditor from './ArticleEditor'


function AddArticle (props) {
  console.log("增加界面")
  return (
    <ArticleEditor operate="add" />
  )
}

export default AddArticle