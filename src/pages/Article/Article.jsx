import React, { lazy, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import DelArticle from './DelArticle'

const ArticleList = lazy(() => import('./ArticleList'))
const AddArticle = lazy(() => import('./AddArticle'))
const ShowArticle = lazy(() => import('./ShowArticle'))
const EditArticle = lazy(() => import('./EditArticle'))
const UploadImgArticle = lazy(() => import('./UploadImgArticle'))


export default function Article (props) {

  return (
    <Fragment>
      <Switch>
        <Route path="/articles" exact component={ArticleList} />
        <Route path="/articles/add" component={AddArticle} />
        <Route path="/articles/:id" component={ShowArticle} />
      </Switch>
      <Route path="/articles/:id/edit" component={EditArticle} />
      <Route path="/articles/:id/del" component={DelArticle} />
      <Route path="/articles/:id/uploadimg" component={UploadImgArticle} />
    </Fragment>
  )
}